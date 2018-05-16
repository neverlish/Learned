<template>
  <section class='section'>
    <button class='button' v-stream:click='click$'>click</button>
    <h1 class='title'>{{luke$}}</h1>
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
    const luke$ = this.click$.switchMap(() => people$)
    return {
      luke$,
      people$
    }
  }
}
</script>

