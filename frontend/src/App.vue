<template>
  <Navbar/>
  <router-view/>
  <Footer />
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue'
import axios from 'axios';

export default {
  name: 'App',

  components: {
    Navbar,
    Footer
  },

  beforeCreate(){
    this.$store.commit('initializeStore');

    const token = this.$store.state.user.token;

    if (token){
      axios.defaults.headers.common['Authorization'] = "Token " + token;
    }else{
      axios.defaults.headers.common['Authorization'] = "";
    }
  },

  mounted(){
    document.title = "Study Hub";
  }


}

</script>

<style lang="scss">
@import '../node_modules/bulma';
</style>
