export class cypressTest{

   navigate(){
    
    cy.visit('https://www.saucedemo.com/v1/')
   }
   
  title() {
    cy.title().should('eq', 'Swag Labs');
   }

  username() {
    cy.get('#user-name').type('standard_user');
  }

  
  password() {
    cy.get('#password').type('secret_sauce');
  }

  
  loginBtn() {
    cy.get('#login-button').click();
  }

  inventory(){
    cy.visit('https://www.saucedemo.com/v1/inventory.html')
  }

  navigateCart(){
     // Check the existence of ADD TO CART buttons
    cy.get('.btn_primary.btn_inventory').contains('ADD TO CART').should('exist');
    cy.get('.btn_secondary.btn_inventory').should('not.exist');
    // Click each ADD TO CART button
    cy.get('.btn_primary.btn_inventory').each(($list)=>{
      cy.wrap($list).click({force:true});
      });
      // Check that ADD TO CART buttons are no longer present
    cy.get('.btn_primary.btn_inventory').should('not.exist');
    cy.get('.btn_secondary.btn_inventory').should('be.visible').should('exist');
    cy.get('#shopping_cart_container a').should('be.visible').click({force:true});
  }

  headerTest(){
    // Check header elements
    cy.get('.header_label .app_logo').should('be.visible');
    cy.get('#shopping_cart_container').should('be.visible');
    cy.get('.bm-burger-button button').should('exist');
      // Open the Burger menu
    cy.get('.bm-menu-wrap').should('exist').should('not.be.visible');
    cy.get('.bm-burger-button button').click();
    cy.get('.bm-menu-wrap').should('exist').should('be.visible');
     // Check links inside the Burger menu
    cy.get('.bm-menu-wrap a').each(($link)=>{
      cy.wrap($link).should('be.visible');
       });
    // Close the Burger menu
    cy.get('.bm-cross-button button').click();
    // Check the Shopping cart link
    cy.get('#shopping_cart_container a').should('be.visible');//.click({force:true});problem
     // Check other header elements
    cy.get('.header_secondary_container div[class]').each(($div)=>{
      cy.get($div).should('be.visible');
      cy.get('.product_sort_container').should('be.visible');
    });
  }
  
  CartItems(){
    // Check elements in the Cart list
    cy.get('.cart_list div[class]').each(($list)=>{
      cy.wrap($list).should('be.visible').should('exist');
    }) 
  }

  cartRemoveElements(){
    // Remove each cart item
   cy.get('.cart_item').each(($cartItem) => {
     cy.get($cartItem).find('.btn_secondary.cart_button').click();
     cy.get($cartItem).find('.cart_item').should('not.exist');
    });
      // Check the removed cart items
   cy.get('.cart_list').find('.removed_cart_item').should('value','');

  }

  


}