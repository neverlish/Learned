<template>
  <div class="container">
    <SearchBar/>
    <WeatherInfo/>
  </div>
</template>

<script setup>
  import SearchBar from './SearchBar.vue';
  import WeatherInfo from './WeatherInfo.vue';

</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
  }
</style>