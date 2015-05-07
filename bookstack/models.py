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

    def renumber(self):
        '''Re-number book positions in the stack. After this method is executed,
        all books in a stack will be numbered sequentially from 1-n, where n is
        the number of books in the stack, and each book will have a unique position.
        '''
        for i, book in enumerate(self.bookstack_set.order_by('position'), 1):
            if book.position != i:
                book.position = i
                book.save()

    def add_book(self, book):
        #from pudb import set_trace; set_trace()
        # Save image file locally
        imgurl = book["img"]
        file_name = book["isbn"] + ".jpg"
        opener = urllib.request.build_opener()
        opener.addheaders = [('User-agent', 'Mozilla/5.0')]
        current_path = os.path.realpath(os.path.dirname(__file__))
        fullpath = os.path.join(current_path, 'static/bookstack/images/', file_name)
        with opener.open(imgurl) as response, open(fullpath, 'wb') as out_file:
            shutil.copyfileobj(response, out_file)

        new_book = Book.objects.get_or_create(title=book["title"], pages=book["pages"],
            isbn=book["isbn"], img=file_name)[0]
        new_book.save()
        new_stack = BookStack(read=False)
        new_stack.stack = self
        new_stack.book = new_book
        new_stack.position = len(self.bookstack_set.all()) + 1
        new_stack.save()
        for cat in book["categories"].split(","):
            category = Category.objects.get_or_create(category=cat.strip())[0]
            new_stack.categories.add(category)
        for name in book["authors"]:
            author = Author.objects.get_or_create(name=name)[0]
            new_book.authors.add(author)
        publisher = Publisher.objects.get_or_create(name = book["publisher"].strip('\"\''))[0]
        new_book.publishers.add(publisher)
        new_book.save()

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
