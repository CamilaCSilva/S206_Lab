/// <reference types="cypress"/> 

function fazerLogin(){
    cy.visit('https://create.kahoot.it/auth/login');
    cy.get('#username').type('camiladcs28@gmail.com');
    cy.get('#password').type('Compromisso01');
    cy.get('.sc-dIUggk').click();
}

function visitEUsername(username){
    cy.visit('https://create.kahoot.it/auth/login');
    cy.get('#username').type(username);
}

function Registrar() {
    cy.visit('https://create.kahoot.it/auth/login');
    cy.get('.sc-kIXaRb').click();
    cy.get('.cCAyDh').click();
    cy.get('.zXnuZ > .sc-iCdwPi').click();
    cy.get('#month').select('Abr');
    cy.get('#day').select('28');
    cy.get('#year').select('2001');
    cy.get('.sc-dIUggk').click();
}

describe('Cenario de Teste: Testar as funcoes de login do site globalsqa', () => {
    
    it('Caso de teste: Registrar um usuario e receber mensagem', () => {
        Registrar();
        cy.get('#generate-username').click();
        cy.get('.sc-cQyDZe > .sc-dIUggk').click();
        // diplomat_dove972
        cy.get('.sc-cQyDZe > .sc-dIUggk').should('contain.text','Registrado com sucesso');
    })

    
    it('Caso de teste: Falhar ao tentar redifinir senha com um e-mail não existente', () => {
        visitEUsername('diplomat_dove972');
        cy.get(' .sc-kEbnRK > a').click();
        cy.get('#email').type('diplomat_dove972@gmail.com');
        cy.get('.sc-dIUggk').click();
        cy.get('.sc-gDqNik').should('contain.text','Não foi possível encontrar um usuário com esse e-mail.');
    })

    it('Caso de teste: Registrar um usuario com o mesmo usarname do anterior', () => {
        Registrar();
        cy.get('#username').type('camilaInatel');
        cy.get('.sc-cQyDZe > .sc-dIUggk').click()
        cy.get('.sc-gDqNik').should('contain.text','Este nome de usuário já existe, escolha outro.');
    })

    it('Caso de teste: Registrar sem colocar um username ou gerar um', () => {
        Registrar(); 
        cy.get('.sc-cQyDZe > .sc-dIUggk').click();
        cy.get('.sc-gDqNik').should('have.text','Este nome de usuário é muito curto, verifique se ele tem pelo menos 6 caracteres');
    })

    it('Caso de teste: Falha ao tentar fazer logar colocando o e-mail ou senha errado', () => {
        visitEUsername('camila.silva@ges.inatel.br');
        cy.get('#password').type('Xxxxxxxxxx12'); 
        cy.get('.sc-dIUggk').click();
        cy.get('.sc-pFZIQ').should('contain.text','A senha, o nome de usuário ou o e-mail está incorreto. Insira suas informações novamente ou redefinir senha.');
    })

    it('Caso de teste: Fazer login com sucesso com um e-mail e senha corretos', () => {
        visitEUsername('camiladcs28@gmail.com');
        cy.get('#password').type('aulaS206');
        cy.get('.sc-dIUggk').click();
        cy.get('.sc-dIUggk').should('have.text','Algo bom demais está prestes a acontecer');
    })

    it('Caso de teste: Tentar logar sem a senha', () => {
        visitEUsername('camiladcs28@gmail.com');
        cy.get('.sc-dIUggk').should('be.disabled');
    })



   
})