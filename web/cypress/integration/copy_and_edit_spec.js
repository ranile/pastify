describe('Copy and edit paste', () => {
    it('successfully copies pastes and navigates to new paste component with its data', () => {
        cy.visit('/show/1qCUNK14Gnsch1ZZvhJS') // change URL to match your dev URL
        cy.wait(1000)
        cy.get('#app')
            .get('.show-paste')
            .get('.navbar')
            .get('.buttons')
            .contains('Copy and edit')
            .click()

        cy.url().should('contain', 'http://localhost:8080/')

        cy.get('#app')
            .get('.home')
            .find('.paste-input')
            .invoke('val')
            .then(text => {
                expect(text).to.equal('I think I am spamming data lol # 2')
            })
    })
})
