import json
from utils.render_react_page import render_react_page

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.views.decorators.http import require_http_methods
from .models import Item


def list_items_view(request):
    items = Item.objects.all().values("id", "name")
    return JsonResponse(list(items), safe=False)


@csrf_exempt  # Temporarily disable CSRF for testing, not recommended for production
@require_http_methods(["POST"])
def create_item_view(request):
    data = json.loads(request.body)
    item = Item(name=data["name"])
    item.save()
    return JsonResponse({"status": "success", "id": item.id}, status=201)


def index_view(request):
    if request.method == "GET":
        todos = [
            {"id": 1, "title": "hello"},
            {"id": 2, "title": "world"},
            {"id": 3, "title": "'\"</script><script>alert(1)</script>"},
        ]
        return render_react_page(request, "todos-index", {"todos": todos})
