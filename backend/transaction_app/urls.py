from django.urls import path
from .views import TransactionView

urlpatterns = [
  path('initiate-payment/', TransactionView.as_view(), name='transaction'),
  path('transaction/<str:ref_number>/', TransactionView.as_view(), name='transaction-detail'),

]