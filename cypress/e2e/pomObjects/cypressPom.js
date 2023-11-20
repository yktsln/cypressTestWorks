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

     cartItems = [];

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
    cy.get('.fa-layers-counter.shopping_cart_badge').invoke('text').should('eq','6').should('exist');
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



  az(){// Sorts products in ascending order (A-Z) and verifies the order.
    cy.get('.product_sort_container').select('az');
   cy.get('.product_sort_container').should('have.value','az').should('be.visible');
   cy.get('.inventory_item').each(($product, index, $list) => {
    if (index === 0) return;

    const prevProductName = Cypress.$($list[index - 1]).find('.inventory_item_name').text();
    const currentProductName = $product.find('.inventory_item_name').text();

    expect(currentProductName >= prevProductName).to.be.true;
     });
  }



  za(){// Sorts products in descending order (Z-A) and verifies the order.
    cy.get('.product_sort_container').select('za');
    cy.get('.product_sort_container').should('have.value','za').should('be.visible');
    cy.get('.inventory_item').each(($product, index) => {
      if (index === 0) return;
 
      const prevProductName = Cypress.$('.inventory_item').eq(index - 1).find('.inventory_item_name').text();
      const currentProductName = $product.find('.inventory_item_name').text();

       expect(currentProductName <= prevProductName).to.be.true;
   });
  }



  lohi(){ // Sorts products by price from lowest to highest and verifies the order.
     cy.get('.product_sort_container').select('lohi');
    cy.get('.product_sort_container').should('have.value','lohi').should('be.visible');
    cy.get('.inventory_item').each(($product,index)=>{
      if(index === 0) return;
       
      const prevProductPrice = Cypress.$('.inventory_item').eq(index-1).find('.inventory_item_price').text();
      const currentProductPrice = $product.find('.inventory_item_price').text();
      
      expect(parseFloat(currentProductPrice.slice(1)) >= parseFloat(prevProductPrice.slice(1))).to.be.true;
    });
  }




  hilo(){ // Sorts products by price from highest to lowest and verifies the order.
    cy.get('.product_sort_container').select('hilo');
    cy.get('.product_sort_container').should('have.value','hilo').should('be.visible');
    cy.get('.inventory_item').each(($product,index)=>{
      if(index === 0) return;

      const prevProductPrice = Cypress.$('.inventory_item').eq(index-1).find('.inventory_item_price').text();
      const currentProductPrice = $product.find('.inventory_item_price').text();

      expect(parseFloat(currentProductPrice.slice(1)) <= parseFloat(prevProductPrice.slice(1))).to.be.true;
   });
  }

  footer(){
    cy.get('footer div, footer img,footer li').each(($list)=>{
      cy.wrap($list).should('be.visible');
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

  checkoutpage(){
    cy.get('.cart_footer .checkout_button').click();
    cy.url('https://www.saucedemo.com/v1/checkout-step-one.html');


  }

  checkoutpageHeader(){
    cy.get('.header_container div[class]').should('be.visible');
    cy.get('#shopping_cart_container').should('be.visible');
    cy.get('.fa-layers-counter.shopping_cart_badge').invoke('text').should('eq','6').should('exist');
    cy.get('.subheader').should('be.visible');
    cy.get('.bm-burger-button button').should('exist');
    cy.get('.bm-menu-wrap').should('exist').should('not.be.visible');
    cy.get('.bm-burger-button button').click();
    cy.get('.bm-menu-wrap').should('exist').should('be.visible');
    cy.get('.bm-menu-wrap a').each(($link)=>{
      cy.wrap($link).should('be.visible');
      });
    cy.get('.bm-cross-button button').click();
  }

  setAndVerifyValues() {
    cy.get('.checkout_info input').each(($list)=>{
      cy.wrap($list).should('exist').should('value','');
    });
   cy.get('.checkout_info input').each(($list, $index) => {
     let expectedValue;

     if ($index === 0) {
      expectedValue = 'UserFirstName';
     } else if ($index === 1) {
      expectedValue = 'UserLastName';
     } else if ($index === 2) {
      expectedValue = '123123';
     }

     cy.wrap($list).type(expectedValue);
     cy.wrap($list).should('have.value', expectedValue);
    });
  }

  setInvalidValues(){
    cy.get('.checkout_info input').each(($list)=>{
      cy.wrap($list).should('exist').should('value','');
    });
    cy.get('.checkout_info input').each(($list, $index) => {
      if($index === 0){
        cy.contains('Error: First Name is required').should('not.to.be.exist');
        cy.get('.checkout_buttons input').click();
        cy.contains('Error: First Name is required').should('to.be.exist');
      }
     
    });
  }

  

}