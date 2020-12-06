from rest_framework import serializers
from .models import Something

class SomethingSerializer(serializers.ModelSerializer):
    """Somethingモデルオブジェクト用のシリアライザ"""

    class Meta:
        model = Something
        fields = ["id", "title", "contents"]