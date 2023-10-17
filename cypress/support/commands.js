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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Vamos criar aqui, o que tem em cima pode ser apagado é apenas exemplos.
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Zezerino')
    cy.get('#lastName').type('Mattos')
    cy.get('#email').type('mattos@teste.com')
    cy.get('#email-checkbox').click()
    cy.get('#open-text-area').type('Teste')
    //cy.get('button[type="submit"]').click()

    //cy.contains('button', 'Enviar').click()
})
