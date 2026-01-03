<template>
  <div class="event">
    <p>{{ text }}</p>
  </div>
</template>
  
<script>
  export default {
    name: "EventComponent",
    props: {
      text: String,
    }
  }
</script>
  
<style>
  .event {
    background: #444;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
    font-size: small;
  }
  .event p {
    margin: 0;
  }
</style>