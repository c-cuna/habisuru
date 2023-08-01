# Generated by Django 4.2.3 on 2023-07-31 17:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Daily',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('action', models.CharField(max_length=300)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ToDo',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('action', models.CharField(max_length=300)),
                ('is_read', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FinishedDaily',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('is_done', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('daily', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='daily_item', to='habits.daily')),
            ],
            options={
                'ordering': ['-timestamp'],
            },
        ),
    ]