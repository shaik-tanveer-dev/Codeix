from django.urls import path

from .views import (
    get_courses,
    enroll_course,
    my_enrollments,
    course_lessons,
    mark_lesson_complete,
    my_progress,
    create_course,
    delete_course,
    dashboard
)
from .views import test_auth
from .views import course_details

urlpatterns = [
    path('courses/', get_courses),
    path(
    'create/',
    create_course
    ),
    path(
    'delete/<int:course_id>/',
    delete_course
    ),

    path(
        'enroll/<int:course_id>/',
        enroll_course
    ),

    path(
        'my-enrollments/',
        my_enrollments
    ),

    path(
        'lessons/<int:course_id>/',
        course_lessons
    ),

    path(
        'complete-lesson/<int:lesson_id>/',
        mark_lesson_complete
    ),

    path(
        'my-progress/',
        my_progress
    ),
    path('test-auth/', test_auth),
    
    path('course/<int:course_id>/', course_details),
]