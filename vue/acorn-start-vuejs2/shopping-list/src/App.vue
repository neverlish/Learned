<template>
  <div id="app" class='container'>
    <h2>{{ title }}</h2>
    <input type='text' v-model='title'>
    <add-item-component v-on:add='addItem'></add-item-component>
    <items-component :items='items'></items-component>
    <div class='footer'>
      <hr />
      <change-title-component v-model='title'></change-title-component>
    </div>
  </div>
</template>

<script>
import AddItemComponent from './components/AddItemComponent'
import ItemsComponent from './components/ItemsComponent'
import ChangeTitleComponent from './components/ChangeTitleComponent'

export default {
  components: {
    AddItemComponent,
    ItemsComponent,
    ChangeTitleComponent
  },
  data () {
    return {
      items: [ { text: 'Bananas', checked: true }, { text: 'Apples', checked: false } ],
      title: 'Shopping List'
    }
  },
  methods: {
    addItem (text) {
      this.items.push({
        text: text,
        checked: false
      })
    }
  }
}
</script>

<style>

</style>
