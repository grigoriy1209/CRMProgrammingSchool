from django.urls import path

from .views import (
    ApplicationListView,
    ApplicationRetrieveUpdateView,
    CommentCreateView,
    CommentListView,
    ExportExcelView,
)

urlpatterns = [
    path('', ApplicationListView.as_view(), name='applications_list'),
    path('/<int:pk>', ApplicationRetrieveUpdateView.as_view(), name='application_retrieve_update'),
    path('/<int:pk>/comments', CommentListView.as_view(), name='comment_list'),
    path('/<int:pk>/add_comment', CommentCreateView.as_view(), name='application_add_comment'),
    path('/export-excel', ExportExcelView.as_view(), name='export_excel'),

]
