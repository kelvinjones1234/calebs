# Generated by Django 5.0.2 on 2024-07-10 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaction_app', '0003_alter_transaction_reference_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='reference_number',
            field=models.CharField(max_length=50),
        ),
    ]
