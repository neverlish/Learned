import mutations from '@/vuex/mutations'
import { ADD_SHOPPING_LIST, DELETE_SHOPPING_LIST, POPULATE_SHOPPING_LISTS, CHANGE_TITLE } from '@/vuex/mutation_types'

describe('mutations.js', () => {
  var state

  beforeEach(() => {
    state = {
      shoppinglists: []
    }
  })

  describe('ADD_SHOPPING_LIST', () => {
    it('should add item to the shopping list array and increase its length', () => {
      // add_shopping_list 변이를 호출
      mutations[ADD_SHOPPING_LIST](state, { id: '1' })
      // 기존 배열이 새로운 객체를 담은 배열과 동일한지 검사한다
      expect(state.shoppinglists).toEqual([{ id: '1' }])
      // 기존 배열의 길이가 증가했는지 검사한다
      expect(state.shoppinglists).toHaveLength(1)
    })

    it('should not add the item if item is empty', () => {
      mutations[ADD_SHOPPING_LIST](state)
      expect(state.shoppinglists).toHaveLength(0)
    })
  })

  describe('DELETE_SHOPPING_LIST', () => {
    it('should remove item from the shopping list array', () => {
      state.shoppinglists = [{ id: '1' }, { id: '2' }, {id: 3}]
      mutations[DELETE_SHOPPING_LIST](state, '1')
      expect(state.shoppinglists).toEqual([{id: '2'}, {id: 3}])
    })
  })

  describe('POPULATE_SHOPPING_LISTS', () => {
    it('should assign to the value of shopping lists the given property', () => {
      mutations[POPULATE_SHOPPING_LISTS](state, [{id: '1'}])
      expect(state.shoppinglists).toEqual([{ id: '1' }])
    })
  })

  describe('CHANGE_TITLE', () => {
    it('should change the title of the given list', () => {
      let title = 'learning vue.js'
      state.shoppinglists = [{ id: '1', title: 'groceries' }, { id: '2', title: 'clothes' }]
      mutations[CHANGE_TITLE](state, title, '1')
      expect(state.shoppinglists).toEqual([{ id: '1', title: title }, { id: '2', title: 'clothes' }])
    })
  })
})
