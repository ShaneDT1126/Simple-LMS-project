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
                                <a @click="activeLesson = lesson">{{ lesson.title }}</a>
                            </li>
                        </ul>
                    </div>

                    <div class="column is-10">
                        <template v-if="$store.state.user.isAuthenticated">

                            <template v-if="activeLesson">
                                <h2>{{ activeLesson.title }}</h2>
                                <p>{{ activeLesson.long_description }}</p>

                                <hr>

                                <form v-on:submit.prevent="submitComment()">

                                    <div class="field">
                                        <label class="label">Name</label>
                                        <div class="control">
                                            <input type="text" class="input" v-model="comment.name">
                                        </div>
                                    </div>

                                    <div class="field">
                                        <label class="label">Content</label>
                                        <div class="control">
                                            <textarea class="textarea" v-model="comment.content"></textarea>
                                        </div>
                                    </div>

                                    <div class="field">
                                        <div class="control">
                                            <button class="button is-link">Submit</button>
                                        </div>
                                    </div>
                                    
                                </form>
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

export default {
    name: 'Course',

    data(){
        return {
            course: {},
            lessons: [],
            activeLesson: null,
            comment: {
                name: '',
                content: ''
            }
        }
    },

    methods:{
        submitComment(){
            axios
            .post(`api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/`, this.comment)
            .then(() => {
                this.comment = {
                    name: '',
                    content: ''
                }
                alert('Comment Submitted');
            })
            .catch(err => {
                console.log(err);
            })

            console.log('submitComment');

        }
    },

    mounted(){
        const slug = this.$route.params.slug;

        axios
        .get(`api/v1/courses/${slug}/`)
        .then(response => {
            console.log('data',response.data);
            this.course = response.data.course;
            this.lessons = response.data.lessons;
        })
    }
}
</script>

<style>

</style>