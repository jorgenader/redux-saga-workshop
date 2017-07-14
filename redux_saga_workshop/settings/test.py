from settings.local import *

SEND_EMAILS = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'redux_saga_workshop',
        'TEST': {
            'NAME': 'redux_saga_workshop_test',
        },
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
