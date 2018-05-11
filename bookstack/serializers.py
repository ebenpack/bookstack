from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from bookstack.models import (Author, Book, BookStack, Category, Publisher, Stack, BookStackCategory)

class ErrorSerialiser(serializers.Serializer):
    code = serializers.IntegerField(label='Error response code')
    error = serializers.CharField(label='Error message')

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

    def create(self, validated_data):
        authors = self.initial_data.get('authors', [])
        publishers = self.initial_data.get('publishers', [])
        book = Book.objects.create(**validated_data)

        for author in authors:
            a, created = Author.objects.get_or_create(name=author)
            book.authors.add(a)

        for publisher in publishers:
            p, created = Publisher.objects.get_or_create(name=publisher)
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
    categories = BookStackCategorySerializer(many=True, source='bookstackcategory_set', read_only=True)
    stack = serializers.PrimaryKeyRelatedField(read_only=True)
    book_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Book.objects.all())
    stack_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Stack.objects.all())

    class Meta:
        model = BookStack
        fields = ('read', 'position', 'book', 'categories', 'stack', 'id', 'book_id', 'stack_id')

    def create(self, validated_data):
        categories = self.initial_data.get('categories', [])
        book_id = validated_data.pop('book_id')
        stack_id = validated_data.pop('stack_id')
        bookstack = BookStack.objects.create(
            book=book_id,
            stack=stack_id,
            **validated_data
        )
        for category in categories:
            category, _ = Category.objects.get_or_create(category=category)
            BookStackCategory.objects.get_or_create(bookstack=bookstack, category=category)
        return bookstack

    def update(self, instance, validated_data):
        categories = self.initial_data.get('categories', [])
        instance.read = validated_data.get('read', instance.read)
        instance.position = validated_data.get('position', instance.position)

        if categories:
            instance.categories.clear()
            for category in categories:
                category, _ = Category.objects.get_or_create(category=category)
                BookStackCategory.objects.get_or_create(bookstack=instance, category=category)

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
