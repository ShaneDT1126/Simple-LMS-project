<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" style="min-height: 5rem">
      <div class="navbar-brand">
        <router-link :to="{name: 'home'}" class="navbar-item is-size-4">StudyHub</router-link>
      </div>

      <div id="navbar-item" class="navbar-menu">

        <div class="navbar-start">
          <router-link :to="{name: 'home'}" class="navbar-item">Home</router-link>
          <router-link :to="{name: 'about'}" class="navbar-item">About</router-link>
          <router-link :to="{name: 'courses'}" class="navbar-item">Courses</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.state.user.isAuthenticated">
                <router-link :to="{name: 'dashboard'}" class="button is-info" >My Account</router-link>
              </template>

              <template v-else>
                <router-link :to="{name: 'signup'}" class="button is-primary"><strong>Signup</strong></router-link>

                <router-link :to="{name: 'login'}" class="button is-light">Log in</router-link>
              </template>
              
            </div>
          </div>
        </div>

      </div>
    
    </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>