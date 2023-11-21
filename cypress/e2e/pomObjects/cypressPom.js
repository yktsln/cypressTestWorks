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
    cy.url().should('eq','https://www.saucedemo.com/v1/checkout-step-one.html');


  }

  checkoutpageHeader(){
    // Verify the visibility of elements in the header container
    cy.get('.header_container div[class]').should('be.visible');
    cy.get('#shopping_cart_container').should('be.visible');
    // Check the shopping cart badge count
    cy.get('.fa-layers-counter.shopping_cart_badge').invoke('text').should('eq','6').should('exist');
    // Verify the visibility of the subheader
    cy.get('.subheader').should('be.visible');
    // Check the existence and visibility of the burger menu button
    cy.get('.bm-burger-button button').should('exist');
    // Check the existence and invisibility of the burger menu wrap initially
    cy.get('.bm-menu-wrap').should('exist').should('not.be.visible');
    // Open the burger menu and verify its visibility along with the links
    cy.get('.bm-burger-button button').click();
    cy.get('.bm-menu-wrap').should('exist').should('be.visible');
    cy.get('.bm-menu-wrap a').each(($link)=>{
      cy.wrap($link).should('be.visible');
      });
      // Close the burger menu
    cy.get('.bm-cross-button button').click();
  }

  setAndVerifyValues() {//Sets specific values to input fields in the checkout information section and verifies the values.
    // Verify that all input fields exist and have an initial value of an empty string
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
      // Set the value and verify
     cy.wrap($list).type(expectedValue);
     cy.wrap($list).should('have.value', expectedValue);
    });
  }

  setInvalidValues(){// Scenarios for Checking Input Validation and Errors in Checkout Information
    
    cy.get('.checkout_info input').each(($list ,$index) => {//Check for empty first name
      cy.wrap($list).clear();

      if($index === 0){
        cy.wrap($list).should('exist').should('value','');
        cy.contains('Error: First Name is required').should('not.to.be.exist');
      }else if($index === 1){
        cy.get($list).type('UserLastName')
      }else if($index === 2){
        cy.get($list).type('123123')
      }
      
      cy.get('.checkout_buttons input').click();
      cy.contains('Error: First Name is required').should('to.be.exist');  
    });



    cy.get('.checkout_info input').each(($list ,$index) => {//Check for empty last name
    cy.wrap($list).clear();
      
      if($index === 0){
        cy.get($list).type('UserFirstName')
      }else if($index === 1){
        cy.wrap($list).should('exist').should('value','');
        cy.contains('Error: Last Name is required').should('not.to.be.exist');
      }else if($index === 2){
        cy.get($list).type('123123')
      }
      
          
    });
    cy.get('.checkout_buttons input').click();
    cy.contains('Error: Last Name is required').should('to.be.exist');



    cy.get('.checkout_info input').each(($list ,$index) => {//Check for empty Postal Code
    cy.wrap($list).clear();
      
      if($index === 0){
        cy.get($list).type('UserFirstName')
      }else if($index === 1){
        cy.get($list).type('UserLastName')
      }else if($index === 2){
        cy.wrap($list).should('exist').should('value','');
        cy.contains('Error: Postal Code is required').should('not.to.be.exist');
        
      }
      
          
    });
    cy.get('.checkout_buttons input').click();
    cy.contains('Error: Postal Code is required').should('to.be.exist');


    cy.get('.checkout_info input').each(($list ,$index) => {//Check for all inputs empty 
    cy.wrap($list).clear();

      if($index === 0){
      cy.wrap($list).should('exist').should('value','');
      cy.contains('Error: First Name is required').should('not.to.be.exist');
      }else if($index === 1){
        cy.wrap($list).should('exist').should('value','');
      }else if($index === 2){
        cy.wrap($list).should('exist').should('value','');
      }
      
      cy.get('.checkout_buttons input').click();
      cy.contains('Error: First Name is required').should('to.be.exist');  


    });



  }

  verifyCartItems(){//Verifies the items in the shopping cart against the expected items provided in the fixture.
    cy.fixture('cart_items').then((expectedItems)=>{
      cy.get('.cart_item').each(($item,index)=>{ 
        const addedItem =expectedItems[index];

        cy.get($item).find('.summary_quantity').should('have.text', addedItem.quantity.toString());
        cy.get($item).find('.inventory_item_name').should('have.text',addedItem.name);
        cy.get($item).find('.inventory_item_desc').should('have.text', addedItem.description);
        cy.get($item).find('.inventory_item_price').should('have.text', `$${addedItem.price}`);
      });
    });

  }

  verifySummaryInfo(){//Verifies the summary information in the cart, including item total, tax, total, and footer links.
    cy.get('.summary_info.summary_info div[class]:not(.cart_footer)').each(($list, index) => {
    cy.wrap($list).should('be.visible');    
      if (index === 5) {
         cy.fixture('cart_items').then((prices) => {
            const totalExpectedPrice = prices.reduce((total, item) => total + parseFloat(item.price), 0);
            cy.get('.summary_info .summary_subtotal_label').should('have.text', `Item total: $${totalExpectedPrice.toFixed(2)}`);
          });
        }
    });
    cy.get('.summary_tax_label').should('exist')
        .then(() => {
            const itemTotal = 129.93;
            const taxRate = 0.08008;
            const calculatedTax = itemTotal * taxRate;
            const formattedTax = calculatedTax.toFixed(2);
            cy.get('.summary_tax_label').should('have.text', `Tax: $${formattedTax}`);
          });
     cy.get('.summary_total_label').should('be.visible')
        .then(() => {
            const summaryTotal = 129.94 + 10.40;
            cy.get('.summary_total_label').should('have.text', `Total: $${summaryTotal}`);
        });
      
      cy.get('.cart_footer a').should('be.visible').each(($list,index)=>{
        if(index === 0){
          cy.wrap($list).should('have.text','CANCEL')
        }else if(index === 1){
          cy.wrap($list).should('have.text','FINISH')
        }
      })
  }
}