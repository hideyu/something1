import uuid

from django.db import models
from django.utils import timezone


class Something(models.Model):
    """Somethingモデル"""

    class Meta:
        db_table = 'something'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(verbose_name='タイトル', max_length=20)
    contents = models.TextField(verbose_name='中身', null=True, max_length=500)
    created_at = models.DateTimeField(default=timezone.now)
