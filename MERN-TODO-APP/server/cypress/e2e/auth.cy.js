/// <reference types="cypress" />

let email = `depi2_${Date.now()}@egypt.eg`;

describe('As a user, I want to register with my email and password so that I can create an account', () => {
  beforeEach(() => {
    cy.wait(500)
  })

  it('Register to the todo app with proper creds', () => {

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

    cy.wait(500)
  })

  it('Does not register to the todo app with invalid email', () => {

    cy.visit('/register')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email.replace(".eg", ""))

    cy.get('input[data-cy="name"]')
      .should('exist')
      .type('Depi2 Cy User')

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@2')

    cy.get('button[data-cy="register"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
      .should(
        "have.text",
        `"Email" must be a valid email`
      )
  })

  it('Does not register to the todo app with name < 5 characters', () => {

    let email = `depi2_${Date.now()}@egypt.eg`;

    cy.visit('/register')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="name"]')
      .should('exist')
      .type('Depi')

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@2')

    cy.get('button[data-cy="register"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
      .should(
        "have.text",
        `Name should be min 5 characters..`
      )
  })

  it('Does not register to the todo app with name > 20 characters', () => {

    let email = `depi2_${Date.now()}@egypt.eg`;

    cy.visit('/register')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="name"]')
      .should('exist')
      .type('Depi Testing Todo App Depi Testing Todo App')

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@2')

    cy.get('button[data-cy="register"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
      .should(
        "have.text",
        `"name" length must be less than or equal to 30 characters long`
      )
  })

  it('Does not register to the todo app with password < 3 characters', () => {

    let email = `depi2_${Date.now()}@egypt.eg`;

    cy.visit('/register')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="name"]')
      .should('exist')
      .type('Depi Testing Todo App User')

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('12')

    cy.get('button[data-cy="register"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
    // .should(
    //   "have.text",
    //   `"Password" should be at least 4 characters long`
    // )
  })

  it('Does not register to the todo app with password > 10 characters', () => {

    let email = `depi2_${Date.now()}@egypt.eg`;

    cy.visit('/register')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="name"]')
      .should('exist')
      .type('Depi Testing Todo App User')

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@1234567890Depi@1234567890')

    cy.get('button[data-cy="register"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
      .should(
        "have.text",
        `"Password" should not be longer than 20 characters`
      )
  })

  it('Does not register to the todo app with no uppercase letter', () => {

    let email = `depi2_${Date.now()}@egypt.eg`;

    cy.visit('/register')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="name"]')
      .should('exist')
      .type('Depi Testing Todo App User')

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('depi@123')

    cy.get('button[data-cy="register"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
      .should(
        "have.text",
        `"Password" should contain at least 1 upper-cased letter`
      )
  })

  it('Does not register to the todo app with no lowercase letter', () => {

    let email = `depi2_${Date.now()}@egypt.eg`;

    cy.visit('/register')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="name"]')
      .should('exist')
      .type('Depi Testing Todo App User')

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('DEPI@123')

    cy.get('button[data-cy="register"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
      .should(
        "have.text",
        `"Password" should contain at least 1 lower-cased letter`
      )
  })

  it('Does not register to the todo app with no symbols', () => {

    let email = `depi2_${Date.now()}@egypt.eg`;

    cy.visit('/register')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="name"]')
      .should('exist')
      .type('Depi Testing Todo App User')

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi123')

    cy.get('button[data-cy="register"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
      .should(
        "have.text",
        `"Password" should contain at least 1 symbol`
      )
  })

  it('Does not register to the todo app with no digits', () => {

    let email = `depi2_${Date.now()}@egypt.eg`;

    cy.visit('/register')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="name"]')
      .should('exist')
      .type('Depi Testing Todo App User')

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@oty')

    cy.get('button[data-cy="register"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
      .should(
        "have.text",
        `"Password" should contain at least 1 number`
      )
  })
})

describe('As a user, I want to log in using my credentials so that I can access my todos', () => {
  
  it('Login should be successful with correct credentials', () => {

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
  })

  it('Login should not be successful with invalid email', () => {

    cy.visit('/login')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type("invalid_" + email)

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@123')

    cy.get('button[data-cy="login"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
      .should(
        "have.text",
        `Invalid credentials.`
      )
  })

  it('Login should not be successful with invalid password', () => {

    cy.visit('/login')

    cy.get('input[data-cy="email"]')
      .should('exist')
      .clear()
      .type(email)

    cy.get('input[data-cy="password"]')
      .should('exist')
      .clear()
      .type('Depi@1230')

    cy.get('button[data-cy="login"]')
      .should('exist')
      .click()

    cy.wait(500)

    cy.get('span[data-cy="registration-error"]')
      .should('exist')
      .should(
        "have.text",
        `Invalid credentials.`
      )
  })
})