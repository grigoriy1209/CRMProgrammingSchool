from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class PagePagination(PageNumberPagination):
    page_size_query_param = 'size'
    page_size = 25
    max_page_size = 25

    def get_paginated_response(self, data):
        count = self.page.paginator.count
        return Response(
            {
                'total_items': count,
                'total_pages': self.page.paginator.num_pages,
                'previous_page': bool(self.get_previous_link()),
                'next_page': bool(self.get_next_link()),
                'results': data
            }
        )
