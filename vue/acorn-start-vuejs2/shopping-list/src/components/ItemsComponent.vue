<template>
  <div>
    <item-component v-for='item in items' :item='item' :key='item.text' :id='id'></item-component>
  </div>
</template>

<script>
import ItemComponent from './ItemComponent'
export default {
  components: {
    ItemComponent
  },
  props: ['items', 'id']
}
</script>
