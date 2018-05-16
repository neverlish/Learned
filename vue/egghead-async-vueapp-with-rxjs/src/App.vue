<template>
  <section class='section'>
    {{activeTab$}}
    <b-tabs v-model='activeTab'>
      <b-tab-item
        v-for='person of people$'
        :key='person.id'
        :label='person.name'></b-tab-item>
    </b-tabs>
    <button class='button' :disabled='disabled$' v-stream:click='{subject:click$, data: 1}'>{{buttonText$}}</button>
    <button class='button' :disabled='disabled$' v-stream:click='{subject:click$, data: 4}'>{{buttonText$}}</button>
    <button class='button' :disabled='disabled$' v-stream:click='{subject:click$, data: 5}'>{{buttonText$}}</button>
    <h1 class='title'>{{name$}}</h1>
    <img v-stream:error='imageError$' :src='image$' alt=''>
  </section>
</template>

<script>
import {Observable} from 'rxjs'

export default {
  data() {
    return {
      activeTab: 0
    }
  },
  domStreams: ['click$', 'imageError$'],
  subscriptions() {
    const createLoader = url => Observable.from(
      this.$http.get(url)
    ).pluck('data')

    const people$ = createLoader(
      `https://starwars.egghead.training/people`
    ).map(people => people.slice(0, 7))

    const activeTab$ = this.$watchAsObservable(
      'activeTab',
      { immediate: true }
    ).pluck('newValue')
    

    const luke$ = activeTab$
      // .map(tabId => this.people[tabId].id)
      .combineLatest(
        people$, 
        (tabId, people) => people[tabId].id
      )
      .map(id => `https://starwars.egghead.training/people/${id}`)
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
      buttonText$,
      activeTab$,
      people$
    }
  }
}
</script>

