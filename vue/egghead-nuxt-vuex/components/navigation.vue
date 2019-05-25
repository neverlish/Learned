<template>
  <nav class="pa3 pa4-ns">
    <nuxt-link exact to="/" class="link dim gray b f6 f5-ns dib mr3" title="Home">Home</nuxt-link>
    <nuxt-link to="/active" class="link dim gray b f6 f5-ns dib mr3" title="Active">Active</nuxt-link>
    <nuxt-link to="/completed" class="link dim gray b f6 f5-ns dib mr3" title="Completed">Completed</nuxt-link>
  </nav>
</template>

<style scoped>
a.nuxt-link-active {
  color: black;
  font-weight: bold;
}
</style>
