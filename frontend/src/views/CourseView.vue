<template>
    <div class="course">
        <div class="hero is-info">
            <div class="hero-body has-text-centered">
                <h1 class="title">
                    {{ course.title }}
                </h1>
            </div>
        </div>

        <section class="section">
            <div class="container">
                <div class="columns content">
                    <div class="column is-2">
                        <h2>Table of Contents</h2>
                        <ul>
                            <li v-for="lesson in lessons" :key="lesson.id">
                                <a @click="setActiveLesson(lesson)">{{ lesson.title }}</a>
                            </li>
                        </ul>
                    </div>

                    <div class="column is-10">
                        <template v-if="$store.state.user.isAuthenticated">

                            <template v-if="activeLesson">
                                <h2>{{ activeLesson.title }}</h2>
                                <p>{{ activeLesson.long_description }}</p>

                                <hr>

                                <template v-if="activeLesson.lesson_type === 'quiz'">
                                    <h3>{{ quiz.question }}</h3>

                                    <div class="control">
                                        <label class="radio">
                                            <input type="radio" :value="quiz.op1" v-model="selectedAnswer"> {{ quiz.op1 }}
                                        </label>
                                    </div>

                                    <div class="control">
                                        <label class="radio">
                                            <input type="radio" :value="quiz.op2" v-model="selectedAnswer"> {{ quiz.op2 }}
                                        </label>
                                    </div>

                                    <div class="control">
                                        <label class="radio">
                                            <input type="radio" :value="quiz.op3" v-model="selectedAnswer"> {{ quiz.op3 }}
                                        </label>
                                    </div>

                                    <div class="control mt-4">
                                        <button class="button is-info" @click="submitQuiz" >Submit</button>
                                    </div>

                                    <template v-if="quizResult == 'Correct'">
                                        <div class="notification is-success mt-4">Correct :D</div>
                                    </template>

                                    <template v-if="quizResult == 'Incorrect'">
                                        <div class="notification is-danger mt-4">Incorrect :( Try again! </div>
                                    </template>
                                    

                                </template>

                                <template v-if="activeLesson.lesson_type === 'article'">

                                    <CourseCommentViewVue v-for="comment in comments" :key="comment.id" :comment="comment"/>

                                    <AddCommentViewVue :course="course" :active-lesson="activeLesson" @submitComment="submitComment" />
                                    
                                </template>
                            </template>

                            <template v-else>
                                <h2>What this course is about?</h2>
                                <p>{{ course.long_description }}</p>
                            </template>
                            
                        </template>

                        <template v-else >
                            <h2>Introduction</h2>
                            <p>You need to be logged in to view this course</p>
                        </template>
                       
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import CourseCommentViewVue from '@/components/CourseCommentView.vue';
import AddCommentViewVue from '@/components/AddCommentView.vue';

export default {
    name: 'Course',

    components: {
        CourseCommentViewVue,
        AddCommentViewVue
    },

    data(){
        return {
            course: {},
            lessons: [],
            comments: [],
            errors: [],
            quiz: {},
            selectedAnswer: '',
            activeLesson: null,
            quizResult: null,
    
        }
    },

    methods:{
        submitComment(comment){
            this.comments.push(comment);
        },

        setActiveLesson(lesson){
            this.activeLesson = lesson;

            if(lesson.lesson_type === 'quiz'){
                this.getQuiz();
            }else{
                this.getComments();
            }

            
        },

        getQuiz(){
            axios
            .get(`api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/get-quiz/`)
            .then(response => {
                this.quiz = response.data;
                console.log('quiz', response.data);
            })
        },

        getComments(){
            axios
            .get(`api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/get-comments/`)
            .then(response => {
                this.comments = response.data;
            })
        },

        submitQuiz(){
            this.quizResult = null;

            if(this.selectedAnswer){

                if(this.selectedAnswer === this.quiz.answer){
                    this.quizResult = 'Correct';
                }else{
                    this.quizResult = 'Incorrect';
                }

            }else {
                alert('Please select an answer');
            }
        }
    },

    async mounted(){
        const slug = this.$route.params.slug;

        await axios
        .get(`api/v1/courses/${slug}/`)
        .then(response => {
            console.log('data',response.data.course);
            this.course = response.data.course;
            this.lessons = response.data.lessons;
        })

        document.title = this.course.title + ' | Study Hub';
    }
}
</script>

<style>

</style>