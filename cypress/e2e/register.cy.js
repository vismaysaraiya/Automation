
//const { expect } = require("chai")
import { faker, fakerEN_US } from '@faker-js/faker';
//import { register } from "../../support/page"

//const { before } = require("cypress/types/lodash")
describe ('Testcases', function() {
    beforeEach( ()=>{
        //Verify that home page is visible successfully
        cy.visit("http://automationexercise.com")
        cy.viewport(1280, 720)
        cy.findByText('Category').should('exist')
        cy.findByText('Features Items').should('exist')
        cy.findByText('Brands').should('exist')

        cy.get("a[href='/login']").click()

    })
    it('Register User', function () {
        let remail = faker.internet.exampleEmail({ delay: 10, allowSpecialCharacters: true })
        //Verify 'New User Signup!' is visible
        cy.findAllByText('Login to your account').should('exist')
        cy.findAllByText('New User Signup!').should('exist')

        // Enter name and email address
        cy.get('[data-qa=signup-name]').type('vismay')
        cy.get('[data-qa=signup-email]').type(remail)

        //Click 'Signup' button
        cy.get('[data-qa=signup-button]').click()
       
        // Verify that 'ENTER ACCOUNT INFORMATION' is visible
       
        cy.findAllByText('Enter Account Information').should('exist')
       
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
        cy.findByText('Login to your account').should('exist')
        cy.findByText('New User Signup!').should('exist')

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

    it("Register User with 'existing email",()=>{
        //Verify 'New User Signup!' is visible
        cy.findAllByText('Login to your account').should('exist')
        cy.findAllByText('New User Signup!').should('exist')

        // Enter name and email address
        cy.get('[data-qa=signup-name]').type('vismay')
        cy.get('[data-qa=signup-email]').type('vismay@crest.com')

        //Click 'Signup' button
        cy.get('[data-qa=signup-button]').click()

        //Verify error 'Email Address already 'exist'!' is visible
        cy.get('.signup-form').contains("Email Address already exist!")
    })
})