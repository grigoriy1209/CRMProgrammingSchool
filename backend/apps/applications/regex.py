from enum import Enum


class ApplicationRegex(Enum):
    NAME = (r"^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ'-]{1,49}$",
            "Ім'я має починатися з великої літери та містити лише літери, апостроф або дефіс.")
    SURNAME = (r"^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ'-]{1,25}$",
               "Прізвище має починатися з великої літери та містити лише літери, апостроф або дефіс.")

    def __init__(self, pattern: str, msg: str):
        self.pattern = pattern
        self.msg = msg
