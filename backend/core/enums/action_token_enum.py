from datetime import timedelta
from enum import Enum


class ActionTokenEnum(Enum):
    ACTIVATE = (
        'activate',
        timedelta(minutes=30),
    )
    SET_PASSWORD = (
        'set_password',
        timedelta(minutes=10),
    )
    RECOVERY_PASSWORD = (
        "recovery_password",
        timedelta(minutes=10),
    )

    def __init__(self, token_type, life_time):
        self.token_type = token_type
        self.life_time = life_time

