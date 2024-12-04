from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import authenticate
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User, Post, Comment, Like, Media, Journal ,School, Company, Education, JobExperience, JobExperienceMedia
from .serializers import UserSerializer, PostSerializer, CommentSerializer, LikeSerializer, JournalSerializer ,SchoolSerializer,CompanySerializer,EducationSerializer,JobExperienceSerializer,JobExperienceMediaSerializer

# Signup View
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user, context={'request': request}).data

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Signin View (Login)
class SigninView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['email', 'password'],
            properties={
                'email': openapi.Schema(type=openapi.TYPE_STRING, description='User email'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='User password'),
            }
        ),
        responses={200: openapi.Response('Login successful', UserSerializer), 401: 'Unauthorized'}
    )
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user, context={'request': request}).data

            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# User ViewSet
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def follow(self, request, pk=None):
        user_to_follow = self.get_object()
        if user_to_follow == request.user:
            return Response({"detail": "You cannot follow yourself."}, status=status.HTTP_400_BAD_REQUEST)

        request.user.followers.add(user_to_follow)
        return Response({"detail": f"You are now following {user_to_follow.email}"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unfollow(self, request, pk=None):
        user_to_unfollow = self.get_object()
        request.user.followers.remove(user_to_unfollow)
        return Response({"detail": f"You have unfollowed {user_to_unfollow.email}"}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def add_friend(self, request, pk=None):
        """Add a user as a friend."""
        user_to_add = self.get_object()
        if user_to_add == request.user:
            return Response({"detail": "You cannot add yourself as a friend."}, status=status.HTTP_400_BAD_REQUEST)

        if user_to_add in request.user.friends.all():
            return Response({"detail": "This user is already your friend."}, status=status.HTTP_400_BAD_REQUEST)

        request.user.friends.add(user_to_add)
        return Response({"detail": f"{user_to_add.email} has been added as a friend."}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def remove_friend(self, request, pk=None):
        """Remove a user from friends."""
        user_to_remove = self.get_object()

        if user_to_remove not in request.user.friends.all():
            return Response({"detail": "This user is not your friend."}, status=status.HTTP_400_BAD_REQUEST)

        request.user.friends.remove(user_to_remove)
        return Response({"detail": f"{user_to_remove.email} has been removed from your friends."}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

# Journal ViewSet with owner handling
class JournalViewSet(viewsets.ModelViewSet):
    queryset = Journal.objects.all().order_by('-date_of_publication')
    serializer_class = JournalSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)  # Set the owner of the journal

# Post ViewSet with media handling and journal linking
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_at')   
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_create(self, serializer):
        journal_data = self.request.data.get('journal', None)
        if journal_data:
            journal_serializer = JournalSerializer(data=journal_data)
            if journal_serializer.is_valid():
                journal = journal_serializer.save(owner=self.request.user)  # Set the owner when creating the journal
                serializer.save(author=self.request.user, journal=journal)
            else:
                return Response(journal_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            post = serializer.save(author=self.request.user)

        # Handle media uploads
        media_files = self.request.FILES.getlist('media')
        for media_file in media_files:
            media_type = 'image' if media_file.content_type.startswith('image') else 'video'
            Media.objects.create(post=post, file=media_file, media_type=media_type)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def followed_posts(self, request):
        following_users = request.user.following.all()
        posts_from_users = Post.objects.filter(author__in=following_users)
        followed_disciplines = request.user.disciplines_followed.all()
        posts_from_disciplines = Post.objects.filter(disciplines__in=followed_disciplines)

        combined_posts = (posts_from_users | posts_from_disciplines).distinct().order_by('-created_at')

        serializer = PostSerializer(combined_posts, many=True, context={'request': self.request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_posts(self, request):
        """Retrieve only posts created by the authenticated user."""
        user_posts = Post.objects.filter(author=request.user).order_by('-created_at')
        serializer = self.get_serializer(user_posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# Comment ViewSet
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        return {'request': self.request}

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

    def get_serializer_context(self):
        return {'request': self.request}

    def create(self, request, *args, **kwargs):
        post_id = request.data.get('post')
        user = request.user

        if Like.objects.filter(post_id=post_id, user=user).exists():
            return Response({"detail": "You already liked this post."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data={'post': post_id})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unlike(self, request, pk=None):
        """Remove a like from a post."""
        post = Post.objects.get(pk=pk)
        like = Like.objects.filter(post=post, user=request.user).first()

        if not like:
            return Response({"detail": "You have not liked this post."}, status=status.HTTP_400_BAD_REQUEST)

        like.delete()
        return Response({"detail": "You have unliked this post."}, status=status.HTTP_200_OK)



class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
    permission_classes = [IsAuthenticated]


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAuthenticated]


class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Education.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JobExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = JobExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobExperience.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JobExperienceMediaViewSet(viewsets.ModelViewSet):
    serializer_class = JobExperienceMediaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return JobExperienceMedia.objects.filter(job_experience__user=self.request.user)

    def perform_create(self, serializer):
        job_experience = JobExperience.objects.get(id=self.request.data['job_experience'])
        serializer.save(job_experience=job_experience)
