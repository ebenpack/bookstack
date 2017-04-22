from django.db import models
from django.contrib.auth.models import User
from django.db.models import F


class StackManager(models.Manager):
    def create_stack(self, name, user, private=False, creation_date=None, books=None):
        stack = self.create(name=name, user=user, private=private)
        if creation_date is not None:
            stack.creation_date = creation_date
        if books is not None:
            stack.books = books
        stack.save()
        return stack


class Stack(models.Model):
    name = models.CharField(max_length=200)
    private = models.BooleanField(default=True)
    user = models.ForeignKey(User)
    creation_date = models.DateTimeField(
        auto_now_add=True
    )
    books = models.ManyToManyField('Book', through='BookStack')

    objects = StackManager()

    def __str__(self):
        return self.name


class BookManager(models.Manager):
    def create_book(self, title, pages, isbn, img=None, authors=None, publishers=None):
        book = self.create(title=title, pages=pages, isbn=isbn)
        if img is not None:
            book.img = img

        # TODO: FIX?
        if authors is not None:
            book.save()
            book.authors = authors.values_list('id', flat=True)
        if publishers is not None:
            book.save()
            book.publishers = publishers.values_list('id', flat=True)
        book.save()
        return book


class Book(models.Model):
    title = models.CharField(max_length=200)
    pages = models.IntegerField()
    isbn = models.CharField(max_length=15, unique=True)
    img = models.URLField(max_length=500, blank=True)
    authors = models.ManyToManyField('Author')
    publishers = models.ManyToManyField('Publisher')

    objects = BookManager()

    def __str__(self):
        return self.title


class BookStackManager(models.Manager):
    def create_bookstack(self, book, stack, read=False, categories=None):
        bookstack = self.create(
            read=read,
            book=book,
            stack=stack,
        )
        if categories is not None:
            bookstack.save()
            for category in categories:
                BookStackCategory.objects.create_bookstack_category(
                    bookstack=bookstack,
                    category=category
                )

        bookstack.save()
        return bookstack


class BookStack(models.Model):
    class Meta:
        ordering = ['position']

    stack = models.ForeignKey(Stack)
    book = models.ForeignKey(Book)
    read = models.BooleanField(default=False)
    categories = models.ManyToManyField(
        'Category',
        through='BookStackCategory',
        blank=True
    )
    position = models.IntegerField(default=0, db_index=True)

    objects = BookStackManager()

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
        max_position = self.max_position()

        if  to_position < 0 or to_position > max_position:
            raise IndexError

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

    def toggle_read(self):
        self.read = not self.read
        self.save()

    def save(self, *args, **kwargs):
        if not self.position:
            self.position = self.max_position() + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.book.title


class Category(models.Model):
    category = models.CharField(max_length=30, unique=True)

    class Meta(object):
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.category


class BookStackCategoryManager(models.Manager):
    def create_bookstack_category(self, bookstack, category):
        bookstack_category = self.create(bookstack=bookstack, category=category)
        bookstack_category.save()
        return bookstack_category


class BookStackCategory(models.Model):
    bookstack = models.ForeignKey(BookStack)
    category = models.ForeignKey(Category)

    objects = BookStackCategoryManager()

    class Meta:
        unique_together = (('category', 'bookstack'))


class Author(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
