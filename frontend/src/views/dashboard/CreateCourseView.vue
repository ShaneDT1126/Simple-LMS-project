<template>
    <div class="about">
        <div class="hero is-info">
            <div class="hero-body has-text-centered">
                <h1 class="title">Create Course</h1>
            </div>
        </div>

        <section class="section">
            <div class="mb-6 px-6 py-4 has-background-white-ter">
                <h2 class="subtitle">Meta Information</h2>
                <div class="field">
                    <label>Title</label>
                    <input type="text" v-model="course_form.title" class="input">
                </div>
                
                <div class="field">
                    <label>Short Description</label>
                    <textarea v-model="course_form.short_description" class="textarea"></textarea>
                </div>
                
                <div class="field">
                    <label>Long Description</label>
                    <textarea v-model="course_form.long_description" class="textarea"></textarea>
                </div>

                <div class="field">
                    <div class="select is-multiple">
                        <select multiple size="10" v-model="course_form.categories" >
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.title }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="mb-6 px-6 py-4 has-background-white-ter">
                <h2 class="subtitle">Lessons</h2>

                <div v-for="(lesson,index) in course_form.lessons" :key="index" class="mb-4">
                    <h3 class="subtitle is-size-6">Lesson</h3>

                    <div class="field">
                        <label>Title</label>
                        <input type="text" class="input" v-model="lesson.title" :name="`form.lesson[${index}][title]`" >
                    </div>

                    <div class="field">
                        <label>Short Description</label>
                        <textarea v-model="lesson.short_description" class="textarea" :name="`form.lesson[${index}][short_description]`" ></textarea>
                    </div>
                
                    <div class="field">
                        <label>Long Description</label>
                        <textarea v-model="lesson.long_description" class="textarea" :name="`form.lesson[${index}][long_description]`" ></textarea>
                    </div>

                    <hr>
                </div>

                <button class="button is-primary is-outlined" @click="addLesson()" >Add Lesson</button>
            </div>

            <div class="field buttons">
                <button class="button is-success is-outlined" @click="submitForm('draft')" >Submit as Draft</button>
                <button class="button is-success is-outlined" @click="submitForm('review')" >Submit for Review</button>
            </div>
    
        </section>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CreateCourseView',

    data(){
        return {
            course_form: {
                title: '',
                short_description: '',
                long_description: '',
                categories: [],
                status: '',
                lessons: [],
            },
            categories: [],
        }
    },

    methods:{
        getCategories(){
            axios
                .get('courses/get_categories/')
                .then(res => {
                    this.categories = res.data
                })
        },

        submitForm(status){
            
            this.course_form.status = status

            axios
                .post('courses/create_course/', this.course_form)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log("Error",error);
                })
        },

        addLesson(){
            this.course_form.lessons.push({
                title: '',
                short_description: '',
                long_description: '',
            })
        },
    },

    mounted(){
        this.getCategories()
    },

}
</script>

<style>

</style>