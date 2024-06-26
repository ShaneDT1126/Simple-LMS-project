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
            activeLesson: null
        }
    },

    mounted(){
        const slug = this.$route.params.slug;

        axios
        .get(`api/v1/courses/${slug}`)
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