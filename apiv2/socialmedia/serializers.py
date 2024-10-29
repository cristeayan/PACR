from rest_framework import serializers
from .models import User, Post, Comment, Like, Discipline, Media, Journal

# Serializer for user summary
class UserSummarySerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()  # Generate full URL for profile_picture

    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "profile_picture"]

    def get_profile_picture(self, obj):
        request = self.context.get('request')
        if request and obj.profile_picture:
            return request.build_absolute_uri(obj.profile_picture.url)
        elif obj.profile_picture:
            return obj.profile_picture.url
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

# Journal Serializer (with owner field)
class JournalSerializer(serializers.ModelSerializer):
    owner = UserSummarySerializer(read_only=True)  # Include the owner's info

    class Meta:
        model = Journal
        fields = [
            'id', 'title', 'authors', 'publication_type', 'article_type',
            'date_of_publication', 'abstract', 'doi', 'article_link',
            'pubmed_id', 'scopus_link', 'uploaded_files', 'owner'  # Include the owner field
        ]

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
        replies = Comment.objects.filter(parent=obj)
        return CommentSerializer(replies, many=True, context=self.context).data

# Post Serializer with media, author, and journal
class PostSerializer(serializers.ModelSerializer):
    author = UserSummarySerializer(read_only=True)  # Use UserSummarySerializer for author
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    likes = LikeSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()
    disciplines = DisciplineSerializer(many=True, read_only=True)
    repost_of = serializers.PrimaryKeyRelatedField(read_only=True)
    media = MediaSerializer(many=True, read_only=True)
    journal = JournalSerializer(read_only=True)  # Include journal details if applicable

    class Meta:
        model = Post
        fields = [
            "id", "author", "content", "disciplines", "created_at", "likes_count",
            "comments_count", "likes", "comments", "repost_of", "media", "post_type", "journal"
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_comments(self, obj):
        top_level_comments = Comment.objects.filter(post=obj, parent=None)
        return CommentSerializer(top_level_comments, many=True, context=self.context).data
