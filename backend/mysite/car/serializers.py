from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
# from .models import CustomUser, Car

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = '__all__'

    def register(self, clean_data):
        user = UserModel.objects.create_user(email=clean_data['email'],
                                             password=clean_data['password'])
        user.username = clean_data['username']
        user.save()
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data["email"],
                            password=clean_data["password"])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials")

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')

# class CarSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Car
#         fields = '__all__'
