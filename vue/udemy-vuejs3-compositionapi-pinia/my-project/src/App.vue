<script setup>
  import { onMounted, ref } from 'vue';
  
  let count = ref(0);
  let title = "Hello Vue";

  onMounted(() => {
    console.log('mounted');
  });

  const increaseCount = () => {
    count.value++;
  };
</script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="increaseCount">count++</button>
    <p>{{ count }}</p>
  </div>
</template>

<style scoped>

</style>
