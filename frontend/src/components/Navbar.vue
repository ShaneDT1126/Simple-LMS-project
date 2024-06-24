<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" style="min-height: 5rem">
      <div class="navbar-brand">
        <router-link :to="{name: 'home'}" class="navbar-item is-size-4">StudyHub</router-link>
      </div>

      <div id="navbar-item" class="navbar-menu">

        <div class="navbar-start">
          <router-link :to="{name: 'home'}" class="navbar-item">Home</router-link>
          <router-link :to="{name: 'about'}" class="navbar-item">About</router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link :to="{name: 'signup'}" class="button is-primary">
                <strong>Signup</strong>
              </router-link>
              <router-link :to="{name: 'login'}" class="button is-light">
                Log in
              </router-link>
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