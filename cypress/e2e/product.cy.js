//import { first } from "cypress/types/lodash/index.js";
import {delete_accout, invokeReload, login, register} from "../../support/page.js";

describe ('Product Testcases', function() {
    beforeEach( ()=>{
        //Verify that home page is visible successfully
        cy.visit("http://automationexercise.com")
        cy.viewport(1280, 720)
        })

    it('Verify All Products and product detail page',()=>{
        // Click on 'Products' button
        cy.get("a[href='/products']").click()

        // Verify user is navigated to ALL PRODUCTS page successfully
        cy.findByText('Category').should('exist')
        cy.findByText('All Products').should('exist')

        // The products list is visible
        cy.get('.col-sm-4').each((item ,index, list)=>{
            //console.log(list)
            expect(list).to.have.length(35);
        })
        
        // Click on 'View Product' of first product
        cy.get("a[href='/product_details/1']").click()

        // User is landed to product detail page
        cy.url().should('include', '/product_details/1')

        //Verify that detail detail is visible: product name, category, price, availability, condition, brand
        cy.get('.product-information').findByText('Blue Top').should('exist')
        //cy.get('.product-information').findByText('include.text', 'Women > Tops')
        cy.get('.product-information').findByText('Rs. 500').should('exist')
        cy.get('.product-information').findByText('In Stock').should('exist')
        cy.get('.product-information').findByText('New').should('exist')
        cy.get('.product-information').findByText('Polo').should('exist')
    }),

    it('Search Product',()=>{
        //Click on 'Products' button
        cy.get("a[href='/products']").click()
        
        //Verify user is navigated to ALL PRODUCTS page successfully
        cy.findByText('Category').should('exist')
        cy.findByText('All Products').should('exist')
        
        //Enter product name in search input and click search button
        cy.get("[id=search_product]").type('Top')
        cy.get("[id=submit_search]").click()

        //Verify 'SEARCHED PRODUCTS' is visible
        cy.findByText('Searched Products').should('exist')
        //Verify all the products related to search are visible
        cy.get('.col-sm-4').each((item ,index, list)=>{
            expect(list).to.have.length('15');
        })

    }),

    it('Add Products in Cart',()=>{
        //Click 'Products' button
        cy.get("a[href='/products']").click()

        //Hover over first product and click 'Add to cart'
        cy.get(".productinfo.text-center").first().trigger('mousehover')
        cy.get('[data-product-id="1"]').first().click()
        
        //Click 'Continue Shopping' button
        cy.get(".btn.btn-success.close-modal.btn-block").click()

        //Hover over second product and click 'Add to cart'
        cy.get(".productinfo.text-center").eq(1).trigger('mousehover')
        cy.get('[data-product-id="2"]').first().click()

        //Click 'View Cart' button
        cy.get(".modal-dialog.modal-confirm").findByText('View Cart').click()
        
        //Verify both products are added to Cart
        cy.get('.table.table-condensed').get('tr').then((cart_tbl)=>{
        expect(cart_tbl.length-1).to.equal(2)
        })     
        
        //Verify their prices, quantity and total price
        cy.get("[id='cart_info_table']").find('tr').eq(1).contains('Blue Top')
        cy.get("[id='cart_info_table']").find('tr').eq(1).contains('1')
        cy.get("[id='cart_info_table']").find('tr').eq(1).contains('Rs. 500')

        cy.get("[id='cart_info_table']").find('tr').eq(2).contains('Men Tshirt')
        cy.get("[id='cart_info_table']").find('tr').eq(2).contains('1')
        cy.get("[id='cart_info_table']").find('tr').eq(2).contains('Rs. 400')            
     }),

    it('Verify Product quantity in Cart',()=>{
        //Click 'View Product' for any product on home page
        cy.get("a[href='/products']").click()
        cy.get("a[href='/product_details/1']").click()

        //Verify product detail is opened
        cy.get('.product-information').findByText('Blue Top').should('exist')
        //cy.get('.product-information').findByText('include.text', 'Women > Tops')
        cy.get('.product-information').findByText('Rs. 500').should('exist')
        cy.get('.product-information').findByText('In Stock').should('exist')
        cy.get('.product-information').findByText('New').should('exist')
        cy.get('.product-information').findByText('Polo').should('exist')

        //Increase quantity to 4
        cy.get("[id=quantity]").clear().type('4')

        //Click 'Add to cart' button
        cy.get(".btn.btn-default.cart").click()
        
        //Click 'View Cart' button
        cy.get(".modal-dialog.modal-confirm").findByText('View Cart').click()

        //Verify that product is displayed in cart page with exact quantity
        cy.get('.cart_quantity').contains('4')
    }),
    
    it('Place Order: Register while Checkout',()=>{
        // Add products to cart
        cy.get('[data-product-id="1"]').first().click()

        // Click 'Cart' button
        cy.get(".modal-dialog.modal-confirm").findByText('View Cart').click()

        // Verify that cart page is displayed
        cy.get('.breadcrumbs').find('.active').contains('Shopping Cart')

        // Click Proceed To Checkout
        cy.get('.btn.btn-default.check_out').click()

        // Click 'Register / Login' button
        cy.get('.text-center').eq(1).click()

        // Fill all details in Signup and create account
        register(()=>{

        })

        // Verify ' Logged in as username' at top
        cy.get('.shop-menu').find('li').contains('Logged in as vismayvismay')

        // Click 'Cart' button
        cy.get(".nav.navbar-nav").findByText('Cart').click()

        // Click 'Proceed To Checkout' button
        cy.get('.btn.btn-default.check_out').click()

        // Verify Address Details and Review Your Order
        cy.get('.step-one').first().contains('Address Details')
        cy.get('.step-one').eq(1).contains('Review Your Order')
        
        // Enter description in comment text area and click 'Place Order'
        cy.get("[name='message']").type('message')
        cy.get('.btn.btn-default.check_out').click()

        // Enter payment details: Name on Card, Card Number, CVC, Expiration date
        cy.get("[name='name_on_card']").type('Visa Card')
        cy.get("[name='card_number']").type('1234567890')
        
        cy.get("[data-qa='cvc']").type('123')
        cy.get("[data-qa='expiry-month']").type('10')
        cy.get("[data-qa='expiry-year']").type('2065')
        
        // Click 'Pay and Confirm Order' button
        
        invokeReload(() => {
            cy.get("[data-qa='pay-button']").click();
        });
          
        // Click 'Delete Account' button
        
        delete_accout(()=>{

        })    
        
        // Verify 'ACCOUNT DELETED!' and click 'Continue' button
           cy.get('[data-qa=account-deleted]').findByText('Account Deleted!') 
    }),

    it('Place Order: Register before Checkout',()=>{
        
        //Click 'Signup / Login' button
        cy.get("a[href='/login']").click()

        //Fill all details in Signup and create account
        register(()=>({

        }))
        
        //Add products to cart
        cy.get('[data-product-id="1"]').first().click()

        //Click 'Cart' button
        cy.get(".fa.fa-shopping-cart").first().click()  

        //Verify that cart page is displayed
        cy.get('.breadcrumbs').find('.active').contains('Shopping Cart')

        //Click Proceed To Checkout
        cy.get('.btn.btn-default.check_out').click()

        //Verify Address Details and Review Your Order
        cy.get('.step-one').first().contains('Address Details')
        cy.get('.step-one').eq(1).contains('Review Your Order')

        //Enter description in comment text area and click 'Place Order'
        cy.get("[name='message']").type('message')
        cy.get('.btn.btn-default.check_out').click()

        //Enter payment details: Name on Card, Card Number, CVC, Expiration date
        cy.get("[name='name_on_card']").type('Visa Card')
        cy.get("[name='card_number']").type('1234567890')
        
        cy.get("[data-qa='cvc']").type('123')
        cy.get("[data-qa='expiry-month']").type('10')
        cy.get("[data-qa='expiry-year']").type('2065')

        //Click 'Pay and Confirm Order' button
        invokeReload(() => {
            cy.get("[data-qa='pay-button']").click();
        });

        
        //Click 'Delete Account' button
        delete_accout(()=>{
            
        })       
        
    }),

    it('Place Order: Login before Checkout',()=>{
        
        //Click 'Signup / Login' button

        //Fill email, password and click 'Login' button
        login(()=>{

        })
        
        //Add products to cart
        cy.get('[data-product-id="1"]').first().click()
        
        //Click 'Cart' button
        cy.get(".fa.fa-shopping-cart").first().click()  

        //Verify that cart page is displayed
        cy.get('.breadcrumbs').find('.active').contains('Shopping Cart')

        //Click Proceed To Checkout
        cy.get('.btn.btn-default.check_out').click()
        
        //Verify Address Details and Review Your Order
        cy.get('.step-one').first().contains('Address Details')
        cy.get('.step-one').eq(1).contains('Review Your Order')

        //Enter description in comment text area and click 'Place Order'
        cy.get("[name='message']").type('message')
        cy.get('.btn.btn-default.check_out').click()

        //Enter payment details: Name on Card, Card Number, CVC, Expiration date
        cy.get("[name='name_on_card']").type('Visa Card')
        cy.get("[name='card_number']").type('1234567890')
        
        cy.get("[data-qa='cvc']").type('123')
        cy.get("[data-qa='expiry-month']").type('10')
        cy.get("[data-qa='expiry-year']").type('2065')
        
        //Click 'Pay and Confirm Order' button
        invokeReload(() => {
            cy.get("[data-qa='pay-button']").click();
        });
      
    }),

    it('Remove Products From Cart',()=>{
       
        //Add products to cart
        cy.get(".productinfo.text-center").first().trigger('mousehover')
        cy.get('[data-product-id="1"]').first().click()
        cy.get(".btn.btn-success.close-modal.btn-block").click()

        //Click 'Cart' button
        cy.get(".fa.fa-shopping-cart").first().click()
        
        
        //Verify that cart page is displayed
        cy.get('.breadcrumbs').find('.active').contains('Shopping Cart')

        //Click 'X' button corresponding to particular product
        cy.get('.cart_quantity_delete').first().click()

        //Verify that product is removed from the cart

    }),

    it('View Category Products',()=>{

        //Verify that categories are visible on left side bar
        cy.findByText('Category').should('exist')

        //Click on 'Women' category
        cy.get('[href="#Women"]').click()

        //Click on any category link under 'Women' category, for example: Dress
        cy.get('[id="Women"]').findByText('Dress').click()

        //Verify that category page is displayed and confirm text 'WOMEN - TOPS PRODUCTS'
        cy.get('.title.text-center').should('contain.text','Women - Dress Products')

        //On left side bar, click on any sub-category link of 'Men' category
        cy.get('[href="#Men"]').click()
        cy.get('[id="Men"]').findByText('Tshirts').click()
        
        //Verify that user is navigated to that category page
        cy.get('.title.text-center').should('contain.text','Men - Tshirts Products')

    }),

    it('View & Cart Brand Products',()=>{
        //Click on 'Products' button
        cy.get("a[href='/products']").click()
        
        //Verify that Brands are visible on left side bar
        cy.get('.brands_products').contains('Brands')
        cy.get('.brands-name').find('li').should('have.length', 8)
         
        //Click on any brand name
        cy.findByText('Polo').click()

        //Verify that user is navigated to brand page and brand products are displayed
        cy.get('.features_items').contains('Brand - Polo Products')
        
        //On left side bar, click on any other brand link
        cy.findByText('Biba').click()

        //Verify that user is navigated to that brand page and can see products
        cy.get('.features_items').contains('Brand - Biba Products')
    }),

    it('Search Products and Verify Cart After Login',()=>{
       
        //Click on 'Products' button
        cy.get("a[href='/products']").click()

        //Verify user is navigated to ALL PRODUCTS page successfully
        cy.get('.title.text-center').should('contain','All Products') 

        //Enter product name in search input and click search button
        cy.get("[id=search_product]").type('women')
        cy.get("[id=submit_search]").click()

        //Verify 'SEARCHED PRODUCTS' is visible
        cy.get('.title.text-center').should('contain','Searched Products') 

        //Verify all the products related to search are visible
        cy.get('.productinfo.text-center').each((item ,index)=>{
            cy.wrap(item).should('contain.text','Women');
        })

        //Add those products to cart
        cy.get('.col-sm-4').get('.fa.fa-shopping-cart').eq(1).click()
        cy.get('.btn.btn-success.close-modal.btn-block').click()
        cy.get('.col-sm-4').get('.fa.fa-shopping-cart').eq(3).click()
        cy.get(".modal-dialog.modal-confirm").findByText('View Cart').click()

        //Click 'Cart' button and verify that products are visible in cart
        
        cy.get("[id='cart_info_table']").find('tr').eq(1).contains('Madame Top For Women')
        cy.get("[id='cart_info_table']").find('tr').eq(1).contains('1')
        cy.get("[id='cart_info_table']").find('tr').eq(1).contains('Rs. 1000')

        cy.get("[id='cart_info_table']").find('tr').eq(2).contains('Lace Top For Women')
        cy.get("[id='cart_info_table']").find('tr').eq(2).contains('1')
        cy.get("[id='cart_info_table']").find('tr').eq(2).contains('Rs. 1400')

        //Click 'Signup / Login' button and submit login details
        login(()=>{}
        )
        
        //Again, go to Cart page
        cy.get(".fa.fa-shopping-cart").first().click()  
        
        //Verify that those products are visible in cart after login as well
        cy.get("[id='cart_info_table']").find('tr').eq(1).contains('Madame Top For Women')
        cy.get("[id='cart_info_table']").find('tr').eq(1).contains('1')
        cy.get("[id='cart_info_table']").find('tr').eq(1).contains('Rs. 1000')

        cy.get("[id='cart_info_table']").find('tr').eq(2).contains('Lace Top For Women')
        cy.get("[id='cart_info_table']").find('tr').eq(2).contains('1')
        cy.get("[id='cart_info_table']").find('tr').eq(2).contains('Rs. 1400')

    }),

    it('Add review on product',()=>{
        //Click on 'Products' button
        cy.get("a[href='/products']").click()
        
        //Verify user is navigated to ALL PRODUCTS page successfully
        cy.findByText('All Products').should('exist')

        //Click on 'View Product' button
        cy.get("a[href='/products']").click()
        cy.get("a[href='/product_details/1']").click()

        //Verify 'Write Your Review' is visible
        cy.get('.active').should('contain','Write Your Review')

        //Enter name, email and review
        cy.get("[id='name']").type('vismay')
        cy.get("[id='email']").type('vsimay@yopmail.com')
        cy.get("[id='review']").type('test')

        //Click 'Submit' button
        cy.get("[id='button-review']").click()
        
        //Verify success message 'Thank you for your review.'
        cy.get('.alert-success.alert').should('contain','Thank you for your review.')
    }),

    it('Add to cart from Recommended items',()=>{
        //Scroll to bottom of page
        cy.contains('recommended items').scrollIntoView()
        
        //Verify 'RECOMMENDED ITEMS' are visible
        cy.get('.recommended_items').contains('recommended items')
        
        //Click on 'Add To Cart' on Recommended product
        cy.get('[data-product-id="1"]').first().click()

        //Click on 'View Cart' button
        cy.get(".modal-dialog.modal-confirm").findByText('View Cart').click()

        //Verify that product is displayed in cart page
        cy.get('.cart_description').contains('Blue Top')

    })
    
    it('Verify address details in checkout page',()=>{
       
       //Click 'Signup / Login' button
       cy.get('[href="/login"]').click()

       //Fill all details in Signup and create account
       register(()=>{}
       )

       //Add products to cart
       cy.get("a[href='/products']").click()

       //Hover over first product and click 'Add to cart'
       cy.get(".productinfo.text-center").first().trigger('mousehover')
       cy.get('[data-product-id="1"]').first().click()
       cy.get(".btn.btn-success.close-modal.btn-block").click()
       
       //Click 'Cart' button
       cy.get(".fa.fa-shopping-cart").first().click()       
       
       //Verify that cart page is displayed
       cy.url().should('include', '/view_cart')

       //Click Proceed To Checkout
       cy.get('.btn.btn-default.check_out').click()

       //Verify that the delivery address is same address filled at the time registration of account
       cy.get('.col-xs-12.col-sm-6').get('.address_firstname.address_lastname').first().should('include.text','Parth Saraiya')
       cy.get('.col-xs-12.col-sm-6').first().should('include.text','India')
       cy.get('.col-xs-12.col-sm-6').first().should('include.text','Crest House')
       cy.get('.col-xs-12.col-sm-6').first().should('include.text','Makarba')
       cy.get('.col-xs-12.col-sm-6').first().contains('Ahmedabad Gujarat 380054')
       cy.get('.col-xs-12.col-sm-6').get('.address_country_name').first().should('include.text','India')
       cy.get('.col-xs-12.col-sm-6').get('.address_phone').first().should('include.text','9562356232')

       //Verify that the billing address is same address filled at the time registration of account
       cy.get('.col-xs-12.col-sm-6').get('.address_firstname.address_lastname').last().should('include.text','Parth Saraiya')
       cy.get('.col-xs-12.col-sm-6').next().should('include.text','India')
       cy.get('.col-xs-12.col-sm-6').next().should('include.text','Crest House')
       cy.get('.col-xs-12.col-sm-6').next().should('include.text','Makarba')
       cy.get('.col-xs-12.col-sm-6').next().contains('Ahmedabad Gujarat 380054')
       cy.get('.col-xs-12.col-sm-6').get('.address_country_name').last().should('include.text','India')
       cy.get('.col-xs-12.col-sm-6').get('.address_phone').last().should('include.text','9562356232')
       
       //Click 'Delete Account' button
       delete_accout(()=>{

       })
       //Verify 'ACCOUNT DELETED!' and click 'Continue' button
       cy.get('[data-qa=account-deleted]').contains('Account Deleted!')  

    })

})    
