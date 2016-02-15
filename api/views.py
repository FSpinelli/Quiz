# coding=utf8
# -*- coding: utf8 -*-
# vim: set fileencoding=utf8 :

import jwt
from django.core import serializers
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User, Permission, Group
from django.contrib.auth import authenticate, login as auth_login, logout
from api.forms import *
from api.models import *
import json as simplejson

# def is_auth(view_func):
#     def _decorator(request, *args, **kwargs):
#         if request.META.get('HTTP_AUTHORIZATION') != None:
#             token = request.META.get('HTTP_AUTHORIZATION')
#             token_decode = jwt.decode(token, 'secret', algorithms=['HS256'])
#             # token_serializer =  serializers.serialize("json", token_decode)
#             for key, value in token_decode.items():
#                 username = key
#                 password = value

#             user = authenticate(username=username, password=password)
#             request.user.username = username
#             request.user.password = password
#             # return HttpResponse(username)
#             return func()
#         else:
#             return HttpResponse(status=401) #nao autorizado
            
#     return _decorator

def error_form_serialization(error_dict):  
    """  
    This method strips the proxy objects from the
    error dict and casts them to unicode. After
    that the error dict can and will be
    json-serialized.  
    """  
    plain_dict = dict([(k, [unicode(e) for e in v]) for k,v in error_dict.items()])   
    return simplejson.dumps(plain_dict)


@csrf_exempt
def index(request):
    return HttpResponse("epedidos api")

@csrf_exempt
def signin(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                token = jwt.encode({request.POST.get('username',False): request.POST.get('password',False)}, 'secret', algorithm='HS256')                
                return HttpResponse('{"token":"'+token+'"}')
            else:
                return HttpResponse(status=404) #usuario desativado

        else:
            return HttpResponse(status=400) #usuario ou senha incorreta

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        register_form = RegisterForm(data=request.POST)
        if register_form.is_valid():
            try:
                register = register_form.save()
                register.set_password(register.password)
                register.save()
                token = jwt.encode({request.POST.get('username',False): request.POST.get('password',False)}, 'secret', algorithm='HS256')
                return HttpResponse(request.POST.get('password',False))
            except:
                return HttpResponse(status=500)
        else:
            return HttpResponse(error_form_serialization(register_form.errors))
            
@csrf_exempt
def category(request):
    if request.method == 'GET':
        category = Category.objects.all()
        category_serializer = serializers.serialize("json", category)
        return HttpResponse(category_serializer)

@csrf_exempt
def user_category(request):
    if request.method == 'GET':
        u = User.objects.filter(pk=1)
        user_categories = UserCategory.objects.filter(user=u)
        user_categories_serializer = serializers.serialize("json", user_categories, use_natural_foreign_keys=True, use_natural_primary_keys=True)
        return HttpResponse(user_categories_serializer)