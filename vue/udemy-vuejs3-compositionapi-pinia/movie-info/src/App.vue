<template>
  <h1>영화정보</h1>
  <div>
    <h3 class="bg-yellow" :style="textRed">{{ title }}</h3>
    <p>개봉: {{ year }}</p>
    <p>장르: {{ category }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: '노량',
      year: 2023,
      category: '액션',
      textRed: 'color: red;'
    }
  }
}
</script>

<style>
.bg-yellow {
  background-color: yellow;
}
</style>
