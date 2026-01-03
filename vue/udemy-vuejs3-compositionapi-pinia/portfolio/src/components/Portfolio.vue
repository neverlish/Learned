<template>
    <section id="portfolio" class="container">
      <h1>Portfolio</h1>
      <ul class="list row">
        <li class="col-md-4" v-for="item in data">
          <img :src="item.imgUrl" alt="1">
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
          <small class="mb-3 text-secondary">{{  item.skills }}</small>
          <router-link 
            class="btn btn-primary" 
            :to="'/detail/' + item.id"
          >상세보기</router-link>
        </li>
      </ul>
    </section>
</template>
  
<script setup>
  const props = defineProps({
    data: Array,
  })
  console.log(props.data)
</script>
  
<style lang="scss">
   #portfolio {
    h1 { margin-bottom: 1rem; }
    .list {
      list-style-type: none;
      padding: 0;

      li {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 10vh;
        img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          object-position: top;
          margin-bottom: 1em;
        }
        h4 { margin-top: 1rem; }
      }
    }
  } 
</style>