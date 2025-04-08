/// <reference types="cypress" />

const email = `depi2_${Date.now()}@egypt.eg`;

describe('Todo management', () => {
  beforeEach(() => {
    cy.wait(1000)
  })

  it('As a user, I want to create a new todo item so that I can track tasks', () => {

    cy.visit('/register')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="name"]')
      .should('exist')
      .type('Depi2 Cy User')

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@123')

    cy.get('button[data-cy="register"]')
      .should('exist')
      .click()

    cy.wait(1000)
  })

  it('Adds a todo', () => {

    cy.visit('/login')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@123')

    cy.get('button[data-cy="login"]')
      .should('exist')
      .click()

    cy.get('input[placeholder="Enter todo"]')
      .should('exist')
      .type('Test Todo')
      .should('have.value', 'Test Todo')

    cy.get('button[data-cy="add-todo"]')
      .should('exist')
      .click()

    cy.get('span[data-cy="todo-entry"]')
      .should('have.length', 1)
  })

  it('Completes a todo', () => {

    cy.visit('/login')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@123')

    cy.get('button[data-cy="login"]')
      .should('exist')
      .click()

    cy.wait(1000)

    cy.get('svg[data-cy="complete-todo"]')
      .should('exist')
      .click()

    cy.wait(1000)
    cy.get('span[data-cy="todo-entry"]')
      .should('satisfy', ($el) => {
        const classList = Array.from($el[0].classList);
        return classList.includes('line-through')
      })
  })

  it('Cancel is-completed of a todo', () => {

    cy.visit('/login')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@123')

    cy.get('button[data-cy="login"]')
      .should('exist')
      .click()

    cy.wait(1000)

    cy.get('svg[data-cy="complete-todo"]')
      .should('exist')
      .click()

    cy.wait(1000)
    cy.get('span[data-cy="todo-entry"]')
      .should('satisfy', ($el) => {
        const classList = Array.from($el[0].classList);
        return !classList.includes('line-through')
      })
  })

  it('Updates a todo', () => {

    cy.visit('/login')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@123')

    cy.get('button[data-cy="login"]')
      .should('exist')
      .click()

    cy.wait(1000)

    cy.get('svg[data-cy="edit-todo"]')
      .should('exist')
      .click()

    cy.wait(1000)

    cy.get('input[data-cy="edit-todo"]')
      .should('exist')
      .clear()
      .type('Test Todo Updated')

    cy.get('button[data-cy="update-todo"]')
      .should('exist')
      .click()

    cy.wait(1000)

    cy.get('span[data-cy="todo-entry"]').should(
      "have.text",
      "Test Todo Updated"
    );
  })

  it('Deletes a todo', () => {

    cy.visit('/login')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@123')

    cy.get('button[data-cy="login"]')
      .should('exist')
      .click()

    cy.wait(1000)

    cy.get('svg[data-cy="delete-todo"]')
      .should('exist')
      .click()

    cy.wait(1000)
    cy.get('span[data-cy="todo-entry"]')
      .should('have.length', 0)
  })
})