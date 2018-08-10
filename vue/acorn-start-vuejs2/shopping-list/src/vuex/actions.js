import { CHANGE_TITLE, POPULATE_SHOPPING_LISTS, ADD_SHOPPING_LIST, DELETE_SHOPPING_LIST } from './mutation_types'
import api from '../api'
import getters from './getters'

export default {
  changeTitle: (store, data) => {
    store.commit(CHANGE_TITLE, data)
    store.dispatch('updateList', data.id)
  },
  populateShoppingLists: ({ commit }) => {
    api.fetchShoppingLists().then(response => {
      commit(POPULATE_SHOPPING_LISTS, response.data)
    })
  },
  updateList: (store, id) => {
    let shoppingList = getters.getListById(store.state, id)
    api.updateShoppingList(shoppingList)
  },
  createShoppingList: (store, shoppinglist) => {
    api.addNewShoppingList(shoppinglist).then(() => {
      store.dispatch('populateShoppingLists')
    }, () => {
      store.commit(ADD_SHOPPING_LIST, shoppinglist)
    })
  },
  deleteShoppingList: (store, id) => {
    api.deleteShoppingList(id).then(() => {
      store.dispatch('populateShoppingLists')
    }, () => {
      store.commit(DELETE_SHOPPING_LIST, id)
    })
  }
}
