import { faker } from '@faker-js/faker';


Cypress.Commands.add('PreencherCamposObrigatoriosEEnviar', () => {    
    cy.get('#firstName').type('Diógenes')
    cy.get('#lastName').type('Jardim')
    cy.get('#email').type('diogenes.jj@gmail.com')
    cy.get('#open-text-area').type('Teste com cypress')
    cy.contains('button', 'Enviar').click();
})
Cypress.Commands.add('PreencherCamposObrigatoriosEEnviarComParametros', data => {    
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click();
})

Cypress.Commands.add('PreencherCamposObrigatoriosEEnviarComParametrosData', (data = {
    firstName: 'Diógenes',
    lastName: 'Jardim',
    email: 'diogenes.jj@gamil.com',
    text: 'Teste com cypress'

}) => {    
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button', 'Enviar').click();
})


Cypress.Commands.add('PreencherCamposObrigatoriosEEnviarComDadosFaker', (data = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    telefone: faker.phone.number('###########'),  // Gera um número de telefone com 10 dígitos
    text: faker.lorem.sentence()
}) => {
    cy.get('#firstName').type(data.firstName.trim())
    cy.get('#lastName').type(data.lastName.trim())
    cy.get('#email').type(data.email.trim())
    cy.get('#phone').type(data.telefone.trim())
    cy.get('#open-text-area').type(data.text.trim())
    cy.contains('button', 'Enviar').click();
})


