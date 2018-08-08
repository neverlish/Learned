import { CHANGE_TITLE, POPULATE_SHOPPING_LISTS } from './mutation_types'
import api from '../api'

export default {
  changeTitle: ({ commit }, data) => {
    commit(CHANGE_TITLE, data)
  },
  populateShoppingLists: ({ commit }) => {
    api.fetchShoppingLists().then(response => {
      commit(POPULATE_SHOPPING_LISTS, response.data)
    })
  }
}
