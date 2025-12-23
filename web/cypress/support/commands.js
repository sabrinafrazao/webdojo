Cypress.Commands.add("start", ()=>{
    cy.viewport(1440, 900)
    cy.visit('http://localhost:3000/')
})


Cypress.Commands.add('submitLoginForm', (email, senha)=> {
    cy.get('#email').type(email)
    cy.get('#password').type(senha)

    cy.contains('button', 'Entrar').click()

})