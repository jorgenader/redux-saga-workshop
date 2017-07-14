from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import TemplateView


admin.autodiscover()

urlpatterns = [
    url(r'', include('accounts.urls')),
    url(r'^%s/%s/' % (settings.API_BASE, settings.API_VERSION), include('api.urls', namespace='api')),
    url(r'^tagauks/', include(admin.site.urls)),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if not settings.DEBUG:
    handler500 = 'redux_saga_workshop.views.server_error'
    handler404 = 'redux_saga_workshop.views.page_not_found'

if settings.DEBUG:
    try:
        import debug_toolbar
        urlpatterns += [
            url(r'^__debug__/', include(debug_toolbar.urls)),
        ]
    except ImportError:
        pass

# SPA catch all (React-Router takes over after this)
urlpatterns += [
    url(r'^(.*)$', TemplateView.as_view(template_name='landing.html'), name='home'),
]
