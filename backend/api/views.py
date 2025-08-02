from django.shortcuts import render

# Create your views here.
# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from .serializers import *

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class UserLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']

            # Generate tokens
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            return Response({
                "message": "Login successful!",
                "username": user.username,
                "access": access_token,
                "refresh": refresh_token,
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class AddChildView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = ChildSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Child added successfully.",
                "child": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class AddVillageView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = VillageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Village added successfully.",
                "village": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class ListVillagesView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        villages = Village.objects.all()
        serializer = VillageSerializer(villages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




class ListChildrenView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        children = Child.objects.all()
        serializer = ChildSerializer(children, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



class UpdateChildContactView(APIView):
    permission_classes = [AllowAny]
    def patch(self, request, id):
        try:
            child = Child.objects.get(id=id)
        except Child.DoesNotExist:
            return Response({'error': 'Child not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ChildContactUpdateSerializer(child, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Contact updated successfully', 'data': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
