import { faker, fakerEN_US } from '@faker-js/faker';

export const invokeReload = (callBack) => {
    cy.window().then((win) => {
        win.document.addEventListener('click', () => {
            setTimeout(() => {
                win.document.location.reload();
            }, 5000);
        });

        callBack();
    });
};


export const register =()=>{

    let email = faker.internet.exampleEmail({ delay: 10, allowSpecialCharacters: true })

    //cy.get('.nav.navbar-nav').get('[href="/login"]').click()
       
    //Verify 'New User Signup!' is visible
    cy.findAllByText('Login to your account').should('exist')
    cy.findAllByText('New User Signup!').should('exist')

    // Enter name and email address
    cy.get('[data-qa=signup-name]').type('vismay')
    cy.get('[data-qa=signup-email]').type(email)

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
    // cy.get('.shop-menu').find('li').contains('Logged in as vismayvismay')

};

export const login=()=>{
    cy.get('a[href="/login"]').first().click()
    cy.get('[data-qa="login-email"]').type('vismay@crest.com')
    cy.get('[type="Password"]').type('Crest@123')
    cy.get('[data-qa="login-button"]').click()
};

export const delete_accout =()=>{
    cy.get('.nav.navbar-nav').get('[href="/delete_account"]').click()
    
};

