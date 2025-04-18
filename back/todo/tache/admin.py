from django.contrib import admin
from tache.models import User,Tache

class UserAdmin(admin.ModelAdmin):
    list_display = ['username']

class TacheAdmin(admin.ModelAdmin):
    list_display = ['date_de_creation', 'date_de_fin', 'nom_tache', 'etat','user']

admin.site.register(User, UserAdmin)
admin.site.register(Tache, TacheAdmin)