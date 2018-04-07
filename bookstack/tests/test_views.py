from django.core.management import call_command
from django.urls import reverse
import pytest
from .utils import django_assert_num_queries

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

#######################
# Stack
#######################

def test_stack_list(db, client):
    url = reverse('bookstack:stack-list')
    response = client.get(url)
    for stack in response.json():
        assert "name" in stack
        assert "private" in stack
        assert "user" in stack
        assert "creation_date" in stack                        

def test_stack_detail(db, client):
    url = reverse('bookstack:stack-detail', kwargs={'pk': 1})
    response = client.get(url)
    stack = response.json()
    assert "name" in stack
    assert "private" in stack
    assert "user" in stack
    assert "creation_date" in stack    

def test_stack_post(db, admin_client):
    stack_count = Stack.objects.count()
    url = reverse('bookstack:stack-list')
    data = {
        "name": "Foobar",
        "private": True
    }
    response = admin_client.post(url, data)
    response_data = response.json()
    assert response.status_code == 201
    assert response_data['name'] == 'Foobar'
    assert response_data['private'] == True
    assert Stack.objects.count() == stack_count + 1

def test_stack_queries(django_assert_num_queries, client):
    url = reverse('bookstack:stack-list')
    with django_assert_num_queries(1):
        client.get(url)

# "bookset": "http://localhost:8000/api/bookset/",
# "booksetcategory": "http://localhost:8000/api/booksetcategory/",
# "book": "http://localhost:8000/api/book/",
# "author": "http://localhost:8000/api/author/",
# "publisher": "http://localhost:8000/api/publisher/",
# "category": "http://localhost:8000/api/category/",

#######################
# BookSet
#######################

def test_bookset_queries(django_assert_num_queries, client):
    url = reverse('bookstack:bookset-list')
    with django_assert_num_queries(5):
        client.get(url)

#######################
# BookSetCategory
#######################

def test_booksetcategory_queries(django_assert_num_queries, client):
    url = reverse('bookstack:booksetcategory-list')
    with django_assert_num_queries(1):
        client.get(url)

#######################
# Book
#######################

def test_book_queries(django_assert_num_queries, client):
    url = reverse('bookstack:book-list')
    with django_assert_num_queries(3):
        client.get(url)

#######################
# Author
#######################

def test_author_queries(django_assert_num_queries, client):
    url = reverse('bookstack:author-list')
    with django_assert_num_queries(1):
        client.get(url)

#######################
# Publisher
#######################

def test_publisher_queries(django_assert_num_queries, client):
    url = reverse('bookstack:publisher-list')
    with django_assert_num_queries(1):
        client.get(url)

#######################
# Category
#######################

def test_category_queries(django_assert_num_queries, client):
    url = reverse('bookstack:category-list')
    with django_assert_num_queries(1):
        client.get(url)