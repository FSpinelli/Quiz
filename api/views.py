import jwt
from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User, Permission, Group
from django.contrib.auth import authenticate, login as auth_login, logout
from api.forms import *
from api.models import *


@csrf_exempt
def index(request):
    return HttpResponse("epedidos api")

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        # register_form = RegisterForm(data=request.POST)
        # if register_form.is_valid():
        #     try:
        #         register = register_form.save()
        #         register.set_password(register.password)
        #         register.save()
        #         register_serializer = serializers.serialize("json", register)
        #         # return HttpResponse('201')
        #         return HttpResponse(register_serializer)
        #     except:
        #         return HttpResponse('500')
        # else:
        #     return HttpResponse(register_form.errors)
        print request.POST.get('username',False)
