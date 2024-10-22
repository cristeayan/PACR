from rest_framework import serializers
from .models import User, Post, Comment, Like, Discipline, Media

# Serializer for user summary
class UserSummarySerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()  # Generate full URL for profile_picture

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "profile_picture"]

    def get_profile_picture(self, obj):
        request = self.context.get('request')
        if obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)
        return None

class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ["id", "name"]

# Full User Serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    disciplines_followed = DisciplineSerializer(many=True, read_only=True)
    profile_picture = serializers.ImageField(required=False)
    cover_picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = [
            "id", "first_name", "last_name", "email", "phone_number", "date_of_birth",
            "user_type", "location", "profile_picture", "cover_picture", "password",
            "followers_count", "following_count", "disciplines_followed",
        ]

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

# Media Serializer
class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'file', 'media_type', 'created_at']

# Like Serializer
class LikeSerializer(serializers.ModelSerializer):
    user = UserSummarySerializer(read_only=True)

    class Meta:
        model = Like
        fields = ["id", "post", "user"]

# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    author = UserSummarySerializer(read_only=True)  # Use UserSummarySerializer for author
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "post", "author", "content", "created_at", "parent", "replies"]

    def get_replies(self, obj):
        # Recursively get replies for the comment and pass the context to child serializers
        replies = Comment.objects.filter(parent=obj)
        context = self.context  # Pass context to the nested replies
        return CommentSerializer(replies, many=True, context=context).data

# Post Serializer with media and author
class PostSerializer(serializers.ModelSerializer):
    author = UserSummarySerializer(read_only=True)  # Use UserSummarySerializer for author
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    likes = LikeSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()
    disciplines = DisciplineSerializer(many=True, read_only=True)
    repost_of = serializers.PrimaryKeyRelatedField(read_only=True)
    media = MediaSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            "id", "author", "content", "disciplines", "created_at", "likes_count",
            "comments_count", "likes", "comments", "repost_of", "media",
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_comments(self, obj):
        top_level_comments = Comment.objects.filter(post=obj, parent=None)
        context = self.context  # Pass context to the comments
        return CommentSerializer(top_level_comments, many=True, context=context).data
