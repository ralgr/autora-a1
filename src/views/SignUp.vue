<template lang="html">
  <div class="col-12">
    <div class="row">
      <div class="col-5">

        <h1 class="display-3">Sign up!</h1>
        <AuthForm @submit-form="signUpSubmit"
                  :parentErrors="errors"
                  :confEmailOn="true"/>

      </div>
    </div>
  </div>
</template>

<script>

import AuthForm from '../components/AuthForm'
import { fireB } from '../config/Firebase'

export default {
  name: 'SignUp',

  components: {
    AuthForm
  },

  data() {
    return {
      errors: []
    }
  },

  methods: {
    signUpSubmit(user) {
      console.log('Trying to create account for ' + user.email + ' with the pass of ' + user.password);
      this.errors = [];
      fireB.auth().createUserWithEmailAndPassword(user.email, user.password)
        .catch(error => {
          // Handle Errors here.
          var errorMessage = error.message;
          console.log(errorMessage);
          this.errors.push(errorMessage);
          // ...
        });
    }
  }
}
</script>

<style lang="css" scoped>
</style>
