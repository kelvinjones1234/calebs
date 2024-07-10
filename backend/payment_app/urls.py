from django.urls import path
from .import views
from .views import LevyByDepartment#

urlpatterns = [
  path('departments/', views.DepartmentListView, name='department-list'),
  path('fees/<int:department_id>/', LevyByDepartment.as_view(), name='levies-list'),
]