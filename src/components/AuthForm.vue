<template lang="html">
  <div class="col-12">
    <form @submit.prevent="submitForm">
      <p v-show="errors.length || parentErrors.length">
        Please correct the following:
        <ul>
          <li v-for="(error, index) in errors"
              :key="index">{{ error }}</li>
          <li v-for="(error, index) in parentErrors"
              :key="index">{{ error }}</li>
        </ul>
      </p>
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email"
               class="form-control"
               id="email"
               aria-describedby="emailHelp"
               placeholder="Enter email"
               v-model="email">
        <small id="emailHelp"
               class="form-text text-muted">
               We'll never share your email with anyone else. However, we can be conviced ££.
        </small>
      </div>
      <div class="form-group"
           v-if="confEmailOn">
        <label for="confEmailInput">Confirm email address</label>
        <input type="email"
               class="form-control"
               id="confEmail"
               placeholder="Enter confirmation email"
               v-model="confEmail">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password"
               class="form-control"
               id="exampleInputPassword1"
               placeholder="Password"
               v-model="password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AuthForm',

  props: {
    parentErrors: {
      type: Array,
      required: true
    },
    confEmailOn: {
      type: Boolean,
      required: true
    }
  },

  components: {

  },

  data() {
    return {
      email: null,
      confEmail: null,
      password: null,
      errors: []
    }
  },

  methods: {
    submitForm() {
      this.errors = [];
      if (this.email && (this.email === this.confEmail || !this.confEmailOn) && this.password) {
        var user = {
          email: this.email,
          password: this.password
        };
        this.$emit('submit-form', user)
        if (this.confEmailOn) {
          console.log('Sent details for sign-up procedure');
        } else {
          console.log('Sent details for login procedure');
        }
      } else {
        if (!this.email) {this.errors.push("Email required.")}
        if (!this.confEmail && this.confEmailOn) {this.errors.push("Confirmation email required.")}
        if (this.email != this.confEmail && this.confEmailOn) {this.errors.push('Email did not match')}
        if (!this.password) {this.errors.push("Password required.")}
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
