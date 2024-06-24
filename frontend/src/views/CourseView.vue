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
                            <li><a>Introduction</a></li>
                            <li><a>Get Started</a></li>
                            <li><a>Part One</a></li>
                            <li><a>Part Two</a></li>
                            <li><a>Summary</a></li>
                        </ul>
                    </div>

                    <div class="column is-10">
                        <h2>Introduction</h2>
                        
                        <p>{{ course.long_description }}</p>
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
            course: []
        }
    },

    mounted(){
        const slug = this.$route.params.slug;

        axios
        .get(`api/v1/courses/${slug}`)
        .then(response => {
            console.log(response.data);
            this.course = response.data;
        })
    }
}
</script>

<style>

</style>