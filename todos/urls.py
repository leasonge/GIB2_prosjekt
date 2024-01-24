from django.urls import path

from todos.views import index_view
from .views import create_item_view
from .views import create_item_view, list_items_view


app_name = "todos"
urlpatterns = [
    path("", index_view, name="index"),
    path("create-item/", create_item_view, name="create_item_view"),
    path("list-items/", list_items_view, name="list_items_view"),
]
