from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken import views as authtoken_views
from rest_framework_swagger.views import get_swagger_view

from bookstack import views

app_name = 'bookstack'

schema_view = get_swagger_view(title="Bookstack API")

router = routers.DefaultRouter()
router.register(r'stack', views.StackViewSet)
router.register(r'bookset', views.BookStackViewSet)
router.register(r'booksetcategory', views.BookStackCategoryViewSet)
router.register(r'book', views.BookViewSet)
router.register(r'author', views.AuthorViewSet)
router.register(r'publisher', views.PublisherViewSet)
router.register(r'category', views.CategoryViewSet)
router.register(r'user', views.UserViewSet)
router.register(r'group', views.GroupViewSet)


urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', authtoken_views.obtain_auth_token),
    url(r'^docs/', schema_view),
    url(r'app/', views.app_view),
]
