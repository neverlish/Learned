<template>
  <h1>{{ msg }}</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    msg: 'getMessage'
  })
}
</script>
