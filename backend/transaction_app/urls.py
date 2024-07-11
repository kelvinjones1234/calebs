from django.urls import path
from .views import TransactionView, TransactionRetrieveView

urlpatterns = [
    path('transaction/', TransactionView.as_view(), name='transaction-detail'),
    path('transaction/<str:reference_number>/', TransactionRetrieveView.as_view(), name='transaction-detail'),
]
