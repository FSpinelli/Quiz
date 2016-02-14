from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^signin/$', views.signin, name='signin'),
    url(r'^signup/$', views.signup, name='signup'),
    url(r'^category/$', views.category, name='category'),
    url(r'^user-category/$', views.user_category, name='user_category'),
]