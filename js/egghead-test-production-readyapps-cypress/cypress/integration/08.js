// 08 Assert on Your Redux Store with Cypress

describe('Tood Application', () => {
  it('loads the page', () => {
    cy.visit('/')

    cy.window().its('store').invoke('getState')
      // .then(($state) => { console.log($state) })
      .should('deep.equal', {
        todos: [

        ],
        visibilityFilter: 'show_all'
      })

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
