# Generated by Django 5.0.2 on 2024-07-30 06:27

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payment_app', '0001_initial'),
        ('user_app', '0002_remove_user_department'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='department',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='payment_app.department'),
        ),
    ]
