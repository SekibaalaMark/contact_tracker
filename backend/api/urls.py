# users/urls.py
from django.urls import path
from .views import *
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # refresh
    path('add-child/', AddChildView.as_view(), name='add-child'),
    path('add-village/', AddVillageView.as_view(), name='add-village'),
    path('list-village/', ListVillagesView.as_view(), name='list-villages'),
]
