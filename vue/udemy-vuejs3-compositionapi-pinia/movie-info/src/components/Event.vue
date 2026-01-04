<template>
  <div class="event" :class="{show : isOpen}">
    <p>{{ text }}</p>
    <button @click="isOpen=false">X</button>
  </div>
</template>
  
<script>
  export default {
    name: "EventComponent",
    props: {
      text: String,
      isEventOpen: Boolean,
    },
    data() {
      return {
        isOpen: true
      }
    }
  }
</script>
  
<style>
  .event {
    position: relative;
    background: #444;
    color: #fff;
    padding: 10px 20px;
    text-align: center;
    font-size: small;
    display: none;
  }

  .show {
    display: block;
  }

  .event p {
    margin: 0;
  }

  .event button {
    position: absolute;
    right: 20px;
    top: 8px;
    margin: 0;
  }
</style>