from django.urls import path

from .views import AddCommentView, ApplicationListView, ApplicationRetrieveUpdateView, ExportExcelView

urlpatterns = [
    path('', ApplicationListView.as_view(), name='applications_list'),

    path('/<int:pk>', ApplicationRetrieveUpdateView.as_view(), name='application_retrieve_update'),
    path('/<int:pk>/add_comment', AddCommentView.as_view(), name='application_add_comment'),
    path('/export-excel', ExportExcelView.as_view(), name='export_excel'),

]
