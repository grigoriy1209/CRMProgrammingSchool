import os

from django.core.mail import EmailMultiAlternatives
from django.template.loader import get_template

from configs.celery import app

from core.dataclasses.user_dataclass import User
from core.services.jwt_service import ActivateToken, JWTService, RecoveryToken, SetPasswordToken


class EmailService:
    @staticmethod
    @app.task
    def __send_email(to: str, template_name: str, context: dict, subject: str) -> None:
        template = get_template(template_name)
        html_content = template.render(context)
        msg = EmailMultiAlternatives(subject=subject, from_email=os.environ.get("EMAIL_HOST_USER"), to=[to])
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    @classmethod
    def register(cls, user: User):
        token = JWTService.create_token(user, ActivateToken)
        url = f'http://localhost:3000/activate/{token}'
        cls.__send_email.delay(
            user.email,
            'register.html',
            {'name': user.profile.name, 'url': url},
            'Register Email'
        )

    @classmethod
    def set_password(cls, user: User):
        token = JWTService.create_token(user, SetPasswordToken)
        url = f'http://localhost:3000/set-password/{token}'
        cls.__send_email.delay(
            user.email,
            'set_password.html',
            {'name': user.profile.name, 'url': url},
            'Set Password'
        )

    @classmethod
    def recovery_password(cls, user: User):
        token = JWTService.create_token(user, RecoveryToken)
        url = f'http://localhost:3000/recovery/{token}'
        cls.__send_email.delay(
            user.email,
            "recovery_password.html",
            {
                'name': user.profile.name,
                'url': url
            },
            'Recovery Password'

        )
