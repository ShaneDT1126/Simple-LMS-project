<template>
    <div class="signup">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">

        <h1 class="title">Sign Up</h1>
      
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <form v-on:submit.prevent="submitForm">
                    <div class="field">
                        <label>Email:</label>
                        <div class="control">
                            <input type="email" class="input" v-model="username">
                        </div>
                    </div>

                    <div class="field">
                        <label>Password:</label>
                        <div class="control">
                            <input type="password" class="input" v-model="password">
                        </div>
                    </div>

                    <div class="field">
                        <label>Confirm Password:</label>
                        <div class="control">
                            <input type="password" class="input" v-model="confirmPassword">
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" :key="error">
                            {{ error }}
                        </p>
                    </div>


                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Sign Up</button>
                        </div>
                    </div>

                </form>

                
                <hr>

                or <router-link :to="{name: 'login'}"> Click here </router-link> to log in!
            </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Signup',

    data(){
        return {
            username: '',
            password: '',
            confirmPassword: '',
            errors: []
        }
    },

    methods: {
        submitForm() {
            console.log('Form submitted!');

            this.errors = [];

            if (this.username === ''){
                this.errors.push('Please enter an email address');
            }

            if (this.password === ''){
                this.errors.push('Please enter a password');
            }

            if (this.confirmPassword === ''){
                this.errors.push('Please confirm your password');
            }

            if (this.confirmPassword !== this.password){
                this.errors.push('Passwords do not match');
            }

            if(!this.errors.length){
                const formData = {
                    username: this.username,
                    password: this.password
                }

                axios
                .post('users/',formData)
                .then(res =>{
                    this.$router.push({name: 'login'})
                })
                .catch(err => {
                    if(err.response){
                        for(const property in err.response.data){
                            this.errors.push(`${property}: ${err.response.data[property]}`)
                        }

                        console.log(JSON.stringify(err.response.data));

                    }else if(err.message){
                        this.errors.push('Something went wrong! Please try again.');

                        console.log(JSON.stringify(err))
                    }
                })



                console.log('Form submitted successfully!');
            }
        }
    },

    mounted(){
        document.title = "Sign Up | Study Hub";
    }

}
</script>

<style>

</style>