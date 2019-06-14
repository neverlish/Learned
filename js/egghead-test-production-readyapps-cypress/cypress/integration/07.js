// 07 Mock Your Backend with Cypress

describe('Tood Application', () => {
  it('loads the page', () => {
    cy.server()

    cy.route('/api/todos', [
      {
        "text": "Hello world",
        "completed": false,
        "id": 3
      },
      {
        "id": 4,
        "completed": true,
        "text": "Goodnight moon"
      }
    ]).as('preload')

    cy.visit('/')

    cy.wait('@preload')

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
