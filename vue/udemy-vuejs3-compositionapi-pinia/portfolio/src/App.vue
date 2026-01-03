<script setup>
  import Navbar from './components/Navbar.vue';
  import data from './assets/portfolio';
</script>

<template>
  <Navbar />
  <router-view :data="data" />

</template>

<style scoped lang="scss">
</style>