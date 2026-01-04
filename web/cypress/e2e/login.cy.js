describe('Login', () => {
  it('Login successful', () => {
    cy.start()

    cy.submitLoginForm('papito@webdojo.com','katana123' )

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

  })

  it('login with invalid password', () => {
    cy.start()

    cy.submitLoginForm('papito@webdojo.com','katana321' )

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

   it('Login with email not registered', () => {
    cy.start()

    cy.submitLoginForm('sabrina@webdojo.com','katana123' )

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

  
})

