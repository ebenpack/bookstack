from django.conf import settings
from django.conf.urls import include, url

from django.contrib import admin

admin.autodiscover()

app_name = 'booklist'

urlpatterns = [
    url(r'^', include('bookstack.urls')),
    url(r'^admin/', admin.site.urls),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ]
