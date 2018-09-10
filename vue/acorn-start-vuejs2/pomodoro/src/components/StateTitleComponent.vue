<template>
  <h3>{{ isworking ? workingtitle : restingtitle }}</h3>
</template>

<style scoped>
</style>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      workingtitle: 'Work!',
      restingtitle: 'Rest!'
    }
  },
  computed: mapGetters({
    isworking: 'isWorking'
  })
}
</script>
