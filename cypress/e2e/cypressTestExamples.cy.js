/* Test Suite Description:

 This suite verifies the login process (validations for invalid/empty inputs) and 
 assesses the visibility and functionality of key elements on the inventory page. 
 It includes tests for the navigation bar, sorting options, and footer elements.*/

import { cypressTest} from './pomObjects/cypressPom'


const login = new cypressTest();




describe('Login Page Tests', () => {
  
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

describe('Inventory Page Tests',()=>{
  beforeEach(()=>{
    login.inventory();
  })

  it('Header Elements Test',()=>{
  login.headerTest();
  })



  it('should display products in alphabetical order (A to Z)', () => {
    login.az();
  });


  it('should display products in alphabetical order (Z to A)', () => {
    login.za();
  });


  it('should display products low to high price order (low to high)',()=>{
      login.lohi();
  });


  it('should display products low to high price order (low to high)',()=>{
   login.hilo();
  });

  it('footer tests',()=>{
    login.footer();
  });
});