// 11 Reuse Data with Cypress Fixtures

describe('Tood Application', () => {
  beforeEach(function () {
    cy.fixture('todos/all.json').as('todosPreload')
  })

  it('loads the page', function () {
    cy.server()

    let todos = [
      {
        "id": 1,
        "text": "Hello world",
        "completed": false
      },
      {
        "id": 2,
        "text": "Goodnight moon",
        "completed": true
      }
    ]

    // Alias the fixture data
    cy.route('/api/todos', todos).as('preload')

    cy.visit('/')
    cy.wait('@preload')

    cy.store('example.test.first').should('equal', 1)

    cy.store('todos').should('deep.equal', todos)

    cy.contains('Hello world')
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find(`.toggle`)
      .should('not.be.checked')

    cy.get('.todo-list li:nth-child(2)')
      .should('have.text', 'Goodnight moon')
      .should('have.class', 'completed')
      .find(`.toggle`)
      .should('be.checked')
  })

  it('creates new todos', function () {
    cy.server()

    cy.route('/api/todos', '@todosPreload').as('preload')

    cy.visit('/')
    cy.wait('@preload')

    cy.store('example.test.first').should('equal', 1)

    cy.store('todos').should('deep.equal', this.todosPreload)

    cy.contains('Hello world')
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find(`.toggle`)
      .should('not.be.checked')

    cy.get('.todo-list li:nth-child(2)')
      .should('have.text', 'Goodnight moon')
      .should('have.class', 'completed')
      .find(`.toggle`)
      .should('be.checked')
  })
})
