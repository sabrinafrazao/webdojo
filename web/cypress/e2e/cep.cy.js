import address from '../fixtures/cep.json'


describe('CEP', ()=> {
    beforeEach(() => {

        cy.login()
        cy.goTo('Integração', 'Consulta de CEP')
    })

    it('Deve validar a consulta de CEP', () => {

        cy.intercept('GET', `https://viacep.com.br/ws/${address.cep}/json/`, {

            statusCode: 200,

            body: {

                logradouro: address.street,
                bairro: address.neighborhood,
                localidade: address.city,
                uf: address.state
            }

        }).as('getcep')


        cy.get('input[id="cep"]').type(address.cep)
        cy.contains('button', 'Buscar').click()

        cy.wait('@getcep')

        cy.get('input[id="street"]')
            .should('have.value', address.street)

        cy.get('input[id="neighborhood"]')
            .should('have.value', address.neighborhood)
        
        cy.get('input[id="city"]')
            .should('have.value', address.city)

        cy.get('input[id="state"]')
            .should('have.value', address.state)

    })
})