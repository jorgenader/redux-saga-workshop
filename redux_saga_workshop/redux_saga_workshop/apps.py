from django.apps import AppConfig
from django.core import checks

from tg_utils.checks import check_production_settings, check_sentry_config


class Redux_saga_workshopConfig(AppConfig):
    name = 'redux_saga_workshop'
    verbose_name = "Redux-Saga Workshop"

    def ready(self):
        # Import and register the system checks
        checks.register(check_production_settings)
        checks.register(check_sentry_config)
