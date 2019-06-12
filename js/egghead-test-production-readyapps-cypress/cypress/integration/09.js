// 09 Create Custom Cypress Commands

describe('Tood Application', () => {
  it('loads the page', () => {
    cy.server()
    cy.route('/api/todos', [
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
    ]).as('preload')

    cy.visit('/')
    cy.wait('@preload')

    cy.store('todos').should('deep.equal', [{
      id: 1,
      text: 'Hello world',
      completed: false
    }, {
      id: 2,
      text: 'Goodnight moon',
      completed: true
    }])

    cy.get('.todo-list li:nth-child(1)')
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
