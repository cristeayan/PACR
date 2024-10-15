from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.decorators import action
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from .models import User, Post, Comment, Like, Discipline
from .serializers import UserSerializer, PostSerializer, CommentSerializer, LikeSerializer

# Signup View
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Automatically generate JWT token for the new user
            refresh = RefreshToken.for_user(user)

            # Include user data in the response
            user_data = UserSerializer(user).data

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data  # Return user details
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Signin View (Login)
class SigninView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
            }
        ),
        responses={
            200: openapi.Response('Login successful', UserSerializer),
            401: 'Unauthorized',
        }
    )
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            # Generate JWT tokens
            refresh = RefreshToken.for_user(user)
            
            # Serialize the user data
            user_data = UserSerializer(user).data

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data  # Include user details in response
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# User ViewSet
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def follow(self, request, pk=None):
        user_to_follow = self.get_object()
        if user_to_follow == request.user:
            return Response({"detail": "You cannot follow yourself."}, status=status.HTTP_400_BAD_REQUEST)
        
        request.user.followers.add(user_to_follow)
        return Response({"detail": f"You are now following {user_to_follow.email}"})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unfollow(self, request, pk=None):
        user_to_unfollow = self.get_object()
        request.user.followers.remove(user_to_unfollow)
        return Response({"detail": f"You have unfollowed {user_to_unfollow.email}"})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def follow_discipline(self, request, pk=None):
        discipline_to_follow = Discipline.objects.get(pk=pk)
        request.user.disciplines_followed.add(discipline_to_follow)
        return Response({"detail": f"You are now following {discipline_to_follow.name}"})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unfollow_discipline(self, request, pk=None):
        discipline_to_unfollow = Discipline.objects.get(pk=pk)
        request.user.disciplines_followed.remove(discipline_to_unfollow)
        return Response({"detail": f"You have unfollowed {discipline_to_unfollow.name}"})

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


# Post ViewSet
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def followed_posts(self, request):
        # Get posts from users and disciplines the user follows
        following_users = request.user.following.all()
        posts_from_users = Post.objects.filter(author__in=following_users)

        followed_disciplines = request.user.disciplines_followed.all()
        posts_from_disciplines = Post.objects.filter(discipline__in=followed_disciplines)

        combined_posts = posts_from_users | posts_from_disciplines
        combined_posts = combined_posts.order_by('-created_at')

        serializer = PostSerializer(combined_posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_reposts(self, request):
        reposts = Post.objects.filter(author=request.user, repost_of__isnull=False)
        serializer = self.get_serializer(reposts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def repost(self, request, pk=None):
        original_post = self.get_object()
        user_content = request.data.get('content')

        repost_data = {
            'content': user_content,
            'repost_of': original_post.id,
            'author': request.user
        }

        serializer = self.get_serializer(data=repost_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Comment ViewSet
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()

        if comment.author != request.user:
            return Response({"detail": "You can only delete your own comments."}, status=status.HTTP_403_FORBIDDEN)

        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Like ViewSet
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        post_id = request.data.get('post')
        user = request.user

        if Like.objects.filter(post_id=post_id, user=user).exists():
            return Response({"detail": "You already liked this post."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={'post': post_id})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        like = self.get_object()
        if like.user != request.user:
            return Response({"detail": "You can only unlike your own like."}, status=status.HTTP_403_FORBIDDEN)

        like.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
