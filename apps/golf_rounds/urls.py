from django.urls import path
from .views import GolfRoundView, NewGolfRoundView, RoundDetails

app_name = "golf_rounds"

urlpatterns = [
    path('', GolfRoundView.as_view(), name='rounds'), 
    path('new/', NewGolfRoundView.as_view(), name='New golf round'),
    path('<int:id>/', RoundDetails.as_view(), name='Details about a round'), 
]