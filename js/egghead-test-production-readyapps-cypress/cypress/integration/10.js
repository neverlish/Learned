// 10 Wrap External Libraries with Cypress

const _ = require('lodash')

describe('Tood Application', () => {
  it('loads the page', () => {
    cy.server()
    // Alias the fixture data
    let todos = [
      {
        id: 1,
        text: '1st Todo',
        completed: false
      },
      {
        id: 2,
        text: '2nd Todo',
        completed: true
      },
      {
        id: 3,
        text: '3rd Todo',
        completed: false
      },
      {
        id: 4,
        text: '4th Todo',
        completed: true
      },
      {
        id: 5,
        text: '5th Todo',
        completed: false
      },
    ]

    cy.route('/api/todos', todos).as('preload')

    cy.visit('/')
    cy.wait('@preload')

    cy.store('example.test.first').should('equal', 1)

    // Access the fixture data as this.todos
    cy.store('todos')
      .lo_find((todo) => { return todo.id === 1 })
      .lo_pick('text')
      .should('deep.equal', {
        text: '1st Todo'
      })
  })
})
