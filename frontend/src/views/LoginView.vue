<template>
  <div class="login">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">

        <h1 class="title">Log In</h1>
      
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

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" :key="error">
                            {{ error }}
                        </p>
                    </div>


                    <div class="field">
                        <div class="control">
                            <button class="button is-dark">Log In</button>
                        </div>
                    </div>

                </form>

                <hr>

                or <router-link :to="{name: 'signup'}"> Click here </router-link> to Sign up!
            </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import axios from 'axios';


export default {

  data(){
    return {
      username: '',
      password: '',
      errors: []
    }
  },

  methods:{
    submitForm(){
      this.errors = [];

      axios.defaults.headers.common['Authorization'] = '';

      localStorage.removeItem('token');

      if (!this.username){
        this.errors.push("Email required.");
      }

      if (!this.password){
        this.errors.push("Password required.");
      }

      if (!this.errors.length){
        const formData = {
          username: this.username,
          password: this.password
        }

        axios
                .post('token/login/',formData)
                .then(res =>{
                    const token = res.data.auth_token;

                    this.$store.commit('setToken', token);

                    axios.defaults.headers.common['Authorization'] = "Token " + token;

                    localStorage.setItem('token', token);

                    this.$router.push({name: 'home'})

                    console.log('form submitted')
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
      }

      
    },

  },

  mounted(){
    document.title = "Log In | Study Hub";
  }


}

</script>

<style>

</style>