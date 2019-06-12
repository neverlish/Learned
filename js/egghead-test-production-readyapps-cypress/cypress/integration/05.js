// 05 Use the Most Robust Selector for Cypress Tests

describe('Tood Application', () => {
  it('loads the page', () => {
    cy.visit('/')

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
