<template>
  <div class=''>
    <h3>Dashboard Component</h3>
    <button class='btn btn-danger btn-sm' @click='signOut'>Sign Out</button>
    <hr>
    <AddEvent />
    <hr>
    {{ $store.state.events }}
  </div>
</template>

<script>
import { firebaseApp, eventsRef } from '../firebaseApp'
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
  },
  mounted() {
    eventsRef.on('value', snap => {
      let events = []
      snap.forEach(event => {
        events.push(event.val())
      })
      this.$store.dispatch('setEvents', events)
    })
  }
}
</script>
