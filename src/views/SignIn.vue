<template lang="html">
  <div class="col-12">
    <div class="row">
      <div class="col-5">

        <h1 class="display-3">Sign in!</h1>
        <AuthForm @submit-form="signInSubmit"
                  :parentErrors="errors"
                  :confEmailOn="false"/>

      </div>
    </div>
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm'
import { fireB } from '../config/Firebase'

export default {
  name: 'SignIn',

  components: {
    AuthForm
  },

  data() {
    return {
      errors: []
    }
  },

  methods: {
    signInSubmit(user) {
      console.log(user.email + ' is trying to log in.');
      fireB.auth().signInWithEmailAndPassword(user.email, user.password)
        .catch(error => {
        // Handle Errors here.
        var errorMessage = error.message;
        this.errors.push(errorMessage);
        // ...
      });
    }
  }
}
</script>

<style lang="css" scoped>
</style>
