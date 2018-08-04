<template>
  <div id="app" class='container'>
    <h2>
      <span>Pomodoro</span>
      <controls-component></controls-component>
    </h2>
    <state-title-component></state-title-component>
    <countdown-component></countdown-component>
    <kittens-component></kittens-component>
  </div>
</template>

<script>
import ControlsComponent from './components/ControlsComponent'
import StateTitleComponent from './components/StateTitleComponent'
import CountdownComponent from './components/CountdownComponent'
import KittensComponent from './components/KittensComponent'

export default {
  components: {
    ControlsComponent,
    StateTitleComponent,
    CountdownComponent,
    KittensComponent
  }
}

</script>

<style>

</style>
