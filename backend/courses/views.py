from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes
)

from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    Course,
    Lesson,
    Enrollment,
    LessonProgress
)

from .serializers import CourseSerializer
from .lesson_serializer import LessonSerializer
from .enrollment_serializer import EnrollmentSerializer
from .progress_serializer import LessonProgressSerializer


# =====================================
# GET ALL COURSES
# =====================================

@api_view(['GET'])
def get_courses(request):

    courses = Course.objects.all()

    serializer = CourseSerializer(
        courses,
        many=True
    )

    return Response(serializer.data)


# =====================================
# COURSE DETAILS
# =====================================

@api_view(['GET'])
def course_details(request, course_id):

    try:

        course = Course.objects.get(id=course_id)

        serializer = CourseSerializer(course)

        return Response(serializer.data)

    except Course.DoesNotExist:

        return Response({
            "error": "Course Not Found"
        })


# =====================================
# ENROLL COURSE
# =====================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_course(request, course_id):

    try:

        course = Course.objects.get(id=course_id)

        enrollment, created = Enrollment.objects.get_or_create(
            user=request.user,
            course=course
        )

        serializer = EnrollmentSerializer(enrollment)

        return Response({
            "message": "Enrollment Successful",
            "data": serializer.data
        })

    except Course.DoesNotExist:

        return Response({
            "error": "Course Not Found"
        })


# =====================================
# COURSE LESSONS
# =====================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def course_lessons(request, course_id):

    lessons = Lesson.objects.filter(
        course_id=course_id
    )

    serializer = LessonSerializer(
        lessons,
        many=True
    )

    return Response(serializer.data)


# =====================================
# MY ENROLLMENTS
# =====================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_enrollments(request):

    enrollments = Enrollment.objects.filter(
        user=request.user
    )

    data = []

    for enroll in enrollments:

        total_lessons = Lesson.objects.filter(
            course=enroll.course
        ).count()

        completed_lessons = LessonProgress.objects.filter(
            user=request.user,
            lesson__course=enroll.course,
            completed=True
        ).count()

        progress = 0

        if total_lessons > 0:

            progress = int(
                (completed_lessons / total_lessons) * 100
            )

        data.append({
            "id": enroll.id,
            "course_title": enroll.course.title,
            "course_description": enroll.course.description,
            "course_price": enroll.course.price,
            "progress": progress,
        })

    return Response(data)


# =====================================
# COMPLETE LESSON
# =====================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_lesson_complete(request, lesson_id):

    try:

        lesson = Lesson.objects.get(id=lesson_id)

        progress, created = LessonProgress.objects.get_or_create(
            user=request.user,
            lesson=lesson
        )

        progress.completed = True
        progress.save()

        serializer = LessonProgressSerializer(progress)

        return Response({
            "message": "Lesson Completed",
            "data": serializer.data
        })

    except Lesson.DoesNotExist:

        return Response({
            "error": "Lesson Not Found"
        })


# =====================================
# MY PROGRESS
# =====================================

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_progress(request):

    progress = LessonProgress.objects.filter(
        user=request.user,
        completed=True
    )

    serializer = LessonProgressSerializer(
        progress,
        many=True
    )

    return Response(serializer.data)


# =====================================
# CREATE COURSE
# =====================================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_course(request):

    serializer = CourseSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save()

        return Response({
            "message": "Course Created Successfully",
            "data": serializer.data
        })

    return Response(serializer.errors)


# =====================================
# DELETE COURSE
# =====================================

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_course(request, course_id):

    try:

        course = Course.objects.get(id=course_id)

        course.delete()

        return Response({
            "message": "Course Deleted Successfully"
        })

    except Course.DoesNotExist:

        return Response({
            "error": "Course Not Found"
        })



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard(request):

    return Response({
        "message": "Welcome to Codeix Dashboard",
        "user": request.user.username
    })


# =====================================
# TEST AUTH
# =====================================

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def test_auth(request):

    return Response({
        "message": "Authentication Working",
        "user": request.user.username
    })