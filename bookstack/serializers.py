from django.contrib.auth.models import User, Group

from rest_framework import serializers

from bookstack.models import Author, Book, BookStack, Category, Publisher, Stack


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

    authors = AuthorSerializer(many=True, read_only=False)
    publishers = PublisherSerializer(many=True, read_only=False)

    class Meta:
        model = Book
        fields = ('title', 'pages', 'isbn', 'img', 'authors', 'publishers', 'id')


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


class BookStackSerializer(serializers.ModelSerializer):

    book = BookSerializer()
    categories = serializers.SlugRelatedField(many=True, read_only=False, slug_field='category', queryset=Category.objects.all())

    class Meta:
        model = BookStack
        fields = ('read', 'position', 'book', 'categories', 'stack', 'id')


class StackListSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField()

    class Meta:
        model = Stack
        fields = ('name', 'private', 'user', 'creation_date', 'id')


class StackSerializer(serializers.ModelSerializer):

    user = serializers.StringRelatedField()
    books = BookStackSerializer(many=True, source='bookstack_set')

    class Meta:
        model = Stack
        fields = ('name', 'private', 'user', 'creation_date', 'books', 'id')
