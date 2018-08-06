<template>
  <div>
    <show-greetings-component :msg='msg'></show-greetings-component>
    <change-greetings-component :msg='msg'></change-greetings-component>
  </div>
</template>

<script>
import ShowGreetingsComponent from './components/ShowGreetingsComponent'
import ChangeGreetingsComponent from './components/ChangeGreetingsComponent'
import store from './vuex/store'

export default {
  components: {
    ShowGreetingsComponent,
    ChangeGreetingsComponent
  },
  store
}
</script>

<style>

</style>
