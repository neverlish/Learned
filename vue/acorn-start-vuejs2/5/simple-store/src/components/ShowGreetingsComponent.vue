<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  computed: {
    msg() {
      return this.$store.state.msg
    }
  }
}
</script>
