<template>
    <div class="course">
        <div class="hero is-info">
            <div class="hero-body has-text-centered">
                <h1 class="title">
                    {{ course.title }} <br>
                    <router-link :to="{ name: 'author', params:{ id: course.created_by.id } }" class="subtitle">
                        By {{ course.created_by.first_name }} {{ course.created_by.last_name }}
                    </router-link>
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

                                <span class="tag is-warning" v-if="activity.status == 'started' " @click="markAsDone" >Started</span>
                                <span class="tag is-success" v-if="activity.status == 'done' " >Done</span>

                                <hr>

                                <p>{{ activeLesson.long_description }}</p>

                                <hr>

                                <template v-if="activeLesson.lesson_type === 'quiz'">
                                   
                                    <QuizViewVue :quiz="quiz" />

                                </template>

                                <template v-if="activeLesson.lesson_type === 'video'">
                                   
                                   <VideoViewVue :youtube_id="activeLesson.youtube_id" />

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
import QuizViewVue from '@/components/QuizView.vue';
import VideoViewVue from '@/components/VideoView.vue';


export default {
    name: 'Course',

    components: {
        CourseCommentViewVue,
        AddCommentViewVue,
        QuizViewVue,
        VideoViewVue
    },

    data(){
        return {
            course: {
                created_by: {
                    id: 0,
                }
            },
            lessons: [],
            comments: [],
            errors: [],
            quiz: {},
            activeLesson: null,
            activity: {}
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

            this.trackStarted()
            
        },

        trackStarted(){
            axios
            .post(`activities/track_started/${this.$route.params.slug}/${this.activeLesson.slug}/`)
            .then(res =>{
                this.activity = res.data;
            })
        },

        markAsDone(){
            axios
            .post(`activities/mark_as_done/${this.$route.params.slug}/${this.activeLesson.slug}/`)
            .then(res =>{
                this.activity = res.data;
            })
        },

        getQuiz(){
            axios
            .get(`courses/${this.course.slug}/${this.activeLesson.slug}/get-quiz/`)
            .then(response => {
                this.quiz = response.data;
                console.log('quiz', response.data);
            })
        },

        getComments(){
            axios
            .get(`courses/${this.course.slug}/${this.activeLesson.slug}/get-comments/`)
            .then(response => {
                this.comments = response.data;
            })
        },

    },

    async mounted(){
        const slug = this.$route.params.slug;

        await axios
        .get(`courses/${slug}/`)
        .then(response => {
            console.log('data',response.data.course);
            this.course = response.data.course;
            this.lessons = response.data.lessons;
            console.log('lesson', response.data.lessons );
        })

        

        document.title = this.course.title + ' | Study Hub';
    }
}
</script>

<style>

</style>