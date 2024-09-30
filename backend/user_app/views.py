from django.shortcuts import render
from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer
from rest_framework.views import APIView
from .serializers import SignUpSerializer
from rest_framework import status

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
            serializer.save()
            return Response('Account created successfully', status=status.HTTP_201_CREATED)
        else:
            # If the serializer is not valid, return the errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
