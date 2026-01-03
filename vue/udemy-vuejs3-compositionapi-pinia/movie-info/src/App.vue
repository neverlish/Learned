<template>
  <h1>영화정보</h1>
  <div v-for="(movie, i) in data" :key="i" class="item">
    <figure>
      <img :src="`${movie.imgUrl}`" :alt="movie.title">
    </figure>
    <div class="info">
      <h3 class="bg-yellow">{{ movie.title }}</h3>
      <p>개봉: {{ movie.year }}</p>
      <p>장르: {{ movie.category }}</p>
      <button @click="increaseLike(i)">좋아요</button>
      <span>{{ movie.like }}</span>
      <p>
        <button @click="isModal=true">상세보기</button>
      </p>
    </div>
  </div>
  <div class="modal" v-if="isModal">
    <div class="inner">
      <h3>Detail</h3>
      <p>영화 상세정보</p>
      <button>닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isModal: false,
      data: [
        {
          title: '노량',
          year: 2023,
          category: '액션',
          textRed: 'color: red;',
          like: 0,
          imgUrl: './assets/노량.jpg'
        },
        {
          title: '아쿠아맨과 로스트 킹덤',
          year: 2023,
          category: '액션, 판타지, 어드벤처',
          like: 0,
          imgUrl: './assets/아쿠아맨.jpg'
        },
        {
          title: '3월의 휴가',
          year: 2023,
          category: '판타지, 드라마',
          like: 0,
          imgUrl: './assets/3월의휴가.jpg'
        },
      ]
    }
  },
  methods: {
    increaseLike(i) {
      this.data[i].like++;
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}

body {
  max-width: 768px;
  margin: 0 auto;
  padding: 20px;
}

h1,
h2,
h3 {
  margin-bottom: 1rem;
}

p {
  margin-bottom: 0.5rem;
}

button {
  margin-right: 10px;
  margin-top: 1rem;
}

.item {
  width: 100%;
  border: 1px solid #ccc;
  display: flex;
  margin-bottom: 20px;
  padding: 1rem;
}

.item figure {
  width: 30%;
  margin-right: 1rem;
}

.item img {
  width: 100%;
}

.item .info {
  width: 100%;
}

.modal {
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal .inner {
  background: #fff;
  width: 80%;
  padding: 20px;
  border-radius: 10px;
}
</style>
