from django.contrib.auth.models import User, Group

from django.shortcuts import render, get_object_or_404

from bookstack.models import Author, Book, BookStack, Category, Publisher, Stack

from bookstack.serializers import StackSerializer, StackListSerializer, BookStackSerializer, BookSerializer, PublisherSerializer, AuthorSerializer, CategorySerializer, GroupSerializer, UserSerializer, AuthorDetailSerializer, PublisherDetailSerializer

from rest_framework import viewsets

from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects
    serializer_class = GroupSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class StackViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows book stacks to be viewed or edited.
    """
    queryset = Stack.objects.prefetch_related('bookstack_set__book__authors', 'bookstack_set__book__publishers', 'bookstack_set__categories')
    serializer_class = StackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def list(self, request):
        queryset = Stack.objects
        serializer = StackListSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Stack.objects.prefetch_related('bookstack_set__book__authors', 'bookstack_set__book__publishers', 'bookstack_set__categories')
        stack = get_object_or_404(queryset, pk=pk)
        serializer = StackSerializer(stack)
        return Response(serializer.data)


class BookViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows books to be viewed or edited.
    """
    queryset = Book.objects.prefetch_related('authors', 'publishers')
    serializer_class = BookSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def list(self, request):
        queryset = Book.objects.prefetch_related('authors', 'publishers')
        title = request.query_params.get('search', None)
        include = None
        # If the search query param is sent, then filter the
        # results based on the value sent, and only return the
        # `title` and `id` fields.
        if title is not None:
            queryset = queryset.filter(title__contains=title)
            include=['title', 'id']
        serializer = BookSerializer(queryset, include=include, many=True)
        return Response(serializer.data)

class BookStackViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows books within stacks to be viewed or edited.
    """
    queryset = BookStack.objects.order_by(
            'position').prefetch_related('categories', 'book__authors', 'book__publishers')
    serializer_class = BookStackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    @detail_route(methods=['patch'])
    def renumber(self, request, pk=None):
        try:
            position = int(request.data['position'])
        except ValueError:
            content = {'detail': 'Invalid position supplied'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        bookstack = self.get_object()
        max_position = bookstack.max_position()
        if position > max_position or position < 1:
            content = {'detail': 'Invalid position supplied'}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        bookstack.renumber(position)
        # Re-fetch object to get updated position
        bookstack = self.get_object()
        serializer = BookStackSerializer(bookstack)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """
    queryset = Category.objects
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class AuthorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows authors to be viewed or edited.
    """
    queryset = Author.objects.prefetch_related('book_set')
    serializer_class = AuthorSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def list(self, request):
        queryset = Author.objects
        serializer = AuthorSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Author.objects.prefetch_related('book_set', 'book_set__authors', 'book_set__publishers')
        author_detail = get_object_or_404(queryset, pk=pk)
        serializer = AuthorDetailSerializer(author_detail)
        return Response(serializer.data)

class PublisherViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows publishers to be viewed or edited.
    """
    queryset = Publisher.objects.prefetch_related('book_set')
    serializer_class = PublisherSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def list(self, request):
        queryset = Publisher.objects
        serializer = PublisherSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Publisher.objects.prefetch_related('book_set', 'book_set__authors', 'book_set__publishers')
        publisher_detail = get_object_or_404(queryset, pk=pk)
        serializer = PublisherDetailSerializer(publisher_detail)
        return Response(serializer.data)

def app_view(request):
    return render(request, 'bookstack/bookstack_react.html')
