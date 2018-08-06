<template>
  <div id="app" class='container'>
    <h2>
      <span>{{ 'Pomodoro' | uppercase | addspace }}</span>
      <controls-component></controls-component>
    </h2>
    <state-title-component v-bind:isworking='isworking'></state-title-component>
    <countdown-component></countdown-component>
    <transition name='fade'>
      <kittens-component v-show='!isworking'></kittens-component>
    </transition>
  </div>
</template>

<script>
import ControlsComponent from './components/ControlsComponent'
import StateTitleComponent from './components/StateTitleComponent'
import CountdownComponent from './components/CountdownComponent'
import KittensComponent from './components/KittensComponent'

window.data = {
  kittens: true,
  isworking: true
}

export default {
  components: {
    ControlsComponent,
    StateTitleComponent,
    CountdownComponent,
    KittensComponent
  },
  data () {
    return window.data
  }
}

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
