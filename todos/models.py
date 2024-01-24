from django.db import models


class Item(models.Model):
    name = models.CharField(max_length=255)
    # Add other fields here as necessary

    def __str__(self):
        return self.name

    class Meta:
        db_table = "create_item"  # Custom table name
