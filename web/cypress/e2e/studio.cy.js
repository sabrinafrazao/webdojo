describe('Studio', () => {
  it('Exemplo do Cypress Studio', () => {
    cy.visit('https://example.cypress.io')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('h1').click()
      .should('be.visible');

    /* ==== End Cypress Studio ==== */
  })


  /* ==== Test Created with Cypress Studio ==== */
  it('login2', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://localhost:3000/');
    cy.get('#email').type('papito@webdojo.com');
    cy.get('#password').type('katana123');
    cy.get('.bg-\\[\\#8257E5\\]').click();
    cy.get('[data-cy="user-name"]').should('be.visible');
    /* ==== End Cypress Studio ==== */
  });
})