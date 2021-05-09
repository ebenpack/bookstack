from django.conf import settings
from django.urls import include, path

from django.contrib import admin

admin.autodiscover()

app_name = 'booklist'

urlpatterns = [
    path('', include('bookstack.urls')),
    path('admin/', admin.site.urls),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
