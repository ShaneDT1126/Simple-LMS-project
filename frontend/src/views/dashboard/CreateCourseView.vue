<template>
    <div class="about">
        <div class="hero is-info">
            <div class="hero-body has-text-centered">
                <h1 class="title">Create Course</h1>
            </div>
        </div>

        <section class="section">
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
        }
    },

    mounted(){
        this.getCategories()
    },

}
</script>

<style>

</style>