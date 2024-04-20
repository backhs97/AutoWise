from django.urls import path
from . import views


# path is api/
urlpatterns = [

        path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    	path("user/delete/", views.DeleteUserViewSet.as_view()),

    	path("cars/<int:car_id>/favorite/", views.SaveCarView.as_view()),
    	path("cars/<int:car_id>/delete/", views.DeleteCarView.as_view()),

    # path("user/<int:pk>", views.ViewUserViewSet.as_view()),

    #
    # path("cars/", views.CarListViewSet.as_view()),
    # path("cars/add", views.AddCarViewSet.as_view()),
    # path("cars/update", views.UpdateCarViewSet.as_view()),
]
