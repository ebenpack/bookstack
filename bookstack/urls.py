from django.urls import include, path, re_path
from rest_framework import routers
from rest_framework.authtoken import views as authtoken_views

from bookstack.views import (
    app_view,
    schema_view,
    AuthorViewSet,
    BookStackViewSet,
    BookStackCategoryViewSet,
    BookViewSet,
    CategoryViewSet,
    GroupViewSet,
    PublisherViewSet,
    StackViewSet,
    UserViewSet
)

app_name = 'bookstack'

router = routers.DefaultRouter()
router.register(r'stack', StackViewSet, 'stack')
router.register(r'bookstack', BookStackViewSet, 'bookstack')
router.register(r'bookstackcategory', BookStackCategoryViewSet, 'bookstackcategory')
router.register(r'book', BookViewSet, 'book')
router.register(r'author', AuthorViewSet, 'author')
router.register(r'publisher', PublisherViewSet, 'publisher')
router.register(r'category', CategoryViewSet, 'category')
router.register(r'user', UserViewSet, 'user')
router.register(r'group', GroupViewSet, 'group')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api-token-auth/', authtoken_views.obtain_auth_token),
    re_path(r'docs(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=None), name='schema-json'),
    path('docs/', schema_view.with_ui('redoc', cache_timeout=None), name='schema-redoc'),
    path('app/', app_view),
    path('app/<path:path>', app_view),
]
