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
    cy.wait(1500)
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

  it.only('Checkout Process',()=>{
   
    login.navigateCart();
    login.CartItems();
    login.checkoutpage();
    login.checkoutpageHeader();
    login.setAndVerifyValues();
    cy.get('.checkout_info input').each(($list)=>{
      cy.get($list).clear();
    })
    
    login.setInvalidValues();



    cy.get('.checkout_buttons [class]').each(($list)=>{
      cy.wrap($list).should('be.visible');
    });
    cy.get('.checkout_buttons input').click();

  });


  it('Cart Overview',()=>{
    login.navigateCart();
    login.CartItems();
    login.checkoutpage();
    login.checkoutpageHeader();
    login.setValidAndVerifyValues();
    cy.get('.checkout_buttons [class]').each(($list)=>{
      cy.wrap($list).should('be.visible');
    });


    cy.get('.checkout_buttons input').click();
    cy.get('.subheader').should('be.visible').contains('Checkout: Overview');
    cy.get('.cart_list div[class]').each(($list,$index)=>{

    })


  });
});
