<template>
  <div class=''>
    <h3>Dashboard Component</h3>
    <button class='btn btn-danger btn-sm' @click='signOut'>Sign Out</button>
    <hr>
    <AddEvent />
    <hr>
    {{ $store.state }}
  </div>
</template>

<script>
import { firebaseApp } from '../firebaseApp'
import AddEvent from './AddEvent.vue'

export default {
  methods: {
    signOut() {
      this.$store.dispatch('signOut')
      firebaseApp.auth().signOut()
    }
  },
  components: {
    AddEvent
  }
}
</script>
