# Generated by Django 5.0.6 on 2024-12-01 13:58

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('socialmedia', '0007_journal_owner'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('industry', models.CharField(blank=True, max_length=255, null=True)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='company_logos/')),
            ],
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('established_year', models.PositiveIntegerField(blank=True, null=True)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='school_logos/')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='friends',
            field=models.ManyToManyField(blank=True, related_name='friends_set', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='user',
            name='tagline',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='disciplines_followed',
            field=models.ManyToManyField(blank=True, related_name='discipline', to='socialmedia.discipline'),
        ),
        migrations.CreateModel(
            name='JobExperience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.CharField(max_length=255)),
                ('department', models.CharField(blank=True, max_length=255, null=True)),
                ('start_year', models.PositiveIntegerField()),
                ('end_year', models.PositiveIntegerField(blank=True, null=True)),
                ('is_current', models.BooleanField(default=False)),
                ('description', models.TextField(blank=True, null=True)),
                ('company', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='employees', to='socialmedia.company')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='job_experiences', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='JobExperienceMedia',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='job_experience_media/')),
                ('description', models.TextField(blank=True, null=True)),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('job_experience', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='media', to='socialmedia.jobexperience')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('degree', models.CharField(max_length=255)),
                ('field_of_study', models.CharField(blank=True, max_length=255, null=True)),
                ('start_year', models.PositiveIntegerField(blank=True, null=True)),
                ('end_year', models.PositiveIntegerField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='education', to=settings.AUTH_USER_MODEL)),
                ('school', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='students', to='socialmedia.school')),
            ],
        ),
    ]
