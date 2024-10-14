from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.decorators import action
from .models import User, Post, Comment, Like, Discipline
from .serializers import UserSerializer, PostSerializer, CommentSerializer, LikeSerializer

# Signup View
class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Automatically log the user in and create JWT token
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        # Get all users the current user follows
        following_users = request.user.following.all()

        # Get posts made by those users
        posts_from_users = Post.objects.filter(author__in=following_users)

        # Get disciplines the user follows
        followed_disciplines = request.user.disciplines_followed.all()

        # Get posts from those disciplines
        posts_from_disciplines = Post.objects.filter(discipline__in=followed_disciplines)

        # Combine posts and order them by creation date
        combined_posts = posts_from_users | posts_from_disciplines
        combined_posts = combined_posts.order_by('-created_at')

        # Serialize and return the combined posts
        serializer = PostSerializer(combined_posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def my_reposts(self, request):
        reposts = Post.objects.filter(author=request.user, repost_of__isnull=False)
        serializer = self.get_serializer(reposts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def repost(self, request, pk=None):
        original_post = self.get_object()  # Get the original post

        # Get the content provided by the user
        user_content = request.data.get('content')

        repost_data = {
            'content': user_content,  # Use the content from the user
            'repost_of': original_post.id,  # Reference the original post
            'author': request.user  # Set the author to the current user
        }

        # Create the new repost
        serializer = self.get_serializer(data=repost_data)
        if serializer.is_valid():
            serializer.save()  # Save the repost
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Comment ViewSet
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        # Save the comment with a potential parent
        serializer.save(author=self.request.user)

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()

        # Check if the current user is the author of the comment
        if comment.author != request.user:
            return Response({"detail": "You can only delete your own comments."}, status=status.HTTP_403_FORBIDDEN)

        # Proceed to delete the comment
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Like ViewSet
class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        post_id = request.data.get('post')
        user = request.user  # Get the authenticated user

        # Check if the user has already liked the post
        if Like.objects.filter(post_id=post_id, user=user).exists():
            return Response({"detail": "You already liked this post."}, status=status.HTTP_400_BAD_REQUEST)

        # Use the serializer to validate and save the like
        serializer = self.get_serializer(data={'post': post_id})
        serializer.is_valid(raise_exception=True)
        
        # Save the like and assign the user
        serializer.save(user=user)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


    def destroy(self, request, *args, **kwargs):
        like = self.get_object()
        if like.user != request.user:
            return Response({"detail": "You can only unlike your own like."}, status=status.HTTP_403_FORBIDDEN)
        
        like.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
