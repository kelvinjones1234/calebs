from rest_framework import generics
from .models import Transaction
from .serializers import TransactionSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status



class TransactionView(APIView):
    def post(self, request):
        ref_number = request.data.get('reference_number')
        if ref_number and Transaction.objects.filter(reference_number=ref_number).exists():
            # If the ref_number exists, return a success response but do not save
            return Response({'detail': 'Transaction with this reference number already exists.'}, status=status.HTTP_200_OK)
        
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TransactionRetrieveView(generics.RetrieveAPIView):
  queryset = Transaction.objects.all()
  serializer_class = TransactionSerializer

  def get_object(self):
    reference_number = self.kwargs['reference_number']
    return get_object_or_404(Transaction, reference_number=reference_number)
