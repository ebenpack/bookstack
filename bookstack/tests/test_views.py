import json
from collections import namedtuple
from itertools import permutations
from django.core.management import call_command
from django.contrib.auth.models import User
from django.urls import reverse
import pytest

from .utils import django_assert_num_queries
from bookstack.models import (
    Stack,
    Book,
    BookStack,
    BookStackCategory,
    Category,
    Author,
    Publisher
)

pytestmark = pytest.mark.django_db


@pytest.fixture(scope='session', autouse=True)
def django_db_setup(django_db_setup, django_db_blocker):
    with django_db_blocker.unblock():
        call_command('loaddata', 'fixtures.json')


View = namedtuple('View',
                  field_names=['name', 'url', 'detail_viewname', 'list_viewname', 'expected_queries', 'model',
                               'post_data'])

api_data = [
    View(name="stack",
         url="/api/stack/",
         detail_viewname="bookstack:stack-detail",
         list_viewname="bookstack:stack-list",
         expected_queries=1,
         model=Stack,
         post_data=lambda: {
             "name": "Foobar",
             "private": True
         }),
    View(name="bookstack",
         url="/api/bookstack/",
         detail_viewname="bookstack:bookstack-detail",
         list_viewname="bookstack:bookstack-list",
         expected_queries=5,
         model=BookStack,
         post_data=lambda: {
             "read": True,
             "book_id": Book.objects.create(title="foobarbazqux", pages=1729, isbn="foobarbazqux").id,
             "stack_id": Stack.objects.create(name="foobarbazqux", user=User.objects.create(username="foobarbaz")).id
         }),
    View(name="bookstackcategory",
         url="/api/bookstackcategory/",
         detail_viewname="bookstack:bookstackcategory-detail",
         list_viewname="bookstack:bookstackcategory-list",
         expected_queries=1,
         model=BookStackCategory,
         post_data=lambda: {
             "bookstack": BookStack.objects.first().id,
             "category": Category.objects.create(category="foobarbazqux").id
         }),
    View(name="book",
         url="/api/book/",
         detail_viewname="bookstack:book-detail",
         list_viewname="bookstack:book-list",
         expected_queries=3,
         model=Book,
         post_data=lambda: {
             "title": "Portait of a Laaaaadddddy!",
             "pages": 1729,
             "isbn": "foobarbaz",
             "img": "",
             "authors": [
                 Author.objects.create(name="Jerry Lewis").id
             ],
             "publishers": [
                 Publisher.objects.create(name="Yoyodyne, Inc,").id
             ]
         }),
    View(name="author",
         url="/api/author/",
         detail_viewname="bookstack:author-detail",
         list_viewname="bookstack:author-list",
         expected_queries=1,
         model=Author,
         post_data=lambda: {
             "name": "Pirate Prentice"
         }),
    View(name="publisher",
         url="/api/publisher/",
         detail_viewname="bookstack:publisher-detail",
         list_viewname="bookstack:publisher-list",
         expected_queries=1,
         model=Publisher,
         post_data=lambda: {
             "name": "Yoyodyne, Inc."
         }),
    View(name="category",
         url="/api/category/",
         detail_viewname="bookstack:category-detail",
         list_viewname="bookstack:category-list",
         expected_queries=1,
         model=Category,
         post_data=lambda: {
             "category": "Underwater Basket Weaving"
         }),
]


#######################
# API
#######################

@pytest.mark.parametrize("view", api_data)
def test_view_queries(django_assert_num_queries, client, view):
    # Given: The view list URL
    url = reverse(view.list_viewname)
    with django_assert_num_queries(view.expected_queries):
        # When: The view list is requested
        # Then: Only the expected number of queries will have been made
        client.get(url)


