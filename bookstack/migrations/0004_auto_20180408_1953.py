# Generated by Django 2.0.3 on 2018-04-08 19:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("bookstack", "0003_auto_20180403_2325"),
    ]

    operations = [
        migrations.AlterField(
            model_name="bookstack",
            name="book",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="bookstack.Book"
            ),
        ),
        migrations.AlterField(
            model_name="bookstack",
            name="stack",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="bookstack.Stack"
            ),
        ),
        migrations.AlterField(
            model_name="bookstackcategory",
            name="bookstack",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="bookstack.BookStack"
            ),
        ),
        migrations.AlterField(
            model_name="bookstackcategory",
            name="category",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="bookstack.Category"
            ),
        ),
        migrations.AlterField(
            model_name="stack",
            name="user",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL
            ),
        ),
    ]
