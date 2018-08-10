import * as types from './mutation_types'
import getters from './getters'
import _ from 'underscore'

export default {
  [types.CHANGE_TITLE] (state, title, id) {
    getters.getListById(state, id).title = title
  },
  [types.POPULATE_SHOPPING_LISTS] (state, lists) {
    state.shoppinglists = lists
  },
  [types.ADD_SHOPPING_LIST] (state, newList) {
    if (_.isObject(newList)) {
      state.shoppinglists.push(newList)
    }
  },
  [types.DELETE_SHOPPING_LIST] (state, id) {
    state.shoppinglists = _.reject(state.shoppinglists, (list) => {
      return list.id === id
    })
  }
}
