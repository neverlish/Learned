// 19 Full End-To-End Testing in Cypress

describe('Todo Application', () => {
  context('With mocked backend', function () {

    beforeEach(function () {
      cy.fixture('todos/all.json').as('todos')

      cy.server({ force404: true })
      // Alias the fixture data
      cy.route('/api/todos', '@todos').as('preload')

      cy.visit('/')
      cy.wait('@preload')
    })

    it('loads the page', function () {
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
  })

  context('Todo Creation Retries', function () {
    beforeEach(function () {
      cy.route({
        method: "POST",
        url: "/api/todos",
        status: 500,
        response: ""
      }).as("createTodo");

      cy.get('.new-todo').type('2nd Todo{enter}')

      cy.wait('@createTodo')

      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 500,
        response: "",
      }).as('createTodo2')

      cy.wait('@createTodo2')
    })

    it('retries 3 times', function () {
      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 200,
        response: "",
      }).as('createTodo3')

      cy.wait('@createTodo3')

      cy.get('.todo-list')
        .children()
        .should('have.length', 3)

      cy.get('.todo-list li:nth-child(3)').should('exist')
    })

    it('fails after 3 unsuccessful attempts', function () {
      cy.route({
        method: 'POST',
        url: '/api/todos',
        status: 500,
        response: "",
      }).as('createTodo3')

      cy.wait('@createTodo3')

      cy.get('.todo-list')
        .children()
        .should('have.length', 2)

      cy.get('.todo-list li:nth-child(3)').should('not.exist')
    })

  })

  context('Editing Todos', function () {
    it('edits existing todos', function () {
      cy.route('PUT', '/api/todos/1', 'ok', { delay: 20 }).as('update')

      cy.get('.todo-list li:nth-child(1) label').dblclick()
      cy.get('.todo-list li:nth-child(1) .edit').clear().type('Updated todo{enter}')
      cy.wait('@update')

      cy.store('todos')
        .lo_find((todo) => { return todo.id == 1; })
        .should('deep.equal', {
          id: 1,
          text: 'Updated todo',
          completed: false
        })
    })

  })

  context('Full end-to-end testing', function () {
    beforeEach(function () {
      cy.visit('/')
    })

    it('performs a hello world', function () {
      cy.task('hello', { name: 'world' })
    })

    it('seed the database', function () {
      cy.seed({ todos: [{}, { text: 'Hello World 2', completed: true }] })

      cy.visit('/')

      cy.get('.todo-list li:nth-child(1)')
        .should('have.text', 'Hello World')
        .should('not.have.class', 'completed')
        .find(`.toggle`)
        .should('not.be.checked')

      cy.get('.todo-list li:nth-child(2)')
        .should('have.text', 'Hello World 2')
        .should('have.class', 'completed')
        .find(`.toggle`)
        .should('be.checked')

      cy.get('.todo-list').children().its('length').should('equal', 2)
    })

    it('resets between tests', function () {
      cy.seed({ todos: [{}, { text: 'Hello World 2', completed: true }] })

      cy.visit('/')

      cy.get('.todo-list li:nth-child(1)')
        .should('have.text', 'Hello World')
        .should('not.have.class', 'completed')
        .find(`.toggle`)
        .should('not.be.checked')

      cy.get('.todo-list').children().its('length').should('equal', 2)
    })

    it('asserts against the database', function () {
      cy.task('db:snapshot', 'todos').should('be.empty')

      cy.get('.new-todo').type('3rd Todo{enter}')

      cy.get('.todo-list li:nth-child(1)')
        .should('have.text', '3rd Todo')

      cy.task('db:snapshot', 'todos').should('deep.equal', [
        {
          id: 1,
          text: '3rd Todo',
          completed: false
        }
      ])
    })

    it('tests XHR requests', function () {
      cy.server()
      cy.visit('/')

      cy.task('db:snapshot', 'todos').should('be.empty')
      cy.store('todos').should('be.empty')

      cy.route({
        method: 'POST',
        url: '/api/todos'
      }).as('createTodo')

      cy.get('.new-todo').type('1st Todo{enter}')
      cy.wait('@createTodo').then((xhr) => {
        cy.wrap(xhr.status).should('equal', 201)
        cy.wrap(xhr.response.body).should('deep.equal', { id: 1, text: '1st Todo', completed: false })
      })
    })

    it.only('performs full end-to-end testing', function () {
      const todos = [
        {
          id: 1,
          text: 'Hello World',
          completed: false
        },
        {
          id: 2,
          text: 'Goodnight Moon',
          completed: true
        }
      ]
      cy.task('db:snapshot', 'todos').should('be.empty')

      cy.server()

      cy.seed({ todos: [{}, { text: 'Goodnight Moon', completed: true }] })
      cy.task('db:snapshot', 'todos').should('deep.equal', todos)

      cy.route('GET', '/api/todos').as('preload')

      cy.visit('/')

      cy.store('todos').should('be.empty')

      cy.wait('@preload').its('response.body').should('deep.equal', todos)

      cy.store('todos').should('deep.equal', todos)

      cy.get('.todo-list').children().should('have.length', 2)
    })
  })
})