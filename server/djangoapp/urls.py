from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'
urlpatterns = [
    # route is a string contains a URL pattern
    # view refers to the view function
    # name the URL
    path(route='', view=views.get_dealerships, name='index'),
    #path('dealer/<int:dealer_id>/', views.get_dealer_details, name='dealer_details'),
    #path('dealer/<int:dealer_id>/review', views.add_review, name='add_review'),
    #path(route='about/', view=views.about, name='about'),
    #path(route='contact/', view=views.contact, name='contact'),
    #path('registration/', views.registration_request, name='registration'),
    #path('login/', views.login_request, name='login'),
    #path('logout/', views.logout_request, name='logout'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)