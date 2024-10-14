from rest_framework import serializers
from .models import User, Post, Comment, Like, Discipline

# User Serializer
class UserSerializer(serializers.ModelSerializer):
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

# Reply Serializer
# class ReplySerializer(serializers.ModelSerializer):
#     author = serializers.ReadOnlyField(source="author.email")

#     class Meta:
#         model = Comment
#         fields = ["id", "author", "content", "created_at"]

# Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.email")
    # replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "post", "author", "content", "created_at", "parent",] #"replies"]

    # def get_replies(self, obj):
    #     # Get nested comments (replies)
    #     replies = Comment.objects.filter(parent=obj)
    #     return CommentSerializer(replies, many=True).data


# Discipline Serializer
class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = ["id", "name"]

# Post Serializer
class PostSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source="author.email")
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    likes = LikeSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
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
