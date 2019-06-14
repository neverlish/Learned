// 06 Debug and Log with Cypress

describe('Tood Application', () => {
  it('loads the page', () => {
    cy.visit('/')

    cy.log('About to fetch the element')

    cy.wrap(5).should('eq', 5)

    cy.get('.todo-list li:nth-child(1)')
      // .then((element) => { debugger; })
      .debug()
      .should('have.text', 'Hello world')
      .should('not.have.class', 'completed')
      .find(`.toggle`)
      .should('not.be.checked')

    debugger

    cy.get('.todo-list li:nth-child(2)')
      .should('have.text', 'Goodnight moon')
      .should('have.class', 'completed')
      .find(`.toggle`)
      .should('be.checked')
  })
})
