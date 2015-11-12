from django.contrib.auth.models import User, Group
from django.shortcuts import render, get_object_or_404

from bookstack import models, serializers

from rest_framework import viewsets, status, filters
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects
    serializer_class = serializers.UserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects
    serializer_class = serializers.GroupSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class StackViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows book stacks to be viewed or edited.
    """
    queryset = models.Stack.objects.prefetch_related(
        'bookstack_set__book__authors',
        'bookstack_set__book__publishers',
        'bookstack_set__categories'
    )
    serializer_class = serializers.StackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def list(self, request):
        queryset = models.Stack.objects
        serializer = serializers.StackListSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = models.Stack.objects.prefetch_related(
            'bookstack_set__book__authors',
            'bookstack_set__book__publishers',
            'bookstack_set__categories'
        )
        stack = get_object_or_404(queryset, pk=pk)
        serializer = serializers.StackSerializer(stack)
        return Response(serializer.data)


class BookViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows books to be viewed or edited.
    """
    queryset = models.Book.objects.prefetch_related(
        'authors',
        'publishers'
    )
    serializer_class = serializers.BookSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    filter_backends = (filters.SearchFilter, )
    search_fields = ('title', )


class BookStackViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows books within stacks to be viewed or edited.
    """
    queryset = models.BookStack.objects.order_by(
        'position'
    ).prefetch_related(
        'categories',
        'book__authors',
        'book__publishers'
    )
    serializer_class = serializers.BookStackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def destroy(self, request, pk=None):
        # Move item to last position in stack
        # before deleting, in order to maintain
        # stack order.
        bookstack = self.get_object()
        position = bookstack.max_position()
        bookstack.renumber(position)
        bookstack.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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
        serializer = serializers.BookStackSerializer(bookstack)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """
    queryset = models.Category.objects
    serializer_class = serializers.CategorySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )
    filter_backends = (filters.SearchFilter, )
    search_fields = ('category', )


class BookStackCategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows categories to be viewed or edited.
    """
    queryset = models.BookStackCategory.objects
    serializer_class = serializers.BookStackCategorySerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )


class AuthorViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows authors to be viewed or edited.
    """
    queryset = models.Author.objects.prefetch_related('book_set')
    serializer_class = serializers.AuthorSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    filter_backends = (filters.SearchFilter, )
    search_fields = ('name', )

    def list(self, request):
        queryset = models.Author.objects
        serializer = serializers.AuthorSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = models.Author.objects.prefetch_related(
            'book_set',
            'book_set__authors',
            'book_set__publishers'
        )
        author_detail = get_object_or_404(queryset, pk=pk)
        serializer = serializers.AuthorDetailSerializer(author_detail)
        return Response(serializer.data)


class PublisherViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows publishers to be viewed or edited.
    """
    queryset = models.Publisher.objects.prefetch_related('book_set')
    serializer_class = serializers.PublisherSerializer
    permission_classes = (IsAuthenticatedOrReadOnly, )

    filter_backends = (filters.SearchFilter, )
    search_fields = ('name', )

    def list(self, request):
        queryset = Publisher.objects
        serializer = serializers.PublisherSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = models.Publisher.objects.prefetch_related(
            'book_set',
            'book_set__authors',
            'book_set__publishers'
        )
        publisher_detail = get_object_or_404(queryset, pk=pk)
        serializer = serializers.PublisherDetailSerializer(publisher_detail)
        return Response(serializer.data)

def app_view(request):
    return render(request, 'bookstack/bookstack_react.html')
