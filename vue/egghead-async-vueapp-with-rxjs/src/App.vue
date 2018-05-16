<template>
  <section class='section'>
    <button class='button' v-stream:click='click$'>click</button>
    <h1 class='title'>{{people$}}</h1>
  </section>
</template>

<script>
import {Observable} from 'rxjs'

export default {
  domStreams: ['click$'],
  subscriptions() {
    const people$ = Observable.from(
      this.$http.get(
        'https://starwars.egghead.training/people/1'
      )
    ).pluck('data', 'name')
    const random$ = this.click$.map(() => Math.random())
    return {
      random$,
      people$
    }
  }
}
</script>

