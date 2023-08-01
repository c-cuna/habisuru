from django.contrib import admin

# Register your models here.
from .models import Daily, ToDo

admin.site.register([ToDo, Daily])
