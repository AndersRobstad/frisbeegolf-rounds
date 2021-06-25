from django.urls import path
from .views import CourseView

app_name = "courses"

urlpatterns = [
    path('', CourseView.as_view(), name='courses'), 
    path('<int:course_pk>/', CourseView.as_view(), name='Spesific course'), 
]