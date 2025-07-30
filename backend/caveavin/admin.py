from django.contrib import admin
from .models import Bottle

@admin.register(Bottle)
class BottleAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'productor', 'color', 'region', 'status', 'quantity')
    list_filter = ('color', 'status', 'region')
    search_fields = ('name', 'productor', 'region')
