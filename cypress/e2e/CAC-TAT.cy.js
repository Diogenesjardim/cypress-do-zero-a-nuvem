describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('src\\index.html')
    });
    it('verifica o título da aplicação', () => {     
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    }) 

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()

        const longText = Cypress._.repeat('Teste com cypress', 10)

        cy.get('#firstName').type('Diógenes')
        cy.get('#lastName').type('Jardim')
        cy.get('#email').type('diogenes.jj@gmail.com');
        cy.get('#open-text-area').type(longText, { delay: 0});
        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible')

        cy.tick(30000)

        cy.get('.success').should('not.be.visible')  
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida' , () => {
        cy.clock()

        cy.get('#email').type('diogenes.jj@')
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible')

        cy.tick(30000)

        cy.get('.error').should('not.be.visible')
    })

    it('Validação do Campo de Telefone: Impedir Entrada de Caracteres Não Numéricos', () => {
        cy.get('#phone')
          .type('abcfrdf')
          .should('have.value', '')
            
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()


        cy.get('#firstName').type('Diógenes')
        cy.get('#lastName').type('Jardim')
        cy.get('#email').type('diogenes.jj@gmail.com')
        cy.get('#open-text-area').type('Teste com cypress')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible')

        cy.tick(30000)

        cy.get('.error').should('not.be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
          .type('Diógenes')
          .should('have.value', 'Diógenes')
          .clear()
          .should('have.value', '')  
        cy.get('#lastName')
          .type('Jardim')
          .should('have.value', 'Jardim')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('diogenes.jj@gmail.com')
          .should('have.value', 'diogenes.jj@gmail.com')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('123456789')
          .should('have.value', '123456789')
          .clear()
          .should('have.value', '')    
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible')

    cy.tick(30000)

    cy.get('.error').should('not.be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.PreencherCamposObrigatoriosEEnviar()

    cy.get('.success').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizadoso usando um comando customizado com parâmetros', () => {
    const data = {
        firstName: 'Diógenes',
        lastName: 'Jardim',
        email: 'diogenes.jj@gmail.com', 
        text:'Teste com cypress'
    }
    cy.PreencherCamposObrigatoriosEEnviarComParametros(data)

    cy.get('.success').should('be.visible')
})

it('envia o formulário com sucesso usando um comando customizado com parâmetros padrão', () => {
    cy.clock()
  
    cy.PreencherCamposObrigatoriosEEnviarComParametrosData()

    cy.get('.success').should('be.visible')

    cy.tick(30000)

    cy.get('.success').should('not.be.visible')
})

it('envia o formulário com sucesso usando um comando customizado com dados aleatórios', () => {
    cy.clock()
  
    cy.PreencherCamposObrigatoriosEEnviarComDadosFaker()

    cy.get('.success').should('be.visible')

    cy.tick(30000)

    cy.get('.success').should('not.be.visible')

})


it('seleciona um produto (YouTube) por seu texto e verifica se o mesmo foi selecionado', () => {
  cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube') 
})

it('seleciona um produto (Mentoria) por seu valor (value)', () => {  
  cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria') 
})

it('seleciona um produto (Blog) por seu índice e verifica se o mesmo foi selecionado', () => {
  cy.get('#product')
    .select(1)
    .should('have.value', 'blog') 
})

it('marca o tipo de atendimento "Feedback" e verifica se o mesmo foi marcado', () => {
  cy.get("input[type='radio'][value='feedback']")
    .check()
    .should('be.checked') 
})

it('marca cada tipo de atendimento e verifica se o mesmo foi marcado', () => {
   cy.get('input[type="radio"]')
     .each(typeOfService => {    
      cy.wrap(typeOfService)
        .check()
        .should('be.checked')

     })
})

it('marca ambos checkboxes, depois desmarca o último e verifica se o mesmo foi desmarcado', () => {
  cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')

})

it('seleciona um arquivo da pasta fixtures e verifica se o mesmo foi selecionado', () => {
  cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json');
    });
  })

it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('#file-upload')
        .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(input => {
          expect(input[0].files[0].name).to.equal('example.json');
      });
    })






it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture('example.json').as('file')
  cy.get('#file-upload')
    .selectFile('@file')
    .should(input => { 
      expect(input[0].files[0].name).to.equal('example.json')
    })
})


it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
   cy.contains('a', 'Política de Privacidade')
     .should('have.attr', 'href', 'privacy.html')
     .and('have.attr', 'target', '_blank')
     
})

it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
  cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
})

it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

it('preenche o campo da área de texto usando o comando invoke', () => {
  cy.get('#open-text-area').invoke('val', 'um texto qualquer')
    .should('have.value', 'um texto qualquer')
})

it('faz uma requisição HTTP para a API do GitHub e verifica se o status da resposta é 200', () => {
  cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
    .as('getRequest')
    .its('status')
    .should('eq', 200)
  cy.get('@getRequest')
    .its('statusText')
    .should('eq', 'OK')
  cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')
})

it('encontra o gato escondido na página', () => {
  cy.get('#cat')
    .invoke('show')
    .should('be.visible')
  cy.get('#title')
    .invoke('text', 'Diógenes Jardim')
  cy.get('#subtitle')
    .invoke('text', 'Analista de Testes de Software na (QA)')
    
})
})