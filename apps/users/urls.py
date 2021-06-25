from django.urls import path, include
from .views import *
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)

app_name = 'users'


urlpatterns = [
    path('create/', CreateUserView.as_view(), name='Create new user'),
    path('authenticate/', TokenObtainPairView.as_view(), name="obtain token pair for user"), 
    path('refresh/', TokenRefreshView.as_view(), name="refresh token pair"),
    path('logout/', LogoutView.as_view(), name='Logout a authed user'),
]