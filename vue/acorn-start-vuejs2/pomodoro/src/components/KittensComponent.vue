<template>
  <div class="well kittens">
    <img v-bind:src='catimgsrc' />
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  computed: {
    catimgsrc () {
      return 'http://thecatapi.com/api/images/get?size=med&ts=' + this.$store.getters.getTimestamp
    }
  }
}
</script>
