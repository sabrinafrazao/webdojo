    Cypress.Commands.add('fillConsultancyForm', (form) => {


        cy.get('input[placeholder="Digite seu nome completo"]').type(form.name)
        cy.get('input[placeholder="Digite seu email"]').type(form.email)

        // campo contém mascara, é bom validar para não quebrar.
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type(form.phone)
        // .should('have.value', '(11) 99999-1000') // verificar se está igual a mascara. 

        // --------- Select do proprio navegador ------------------------------------
        cy.get('#consultancyType').select(form.consultacyType) // pode utilizar o value, label ou o nome da opção selecionada

        // --------- Select de radio -----------------------

        if (form.personType === 'cpf') {

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .click()

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .should('be.not.checked')

            cy.contains('label', 'CPF')
                .parent()
                .find('input')
                .type(form.document)
            //.should('have.value', '041.128.520-37')

        } else {

            cy.contains('label', 'Pessoa Jurídica')
                .find('input')
                .click()

            cy.contains('label', 'Pessoa Física')
                .find('input')
                .should('be.not.checked')

            cy.contains('label', 'CNPJ')
                .parent()
                .find('input')
                .type(form.document)

        }

        //--------------- Select do tipo Checkboxes ---------------------------

        form.discoveryChannels.forEach((channel) => {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')

        })

        //----------Upload do Arquivo-----------

        cy.get('input[type="file"]')
            .selectFile(form.file, { force: true })


        //------------Caixa de texto---------------------

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type(form.description)

        //---------------Tags---------------------------------

        form.techs.forEach((tech) => {

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')


            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
        })


        //----------------------------------------

        if (form.terms === true) {
            cy.contains('label', 'termos de uso')
                .find('input')
                .check()
        }
    })

    Cypress.Commands.add('submitConsultacyForm', () => {

        cy.get('button[type="submit"]')
            .click()
    })

    Cypress.Commands.add('validadeConsultancyModal', () => {
        cy.get('.modal-header', { timeout: 7000 })
            .parent()
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
    })
