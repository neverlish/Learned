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
    const createLoader = url => Observable.from(
      this.$http.get(url)
    ).pluck('data')

    const luke$ = this.click$
      .mapTo('https://starwars.egghead.training/people/1')
      .switchMap(createLoader)
      // .catch(err => Observable.of({name: 'Failed ... :('}))
      .catch(err => createLoader('https://starwars.egghead.training/people/2'))
    
    const name$ = luke$.pluck('name')
    const loadImage$ = luke$
      .pluck('image')
      .map(image => `https://starwars.egghead.training/${image}`)

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

