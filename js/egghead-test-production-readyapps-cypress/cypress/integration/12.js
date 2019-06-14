// 12 Mock Network Retries with Cypress

describe('Tood Application', () => {
  beforeEach(function () {
    cy.fixture('todos/all.json').as('todos')
  })

  it('loads the page', function () {
    cy.server()
    // Alias the fixture data
    cy.route('/api/todos', '@todos').as('preload')

    cy.visit('/')
    cy.wait('@preload')

    cy.store('example.test.first').should('equal', 1)

    // Access the fixture data as this.todos
    cy.store('todos').should('deep.equal', this.todos)

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

  context.only('Todo createion retries', function () {
    beforeEach(function () {
      cy.server()
      // Alias the fixture data
      cy.route('/api/todos', '@todos').as('preload')

      cy.visit('/')
      cy.wait('@preload')

      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 500,
        response: ''
      }).as('createTodo')

      cy.get('.new-todo').type('3rd Todo{enter}')

      cy.wait('@createTodo')

      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 500,
        response: ''
      }).as('createTodo2')
      cy.wait('@createTodo2')
    })

    it('retries 3 times', function () {
      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 201,
        response: ''
      }).as('createTodo3')
      cy.wait('@createTodo3')

      cy.get('.todo-list')
        .children()
        .should('have.length', 3)
    })

    it('fails after 3 unsuccessful attempts', function () {
      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 500,
        response: ''
      }).as('createTodo3')
      cy.wait('@createTodo3')

      cy.get('.todo-list')
        .children()
        .should('have.length', 2)
    })
  })
})