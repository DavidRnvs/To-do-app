from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import datetime

class User(models.Model):
    Username = models.fields.TextField()

class Tache(models.Model):
    class Etat(models.TextChoices):
        Planifiée = "Planifiée!"
        Encours = "En cours!"
        Fini = "Fini!"
        
    date_de_creation = models.DateTimeField(
        validators=[
            MaxValueValidator(limit_value=datetime.datetime(2025, 4, 19)),
            MinValueValidator(limit_value=datetime.datetime(2025, 1, 1))
        ]
    )
    date_de_fin = models.DateTimeField(
        validators=[
            MaxValueValidator(limit_value=datetime.datetime(2025, 4, 19)),
            MinValueValidator(limit_value=datetime.datetime(2025, 1, 1))
        ]
    )
    nom_tache = models.fields.CharField(max_length=50)
    etat = models.fields.CharField(choices=Etat.choices, max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
