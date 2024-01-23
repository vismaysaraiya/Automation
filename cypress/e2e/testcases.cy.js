//const { before } = require("cypress/types/lodash")
describe ('Testcases', function() {
    beforeEach( ()=>{
        //Verify that home page is visible successfully
        cy.visit("http://automationexercise.com")
       
        cy.findByText('Category').should('exist')
        cy.findByText('Features Items').should('exist')
        cy.findByText('Brands').should('exist')

        //cy.get("a[href='/login']").click()

    })
    it('Register User', function () {
       
        //Verify 'New User Signup!' is visible
        cy.findAllByText('Login to your account').should('exist')
        cy.findAllByText('New User Signup!').should('exist')

        // Enter name and email address
        cy.get('[data-qa=signup-name]').type('vismay')
        cy.get('[data-qa=signup-email]').type('vsa@yopmail.com')

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
       
        // Verify 'Login to your account' is visible
        cy.findAllByText('Login to your account').should('exist')
        cy.findAllByText('New User Signup!').should('exist')

        // Enter correct email address and password
        cy.get('[data-qa=login-email]').type('vismay@crest.com')
        cy.get('[type=Password]').type('Crest@123')
       
        // Click 'login' button
        cy.get('[data-qa=login-button]').click()

        // Verify that 'Logged in as username' is visible
        cy.get('.shop-menu').find('li').contains('Logged in as vismay')

    }),
       
    it("Login User with incorrect email and password",()=>{
       
        // Enter incorrect email address and password
        cy.get('[data-qa=login-email]').type('1vismay@crest.com')
        cy.get('[type=Password]').type('Crest@1231')

        // Click 'login' button
        cy.get('[data-qa=login-button]').click()

        // Verify error 'Your email or password is incorrect!' is visible
        cy.findByText("Your email or password is incorrect!").should('exist')
    //it("Login User with incorrect email and password",()=>)
    }),

    it(" Logout User",()=>{
         // Enter correct email address and password
         cy.get('[data-qa=login-email]').type('vismay@crest.com')
         cy.get('[type=Password]').type('Crest@123')
         
         // Click 'login' button
         cy.get('[data-qa=login-button]').click()

         // Verify that 'Logged in as username' is visible
         cy.get('.shop-menu').find('li').contains('Logged in as vismay')

         //Click 'Logout' button
         cy.get("a[href='/logout']").click()

         //Verify that user is navigated to login page
         cy.findAllByText('Login to your account').should('exist')
         cy.findAllByText('New User Signup!').should('exist')

    }),

    it("Register User with existing email",()=>{
        //Verify 'New User Signup!' is visible
        cy.findAllByText('Login to your account').should('exist')
        cy.findAllByText('New User Signup!').should('exist')

        // Enter name and email address
        cy.get('[data-qa=signup-name]').type('vismay')
        cy.get('[data-qa=signup-email]').type('vismay@crest.com')

        //Click 'Signup' button
        cy.get('[data-qa=signup-button]').click()

        //Verify error 'Email Address already exist!' is visible
        cy.findByText("Email Address already exist!").should('exist')
    }),

    it.only("Contact Us Form",()=>{
        //Click on 'Contact Us' button
        cy.get("a[href='/contact_us']").click()

        // Verify 'GET IN TOUCH' is visible
        cy.findByText('Get In Touch').should('exist')

        //cy.get('.contact-form').contains('Get In Touch')

        // Enter name, email, subject and message
        cy.findByPlaceholderText("Name").type("crest user")
        cy.findByPlaceholderText("Email").type("crestuser@yopmail.com")
        cy.findByPlaceholderText("Subject").type("Test subject")
        cy.findByPlaceholderText("Your Message Here").type("Test Message")

        // Upload file
        cy.get('[name=upload_file]').attachFile('upload.txt');
        
        // Click 'Submit' button
        cy.get('[data-qa=submit-button]').click()
           
        // Verify success message 'Success! Your details have been submitted successfull.' is visible
    
        cy.get('[id=contact-page]').contains('Success! Your details have been submitted successfully.')
        
        // Click 'Home' button and verify that landed to home page successfully
        //cy.get("a[href='/']").click()
        cy.contains('Home').click()
        cy.findByText('Category').should('exist')
        cy.findByText('Features Items').should('exist')
        cy.findByText('Brands').should('exist')

    })

})
