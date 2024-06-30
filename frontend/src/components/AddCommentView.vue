<template>
    <form v-on:submit.prevent="submitComment()">

        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input type="text" class="input" v-model="comment.name" >
            </div>
        </div>

        <div class="field">
            <label class="label">Content</label>
            <div class="control">
                <textarea class="textarea" v-model="comment.content" ></textarea>
            </div>
        </div>

        <div class="notification is-danger" v-for="error in errors" :key="error">
            {{ error }}
        </div>

        <div class="field">
            <div class="control">
                <button class="button is-link">Submit</button>
            </div>
        </div>

</form>
</template>

<script>
import axios from 'axios';

export default {
    props: [ 'course', 'activeLesson' ],
    
    data(){
        return {
            comment: {
                name: '',
                content: ''
            },

            errors: [],
        }
    },

    methods:{
        submitComment(){
            this.errors = [];

            if(this.comment.name === ''){
                this.errors.push('Name required');
            }

            if(this.comment.content === ''){
                this.errors.push('Content required');
            }


            if(!this.errors.length){
                axios
                .post(`api/v1/courses/${this.$route.params.slug}/${this.activeLesson.slug}/`, this.comment)
                .then(res => {
                    this.comment = {
                        name: '',
                        content: ''
                    }
                    this.$emit('submitComment', res.data);
                })
                .catch(err => {
                    console.log(err);
                })
            }

            console.log('submitComment');

        },
    },

}

</script>

<style>

</style>