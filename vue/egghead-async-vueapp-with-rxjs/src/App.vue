<template>
  <section class='section'>
    <button class='button' :disabled='disabled$' v-stream:click='click$'>{{buttonText$}}</button>
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
      .exhaustMap(createLoader)
      // .catch(err => Observable.of({name: 'Failed ... :('}))
      .catch(err => createLoader('https://starwars.egghead.training/people/2'))
      .share()
    
    const disabled$ = Observable.merge(
      this.click$.mapTo(true),
      luke$.mapTo(false)
    ).startWith(false)

    const buttonText$ = disabled$
      .map(bool => bool ? 'Loading...' : 'Load')

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
      image$,
      disabled$,
      buttonText$
    }
  }
}
</script>

