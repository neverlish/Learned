<template>
  <div class="weather-info">
    <div class="icon">icon</div>
    <div class="temp">temp</div>
    <div class="text">text</div>
    <div class="location">location</div>
  </div>
</template>

<style lang="scss" scoped>
  .weather-info {
    padding: 20px;
    & > div {
      margin-bottom: 20px;
      padding: 20px;
      border: 1px solid #ccc;
    }
    .icon img {
      width: 140px;
    }
    .temp {
      font-size: 4em;
    }
    .text {
      font-size: 2em;
    }
  }
</style>