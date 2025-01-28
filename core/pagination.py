from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class PagePagination(PageNumberPagination):
    page_size_query_param = 'page'
    page_size = 25
    max_page_size = 25

    def get_paginated_response(self, data):
        count = self.page.paginator.count
        return Response({
            "total_items": count,
            "total_pages": self.page.paginator.num_pages,
            "prev": bool(self.get_previous_link()),
            "next": bool(self.get_next_link()),
            "data": data
        })

    # def get_page_mode(self):
    #     total_pages = self.page.paginator.num_pages
    #     current_page = self.page.number
    #
    #     if current_page == 1:
    #         return 'first_page'
    #     elif current_page < total_pages:
    #         return 'early_page'
    #     elif current_page > total_pages:
    #         return 'late_page'
    #     elif current_page == total_pages:
    #         return 'last_page'
    #
    # def get_paginated_response(self, data):
    #     total_pages = self.page.paginator.num_pages
    #     current_page = self.page.number
    #     pagination_mode = self.get_page_mode()
    #
    #     return Response(
    #         {
    #             'total_items': self.page.paginator.count,
    #             'total_pages': total_pages,
    #             'current_page': current_page,
    #             'previous_page': bool(self.get_previous_link()),
    #             'next_page': bool(self.get_next_link()),
    #             'pagination_mode': pagination_mode,
    #             'results': data
    #         }
    #     )
