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
const factories = require('../factories/factories')
let generators = {}

function* gen() {
  let id = 0

  while (true) {
    yield id += 1

    if (id > 100000) { id = 0 }
  }
}

function resetGenerators() {
  _.each(factories, (factory, key) => { generators[key] = gen() })
}

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

Cypress.Commands.add('seed', (seeds, options = {}) => {
  let mappedSeeds = _.reduce(seeds, (output, seeds, key) => {
    let factory = factories[key] || undefined

    if (_.isUndefined(factory)) {
      output[key] = seeds
    } else {
      output[key] = seeds.map((seed) => {
        return _.defaults(seed, factory, { id: generators[key].next().value })
      })
    }

    return output
  }, {})

  if (options.log !== false) {
    Cypress.log({
      name: 'seed',
      message: JSON.stringify(mappedSeeds),
      consoleProps: () => { return false }
    })
  }

  cy.task('db:seed', mappedSeeds, { log: false })
})

beforeEach(function () {
  cy.seed({ todos: [] })
  resetGenerators()
})