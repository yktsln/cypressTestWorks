import { log } from 'console';
import { cypressTest } from './pomObjects/cypressPom';


const login = new cypressTest();

describe('Shopping Cart Functionality Tests', () => {

  beforeEach(()=>{
    login.navigate();
    login.username();
    login.password();
    login.loginBtn();
    login.headerTest();
  })
  
  it('Shopping Cart Interaction Workflow', () => {
    cy.get('.btn_primary.btn_inventory').contains('ADD TO CART').should('exist');
    cy.get('.btn_secondary.btn_inventory').should('not.exist');
    cy.get('.btn_primary.btn_inventory').each(($list)=>{// Clicks 'ADD TO CART' button for each product.
      cy.wrap($list).click();
      
    });
    // Verifies that 'ADD TO CART' buttons are not present and 'REMOVE' buttons are visible.
    cy.get('.btn_primary.btn_inventory').should('not.exist');
    cy.get('.btn_secondary.btn_inventory').should('be.visible').should('exist');
    cy.get('#shopping_cart_container a').should('be.visible').click({force:true});
  });

  it('Check elements in the Cart list', () => {
    login.navigateCart();
    login.CartItems();
    cy.fixture('cart_items').then((expectedItems) => {
      expectedItems.forEach((addedItem, index) => {
      // Check if the added item matches the expected values
      cy.get('.cart_quantity').eq(index).should('have.text', addedItem.quantity.toString());
      cy.get('.inventory_item_name').eq(index).should('have.text', addedItem.name);
      cy.get('.inventory_item_desc').eq(index).should('have.text', addedItem.description);
      cy.get('.inventory_item_price').eq(index).should('have.text', addedItem.price);
    });
  });

  login.footer();
  });


  it('Remove each cart item',()=>{
   
    login.navigateCart();
    login.CartItems();
    login.cartRemoveElements();
    login.footer();
  });


  it('Checkout Process',()=>{
   
    login.navigateCart();
    login.CartItems();
    login.checkoutpage();
    login.checkoutpageHeader();
    login.setAndVerifyValues();  
    login.setInvalidValues();
  });


  it('Cart Overview',()=>{
    login.navigateCart();
    login.CartItems();
    login.checkoutpage();
    login.checkoutpageHeader();
    login.setAndVerifyValues();
    cy.get('.checkout_buttons [class]').each(($list)=>{
      cy.wrap($list).should('be.visible');
    });
    cy.get('.checkout_buttons input').click();
    cy.get('.subheader').should('be.visible').contains('Checkout: Overview');
    login.verifyCartItems();
    login.verifySummaryInfo();
    login.footer();
  
  });

  it('Finish Page',()=>{
    login.navigateCart();
    login.CartItems();
    login.checkoutpage();
    login.checkoutpageHeader();
    login.setAndVerifyValues();
    cy.get('.checkout_buttons [class]').each(($list)=>{
      cy.wrap($list).should('be.visible');
    });
    cy.get('.checkout_buttons input').click();
    cy.get('.subheader').should('be.visible').contains('Checkout: Overview');
    login.verifyCartItems();
    login.verifySummaryInfo();
    login.footer();
    cy.get('.cart_footer .cart_button').click();
    cy.url().should('eq','https://www.saucedemo.com/v1/checkout-complete.html');
    cy.get('.header_container div[class]').should('be.visible');
    cy.get('#shopping_cart_container').should('be.visible');
    cy.get('.subheader').should('be.visible').contains('Finish');
    cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER');
    cy.get('.complete-text').invoke('text').should('match', /Your\s*order\s*has\s*been\s*dispatched,\s*and\s*will\s*arrive\s*just\s*as\s*fast\s*as\s*the\s*pony\s*can\s*get\s*there!/);
    cy.get('.pony_express').should('have.attr','src','img/pony-express.png');
    login.footer();
  });

  it('About Page',()=>{
    login.navigate();
    login.username();
    login.password();
    login.loginBtn();
    cy.get('.bm-burger-button button').click();
    cy.get('#about_sidebar_link').click();
    cy.url().should('eq','https://saucelabs.com');
  })

  it.only('Logout',()=>{
    login.navigate();
    login.username();
    login.password();
    login.loginBtn();
    cy.get('.bm-burger-button button').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('eq','https://www.saucedemo.com/v1/index.html');
    cy.get('#user-name').should('have.value','');
    cy.get('#password').should('have.value','');
    cy.contains('Epic sadface: Username is required').should('not.exist');
    cy.get('#login-button').click()
    cy.contains('Epic sadface: Username is required').should('exist').should('be.visible');
  })
});
