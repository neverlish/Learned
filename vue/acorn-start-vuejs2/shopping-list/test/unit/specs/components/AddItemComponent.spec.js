import { mount } from 'vue-test-utils'
import AddItemComponent from '@/components/AddItemComponent'
import mutations from '@/vuex/mutations'
import store from '@/vuex/store'

import { ADD_SHOPPING_LIST } from '@/vuex/mutation_types'

describe('AddItemComponent.vue', () => {
  describe('initialization', () => {
    it('should initialize the component with empty string newItem', () => {
      expect(AddItemComponent.data()).toEqual({
        newItem: ''
      })
    })
  })

  describe('addItem', () => {
    var component

    beforeEach(() => {
      component = mount(AddItemComponent, {
        template: '<add-item-component :items="items" :id="id" ref="additemcomponent">' +
        '</add-item-component>',
        data () {
          return {
            items: []
          }
        },
        propsData: {
          id: 'niceId'
        },
        store
      })

    })

    it('should call $emit method', () => {
      let newItem = 'Learning Vue JS'

      const spy_emit = jest.spyOn(component.vm, '$emit')
      const spy_dispatch = jest.spyOn(store, 'dispatch')

      mutations[ADD_SHOPPING_LIST](store.state, { id: 'niceId' })

      component.vm.newItem = newItem
      component.vm.addItem()

      expect(component.vm.newItem).toEqual('')
      expect(spy_emit).toHaveBeenCalledWith('add', newItem)
      expect(spy_dispatch).toHaveBeenCalledWith('updateList', 'niceId')

      spy_emit.mockRestore()
      spy_dispatch.mockRestore()
    })
  })
})
