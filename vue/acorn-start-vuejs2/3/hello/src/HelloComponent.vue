<template lang='jade'>
  h1 {{ msg }}
</template>

<script lang='coffee'>
exports.default = data: ->
  { msg: 'Hello! '}
</script>

<style lang='scss' scoped>
  $red: red;
  h1 {
    color: $red;
  }
</style>

