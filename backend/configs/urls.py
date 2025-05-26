"""
URL configuration for configs project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views. home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls')
"""
from django.http import JsonResponse
from django.urls import include, path

from rest_framework.permissions import AllowAny

from drf_yasg import openapi
from drf_yasg.views import get_schema_view

schema_view = get_schema_view(
    openapi.Info(
        title="CRMProgrammingSchool API",
        default_version='v1',
        description="Management API for CRMProgrammingSchool",
        contact=openapi.Contact(email="grigoriyv1209@gmail.com"),
    ),
    public=True,
    permission_classes=[AllowAny, ],
)


def custom_page_not_found(request, exception):
    return JsonResponse({'error': str(exception)}, status=404)


def custom_permission_denied(request, exception):
    return JsonResponse({'error': 'Permission denied'}, status=403)


def custom_server_error(request):
    return JsonResponse({'error': 'Server error'}, status=500)


handler404 = custom_page_not_found
handler403 = custom_permission_denied
handler500 = custom_server_error


urlpatterns = [
    path('api/all_users/users', include('apps.all_users_info.users.urls')),
    path('api/all_users/auth', include('apps.all_users_info.auth.urls')),
    path('api/all_users/admins', include('apps.all_users_info.admins.urls')),
    path('api/application', include('apps.applications.urls')),
    path('api/groups', include('apps.groups.urls')),
    path('api/analytics', include('apps.analytics.urls')),
    path('api/doc', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

]
