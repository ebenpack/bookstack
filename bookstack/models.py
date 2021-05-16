from django.contrib.auth.models import User
from django.db import models, transaction
from django.db.models import (
    F,
    Case,
    When,
    Value,
    Q,
    Max,
    Count,
    Subquery,
    OuterRef,
    UniqueConstraint,
    Deferrable,
)
from django.db.models.query import QuerySet


class Stack(models.Model):
    name = models.CharField(max_length=200)
    private = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)
    books = models.ManyToManyField("Book", through="BookStack")

    def __str__(self) -> str:
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=200)
    pages = models.IntegerField()
    isbn = models.CharField(max_length=15, unique=True)
    img = models.URLField(max_length=500, blank=True)
    authors = models.ManyToManyField("Author")
    publishers = models.ManyToManyField("Publisher")

    def __str__(self) -> str:
        return self.title


class BookStack(models.Model):
    class Meta:
        ordering = ("position",)
        constraints = (
            UniqueConstraint(
                name="bookstack_position",
                fields=("position", "stack"),
                deferrable=Deferrable.DEFERRED,
            ),
        )

    stack = models.ForeignKey(Stack, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    read = models.BooleanField(default=False)
    categories = models.ManyToManyField(
        "Category", through="BookStackCategory", blank=True
    )
    position = models.IntegerField(default=0, db_index=True)

    def max_position(self) -> int:
        return self.stack.bookstack_set.count()

    def renumber(self, to_position: int) -> None:
        """Re-number book positions in the stack. After this method is executed,
        all books in a stack will be numbered sequentially from 1-n, where n is
        the number of books in the stack, and each book will have a unique position.
        """
        bookstack_set = self.stack.bookstack_set.select_for_update()

        from_position = self.position

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

        move_in_bounds = Q(to_position__gt=0) & Q(
            to_position__lte=Subquery(
                bookstack_set.order_by("-position").values("position")[:1]
            )
        )

        bookstack_set.annotate(
            new_position=F("position") + direction, to_position=Value(to_position)
        ).update(
            position=Case(
                When(~move_in_bounds, then=F("position")),
                When(
                    (Q(position__gte=start) & Q(position__lte=end)),
                    then=F("new_position"),
                ),
                When(Q(position=from_position), then=to_position),
                default=F("position"),
                output_field=models.IntegerField(),
            )
        )

    def toggle_read(self) -> QuerySet:
        BookStack.objects.filter(id=self.id).update(
            read=Case(
                When(read=True, then=Value(False)),
                default=Value(True),
                output_field=models.BooleanField(),
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
    bookstack = models.ForeignKey(BookStack, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("category", "bookstack")


class Author(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
