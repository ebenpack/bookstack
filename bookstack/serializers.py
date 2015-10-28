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

    def __init__(self, *args, **kwargs):
        # If instantiated with `include` kwarg,
        # then limit fields returned to just those
        # specified
        include = kwargs.pop('include', None)
        super(BookSerializer, self).__init__(*args, **kwargs)
        if include:
            included = set(include)
            existing = set(self.fields.keys())

            for field in existing:
                if field not in included:
                    self.fields.pop(field)


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

    book = BookSerializer(read_only=True)
    bookId = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Book.objects.all())
    categories = serializers.SlugRelatedField(
        many=True,
        read_only=False,
        slug_field='category',
        queryset=Category.objects.all()
    )

    class Meta:
        model = BookStack
        fields = ('read', 'position', 'book', 'bookId', 'categories', 'stack', 'id')

    def create(self, validated_data):
        categories = validated_data.pop('categories')
        bookstack = BookStack.objects.create(
            book=validated_data['bookId'],
            stack=validated_data['stack']
        )
        for category in categories:
            Category.objects.get_or_create(bookstack=bookstack, **category)
        return bookstack


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
