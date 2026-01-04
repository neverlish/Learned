<script setup>
  import Navbar from './components/Navbar.vue';
  import MainComp from './components/MainComp.vue';
  import { ref, onMounted } from 'vue';
 
  const API_KEY = import.meta.env.VITE_API_KEY;

  // 날씨 데이터 상태변수
  const weatherData = ref({
    icon: 'icon',
    temp: 0,
    text: 'text',
    location: 'location',
    city: 'Seoul',
  });

  // 앱이 실행되면 날씨 데이터 가져오기
  function getWeather() {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.value.city}&appid=${API_KEY}`;
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        weatherData.value.icon = data.weather[0].icon;
        weatherData.value.temp = data.main.temp;
        weatherData.value.text = data.weather[0].description;
        weatherData.value.location = data.sys.country;
        weatherData.value.city = data.name;
      })
      .catch(err => {
        alert('에러가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      })
  }

  // 앱이 실행되면 날씨 데이터 가져오기
  onMounted(() => {
    getWeather();
  })

  const onSearchCity = (city) => {
    weatherData.value.city = city;
    getWeather();
  }
</script>

<template>
  <Navbar/>
  <MainComp 
    :weatherData="weatherData"
    @onSearchCity="onSearchCity"
  />
</template>

<style scoped lang="scss">

</style>