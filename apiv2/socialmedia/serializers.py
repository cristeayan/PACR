from rest_framework import serializers
from .models import User, Post, Comment, Like, Discipline

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "date_of_birth",
            "user_type",
            "location",
            "profile_picture",
            "cover_picture",
            "password"
        ]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

# Like Serializer
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["post", "user"]
        read_only_fields = ["user"]



# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.id")
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "post", "author", "content", "created_at", "parent","replies"] #"replies"]

    def get_replies(self, obj):
        # Recursively get replies for the comment
        replies = Comment.objects.filter(parent=obj)
        return CommentSerializer(replies, many=True).data


# Discipline Serializer
class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ["id", "name"]

# Post Serializer
class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.id")
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    likes = LikeSerializer(many=True, read_only=True)
    comments = serializers.SerializerMethodField()
    disciplines = DisciplineSerializer(many=True, read_only=True)
    repost_of = serializers.PrimaryKeyRelatedField(read_only=True)  # Add repost_of field

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "content",
            "disciplines",
            "created_at",
            "likes_count",
            "comments_count",
            "likes",
            "comments",
            "repost_of",  # Include repost_of in the output
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()
    
    def get_comments(self, obj):
        # Get top-level comments for the post (where parent is None)
        top_level_comments = Comment.objects.filter(post=obj, parent=None)
        return CommentSerializer(top_level_comments, many=True).data
