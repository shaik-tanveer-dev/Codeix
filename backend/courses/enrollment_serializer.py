from rest_framework import serializers
from .models import Enrollment


class EnrollmentSerializer(serializers.ModelSerializer):

    course_title = serializers.CharField(
        source='course.title',
        read_only=True
    )

    course_description = serializers.CharField(
        source='course.description',
        read_only=True
    )

    course_price = serializers.IntegerField(
        source='course.price',
        read_only=True
    )

    class Meta:
        model = Enrollment

        fields = [
            'id',
            'course',
            'course_title',
            'course_description',
            'course_price',
        ]
