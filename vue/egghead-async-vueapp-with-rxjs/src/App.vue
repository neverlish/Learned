<template>
  <section class='section'>
    <button class='button' v-stream:click='click$'>click</button>
    <h1 class='title'>{{random$}}</h1>
  </section>
</template>

<script>
import {Observable} from 'rxjs'

export default {
  domStreams: ['click$'],
  subscriptions() {
    const random$ = this.click$.map(() => Math.random())
    return {
      random$
    }
  }
}
</script>

