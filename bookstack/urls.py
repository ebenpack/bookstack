from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken import views as authtoken_views

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
    url(r'^api/', include(router.urls), name='api'),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'), name='rest_framework'),
    url(r'^api-token-auth/', authtoken_views.obtain_auth_token, name='api-auth'),
    url(r'app/', views.app_view, name='app'),
]

#####################
# Django REST Swagger
#####################

from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title="Bookstack API")

urlpatterns += [
    url(r'^rest_framework_swagger/', schema_view, name='rest_framework_swagger'),
]


##########################################
# drf-yasg - Yet Another Swagger Generator
##########################################

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

drf_yasg_schema_view = get_schema_view(
   openapi.Info(
      title="Snippets API",
      default_version='v1',
      description="Test description",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   validators=['flex', 'ssv'],
   public=True,
   permission_classes=(),
)

urlpatterns += [
    url(r'^drf_yasg_swagger(?P<format>\.json|\.yaml)$', drf_yasg_schema_view.without_ui(cache_timeout=None), name='schema-json'),
    url(r'^drf_yasg_swagger/$', drf_yasg_schema_view.with_ui('swagger', cache_timeout=None), name='schema-swagger-ui'),
    url(r'^drf_yasg_redoc/$', drf_yasg_schema_view.with_ui('redoc', cache_timeout=None), name='schema-redoc'),
]

##########
# DRF Docs
##########

urlpatterns += [
    # Not django 2.0 compatible?
    # url(r'^drf-docs/', include('rest_framework_docs.urls')),
]

##############
# DRF Autodocs
##############

urlpatterns += [
    url(r'^', include('drf_autodocs.urls'), name='drf_autodocs'),
]
