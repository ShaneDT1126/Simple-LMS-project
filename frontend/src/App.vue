<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" style="min-height: 5rem">
    <div class="navbar-brand">
      <a class="navbar-item is-size-4">StudHere</a>
    </div>

    <div id="navbar-item" class="navbar-menu">

      <div class="navbar-start">
        <a class="navbar-item">Home</a>
        <a class="navbar-item">About</a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Signup</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </div>
      </div>

    </div>
    
  </nav>

  <router-view/>

  <footer>
    <div class="footer">
      <p class="has-text-centered">Copyright (c) 2024</p>
    </div>
  </footer>
</template>

<style lang="scss">
@import '../node_modules/bulma';
</style>
