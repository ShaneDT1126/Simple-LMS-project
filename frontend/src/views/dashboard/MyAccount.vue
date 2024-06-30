<template>
  <div class="about">
    <div class="hero is-info">
        <div class="hero-body has-text-centered">
            <h1 class="title">My Account</h1>
        </div>
    </div>

    <section class="section">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="subtitle is-size-3">Your Active Courses</h2>
            </div>

            <div class="column is-4" v-for="course in courses" :key="course.id">
                <CourseItemView :course="course" /> 
            </div>
        </div>

        <hr>

        <button @click="logout()" class="button is-danger">Log Out</button>
    </section>

  </div>
</template>

<script>
import axios from 'axios';
import CourseItemView from '@/components/CourseItemView.vue';

export default {
    name: 'MyAccount',

    components: { 
        CourseItemView 
    },

    data(){
        return {
            courses: []
        }
    },

    methods:{
        async logout(){

            await axios
            .post('token/logout/')
            .then(() => {
                console.log('Logged out')
            })
            .catch(error => {
                console.log(error)
            })

            axios.defaults.headers.common['Authorization'] = "";

            localStorage.removeItem('token');

            this.$store.commit('removeToken')

            this.$router.push({name: 'home'})

            console.log('logout')

        }
    },

    mounted() {
        axios
        .get('activities/get_active_courses/')
        .then(res => {
           console.log(res.data)
           this.courses = res.data
        })

        document.title = "My Account | Study Hub";
    }
}
</script>

<style>

</style>