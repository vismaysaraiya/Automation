describe ('Testcases', function(){
    beforeEach( ()=>{
        //Verify that home page is visible successfully
        cy.visit("http://automationexercise.com")
        cy.viewport(1280, 720)

    })

    it('Verify Scroll Up using "Arrow" button and Scroll Down functionality',()=>{
        cy.scrollTo('bottom')
        cy.get("[id='scrollUp']").click()
    }),

    it('Verify Scroll Up without "Arrow" button and Scroll Down functionality',()=>{
        cy.scrollTo('bottom')
        cy.scrollTo('top')
    })

})