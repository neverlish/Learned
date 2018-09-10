import Vue from 'vue'
import actions from '@/vuex/actions'
import { CHANGE_TITLE, POPULATE_SHOPPING_LISTS } from '@/vuex/mutation_types'

describe('actions.js', () => {
  var store, lists, spy, successDelete, successPost, successPut

  beforeEach(function () {
    lists = [{
      id: '1',
      title: 'Groceries'
    }, {
      id: '2',
      title: 'Clothes'
    }]

    successDelete = { 'delete': true }
    successPost = { 'post': true }
    successPut = { 'put': true }

    store = {
      commit: (method, data) => {},
      dispatch: () => {
        return Promise.resolve()
      },
      state: {
        shoppinglists: lists
      }
    }

    spy = jest.spyOn(store, 'commit')
    jest.spyOn(store, 'dispatch')

    const routes = [
      {
        method: 'GET',
        url: 'http://localhost:3000/shoppinglists{/id}',
        response: JSON.stringify(lists)
      },
      {
        method: 'POST',
        url: 'http://localhost:3000/shoppinglists{/id}',
        response: JSON.stringify(successPost)
      },
      {
        method: 'PUT',
        url: 'http://localhost:3000/shoppinglists{/id}',
        response: JSON.stringify(successPut)
      },
      {
        method: 'DELETE',
        url: 'http://localhost:3000/shoppinglists{/id}',
        response: JSON.stringify(successDelete)
      }
    ]

    Vue.http.interceptors.unshift((request, next) => {
      const route = routes.find((item) => request.method === item.method && request.url === item.url)

      const response = route
        ? request.respondWith(route.response, { status: 200 })
        : request.respondWith({ status: 404, statusText: 'Not found' })
      next(response)
    })
  })

  afterEach(function () {
    spy.mockRestore()
    Vue.http.interceptors.shift()
  })

  describe('populateShoppingLists', () => {
    it('should call commit method with POPULATE_SHOPPING_LIST string parameter', done => {
      actions.populateShoppingLists(store).then(() => {
        expect(spy).toHaveBeenCalledWith(POPULATE_SHOPPING_LISTS, lists)
        done()
      }).catch(done)
    })
  })

  describe('changeTitle', () => {
    it('should call commit method with CHANGE_TITLE string', done => {
      let title = 'new title'

      actions.changeTitle(store, { title: title, id: '1' })
      expect(spy).toHaveBeenCalledWith(CHANGE_TITLE, { title: title, id: '1' })
      done()
    })
  })
})
