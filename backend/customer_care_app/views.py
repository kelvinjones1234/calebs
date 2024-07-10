from django.shortcuts import render
from .serializers import ComplainSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
 
@api_view(['POST'])
def complain(request):
  serializer = ComplainSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response('Complain submitted successfully')
  else:
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

