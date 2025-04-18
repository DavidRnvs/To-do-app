from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import datetime
from django.utils import timezone


TACHE_DATE_MAX = timezone.make_aware(datetime.datetime(2025, 4, 19))
TACHE_DATE_MIN = timezone.make_aware(datetime.datetime(2020, 1, 1))

class User(models.Model):
    username = models.fields.TextField(null=False, default='')
    email = models.EmailField(null=False, default='')
    mot_de_passe = models.fields.TextField(null=False, default='')


class Tache(models.Model):
    class Etat(models.TextChoices):
        Planifiée = "Planifiée!"
        Encours = "En cours!"
        Fini = "Fini!"
        
    date_de_creation = models.DateTimeField(
        validators=[
            MaxValueValidator(limit_value=TACHE_DATE_MAX),
            MinValueValidator(limit_value=TACHE_DATE_MIN)
        ]
    )
    date_de_fin = models.DateTimeField(
        validators=[
            MaxValueValidator(limit_value=TACHE_DATE_MAX),
            MinValueValidator(limit_value=TACHE_DATE_MIN)
        ]
    )
    nom_tache = models.fields.CharField(max_length=50)
    etat = models.fields.CharField(choices=Etat.choices, max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
