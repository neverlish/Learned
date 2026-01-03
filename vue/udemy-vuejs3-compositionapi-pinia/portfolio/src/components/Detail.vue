<template>
  <section id="detail" class="container">
    <h1>{{ props.data[$route.params.id].title }}</h1>
    {{ $route.params.id }}
  </section>  
</template>
  
<script setup>
  const props = defineProps({
    data: Array,
  }) 
</script>
  
<style>
  
</style>