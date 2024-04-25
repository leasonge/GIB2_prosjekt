"""
Django settings for GIB2_prosjekt project.

Generated by 'django-admin startproject' using Django 3.2.9.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-4&894^wusrouqpkt2@d9j&4me!skiqp6ony*1^i^4wei0p4k@%"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["geomatikk.ibm.ntnu.no", "localhost", "127.0.0.1"]

# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.gis",
    "rest_framework",
    "rest_framework_gis",
    "corsheaders",
    "todos",
    
    
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

# Allow all origins NB: testing ONLY!
CORS_ALLOW_ALL_ORIGINS = False

ROOT_URLCONF = "GIB2_prosjekt.urls"

#possible_gdal_paths =["/opt/homebrew/Cellar/gdal/3.8.5_1/lib/libgdal.34.3.8.5.dylib", #Malene, Lea og Emma
 #            "/usr/lib/libgdal.so", #Server
 #            "C:/OSGeo4W/bin/gdal308.dll" #Åsne
#]
#GDAL_LIBRARY_PATH = "/opt/homebrew/Cellar/gdal/3.8.5_1/lib/libgdal.34.3.8.5.dylib"
GDAL_LIBRARY_PATH = '/opt/homebrew/lib/libgdal.dylib'

#for path in possible_gdal_paths:
#    if Path(path).exists():
 #       GDAL_LIBRARY_PATH = path
 #       break

possible_geos_paths=["/opt/homebrew/Cellar/geos/3.12.1/lib/libgeos_c.dylib",#Malene, Lea og Emma
           "C:/OSGeo4W/bin/geos.dll"] #Åsne
GEOS_LIBRARY_PATH = None
for path in possible_geos_paths:
    if Path(path).exists():
        GEOS_LIBRARY_PATH = path
        break

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
    ]

WSGI_APPLICATION = "GIB2_prosjekt.wsgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.contrib.gis.db.backends.postgis",
        "NAME": "veien_til_sporet",  # your database name
        "USER": "postgres",  # your database username
        "PASSWORD": "postgres",  # your database password
        "HOST": "geomatikk.ibm.ntnu.no",  # your database host
        "PORT": "5433",  # your database port
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "static"


STATICFILES_DIRS = [
    BASE_DIR / "assets" / "dist",
]

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
