// 04 Write Your First Cypress Integration Test

describe('Tood Application', () => {
  it('loads the page', () => {
    cy.visit('/')
    cy.get('.todo-list li:nth-child(2)').should('have.text', 'Goodnight moon')
      .should('have.class', 'completed')
      .find(`.toggle`)
      .should('be.checked')
  })
})
