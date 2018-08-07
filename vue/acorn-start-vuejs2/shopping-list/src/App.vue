<template>
  <div id="app" class="container">
    <ul class="nav nav-tabs" role="tablist">
      <li :class= "index === 0 ? 'active' : ''" v-for="(list, index) in shoppinglists" role="presentation" :key='index'>
        <shopping-list-title-component :id="list.id" :title="list.title"></shopping-list-title-component>
      </li>
    </ul>
    <div class="tab-content">
      <div :class= "index === 0 ? 'active' : ''" v-for="(list, index) in shoppinglists" class="tab-pane" role="tabpanel" :id="list.id" :key='index'>
        <shopping-list-component :title="list.title" :items="list.items" :id='list.id' v-on:changeTitle='onChangeTitle'></shopping-list-component>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingListComponent from './components/ShoppingListComponent'
import ShoppingListTitleComponent from './components/ShoppingListTitleComponent'
import _ from 'underscore'

import store from './vuex/store'

export default {
  store,
  components: {
    ShoppingListComponent,
    ShoppingListTitleComponent
  },
  data () {
    return {
      shoppinglists: [
        {
          id: 'groceries',
          title: 'Groceries',
          items: [{ text: 'Bananas', checked: true }, { text: 'Apples', checked: false }]
        },
        {
          id: 'clothes',
          title: 'Clothes',
          items: [{ text: 'black dress', checked: false }, { text: 'all stars', checked: false }]
        }
      ]
    }
  },
  methods: {
    onChangeTitle (id, text) {
      _.findWhere(this.shoppinglists, { id: id }).title = text
    }
  }
}
</script>

<style>

</style>
