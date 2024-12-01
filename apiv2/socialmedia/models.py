# models.py

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.conf import settings

# User Manager for custom user model
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

# Custom User Model
class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)
    user_type = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    cover_picture = models.ImageField(upload_to='cover_pictures/', blank=True, null=True)
    tagline=models.CharField(max_length=100,null=True,blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    followers = models.ManyToManyField('self', symmetrical=False, related_name='following', blank=True)
    friends = models.ManyToManyField('self', symmetrical=False, related_name='friends', blank=True)
    disciplines_followed = models.ManyToManyField('Discipline', related_name='discipline', blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email

# Discipline Model
class Discipline(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

# Journal Model
class Journal(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='journal',null=True,blank=True)
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=255)  # A text field for authors
    publication_type = models.CharField(max_length=100, choices=[
        ('article', 'Article'),
        ('review', 'Review'),
        ('caseReport', 'Case Report')
    ])
    article_type = models.CharField(max_length=100, choices=[
        ('originalResearch', 'Original Research'),
        ('clinicalTrial', 'Clinical Trial'),
        ('metaAnalysis', 'Meta Analysis')
    ])
    date_of_publication = models.DateField()  # Single date field instead of day, month, year
    abstract = models.TextField()
    doi = models.CharField(max_length=255, blank=True, null=True)
    article_link = models.URLField(blank=True, null=True)
    pubmed_id = models.CharField(max_length=100, blank=True, null=True)
    scopus_link = models.URLField(blank=True, null=True)
    uploaded_files = models.FileField(upload_to='journal_files/', blank=True, null=True)

    def __str__(self):
        return self.title

# Post Model
class Post(models.Model):
    POST_TYPE_CHOICES = [
        ('post', 'Post'),
        ('repost', 'Repost'),
        ('journal', 'Journal'),
    ]

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    disciplines = models.ManyToManyField('Discipline', blank=True, related_name='posts')
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    repost_of = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='reposts')
    post_type = models.CharField(max_length=20, choices=POST_TYPE_CHOICES, default='post')
    journal = models.ForeignKey(Journal, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts')

    def __str__(self):
        return f"{self.get_post_type_display()} by {self.author}"

# Media Model for posts (images or videos)
class Media(models.Model):
    MEDIA_TYPE_CHOICES = (
        ('image', 'Image'),
        ('video', 'Video'),
    )
    
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='media')
    file = models.FileField(upload_to='post_media/')
    media_type = models.CharField(max_length=5, choices=MEDIA_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.media_type} for post {self.post.id}"

# Comment Model
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')

    def __str__(self):
        return f"Comment by {self.author} on {self.post}"

# Like Model
class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('post', 'user')

    def __str__(self):
        return f"Like by {self.user} on {self.post}"


class School(models.Model):
    name = models.CharField(max_length=255, unique=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    established_year = models.PositiveIntegerField(blank=True, null=True)
    logo = models.ImageField(upload_to='school_logos/', blank=True, null=True)

    def __str__(self):
        return self.name

class Company(models.Model):
    name = models.CharField(max_length=255, unique=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    industry = models.CharField(max_length=255, blank=True, null=True)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)

    def __str__(self):
        return self.name

class Education(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='education')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='students')
    degree = models.CharField(max_length=255)
    field_of_study = models.CharField(max_length=255, blank=True, null=True)
    start_year = models.PositiveIntegerField(blank=True, null=True)
    end_year = models.PositiveIntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.degree} at {self.school.name} ({self.start_year} - {self.end_year})"

class JobExperience(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='job_experiences')
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='employees')
    position = models.CharField(max_length=255)
    department = models.CharField(max_length=255, blank=True, null=True)
    start_year = models.PositiveIntegerField()
    end_year = models.PositiveIntegerField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.position} at {self.company.name} ({self.start_year} - {self.end_year if self.end_year else 'Present'})"

class JobExperienceMedia(models.Model):
    job_experience = models.ForeignKey(JobExperience, on_delete=models.CASCADE, related_name='media')
    file = models.FileField(upload_to='job_experience_media/')
    description = models.TextField(blank=True, null=True)  # Optional description for the media file
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Media for {self.job_experience.position} at {self.job_experience.company.name}"
