#Models.py
from django.db import models
from django.contrib.gis.db import models as geomodels

# Model for bussholdeplasser
class Bussholdeplasser(geomodels.Model):
    bussholdeplass_id = geomodels.AutoField(primary_key=True)  # Eksplisitt primærnøkkel
    bussholdeplass = geomodels.CharField(max_length=255)
    koordinater = geomodels.PointField()

    def __str__(self):
        return self.bussholdeplass

    class Meta:
        db_table = 'bussholdeplasser'  # Spesifiserer tabellnavnet

# Model for hoteller i Trondheim
class HotellerITrondheim(geomodels.Model):
    hotell_id = geomodels.AutoField(primary_key=True)  # Eksplisitt primærnøkkel
    hotellnavn = geomodels.CharField(max_length=255)
    koordinater = geomodels.PointField()

    def __str__(self):
        return self.hotellnavn

    class Meta:
        db_table = 'hoteller_i_trondheim'  # Spesifiserer tabellnavnet

# Model for favorittruter
class Favorittruter(geomodels.Model):
    favorittrute_id = geomodels.AutoField(primary_key=True)  # Eksplisitt primærnøkkel
    unik_id = geomodels.CharField(max_length=255)  # En unik ID som kan lagres i localstorage
    rutenavn = geomodels.CharField(max_length=255)
    bussholdeplass = geomodels.ForeignKey(Bussholdeplasser, on_delete=geomodels.CASCADE, related_name='favorittruter')

    def __str__(self):
        return self.rutenavn

    class Meta:
        db_table = 'favorittruter'  # Spesifiserer tabellnavnet
