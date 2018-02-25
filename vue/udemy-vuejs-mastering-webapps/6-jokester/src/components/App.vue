<template>
  <div id='app'>
    <h3>Got jokes?</h3>
    <button class='btn btn-primary' @click='initJokes'>Add Ten Random Jokes</button>
    <div class=''>
      {{ $store.state }}
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: mapActions([
    'initJokes'
  ])
}
</script>
