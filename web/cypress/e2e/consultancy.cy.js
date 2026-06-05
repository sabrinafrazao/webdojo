import { personal, company } from '../fixtures/consultacy.json'

describe('consulting form', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria');

    })

    it('Request individual consultation', function () {
        cy.fillConsultancyForm(personal)
        cy.submitConsultacyForm()
        cy.validadeConsultancyModal()

    })

    it('Request Company consultation', function () {

        cy.fillConsultancyForm(company)
        cy.submitConsultacyForm();
        cy.validadeConsultancyModal()
    })

    it('Check required fields', () => {

        cy.submitConsultacyForm()

        const requiredFilds = [
            { label: 'Nome Completo', message: 'Campo obrigatório' },
            { label: 'Email', message: 'Campo obrigatório' },
            { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' },
        ]

        requiredFilds.forEach(({ label, message }) => {

            cy.contains('label', label)
                .parent()
                .find('p')
                .should('be.visible')
                .should('have.text', message)
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })

    })
})

