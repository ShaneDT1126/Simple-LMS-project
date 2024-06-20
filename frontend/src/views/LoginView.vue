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
                <form>
                    <div class="field">
                        <label>Email:</label>
                        <div class="control">
                            <input type="email" class="input">
                        </div>
                    </div>

                    <div class="field">
                        <label>Password:</label>
                        <div class="control">
                            <input type="password" class="input">
                        </div>
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
export default {

}
</script>

<style>

</style>