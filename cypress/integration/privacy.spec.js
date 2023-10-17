//Vomo vai ser apenas um teste e não uma suit eu não preciso criar um describe, podemos partir direto para o teste o nosso it
it('testa a página da política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html') //Da mesma forma que visitamos o index, podemos visitar direto a pagina de privacy.html
    
    cy.contains('Talking About Testing') //Fizemos usando o contais e colocamos uma variavel com o texto, mas poderia ser direto.
        .should('be.visible')
})

//Tomar cuidado de ir no navegador e mudar o teste tirar da pagina que está testando e colocar na nova pagina que criamos.