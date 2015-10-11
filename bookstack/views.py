from django.contrib.auth.models import User, Group

from django.shortcuts import render, get_object_or_404

from bookstack.models import Author, Book, BookStack, Category, Publisher, Stack

from bookstack.serializers import StackSerializer, StackListSerializer, BookStackSerializer, BookSerializer, PublisherSerializer, AuthorSerializer, CategorySerializer, GroupSerializer, UserSerializer

from rest_framework import viewsets

from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
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
        queryset = Stack.objects.all()
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
    queryset = Book.objects.prefetch_related('authors', 'publishers').all()
    serializer_class = BookSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class BookStackViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows books within stacks to be viewed or edited.
    """
    queryset = BookStack.objects.order_by(
            'position').prefetch_related('categories', 'book__authors', 'book__publishers').all()
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
        serializer = BookStackSerializer(bookstack)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class AuthorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows authors to be viewed or edited.
    """
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class PublisherViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows publishers to be viewed or edited.
    """
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


def app_view(request):
    return render(request, 'bookstack/bookstack_react.html')
