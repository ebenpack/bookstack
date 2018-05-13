from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken import views as authtoken_views

from .views import schema_view
from bookstack import views

app_name = 'bookstack'

router = routers.DefaultRouter()
router.register(r'stack', views.StackViewSet, 'stack')
router.register(r'bookstack', views.BookStackViewSet, 'bookstack')
router.register(r'bookstackcategory', views.BookStackCategoryViewSet, 'bookstackcategory')
router.register(r'book', views.BookViewSet, 'book')
router.register(r'author', views.AuthorViewSet, 'author')
router.register(r'publisher', views.PublisherViewSet, 'publisher')
router.register(r'category', views.CategoryViewSet, 'category')
router.register(r'user', views.UserViewSet, 'user')
router.register(r'group', views.GroupViewSet, 'group')

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', authtoken_views.obtain_auth_token),
    url(r'^docs(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=None), name='schema-json'),
    url(r'^docs/$', schema_view.with_ui('redoc', cache_timeout=None), name='schema-redoc'),
    url(r'app/', views.app_view),
]
