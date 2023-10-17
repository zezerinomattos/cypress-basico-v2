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
