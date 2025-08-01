# users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models import *



class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomUser(username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user



from django.contrib.auth import authenticate
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        username = attrs.get("username")
        password = attrs.get("password")

        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User account is disabled.")
                attrs["user"] = user
                return attrs
            else:
                raise serializers.ValidationError("Invalid username or password.")
        else:
            raise serializers.ValidationError("Both username and password are required.")



# children/serializers.py
from rest_framework import serializers
from .models import Child

class ChildSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = '__all__'

    def validate_number(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Child number must contain only digits (e.g., '001234').")
        if len(value) != 4:
            raise serializers.ValidationError("Child number must be exactly 6 digits long.")
        return value




class VillageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Village
        fields = '__all__'

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Village name cannot be empty.")
        return value.strip().title()



class ChildContactUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Child
        fields = ['contact']

    def validate_contact(self, value):
        if not value.isdigit():
            raise serializers.ValidationError("Contact must contain only digits.")
        if len(value) != 10:
            raise serializers.ValidationError("Contact must be exactly 10 digits.")
        return value
