# Generated by Django 2.0.3 on 2018-04-03 23:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("bookstack", "0001_initial"),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name="bookstack",
            unique_together={("stack", "position")},
        ),
        migrations.AlterUniqueTogether(
            name="bookstackcategory",
            unique_together={("category", "bookstack")},
        ),
    ]
