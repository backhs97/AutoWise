
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	# username = models.CharField(max_length=50)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.email

class Car(models.Model):
    # user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    model = models.CharField(max_length=100)
    location = models.CharField(max_length=200)

    def __str__(self):
        return self.model

class Favorites(models.Model):
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE) 

class Notification(models.Model):
    timestamp = models.DateField(auto_now_add=True)
    userId = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    carId = models.ForeignKey(Car, on_delete=models.CASCADE)
    isRead = models.BooleanField(False)


