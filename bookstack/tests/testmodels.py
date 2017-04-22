from django.contrib.auth.models import User
from django.test import TestCase

from random import shuffle

from bookstack.models import (
    Stack,
    Book,
    BookStack,
    Category,
    Author,
    Publisher
)


class BookStackTestCase(TestCase):
    STACK_SIZE = 20

    def setUp(self):
        User.objects.create(
            username='TEST'
        )
        Author.objects.create(
            name='David Lo Pan'
        )
        Publisher.objects.create(
            name='Wing Kong Trading Company'
        )

        for title in range(self.STACK_SIZE):
            Book.objects.create_book(
                title=str(title),
                pages=1729,
                isbn='000000000{}'.format(title),
                authors=Author.objects.all(),
                publishers=Publisher.objects.all()
            )
        Category.objects.create(category='Bar')
        Category.objects.create(category='Foo')
        Category.objects.create(category='Baz')
        Category.objects.create(category='Qux')

        stack = Stack.objects.create_stack(
            name='One',
            private=False,
            user=User.objects.get(username='TEST')
        )
        for book in Book.objects.all():
            BookStack.objects.create_bookstack(
                read=False,
                stack=stack,
                book=book,
                categories=Category.objects.all()
            )

    def test_position(self):
        stack = Stack.objects.get(name='One')
        for (i, bookstack) in enumerate(stack.bookstack_set.all(), 1):
            self.assertEqual(bookstack.position, i)

    def test_max_position(self):
        for bookstack in BookStack.objects.filter(stack__name='One'):
            self.assertEqual(bookstack.max_position(), self.STACK_SIZE)

    def test_renumber(self):
        stack = Stack.objects.get(name='One')
        random_list = list(range(1, stack.bookstack_set.count()))
        shuffle(random_list)
        for (i, bookstack) in zip(random_list, list(stack.bookstack_set.all())):
            bookstack.renumber(i)

        self.assertEqual(
            list(Stack.objects.get(name='One').bookstack_set.all().values_list("position", flat=True)),
            list(range(1, self.STACK_SIZE + 1))
        )

        bookstack = Stack.objects.get(name='One').bookstack_set.all()[0]
        with self.assertRaises(IndexError):
            bookstack.renumber(-1)

        with self.assertRaises(IndexError):
            bookstack.renumber(self.STACK_SIZE + 1)

    def test_toggle_read(self):
        bookstack = Stack.objects.get(name='One').bookstack_set.all()[0]

        self.assertEqual(bookstack.read, False)
        bookstack.toggle_read()

        self.assertEqual(bookstack.read, True)
        bookstack.toggle_read()

        self.assertEqual(bookstack.read, False)
        bookstack.toggle_read()
