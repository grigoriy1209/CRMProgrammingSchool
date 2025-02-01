CRM Programming School that helps manage students, teachers, courses, and financial transactions.

Technologies

Django - web framework for Python used to build the backend.

Django Rest Framework - For building RESTful APIs.

MySQL - A relational database for storing data about users, cars, and other resources.

drf-yasg - For automatically generating API documentation.

Installation

Requirements:

Python 3.12+     
Poetry for dependency management.

Setup Steps:

Clone the repository:

git clone https://github.com/grigoriy1209/CRMProgrammingSchool.git

cd crmprogrammingschool

Install dependencies:

poetry install



Set up environment variables(create a .env file):

DEBUG=True 

SECRET_KEY=

MYSQL_DATABASE=

MYSQL_USER=

MYSQL_PASSWORD=

MYSQL_HOST=

MYSQL_PORT=

Apply database migrations:

poetry run python manage.py migrate

Run the development server:

poetry run manage.py runserver

Importing Postman Collection

Open Postman.

Click on "Import" in the top-left corner.
Select the file located at CRMProgramingSCHOOL.postman_collection.json.

API Documentation

The API documentation is available through Swagger UI:

API Documentation: http://localhost:8000/api/doc

Dependencies:

Main dependencies:

django
djangorestframework
mysqlclient

Development dependencies:
isort

API Endpoints

Users

all_users: /api/all_users/users

admins: /api/all_users/admins

authentication: /api/all_users/auth

Applications

all_application: /api/application

