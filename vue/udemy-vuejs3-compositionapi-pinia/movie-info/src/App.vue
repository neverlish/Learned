<template>
  <h1>영화정보</h1>
  <div v-for="(movie, i) in data" :key="i">
    <h3 class="bg-yellow" :style="textRed">{{ movie.title }}</h3>
    <p>개봉: {{ movie.year }}</p>
    <p>장르: {{ movie.category }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      data: [
        {
          title: '노량',
          year: 2023,
          category: '액션',
          textRed: 'color: red;'
        },
        {
          title: '아쿠아맨과 로스트 킹덤',
          year: 2023,
          category: '액션, 판타지, 어드벤처',
        },
        {
          title: '3월의 휴가',
          year: 2023,
          category: '판타지, 드라마',
        },
      ]
    }
  }
}
</script>

<style>
.bg-yellow {
  background-color: yellow;
}
</style>
