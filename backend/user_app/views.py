from django.shortcuts import render
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework.views import APIView
from .serializers import SignUpSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def index(request):
  names = ['praise', 'james', 'paul']
  return Response(names)


class SignUpView(APIView):
   def post(self, request, *args, **kwargs):
      serializer = SignUpSerializer(data=request.data)
      if serializer.is_valid():
         print(request.data)
         serializer.save()
         return Response('Account created successfully')
