<template>
  <section class='section'>
    <h1 class='title'>{{timesTwo$}}</h1>
    <h1 class='title'>{{timesThree$}}</h1>
  </section>
</template>

<script>
import {Observable} from 'rxjs'

export default {
  subscriptions() {
    const interval$ = Observable.interval(1000)
    const timesTwo$ = interval$.map(i => i * 2)
    const timesThree$ = interval$.map(i => i * 3)
    return {
      timesTwo$,
      timesThree$
    }
  }
}
</script>

