from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class PagePagination(PageNumberPagination):
    page_query_param = 'page'
    page_size = 25
    max_page_size = 25

    def get_paginated_response(self, data):
        count = self.page.paginator.count
        current_page = self.page.number
        total_pages = self.page.paginator.num_pages
        prev_link = self.get_previous_link()
        next_link = self.get_next_link()

        prev_page = prev_link.split('=')[-1] if prev_link else None
        next_page = next_link.split('=')[-1] if next_link else None

        return Response({
            "total_items": count,
            "total_pages": total_pages,
            "prev": prev_page,
            "current_page": current_page,
            "next": next_page,
            "result": data
        })
