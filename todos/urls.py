from django.urls import path
from .views import list_bussholdeplasser, list_hoteller_i_trondheim, manage_favorittruter
from todos.views import index_view

app_name = "todos"
urlpatterns = [
    path("", index_view, name="index"),
    path("list-bussholdeplasser/", list_bussholdeplasser, name="list_bussholdeplasser"),
    path("list-hoteller-i-trondheim/", list_hoteller_i_trondheim, name="list_hoteller_i_trondheim"),
    path("manage-favorittruter/", manage_favorittruter, name="manage_favorittruter"),
]
