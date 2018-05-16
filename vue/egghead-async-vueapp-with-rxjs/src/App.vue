<template>
  <section class='section'>
    <button class='button' v-stream:click='click$'>click</button>
    <h1 class='title'>{{name$}}</h1>
    <img :src='image$' alt=''/>
  </section>
</template>

<script>
import {Observable} from 'rxjs'

export default {
  domStreams: ['click$'],
  subscriptions() {
    const person$ = Observable.from(
      this.$http.get(
        'https://starwars.egghead.training/people/1'
      )
    ).pluck('data')
    const luke$ = this.click$.switchMap(() => person$)
    
    const name$ = luke$.pluck('name')
    const image$ = luke$.pluck('image').map(image => `https://starwars.egghead.training/${image}`)
    return {
      name$,
      image$
    }
  }
}
</script>

