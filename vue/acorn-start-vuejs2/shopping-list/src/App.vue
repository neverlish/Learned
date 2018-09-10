<template>
  <div id="app" class="container">
    <ul class="nav nav-tabs" role="tablist">
      <li :class= "index === 0 ? 'active' : ''" v-for="(list, index) in shoppinglists" role="presentation" :key='index'>
        <shopping-list-title-component :id="list.id" :title="list.title"></shopping-list-title-component>
      </li>
      <li>
        <a href='#' @click='addShopingList'>
          <i class='glyphicon glyphicon-plus-sign'></i>
        </a>
      </li>
    </ul>
    <div class="tab-content">
      <div :class= "index === 0 ? 'active' : ''" v-for="(list, index) in shoppinglists" class="tab-pane" role="tabpanel" :id="list.id" :key='index'>
        <shopping-list-component :title="list.title" :items="list.items" :id='list.id'></shopping-list-component>
      </div>
    </div>
  </div>
</template>

<script>
import ShoppingListComponent from './components/ShoppingListComponent'
import ShoppingListTitleComponent from './components/ShoppingListTitleComponent'

import store from './vuex/store'
import { mapGetters, mapActions } from 'vuex'

import _ from 'underscore'

export default {
  store,
  components: {
    ShoppingListComponent,
    ShoppingListTitleComponent
  },
  computed: mapGetters({
    shoppinglists: 'getLists'
  }),
  methods: _.extend({},
    mapActions(['populateShoppingLists', 'createShoppingList']),
    {
      addShopingList () {
        let list = {
          title: 'New Shopping List',
          items: []
        }
        this.createShoppingList(list)
      }
    }
  ),
  mounted () {
    this.populateShoppingLists()
  }
}
</script>

<style>

</style>
