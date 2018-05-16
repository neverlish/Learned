<template>
  <section class='section'>
    <button class='button' v-stream:click='click$'>click</button>
    <h1 class='title'>{{name$}}</h1>
    <img v-stream:error='imageError$' :src='image$' alt=''>
  </section>
</template>

<script>
import {Observable} from 'rxjs'

export default {
  domStreams: ['click$', 'imageError$'],
  subscriptions() {
    const person$ = Observable.from(
      this.$http.get(
        'https://starwars.egghead.training/people/1'
      )
    ).pluck('data')
    const luke$ = this.click$.switchMap(() => person$)
    
    const name$ = luke$.pluck('name')
    const loadImage$ = luke$
      .pluck('image')
      .map(
        image => 
          `https://starwars.egghead.training/${image}`
      )

    const failImage$ = this.imageError$.mapTo(`http://via.placeholder.com/400x400`)
    const image$ = Observable.merge(
      loadImage$,
      failImage$
    )
    return {
      name$,
      image$
    }
  }
}
</script>