@pytest.mark.parametrize("view", api_data)
def test_view(db, admin_client, view):
    # Given: Some number `n` of objects that already exist
    initial_count = view.model.objects.count()
    # Given: The object list URL
    post_url = reverse(view.list_viewname)
    # When: A new object is posted
    post_response = admin_client.post(post_url, view.post_data())
    post_response_data = post_response.json()
    # Then: A 201 response will be returned
    assert post_response.status_code == 201
    # Then: The response will be in the expected format
    # TODO:
    # for prop in view.post_data:
    #     assert post_response_data[prop] == view.post_data[prop]

    # Then: The object will have been created in the DB
    view.model.objects.filter(pk=post_response_data['id']).exists()
    assert view.model.objects.count() == initial_count + 1
    # Given: The detail URL for the new object
    get_url = reverse(view.detail_viewname, kwargs={'pk': post_response_data['id']})
    # When: The object is requested
    get_response = admin_client.get(get_url)
    # Then: A 200 response is returned
    assert get_response.status_code == 200
    get_response_data = get_response.json()
    # TODO:
    # Then: The new object will be returned in the expected format
    # for prop in view.post_data:
    #     assert post_response_data[prop] == view.post_data[prop]

    # Given: The detail URL for the new object
    delete_url = reverse(view.detail_viewname, kwargs={'pk': post_response_data['id']})
    # When: The object is deleted
    delete_response = admin_client.delete(get_url)
    # Then: A 204 response is returned
    assert delete_response.status_code == 204
    # Then: The object will no longer exist
    assert not view.model.objects.filter(pk=post_response_data['id']).exists()
    assert view.model.objects.count() == initial_count


#######################
# Stack
#######################


#######################
# BookStack
#######################

def test_bookstack_renumber(db, admin_client):
    n = 8
    # Given: A user and a stack
    user = User.objects.create(username="Foobarbaz")
    stack = Stack.objects.create(name="Foobarbaz", user=user)
    bookstacks = []
    for i in range(0, n):
        # Given: N books
        book = Book.objects.create(title=str(i), pages=i, isbn=str(i), img="")
        # Given: N books in the stack
        bookstack = BookStack.objects.create(book=book, stack=stack)
        bookstacks.append(bookstack)

    # When: For all possible valid move permutations for a book in the stack
    for combo in permutations(range(0, n), 2):
        bookstack = bookstacks[combo[1]]
        position = combo[0] + 1
        # Given: The renumber bookstack URL
        renumber_url = reverse("bookstack:bookstack-renumber", kwargs={'pk': bookstack.id})
        # When: A request is made to renumber the bookstack
        renumber_response = admin_client.patch(renumber_url, data=json.dumps({'position': position}),
                                               content_type='application/json')
        assert renumber_response.status_code == 200
        # Then: The bookstack is in its new position
        assert BookStack.objects.get(id=bookstack.id).position == position
        # Then: The position invariant is maintained
        assert sorted(list(stack.bookstack_set.values_list('position', flat=True))) == list(range(1, n + 1))


def test_bookstack_renumber_invalid_position(db, admin_client):
    # Given: A user and a stack
    user = User.objects.create(username="Foobarbaz")
    stack = Stack.objects.create(name="Foobarbaz", user=user)
    # Given: A book
    book = Book.objects.create(title="foobar", pages=1729, isbn="foobar", img="")
    # Given: A book in the stack
    bookstack = BookStack.objects.create(book=book, stack=stack)
    # Given: The renumber bookstack URL
    renumber_url = reverse("bookstack:bookstack-renumber", kwargs={'pk': bookstack.id})
    # When: A request is made to renumber the bookstack with an invalid position argument
    renumber_response = admin_client.patch(renumber_url, data=json.dumps({'position': "badarg"}),
                                           content_type='application/json')
    # Then: A 400 response is returned
    assert renumber_response.status_code == 400

def test_bookstack_renumber_position_out_of_bounds(db, admin_client):
    # Given: A user and a stack
    user = User.objects.create(username="Foobarbaz")
    stack = Stack.objects.create(name="Foobarbaz", user=user)
    # Given: A book
    book = Book.objects.create(title="foobar", pages=1729, isbn="foobar", img="")
    # Given: A book in the stack
    bookstack = BookStack.objects.create(book=book, stack=stack)
    # Given: The renumber bookstack URL
    renumber_url = reverse("bookstack:bookstack-renumber", kwargs={'pk': bookstack.id})
    # When: A request is made to renumber the bookstack to a position that is out of bounds
    renumber_response = admin_client.patch(renumber_url, data=json.dumps({'position': 30}),
                                           content_type='application/json')
    # Then: A 400 response is returned
    assert renumber_response.status_code == 400

#######################
# BookStackCategory
#######################


#######################
# Book
#######################


#######################
# Author
#######################


#######################
# Publisher
#######################


#######################
# Category
#######################
