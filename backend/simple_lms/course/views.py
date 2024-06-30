from django.shortcuts import render
from random import randint
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from .serializers import CourseListSerializer, CourseDetailSerializer, LessonListSerializer, CommentSerializer, \
    CategorySerializer, QuizSerializer, UserSerializer
from .models import Course, Lessons, Comment, Category, Quiz
from django.contrib.auth.models import User
from django.utils.text import slugify


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_courses(request):
    category_id = request.GET.get('category_id', '')
    courses = Course.objects.filter(status=Course.PUBLISHED)

    if category_id:
        courses = courses.filter(categories__in=[int(category_id)])

    serializer = CourseListSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_frontpage_courses(request):
    courses = Course.objects.filter(status=Course.PUBLISHED)[0:4]
    serializer = CourseListSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_course(request, slug):
    course = Course.objects.filter(status=Course.PUBLISHED).get(slug=slug)
    course_serializer = CourseDetailSerializer(course)
    lesson_serializer = LessonListSerializer(course.lessons.all(), many=True)

    if request.user.is_authenticated:
        course_data = course_serializer.data
    else:
        course_data = {}

    return Response({
        'course': course_data,
        'lessons': lesson_serializer.data
    })


@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def get_comments(request, course_slug, lesson_slug):
    lesson = Lessons.objects.get(slug=lesson_slug)
    serializer = CommentSerializer(lesson.comments.all(), many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_comment(request, course_slug, lesson_slug):
    data = request.data
    course = Course.objects.get(slug=course_slug)
    lesson = Lessons.objects.get(slug=lesson_slug)

    comment = Comment.objects.create(course=course, lesson=lesson, name=data.get('name'), content=data.get('content'),
                                     created_by=request.user)

    serializer = CommentSerializer(comment)

    return Response(serializer.data)


@api_view(['GET'])
def get_quiz(request, course_slug, lesson_slug):
    lesson = Lessons.objects.get(slug=lesson_slug)
    quiz = lesson.quizzes.first()
    serializer = QuizSerializer(quiz)
    return Response(serializer.data)


@api_view(['GET'])
def get_author_courses(request, user_id):
    user = User.objects.get(id=user_id)
    courses = user.courses.filter(status=Course.PUBLISHED)

    user_serializer = UserSerializer(user, many=False)
    courses_serializer = CourseListSerializer(courses, many=True)

    return Response({
        'courses': courses_serializer.data,
        'created_by': user_serializer.data
    })


@api_view(['POST'])
def create_course(request):
    print(request.data)
    course = Course.objects.create(
        title=request.data.get('title'),
        slug='%s-%s' % (slugify(request.data.get('title')),randint(1)),
        short_description=request.data.get('short_description'),
        long_description=request.data.get('long_description'),
        status=request.data.get('status'),
        created_by=request.user
    )
    for id in request.data.get('categories'):
        course.categories.add(id)

    course.save()

    for lesson in request.data.get('lessons'):
        tmp_lesson = Lessons.objects.create(
            course=course,
            title=lesson.get('title'),
            short_description=lesson.get('short_description'),
            long_description=lesson.get('short_description'),
            slug=slugify(lesson.get('title')),
            status=Lessons.DRAFT,
        )
        tmp_lesson.save()

    return Response({'course_id': course.id})
