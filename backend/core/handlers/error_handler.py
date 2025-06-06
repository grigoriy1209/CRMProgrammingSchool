from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import exception_handler


def error_handler(exc: Exception, context: dict) -> Response:
    handlers = {
        "JWTException": _jwt_validation_error_handler,
        "NotFound404": _error_handler
    }
    response = exception_handler(exc, context)
    exc_class = exc.__class__.__name__
    if exc_class in handlers:
        return handlers[exc_class](exc, context)
    return response


def _jwt_validation_error_handler(exc: Exception, context: dict) -> Response:
    return Response({"detail": "Token is invalid or expired"}, status.HTTP_403_FORBIDDEN)


def _error_handler(exc: Exception, context: dict) -> Response:
    return Response({'detail': 'Something went wrong'}, status.HTTP_404_NOT_FOUND)
