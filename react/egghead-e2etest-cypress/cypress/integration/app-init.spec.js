describe('App initializaation', () => {
  it('Displays todos from API on load', () => {
    cy.server()
    cy.route('GET', '/api/todos', [
      {id: 1, name: 'One', isCompleted: false},
      {id: 2, name: 'Two', isCompleted: false},
      {id: 3, name: 'Three', isCompleted: false},
      {id: 4, name: 'Four', isCompleted: false},
    ])
    cy.visit('/')
    cy.get('.todo-list li').should('have.length', 4)
  })
})
