from django.db import models
from django.contrib.auth.models import User

import urllib.request
import shutil
import os


class Stack(models.Model):
    name = models.CharField(max_length=200)
    private = models.BooleanField(default=True)
    user = models.ForeignKey(User)
    creation_date = models.DateTimeField(
        auto_now_add=True
    )
    books = models.ManyToManyField('Book', through='BookStack')

    def renumber(self, from_position, to_position):
        '''Re-number book positions in the stack. After this method is executed,
        all books in a stack will be numbered sequentially from 1-n, where n is
        the number of books in the stack, and each book will have a unique position.
        '''
        bookstack_set = self.bookstack_set.order_by('position')
        start = min(from_position, to_position)
        end = max(from_position, to_position)
        # Items' positions decrease if moving item later in list,
        # increase if moving item to earlier position
        direction = -1 if from_position < to_position else 1
        for i, book in enumerate(bookstack_set[start-1:end], start):
            if i == from_position:
                book.position = to_position
            else:
                book.position = book.position + direction
            book.save()

    def __str__(self):
        return self.name


class BookStack(models.Model):
    class Meta:
        ordering = ['position']

    def number():
        no = BookStack.objects.count()
        if no is None:
            return 1
        else:
            return no + 1

    def max_position(self):
        return self.stack.bookstack_set.count()

    def renumber(self, position):
        from_position = self.position
        to_position = position
        self.stack.renumber(from_position, to_position)

    stack = models.ForeignKey(Stack)
    book = models.ForeignKey('Book')
    read = models.BooleanField(default=False)
    categories = models.ManyToManyField('Category', blank=True)
    position = models.IntegerField(default=number, db_index=True)

    def toggle_read(self):
        self.read = not self.read
        self.save()

    def __str__(self):
        return self.book.title
    

class Book(models.Model):
    title = models.CharField(max_length=200)
    pages = models.IntegerField()
    isbn = models.CharField(max_length=15, unique=True)
    img = models.URLField(max_length=500, blank=True)
    authors = models.ManyToManyField('Author')
    publishers = models.ManyToManyField('Publisher')

    def __str__(self):
        return self.title


class Category(models.Model):
    category = models.CharField(max_length=30, unique=True)

    class Meta(object):
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.category


class Author(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
