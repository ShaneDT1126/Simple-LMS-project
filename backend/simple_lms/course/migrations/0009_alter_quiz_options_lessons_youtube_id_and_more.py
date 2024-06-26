# Generated by Django 5.0.6 on 2024-06-30 07:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course', '0008_alter_category_options_quiz'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='quiz',
            options={'verbose_name_plural': 'Quizzes'},
        ),
        migrations.AddField(
            model_name='lessons',
            name='youtube_id',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='lessons',
            name='lesson_type',
            field=models.CharField(choices=[('article', 'Article'), ('quiz', 'Quiz'), ('video', 'Video')], default='article', max_length=20),
        ),
    ]
