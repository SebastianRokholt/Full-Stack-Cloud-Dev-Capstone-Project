from django.contrib import admin
from .models import CarMake, CarModel

# CarModelInline class
class CarModelInline(admin.StackedInline):
    model = CarModel
    extra = 2

# CarMakeAdmin class with CarModelInline
class CarMakeAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name']
    inlines = [CarModelInline]

# CarModelAdmin class
class CarModelAdmin(admin.ModelAdmin):
    list_display = ['car_make', 'name', 'dealer_id', 'model_type', 'year']
    list_filter = ['model_type', 'car_make', 'dealer_id', 'year',]
    search_fields = ['car_make', 'name']

# Register models here
admin.site.register(CarMake, CarMakeAdmin)
admin.site.register(CarModel, CarModelAdmin)
