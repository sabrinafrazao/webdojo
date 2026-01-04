describe('consulting form', ()=> {
    
    it('Request individual consultation', ()=>{

        cy.start();
        cy.submitLoginForm('papito@webdojo.com','katana123' );
        cy.goTo('Formulários', 'Consultoria');

        cy.get('input[placeholder="Digite seu nome completo"]').type('Fernando Papito')
        cy.get('input[placeholder="Digite seu email"]').type('papito@webdojo.com')

        // campo contém mascara, é bom validar para não quebrar.
        cy.get('input[placeholder="(00) 00000-0000"]')
        .type('11 99999-1000')
        .should('have.value', '(11) 99999-1000') // verificar se está igual a mascara. 

// --------- Select do proprio navegador ------------------------------------
        cy.get('#consultancyType').select('Individual') // pode utilizar o value, label ou o nome da opção selecionada

        // Caso não tenha id fazer um xpath : //label[text()="Tipo de Consultoria"]/..//select

        // cy.contains('label', 'Tipo de Consultoria')
        //     .parent()
        //     .find('select')
        //     .select('In Company')



// --------- Select de radio -----------------------

        // //span[text()='Pessoa Física']/..//input

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

// ------------------------------------------------------------------------

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('04112852037')
            .should('have.value', '041.128.520-37')


//--------------- Select do tipo Checkboxes ---------------------------


        const discoveryChannels = [
            'Instagram',
            'YouTube',
            'LinkedIn',
            'Indicação de Amigo',
            'Udemy'

        ]
    
        discoveryChannels.forEach((channel)=> {

            cy.contains('label', channel)
                .find('input')
                .check()
                .should('be.checked')

        })


//----------Upload do Arquivo-----------

        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/documento.pdf', {force: true})


//------------Caixa de texto---------------------


        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.')



//---------------Tags---------------------------------

        const techs = [
            'Cypress',
            'Selenium',
            'WebDriverIO',
            'Playwright',
            'Robot Framawork'
        ]

        techs.forEach((tech)=>{

            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')


            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
        })


//----------------------------------------

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()


        cy.get('button[type="submit"]')
            .click()



        cy.get('.modal-header')
            .parent()
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
        



        

        






        
    })


    it('Check required fields', () => {

        cy.start();
        cy.submitLoginForm('papito@webdojo.com','katana123' );

        cy.goTo('Formulários', 'Consultoria');

        cy.get('button[type="submit"]')
            .click()


         //label[text()="Email *"]/..//p

        cy.contains('label', 'Nome Completo ')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')    

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .should('have.text', 'Você precisa aceitar os termos de uso')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')    
 
    })




})

