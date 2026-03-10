describe('Simulando MouserOver', () => {

    it('Deve mostrar um texto ao passar o mouse em cima', () => {

        cy.start();
        cy.submitLoginForm('papito@webdojo.com', 'katana123');

        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('a[data-cy="instagram-link"]')
            .realHover()
        cy.contains('Isso é Mouseover!').should('exist')

    });

});