from django.db import models
from django.contrib.auth.models import User

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructor = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    price = models.IntegerField()

    def __str__(self):
        return self.title
    
class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.course.title}"
    

class Lesson(models.Model):

    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=200)

    video_url = models.URLField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
class LessonProgress(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    lesson = models.ForeignKey(
        Lesson,
        on_delete=models.CASCADE
    )

    completed = models.BooleanField(default=False)

    completed_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.lesson.title}"