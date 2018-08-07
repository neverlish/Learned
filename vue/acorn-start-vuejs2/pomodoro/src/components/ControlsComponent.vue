<template>
  <div>
    <button :disabled='isStarted && !isPaused' @click='start'>
      <i class="glyphicon glyphicon-play"></i>
    </button>
    <button :disabled='!isStarted || isPaused' @click='pause'>
      <i class="glyphicon glyphicon-pause"></i>
    </button>
    <button :disabled='!isStarted' @click='stop'>
      <i class="glyphicon glyphicon-stop"></i>
    </button>
  </div>
</template>

<style scoped>
button:disabled i {
  color: gray;
}
</style>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['isStarted', 'isPaused', 'isStopped']),
  methods: mapActions(['start', 'stop', 'pause'])
}
</script>
