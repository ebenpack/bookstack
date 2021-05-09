from django.contrib.auth.models import User, Group
from django.shortcuts import render, get_object_or_404
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from bookstack import serializers
from bookstack.models import (
    Author,
    Book,
    BookStack,
    BookStackCategory,
    Category,
    Publisher,
    Stack,
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects
    serializer_class = serializers.UserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects
    serializer_class = serializers.GroupSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class StackViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows book stacks to be viewed or edited.
    """

    queryset = Stack.objects.prefetch_related(
        "bookstack_set__book__authors",
        "bookstack_set__book__publishers",
        "bookstack_set__bookstackcategory_set__category"
        # 'bookstack_set__user'
    ).select_related("user")
    serializer_class = serializers.StackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def list(self, request, *args, **kwargs):
        queryset = Stack.objects.select_related("user")
        serializer = serializers.StackListSerializer(queryset, many=True)
        return Response(serializer.data)


class BookViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows books to be viewed or edited.
    """

    queryset = Book.objects.prefetch_related("authors", "publishers")
    serializer_class = serializers.BookSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ("title",)


class BookStackViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows books within stacks to be viewed or edited.
    """

    queryset = (
        BookStack.objects.prefetch_related(
            "bookstackcategory_set",
            "bookstackcategory_set__category",
            "book__authors",
            "book__publishers",
            "categories",
        )
        .select_related("book", "stack")
        .order_by("position")
    )
    serializer_class = serializers.BookStackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def list(self, request, *args, **kwargs):
        serializer = serializers.BookStackSerializer(self.queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        bookstack_detail = get_object_or_404(self.queryset, pk=pk)
        serializer = serializers.BookStackSerializer(bookstack_detail)
        return Response(serializer.data)

    def destroy(self, request, pk=None, *args, **kwargs):
        # Move item to last position in stack
        # before deleting, in order to maintain
        # stack order.
        bookstack = self.get_object()
        position = bookstack.max_position()
        bookstack.renumber(position)
        bookstack.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=True, methods=["patch"])
    def renumber(self, request, pk=None):
        try:
            position = int(request.data["position"])
            bookstack = self.get_object()
            bookstack.renumber(position)
        except (ValueError, IndexError):
            content = {"detail": "Invalid position supplied"}
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        bookstack = self.get_object()
        serializer = serializers.BookStackSerializer(bookstack, partial=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """

    queryset = Category.objects
    serializer_class = serializers.CategorySerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ("category",)


class BookStackCategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """

    queryset = BookStackCategory.objects.select_related(
        "bookstack",
        "category",
    )
    serializer_class = serializers.BookStackCategorySerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class AuthorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows authors to be viewed or edited.
    """

    queryset = Author.objects.prefetch_related("book_set")
    serializer_class = serializers.AuthorSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    filter_backends = (filters.SearchFilter,)
    search_fields = ("name",)

    def list(self, request, *args, **kwargs):
        queryset = Author.objects
        serializer = serializers.AuthorSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = self.queryset.prefetch_related(
            "book_set__authors", "book_set__publishers"
        )
        author_detail = get_object_or_404(queryset, pk=pk)
        serializer = serializers.AuthorDetailSerializer(author_detail)
        return Response(serializer.data)


class PublisherViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows publishers to be viewed or edited.
    """

    queryset = Publisher.objects.prefetch_related("book_set")
    serializer_class = serializers.PublisherSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    filter_backends = (filters.SearchFilter,)
    search_fields = ("name",)

    def list(self, request, *args, **kwargs):
        queryset = Publisher.objects
        serializer = serializers.PublisherSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = self.queryset.prefetch_related(
            "book_set__authors", "book_set__publishers"
        )
        publisher_detail = get_object_or_404(queryset, pk=pk)
        serializer = serializers.PublisherDetailSerializer(publisher_detail)
        return Response(serializer.data)


schema_info = openapi.Info(
    title="Bookstack API",
    default_version="v1",
    contact=openapi.Contact(email="contact@snippets.local"),
    license=openapi.License(name="MIT License"),
)

schema_view = get_schema_view(
    schema_info, validators=["flex", "ssv"], public=True, permission_classes=()
)


def app_view(request, *args, **kwargs):
    return render(request, "index.html")
