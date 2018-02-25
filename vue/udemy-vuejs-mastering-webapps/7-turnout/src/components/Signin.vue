<template>
  <div class='form-inline'>
    <h3>Sign in</h3>
    <div class='form-group'>
      <input
        type='text'
        placeholder='email'
        class='form-control'
        v-model='email'
      />
      <input
        type='password'
        placeholder='password'
        class='form-control'
        v-model='password'
      />
      <button class='btn btn-primary' @click='signIn'>Sign In</button>
    </div>
    <br />
    <p>{{ error.message }}</p>
    <br />
  </div>
</template>

<script>
import { firebaseApp } from '../firebaseApp'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  },
  methods: {
    signIn() {
      firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password)
        .catch(error => {
          this.error = error
        })
    }
  }
}
</script>
