describe ('Testcases', function() {
    it('Register User', function () {
        //Verify that home page is visible successfully
        cy.visit("http://automationexercise.com")
       
        cy.findAllByText('Category').should('exist')
        cy.findAllByText('Features Items').should('exist')
        cy.findAllByText('Brands').should('exist')
       
        cy.get("a[href='/login']").click()


        //Verify 'New User Signup!' is visible
        cy.findAllByText('Login to your account').should('exist')
        cy.findAllByText('New User Signup!').should('exist')


        // Enter name and email address
        cy.get('[data-qa=signup-name]').type('vismay')
        cy.get('[data-qa=signup-email]').type('vs@yopmail.com')


        //Click 'Signup' button
        cy.get('[data-qa=signup-button]').click()
       
        // Verify that 'ENTER ACCOUNT INFORMATION' is visible
        //cy.get('.col-sm-4 col-sm-offset-1').contains('ENTER ACCOUNT INFORMATION')
       
        cy.findAllByText('Enter Account Information').should('exist')
        //cy.findAllByText('Title').should('exist')
       
       
        //Fill details: Title, Name, Email, Password, Date of birth
        cy.findByLabelText('Mr.').check()
        cy.get('[id=name]').type('vismay')
        cy.get('[type=Password]').type('Crest@123')
       
        cy.get('select[id=days]').select('18')
        cy.get('select[id=months]').select('November')
        cy.get('select[id=years]').select('1986')


        //Select checkbox 'Sign up for our newsletter!'
        cy.get('[name=newsletter]').check()
       
        //Select checkbox 'Receive special offers from our partners!'
        cy.get('[name=optin]').check()


        //Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
        cy.get('[id=first_name]').type('Parth')
        cy.get('[id=last_name]').type('Saraiya')
        cy.get('[id=company]').type('India')
        cy.get('[id=address1]').type('Crest House')
        cy.get('[id=address2]').type('Makarba')
        cy.get('select[id=country]').select('India')
        cy.get('[id=state]').type('Gujarat')
        cy.get('[id=city]').type('Ahmedabad')
        cy.get('[id=zipcode]').type('380054')
        cy.get('[id=mobile_number]').type('9562356232')


        //Click 'Create Account button'
        cy.get('[data-qa=create-account]').click()


        //Verify that 'ACCOUNT CREATED!' is visible
        cy.get('[data-qa=account-created]').contains('Account Created!')
       
        //Click 'Continue' button
        cy.get('[data-qa=continue-button]').click()


        //Verify that 'Logged in as username' is visible
        cy.get('.shop-menu').find('li').contains('Logged in as vismayvismay')


        //Click 'Delete Account' button
        cy.get('.shop-menu').find('li').contains('Delete Account').click()
       
        //Verify that 'ACCOUNT DELETED!' is visible and click 'Continue' button
        cy.get('[data-qa=account-deleted]').contains('Account Deleted!')  


    }),


    it("Login User with correct email and password", ()=>{
        // Launch browser
        // Navigate to url 'http:automationexercis.com'
        // Verify that home page is visible successfully
        // Click on 'Signup / Login' button
        // Verify 'Login to your account' is visible
        // Enter correct email address and password
        // Click 'login' button
        // Verify that 'Logged in as username' is visible
        // Click 'Delete Account' button
        // Verify that 'ACCOUNT DELETED!' is visible


    })
       
   // it("Login User with incorrect email and password",()=>)
})


