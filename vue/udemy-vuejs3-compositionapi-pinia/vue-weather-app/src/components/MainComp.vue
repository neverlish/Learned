<template>
  <div class="container">
    <SearchBar/>
    <WeatherInfo :weatherData="props.weatherData"/>
  </div>
</template>

<script setup>
  import SearchBar from './SearchBar.vue';
  import WeatherInfo from './WeatherInfo.vue';

  // 날씨 데이터 상태변수
  const props = defineProps({
    weatherData: Object,
  })
  console.log(props.weatherData);
</script>

<style lang="scss" scoped>
  .container {
    padding: 20px;
  }
</style>