// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const _ = require('lodash')

Cypress.Commands.add("store", (commands = []) => {
  if (typeof commands == 'string') {
    commands = commands.split(".")
  }
  cy.window().its('store').invoke('getState').then(($store) => {
    return commands.reduce((acc, command) => {
      acc.should('have.ownProperty', command)

      return acc.its(command);
    }, cy.wrap($store))
  })
})

let loMethod = _.functions(_).map((fn) => { return `lo_${fn}` })

// Cypress.Commands.add('lo_filter', { prevSubject: true }, (subject, fn) => {
//   let result = _.filter(subject, fn)
//   Cypress.log({
//     name: 'lo_filter',
//     message: JSON.stringify(result),
//     consoleProps: () => { return result }
//   })

//   return result
// })

loMethod.forEach((loFn) => {
  const loName = loFn.replace(/lo_/, '')
  Cypress.Commands.add(loFn, { prevSubject: true }, (subject, fn, ...args) => {
    let result = _[loName](subject, fn, ...args)
    Cypress.log({
      name: loFn,
      message: JSON.stringify(result),
      consoleProps: () => { return result }
    })

    return result
  })
})