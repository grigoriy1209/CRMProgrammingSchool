import io

from django.http import HttpResponse
from django.utils.timezone import localtime

from openpyxl import Workbook


class ExcelService:
    HEADERS = ['id', 'name', 'surname', 'email', 'phone', 'age', 'course',
               'course_type', 'course_format', 'status', 'sum', 'alreadyPaid',
               'created_at', 'manager', 'group', 'msg']

    @staticmethod
    def generate_excel(orders):
        wb = Workbook()
        ws = wb.active
        ws.title = 'Orders'

        ws.append(ExcelService.HEADERS)
        for order in orders:
            ws.append([
                order.id,
                order.name,
                order.surname,
                order.email,
                order.phone,
                order.age,
                order.course,
                order.course_type,
                order.course_format,
                order.status,
                order.sum,
                order.alreadyPaid,
                localtime(order.created_at).strftime('%d.%m.%Y %H:%M:%S'),
                str(order.manager) if order.manager else "",
                str(order.group) if order.group else "",

            ])

        buffer = io.BytesIO()
        wb.save(buffer)
        buffer.seek(0)
        return buffer

    @staticmethod
    def generate_excel_file(orders):
        buffer = ExcelService.generate_excel(orders)
        response = HttpResponse(
            buffer.getvalue(),
            content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        )
        response['Content-Disposition'] = 'attachment; filename="orders.xlsx"'
        return response

