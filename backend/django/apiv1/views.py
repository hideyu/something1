from rest_framework import viewsets

from .models import Something
from .serializers import SomethingSerializer


class SomethingViewSet(viewsets.ModelViewSet):
    """SomethingモデルのCRUD用APIクラス"""
    queryset = Something.objects.all()
    serializer_class = SomethingSerializer
    # hogehogehogeeee
    #   # aaaaaaaaaa
