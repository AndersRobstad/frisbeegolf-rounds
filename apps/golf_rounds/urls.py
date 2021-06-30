from django.urls import path
from .views import FinishHoleView, GolfRoundView, NewGolfRoundView, RoundDetails, RoundOverviewView, GolfRoundStatistics

app_name = "golf_rounds"

urlpatterns = [
    path('', GolfRoundView.as_view(), name='rounds'), 
    path('new/', NewGolfRoundView.as_view(), name='New golf round'),
    path('<int:id>/', RoundDetails.as_view(), name='Details about a round'), 
    path('finish-hole/<int:id>/', FinishHoleView.as_view(), name='Update a hole with data'),
    path('<int:id>/overview/', RoundOverviewView.as_view(), name='Get the data to show the finished round.'),
    path('statistics/', GolfRoundStatistics.as_view(), name='All rounds the user has played'),
]