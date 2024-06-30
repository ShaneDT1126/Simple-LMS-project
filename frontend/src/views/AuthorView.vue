<template>
    <div class="courses">
        <div class="hero is-info">
            <div class="hero-body has-text-centered">
                <h1 class="title">{{ created_by.first_name }} {{ created_by.last_name }}</h1>
            </div>
        </div>

        <section class="section">
                <div class="container">
                    <div class="columns is-multiline">

                        <div class="column is-4" v-for="course in courses" :key="course.id">
                            <CourseItemView :course="course"/>
                        </div>

                        <div class="column is-12">
                            <nav class="pagination">
                                <a class="pagination-previous">Previous</a>
                                <a class="pagination-next">Next</a>

                                <ul class="pagination-list">
                                    <li>
                                        <a class="pagination-link is-current">1</a>
                                    </li>
                                    <li>
                                        <a class="pagination-link">2</a>
                                    </li>
                                    <li>
                                        <a class="pagination-link">3</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>

            </section>

    </div>
</template>

<script>
import axios from 'axios';
import CourseItemView from '@/components/CourseItemView.vue';

export default {
    name: 'CoursesView',

    components: { 
        CourseItemView 
    },

    data(){
        return {
            courses: [],
            created_by: {}
        }
    },

    methods:{
        getCourses(){
            axios
                .get(`courses/get_author_courses/${this.$route.params.id}`)
                .then(res => {
                    this.courses = res.data.courses
                    this.created_by = res.data.created_by
                })
        }
    },

    async mounted(){

        this.getCourses()

    }

}
</script>

<style>

</style>