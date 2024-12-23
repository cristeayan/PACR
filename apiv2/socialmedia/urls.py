from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    SignupView,
    SigninView,
    UserViewSet,
    PostViewSet,
    CommentViewSet,
    LikeViewSet,
    JournalViewSet,
    SchoolViewSet,
    CompanyViewSet,
    EducationViewSet,
    JobExperienceViewSet,
)
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger Schema Configuration
schema_view = get_schema_view(
    openapi.Info(
        title="Your API",
        default_version='v1',
        description="API documentation",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Router for Viewsets
router = DefaultRouter()
router.register(r'users', UserViewSet)  # User-related endpoints
router.register(r'posts', PostViewSet)  # Post-related endpoints
router.register(r'comments', CommentViewSet)  # Comment-related endpoints
router.register(r'likes', LikeViewSet)  # Like-related endpoints
router.register(r'journals', JournalViewSet)  # Journal-related endpoints
router.register(r'schools', SchoolViewSet)  # School-related endpoints
router.register(r'companies', CompanyViewSet)  # Company-related endpoints
router.register(r'education', EducationViewSet)
router.register(r'job-experiences', JobExperienceViewSet)  # Job experience endpoints

# URL Patterns
urlpatterns = [
    # Authentication Endpoints
    path('signup/', SignupView.as_view(), name='signup'),  # Signup with auto-login
    path('signin/', SigninView.as_view(), name='signin'),  # Signin using JWT token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Token refresh endpoint

    # Viewset Routes
    path('', include(router.urls)),

    # Documentation Endpoints
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
