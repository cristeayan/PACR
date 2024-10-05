from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import SignupView, UserViewSet, PostViewSet, CommentViewSet, LikeViewSet

# Router for viewsets
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'posts', PostViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'likes', LikeViewSet)


urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),  # Signup with auto-login
    path('signin/', TokenObtainPairView.as_view(), name='signin'),  # Signin using JWT token generation
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Optional: Token refresh endpoint
    path('', include(router.urls)),  # Include all the registered viewsets
]
