<template>

  <div class="home">
    <div class="hero is-info is-medium">
      <div class="hero-body has-text-centered">
        
        <h1 class="title">
          Welcome to StudyHub
        </h1>

        <h2 class="subtitle">
          An online place for learning.
        </h2>

      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info">
                <i class="far fa-clock"></i>
              </span>

              <h2 class="is-size-4 mt-4 mb-4">
                  Study at your own pace
              </h2>

              <p>Gawhdem Gawhdem Gawhdem</p>
              
            </div>
          </div>

          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info">
                <i class="far fa-comments"></i>
              </span>

              <h2 class="is-size-4 mt-4 mb-4">
                  Study with other people
              </h2>

              <p>Gawhdem Gawhdem Gawhdem</p>
              
            </div>
          </div>

          <div class="column is-4">
            <div class="box has-text-centered">
              <span class="icon is-size-2 has-text-info">
                <i class="far fa-home"></i>
              </span>

              <h2 class="is-size-4 mt-4 mb-4">
                  Study from everywhere
              </h2>

              <p>Gawhdem Gawhdem Gawhdem</p>
              
            </div>
          </div>

          <div class="column is-12 has-text-centered">
            <a class="button is-info is-size-3 mt-6 mb-6">
              Get Started
            </a>
          </div>

          <hr>

          <div class="column is-3" v-for="course in courses" :key="course.id">
            <CourseItemView :course="course"/>
          </div>

        </div>
      </div>
    </section>

  </div>

</template>

<script>
import CourseItemView from '@/components/CourseItemView.vue';
import axios from 'axios';

export default {
  name: 'HomeView',

  components: {
    CourseItemView
  },

  data(){
    return {
      courses: []
    }
  },

  mounted(){
        axios
        .get('api/v1/courses/get_frontpage_courses/')
        .then(res => {
            this.courses = res.data
        })
    }
  
}
</script>
