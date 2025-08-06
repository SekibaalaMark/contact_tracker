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
    path('list-children/', ListChildrenView.as_view(), name='list-children'),
    path('children/<int:id>/update-contact/', UpdateChildContactView.as_view(), name='update-child-contact'),
    path('children/total/', TotalChildrenView.as_view(), name='total-children'),
    path('child/<int:id>/update-parent-name/', UpdateChildParentNameView.as_view(), name='update-child-parent'),
]
