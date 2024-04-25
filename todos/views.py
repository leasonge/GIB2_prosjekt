import json
from utils.render_react_page import render_react_page
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Bussholdeplasser, HotellerITrondheim, Favorittruter

def list_bussholdeplasser(request):
    if request.method == "GET":
        bussholdeplasser = Bussholdeplasser.objects.all().values("bussholdeplass_id", "bussholdeplass", "koordinater")
        return JsonResponse(list(bussholdeplasser), safe=False)

def list_hoteller_i_trondheim(request):
    if request.method == "GET":
        hoteller = HotellerITrondheim.objects.all().values("hotell_id", "hotellnavn", "koordinater")
        return JsonResponse(list(hoteller), safe=False)

@csrf_exempt
def manage_favorittruter(request):
    if request.method == "POST":
        data = json.loads(request.body)
        try:
            favorittruter = Favorittruter.objects.create(
                unik_id=data['unik_id'],
                rutenavn=data['rutenavn'],
            )
            return JsonResponse({"status": "success", "id": favorittruter.favorittrute_id}, status=201)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    elif request.method == "DELETE":
        data = json.loads(request.body)
        try:
            favorittruter = Favorittruter.objects.get(favorittruter_id=data['favorittruter_id'])
            favorittruter.delete()
            return JsonResponse({"status": "success", "message": "Favorittruter deleted"}, status=204)
        except Favorittruter.DoesNotExist:
            return JsonResponse({"status": "error", "message": "Favorittruter not found"}, status=404)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
    else:
        return JsonResponse({"status": "error", "message": "Unsupported request method"}, status=405)
    
def index_view(request):
    if request.method == "GET":
        todos = [
        {"id": 1, "title": "hello"},
        {"id": 2, "title": "world"},
        {"id": 3, "title": "'\"</script><script>alert(1)</script>"},
    ]
        return render_react_page(request, "todos-index", {"todos": todos})

