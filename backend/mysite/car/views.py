from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password

# class ViewUserViewSet(APIView):
#     def get(self, request, id=None):
#         if id:
#             item = models.CustomUser.objects.get(id=id)
#             serializer = serializers.UserSerializer(item)
#             return Response({"status": "success", "data": serializer.data},
#                             status= status.HTTP_200_OK)
#
#         return Response({"status": "error", "data": []}, status=status.HTTP_400_BAD_REQUEST)
#
# class UserProfileViewSet(APIView):
#     def get(self, request, id=None):
#         if id:
#             item = models.CustomUser.objects.get(id=id)
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


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)


# class UpdateUserViewSet(APIView):
#     def patch(self, request, id=None):
#         item = models.CustomUser.objects.get(id=id)
#         serializer = serializers.UserSerializer(item, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
#         else:
#             return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# class DeleteUserViewSet(APIView):
#     def delete(self, request, id=None):
#         item = models.CustomUser.objects.filter(id=id)
#         print(item)
#         item.delete()
#         return Response({"status": "success", "data": "Item Deleted"})


# class CarListViewSet(APIView):
#     def get(self, request, id=None):
#         if id:
#             item = models.Car.objects.get(id=id)
#             serializer = serializers.CarSerializer(item)
#             return Response({"status": "success", "data": serializer.data},
#                             status= status.HTTP_200_OK)
#
#         items = models.Car.objects.all()
#         serializer = serializers.CarSerializer(items, many=True)
#         return Response({"status": "success", "data": serializer.data},
#                         status=status.HTTP_200_OK)
#
# class AddCarViewSet(APIView):
#     def post(self, request, id=None):
#         serializer = serializers.CarSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
#         else:
#             return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
#
# class UpdateCarViewSet(APIView):
#     def patch(self, request, id=None):
#         item = models.Car.objects.get(id=id)
#         serializer = serializers.UserSerializer(item, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
#         else:
#             return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
#
# class DeleteCarViewSet(APIView):
#     def delete(self, request, id=None):
#         item = models.Car.objects.filter(id=id)
#         print(item)
#         item.delete()
#         return Response({"status": "success", "data": "Item Deleted"})
#
