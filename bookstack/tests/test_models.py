from django.core.management import call_command
import pytest
from random import randint

from bookstack.models import (
    Stack,
    Book,
    BookStack,
    Category,
    Author,
    Publisher
)

pytestmark = pytest.mark.django_db

@pytest.fixture(scope='session', autouse=True)
def django_db_setup(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        call_command('loaddata', 'fixtures.json')

def test_position():
    assert 1 == 1
    stack = Stack.objects.get(name='One')
    for (i, bookstack) in enumerate(stack.bookstack_set.all(), 1):
        assert bookstack.position == i

def test_max_position():
    for stack in Stack.objects.all():
        for bookstack in BookStack.objects.filter(stack__name=stack.name):
            assert bookstack.max_position() == stack.books.all().count()


def test_random_renumbering_preserves_positioning_invariant():
    for stack in Stack.objects.all():
        stack_size = stack.bookstack_set.count()
        bookstack = stack.bookstack_set.all()[randint(0,stack_size-1)]
        bookstack.renumber(randint(0, stack_size))

        actual_positions = list(stack.bookstack_set.all().values_list("position", flat=True))
        expected_positions = list(range(1, stack_size + 1))
        assert actual_positions == expected_positions

def test_renumber_from_front_to_back_preserves_positioning_invariant():
    stack = Stack.objects.first()
    stack_size = stack.bookstack_set.count()
    bookstack = stack.bookstack_set.first()
    bookstack_id = bookstack.id

    bookstack.renumber(stack_size)

    actual_positions = list(stack.bookstack_set.all().values_list("position", flat=True))
    expected_positions = list(range(1, stack_size + 1))
    assert actual_positions == expected_positions

    assert bookstack_id == stack.bookstack_set.last().id

def test_renumber_from_back_to_front_preserves_positioning_invariant():
    stack = Stack.objects.first()
    stack_size = stack.bookstack_set.count()
    bookstack = stack.bookstack_set.last()
    bookstack_id = bookstack.id

    bookstack.renumber(1)

    actual_positions = list(stack.bookstack_set.all().values_list("position", flat=True))
    expected_positions = list(range(1, stack_size + 1))
    assert actual_positions == expected_positions

    assert bookstack_id == stack.bookstack_set.first().id

def test_renumber_to_position_outside_of_bounds_raises_index_error():
    stack = Stack.objects.first()
    stack_size = stack.bookstack_set.count()
    bookstack = stack.bookstack_set.first()
    with pytest.raises(IndexError):
        bookstack.renumber(0)

    with pytest.raises(IndexError):
        bookstack.renumber(stack_size + 1)

def test_toggle_read():
    bookstack = Stack.objects.first().bookstack_set.first()

    assert bookstack.read == False
    bookstack.toggle_read()

    assert bookstack.read == True
    bookstack.toggle_read()

    assert bookstack.read == False
    bookstack.toggle_read()
