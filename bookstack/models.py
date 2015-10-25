from django.db import models
from django.contrib.auth.models import User
from django.db.models import F


class Stack(models.Model):
    name = models.CharField(max_length=200)
    private = models.BooleanField(default=True)
    user = models.ForeignKey(User)
    creation_date = models.DateTimeField(
        auto_now_add=True
    )
    books = models.ManyToManyField('Book', through='BookStack')

    def __str__(self):
        return self.name


class BookStack(models.Model):
    class Meta:
        ordering = ['position']

    def max_position(self):
        return self.stack.bookstack_set.count()

    def renumber(self, position):
        '''Re-number book positions in the stack. After this method is executed,
        all books in a stack will be numbered sequentially from 1-n, where n is
        the number of books in the stack, and each book will have a unique position.
        '''
        from_position = self.position
        to_position = position

        bookstack_set = self.stack.bookstack_set

        start = min(from_position, to_position)
        end = max(from_position, to_position)
        if from_position < to_position:
            start = start + 1
            direction = -1
        else:
            end = end - 1
            direction = 1

        # Grab the book being moved first, otherwise we
        # won't be able to uniquely identify it by its postion
        moved = bookstack_set.get(position=from_position)

        bookstack_set.filter(
            position__gte=start
        ).filter(
            position__lte=end
        ).update(
            position=F('position') + direction
        )

        moved.position = to_position
        moved.save()

    stack = models.ForeignKey(Stack)
    book = models.ForeignKey('Book')
    read = models.BooleanField(default=False)
    categories = models.ManyToManyField('Category', blank=True)
    position = models.IntegerField(default=0, db_index=True)

    def toggle_read(self):
        self.read = not self.read
        self.save()

    def save(self, *args, **kwargs):
        if not self.position:
            self.position = self.stack.bookstack_set.count() + 1
        super().save(*args, **kwargs)

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
