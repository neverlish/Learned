describe('App initializaation', () => {
  it('Displays todos from API on load', () => {
    cy.server()
    // cy.fixture('todos')
    //   .then(todos => {
    //     cy.route('GET', '/api/todos', todos)
    //   })
    cy.route('GET', '/api/todos', 'fixture:todos')
    cy.visit('/')
    cy.get('.todo-list li').should('have.length', 4)
  })
})
