from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import CarSerializer, UserRegisterSerializer, \
UserLoginSerializer, UserSerializer , FavoritesSerializer, NotificationSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password

from rest_framework import generics

from django.shortcuts import get_object_or_404


# for profile screen 
# class UserProfileViewSet(APIView):
#     def get(self, request, id=None):
#         if id:
#             item = models.AppUser.objects.get(id=id)
#             serializer = serializers.UserSerializer(item)
#             return Response({"status": "success", "data": serializer.data},
#                             status= status.HTTP_200_OK)
#
#         return Response({"status": "error", "data": []}, status=status.HTTP_400_BAD_REQUEST)




# accessed by anyone to url
class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.register(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	##
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


# for logout button
class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


# for profile screen
class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)




# for delete account button
class DeleteUserViewSet(APIView):
    def delete(self, request, id=None):
        item = models.AppUser.objects.filter(id=id)
        print(item)
        item.delete()
        return Response({"status": "success", "data": "Item Deleted"})


# for favorites screen
class CarListViewSet(APIView):
    def get(self, request, id=None):
        if id:
            item = models.Car.objects.get(id=id)
            serializer = serializers.CarSerializer(item)
            return Response({"status": "success", "data": serializer.data},
                            status= status.HTTP_200_OK)

        items = models.Car.objects.all()
        serializer = serializers.CarSerializer(items, many=True)
        return Response({"status": "success", "data": serializer.data},
                        status=status.HTTP_200_OK)

# for favoriting car listing
class SaveCarView(APIView):
     def post(self, request, car_id):

        car = get_object_or_404(Car, pk=car_id)

        user = request.user

        # Check if the car is already favorited by the user
        if Favorites.objects.filter(user=user, car=car).exists():
            return Response({"status": "error", "message": "Car is already favorited by the user"}, status=status.HTTP_400_BAD_REQUEST)

        Favorites.objects.create(user=user, car=car)
        return Response({"status": "success", "message": "Car favorited successfully"}, status=status.HTTP_201_CREATED)


# for removing favorite car listing
class DeleteCarView(APIView):
    def delete(self, request, car_id):
        car = get_object_or_404(Car, pk=car_id)

        car.delete()
        return Response({"status": "success", "message": "Car deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

# web crawler for searching
class SearchViewSet(APIView):
    def get(self, request):
        pass
