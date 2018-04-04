from django.db import models
from django.contrib.auth.models import User
from django.db.models import F, Case, When, Value, Q, ExpressionWrapper


class Stack(models.Model):
    name = models.CharField(max_length=200)
    private = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.PROTECT)
    creation_date = models.DateTimeField(
        auto_now_add=True
    )
    books = models.ManyToManyField('Book', through='BookStack')

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=200)
    pages = models.IntegerField()
    isbn = models.CharField(max_length=15, unique=True)
    img = models.URLField(max_length=500, blank=True)
    authors = models.ManyToManyField('Author')
    publishers = models.ManyToManyField('Publisher')

    def __str__(self):
        return self.title


class BookStack(models.Model):
    class Meta:
        ordering = ['position']

    stack = models.ForeignKey(Stack, on_delete=models.PROTECT)
    book = models.ForeignKey(Book, on_delete=models.PROTECT)
    read = models.BooleanField(default=False)
    categories = models.ManyToManyField(
        'Category',
        through='BookStackCategory',
        blank=True
    )
    position = models.IntegerField(default=0, db_index=True)

    def max_position(self):
        return self.stack.bookstack_set.count()

    def renumber(self, to_position):
        """Re-number book positions in the stack. After this method is executed,
        all books in a stack will be numbered sequentially from 1-n, where n is
        the number of books in the stack, and each book will have a unique position.
        """
        from_position = self.position
        bookstack_set = self.stack.bookstack_set
        max_position = self.max_position()

        if to_position <= 0 or to_position > max_position:
            raise IndexError

        if from_position == to_position:
            return

        start = min(from_position, to_position)
        end = max(from_position, to_position)
        # Shift all items between `to` and `from` either to the left or right,
        # leaving off a space on one end or the other for the item being moved.
        if from_position < to_position:
            start = start + 1
            direction = -1
        else:
            end = end - 1
            direction = 1

        bookstack_set.update(
            position=Case(
                When(
                    (Q(position__gte=start) & Q(position__lte=end)),
                    then=ExpressionWrapper(F('position') + direction, output_field=models.IntegerField())
                ),
                When(
                    position=from_position,
                    then=Value(to_position)
                ),
                default=ExpressionWrapper(F('position'), output_field=models.IntegerField()),
                output_field=models.IntegerField()
            )
        )
        self.refresh_from_db()

    def toggle_read(self):
        BookStack.objects.filter(id=self.id).update(
            read=Case(
                When(read=True, then=Value(False)),
                default=Value(True),
                output_field=models.BooleanField()
            )
        )
        self.refresh_from_db()

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


class BookStackCategory(models.Model):
    bookstack = models.ForeignKey(BookStack, on_delete=models.PROTECT)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)

    class Meta:
        unique_together = ('category', 'bookstack')


class Author(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
