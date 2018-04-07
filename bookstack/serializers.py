from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from bookstack.models import (Author, Book, BookStack, Category, Publisher, Stack, BookStackCategory)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'groups', 'id')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category', 'id')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('name', 'id')


class PublisherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ('name', 'id')


class BookSerializer(serializers.ModelSerializer):
    authors = AuthorSerializer(many=True, read_only=True)
    publishers = PublisherSerializer(many=True, read_only=True)
    depth = 3

    class Meta:
        model = Book
        fields = ('title', 'pages', 'isbn', 'img', 'authors', 'publishers', 'id')

    def __init__(self, *args, **kwargs):
        # If instantiated with `include` kwarg,
        # then limit fields returned to just those
        # specified
        include = kwargs.pop('include', None)
        super(BookSerializer, self).__init__(*args, **kwargs)
        if include:
            included = set(include)
            existing = set(self.fields.keys())

            for field in existing - included:
                self.fields.pop(field)

    def create(self, validated_data):
        authors = self.initial_data.pop('authors')
        publishers = self.initial_data.pop('publishers')
        book = Book.objects.create(**validated_data)

        for author in authors:
            a, created = Author.objects.get_or_create(name=author['name'])
            book.authors.add(a)

        for publisher in publishers:
            p, created = Publisher.objects.get_or_create(name=publisher['name'])
            book.publishers.add(p)

        return book


class PublisherDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publisher
        fields = ('name', 'books', 'id')

    books = BookSerializer(many=True, source='book_set')


class AuthorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ('name', 'books', 'id')

    books = BookSerializer(many=True, source='book_set')


class BookStackCategorySerializer(serializers.ModelSerializer):
    bookstack = serializers.PrimaryKeyRelatedField(read_only=False, queryset=BookStack.objects.all())
    detail = CategorySerializer(read_only=True, source='category')
    category = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Category.objects.all()
    )

    class Meta:
        model = BookStackCategory
        fields = ('bookstack', 'category', 'detail', 'id')


class BookStackSerializer(serializers.ModelSerializer):
    book = BookSerializer(read_only=True)
    categories = BookStackCategorySerializer(many=True, source='bookstackcategory_set')
    stack = serializers.PrimaryKeyRelatedField(read_only=True)
    bookId = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Book.objects.all())
    stackId = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Stack.objects.all())

    class Meta:
        model = BookStack
        fields = ('read', 'position', 'book', 'categories', 'stack', 'id', 'bookId', 'stackId')

    # TODO: FIX ME
    def create(self, validated_data):
        categories = validated_data.pop('bookstackcategory_set')
        bookstack = BookStack.objects.create(
            book=validated_data['bookId'],
            stack=validated_data['stackId']
        )
        for category in categories:
            BookStackCategory.objects.get_or_create(bookstack=bookstack, **category)
        return bookstack

    def update(self, instance, validated_data):
        instance.read = validated_data.get('read', instance.read)
        instance.position = validated_data.get('position', instance.position)

        instance.save()
        return instance


class StackListSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Stack
        fields = ('name', 'private', 'user', 'creation_date', 'id')


class StackSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(default=CurrentUserDefault())
    books = BookStackSerializer(many=True, source='bookstack_set', read_only=True)

    class Meta:
        model = Stack
        fields = ('name', 'private', 'user', 'creation_date', 'books', 'id')
