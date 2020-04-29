describe('Create and show paste', () => {
    it('successfully creates paste and navigates show page for that paste', () => {
        cy.visit('/') // change URL to match your dev URL
        // eslint-disable-next-line cypress/no-assigning-return-values
        const home = cy.get('#app').get('.home')
        const myText = 'I think I am spamming data lol # 5'

        home.find('.paste-input').type(myText)

        home.get('.navbar')
            .get('.buttons')
            .contains('Save')
            .click()

        // eslint-disable-next-line
        cy.wait(5000) // This is so data is returned from firebase

        cy.get('#app')
            .get('.show-paste')
            .get('pre')
            .get('.content')
            .should('contain', myText)
    })
})
