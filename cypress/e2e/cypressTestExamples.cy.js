/* Test Suite Description:

 This suite verifies the login process (validations for invalid/empty inputs) and 
 assesses the visibility and functionality of key elements on the inventory page. 
 It includes tests for the navigation bar, sorting options, and footer elements.*/

import { cypressTest} from './pomObjects/cypressPom'


const login = new cypressTest();




describe('cypress&jira Login test cases', () => {
  
  beforeEach(()=>{
    login.navigate();
    login.title();
  });

  it('verify login using invalid  username',()=>{
     cy.get('#user-name').type('abc');
     login.password();
     login.loginBtn();
     cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible');

  });

  it('verify logn using invalid password',()=>{
    login.username();
    cy.get('#password').type('123123');
    login.loginBtn();
    cy.contains('Epic sadface: Username and password do not match any user in this service').should('be.visible');
  });


  it('Verify login while leaving  username field empty',()=>{
    cy.get('input[type="text"]:empty').should('have.value','');
    login.password();
    login.loginBtn();
    cy.contains('Epic sadface: Username is required').should('be.visible');

  });

  it('Verify login while leaving  password field empty',()=>{
    login.username();
    cy.get('input[type="password"]:empty').should('have.value','');
    login.loginBtn();
    cy.contains('Epic sadface: Password is required').should('be.visible');
  });

  it('verify login using valid username and password',()=>{

    login.username();
    login.password();
    login.loginBtn();
    cy.url('https://www.saucedemo.com/v1/inventory.html')
    
  });
  

});

describe('cypress&jira Inventory',()=>{
  beforeEach(()=>{
    login.inventory();
  })

  it('Navbar elements',()=>{
    cy.get('.header_label .app_logo').should('be.visible');
    cy.get('#shopping_cart_container').should('be.visible');
    cy.get('.bm-burger-button button').should('exist');
  });

  it('Navbar burger button',()=>{
    cy.get('.bm-menu-wrap').should('exist').should('not.be.visible');
    cy.get('.bm-burger-button button').click();
    cy.get('.bm-menu-wrap').should('exist').should('be.visible');
    cy.get('.bm-menu-wrap a').each(($link)=>{
      cy.wrap($link).should('be.visible');
    });
    cy.get('#shopping_cart_container a').should('be.visible');//.click({force:true});sorun

  });

  it('Secondary navbar test',()=>{
    cy.get('.header_secondary_container div[class]').each(($div)=>{
      cy.get($div).should('be.visible');
      cy.get('.product_sort_container').should('be.visible');
    });

  });



  it('should display products in alphabetical order (A to Z)', () => {
   cy.get('.product_sort_container').select('az');
   cy.get('.product_sort_container').should('have.value','az').should('be.visible');
   cy.get('.inventory_item').each(($product, index, $list) => {
    if (index === 0) return;

    const prevProductName = Cypress.$($list[index - 1]).find('.inventory_item_name').text();
    const currentProductName = $product.find('.inventory_item_name').text();

    expect(currentProductName >= prevProductName).to.be.true;
     });
  });


  it('should display products in alphabetical order (Z to A)', () => {
    cy.get('.product_sort_container').select('za');
    cy.get('.product_sort_container').should('have.value','za').should('be.visible');
    cy.get('.inventory_item').each(($product, index) => {
      if (index === 0) return;
 
      const prevProductName = Cypress.$('.inventory_item').eq(index - 1).find('.inventory_item_name').text();
      const currentProductName = $product.find('.inventory_item_name').text();

       expect(currentProductName <= prevProductName).to.be.true;
   });
  });


  it('should display products low to high price order (low to high)',()=>{

    cy.get('.product_sort_container').select('lohi');
    cy.get('.product_sort_container').should('have.value','lohi').should('be.visible');
    cy.get('.inventory_item').each(($product,index)=>{
      if(index === 0) return;
       
      const prevProductPrice = Cypress.$('.inventory_item').eq(index-1).find('.inventory_item_price').text();
      const currentProductPrice = $product.find('.inventory_item_price').text();
      
      expect(parseFloat(currentProductPrice.slice(1)) >= parseFloat(prevProductPrice.slice(1))).to.be.true;
    });
  });


  it('should display products low to high price order (low to high)',()=>{
   cy.get('.product_sort_container').select('hilo');
   cy.get('.product_sort_container').should('have.value','hilo').should('be.visible');
   cy.get('.inventory_item').each(($product,index)=>{
      if(index === 0) return;

      const prevProductPrice = Cypress.$('.inventory_item').eq(index-1).find('.inventory_item_price').text();
      const currentProductPrice = $product.find('.inventory_item_price').text();

      expect(parseFloat(currentProductPrice.slice(1)) <= parseFloat(prevProductPrice.slice(1))).to.be.true;
   });
  });

  it('footer tests',()=>{
    cy.get('footer div, footer img,footer li').each(($list)=>{
      cy.wrap($list).should('be.visible');
    });
  });
});