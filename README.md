# CRM Programming

**CRM Programming School that helps manage students, teachers, courses, and financial transactions.**

# Technologies
* Django - web framework for Python used to build the backend* 
* Django Rest Framework - For building RESTful APIs* 
* MySQL - A relational database for storing data about users, cars, and other resources* 
* drf-yasg - For automatically generating API documentation.
* Celery -For background task management.
* Redis - A message broker for Celery.
* django-celery-results - To store the results of Celery tasks.
* django-celery-beat - To manage periodic tasks.
# Installation
 Requirements:
* Python 3.12+    
* Poetry for dependency management.
* Docker
## Docker
This project supportsDocker for easy setup and development.
Follow the steps below to run the project in a Docker container.

#### Setup Steps:

##### Clone the repository:

**git clone** `https://github.com/grigoriy1209/CRMProgrammingSchool.git`

**cd crmprogrammingschool**

#### create and start the containers:
`docker compose up` or `docker compose up --build`

# Install dependencies:

**poetry install**

## Set up environment variables(create a .env file):

DEBUG=True

SECRET_KEY=

MYSQL_DATABASE=

MYSQL_USER=

MYSQL_PASSWORD=

MYSQL_HOST=

MYSQL_PORT=

# Apply database migrations:
**poetry run python manage.py migrate**

# Run the development server:

**poetry run manage.py runserver**

## Importing Postman Collection

Open Postman.

Click on "Import" in the top-left corner.
Select the file located at CRMProgramingSCHOOL.postman_collection.json.

## API Documentation

The API documentation is available through Swagger UI:

API Documentation: http://localhost:8000/api/doc

## Main dependencies:

* django
* djangorestframework
* mysqlclient
* django-filter
* djangorestframework-simplejwt
* drf-yasg
* openpyxl
* celery
* redis
* django-celery-results
* django-celery-beat

## Development dependencies:
* isort

# API Endpoints

### Users:

* all_users: /api/all_users/users

* admins: /api/all_users/admins

* authentication: /api/all_users/auth

### Applications:

* all_application: /api/application

### Groups:

* groups: /api/groups

### Analytics:
* analytics: /api/analytics