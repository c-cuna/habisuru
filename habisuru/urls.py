"""
URL configuration for habisuru project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.urls import path, re_path, include
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter

from . import views, settings
from habits.views import ToDoViewSet

router = DefaultRouter()

router.register(r'todo', ToDoViewSet, basename='todo')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index),
    path('api/v1/', include(router.urls)),
    path('api/v1/accounts/login/', TokenObtainPairView.as_view(), name='get_auth_token'),
    path('api/v1/accounts/refresh/', TokenRefreshView.as_view(), name='refresh_auth_token'),
    path('api/v1/accounts/verify/', TokenVerifyView.as_view(), name='verify_auth_token'),
    
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("docs/", SpectacularSwaggerView.as_view(template_name="swagger-ui.html", url_name="schema"), name="swagger-ui",),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
