<template>
  <input v-model='msg' @keyup='changeMsg'>
</template>

<script>
export default {
  computed: {
    msg() {
      return this.$store.state.msg
    }
  },
  methods: {
    changeMsg(ev) {
      this.$store.commit('changeMessage', ev.target.value)
    }
  }
}
</script>
