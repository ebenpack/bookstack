from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = [
    url(r'^', include('bookstack.urls', namespace='bookstack')),
    url(r'^admin/', include(admin.site.urls)),
]
