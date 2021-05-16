from random import randint

import pytest
from django.core.management import call_command

from bookstack.models import Stack, Book, BookStack

pytestmark = pytest.mark.django_db


@pytest.fixture(scope="session", autouse=True)
def django_db_setup(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        call_command("loaddata", "fixtures.json")


def test_position():
    assert 1 == 1
    stack = Stack.objects.get(name="One")
    for (i, bookstack) in enumerate(stack.bookstack_set.all(), 1):
        assert bookstack.position == i


def test_max_position():
    for stack in Stack.objects.all():
        for bookstack in BookStack.objects.filter(stack__name=stack.name):
            assert bookstack.max_position() == stack.books.all().count()


def test_random_renumbering_preserves_positioning_invariant():
    for stack in Stack.objects.all():
        stack_size = stack.bookstack_set.count()
        bookstack = stack.bookstack_set.all()[randint(1, stack_size - 1)]
        bookstack.renumber(randint(1, stack_size))

        actual_positions = list(
            stack.bookstack_set.all().values_list("position", flat=True)
        )
        expected_positions = list(range(1, stack_size + 1))
        assert actual_positions == expected_positions


def test_renumber_executes_single_query(django_assert_num_queries):
    for stack in Stack.objects.all():
        bookstack = stack.bookstack_set.first()
        max_position = bookstack.max_position()

        assert bookstack.position == 1
        assert bookstack.position != max_position

        with django_assert_num_queries(1):
            # When: A request is made to renumber the bookstack
            # Then: Only the expected number of queries will have been made
            bookstack.renumber(max_position)


def test_renumber_from_front_to_back_preserves_positioning_invariant():
    stack = Stack.objects.first()
    stack_size = stack.bookstack_set.count()
    bookstack = stack.bookstack_set.first()
    bookstack_id = bookstack.id

    bookstack.renumber(stack_size)

    actual_positions = list(
        stack.bookstack_set.all().values_list("position", flat=True)
    )
    expected_positions = list(range(1, stack_size + 1))
    assert actual_positions == expected_positions

    assert bookstack_id == stack.bookstack_set.last().id


def test_renumber_from_back_to_front_preserves_positioning_invariant():
    stack = Stack.objects.first()
    stack_size = stack.bookstack_set.count()
    bookstack = stack.bookstack_set.last()
    bookstack_id = bookstack.id

    bookstack.renumber(1)

    actual_positions = list(
        stack.bookstack_set.all().values_list("position", flat=True)
    )
    expected_positions = list(range(1, stack_size + 1))
    assert actual_positions == expected_positions

    assert bookstack_id == stack.bookstack_set.first().id


def test_renumber_to_current_position_doesnt_do_anything():
    stack = Stack.objects.first()
    bookstack = stack.bookstack_set.first()
    bookstack_id = bookstack.id

    bookstack.renumber(1)

    assert bookstack_id == stack.bookstack_set.first().id


def test_renumber_to_position_outside_of_bounds_doesnt_do_anything():
    stack = Stack.objects.first()
    stack_size = stack.bookstack_set.count()
    bookstack = stack.bookstack_set.first()

    original_positions = list(stack.bookstack_set.values("id", "position"))

    bookstack.renumber(0)

    new_positions = list(stack.bookstack_set.values("id", "position"))
    assert new_positions == original_positions

    bookstack.renumber(stack_size + 1)

    new_positions = list(stack.bookstack_set.values("id", "position"))
    assert new_positions == original_positions


def test_saving_without_position_sets_position_to_end():
    stack = Stack.objects.first()
    book = Book.objects.first()
    stack_size = stack.bookstack_set.count()

    new_bookstack = BookStack.objects.create(book=book, stack=stack)
    assert new_bookstack.position == stack_size + 1


def test_toggle_read():
    bookstack = Stack.objects.first().bookstack_set.first()

    assert bookstack.read == False
    bookstack.toggle_read()

    assert bookstack.read == True
    bookstack.toggle_read()

    assert bookstack.read == False
    bookstack.toggle_read()
