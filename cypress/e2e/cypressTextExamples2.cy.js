import { log } from 'console';
import { cypressTest } from './pomObjects/cypressPom';
const login = new cypressTest();

describe('template spec', () => {
  

  it('should navigate to the login page and check the title', () => {
    login.navigate();
    login.username();
    login.password();
    login.loginBtn();
    cy.get('.btn_primary.btn_inventory').contains('ADD TO CART').should('exist');
    cy.get('.btn_secondary.btn_inventory').should('not.exist');
    cy.get('.btn_primary.btn_inventory').each(($list)=>{
      cy.wrap($list).click();
      
    });
    cy.get('.btn_primary.btn_inventory').should('not.exist');
    cy.get('.btn_secondary.btn_inventory').should('be.visible').should('exist');
    cy.get('#shopping_cart_container a').should('be.visible').click({force:true});

    
  });

  it.only('cart',()=>{
    login.navigate();
    login.username();
    login.password();
    login.loginBtn();
    login.headerTest();
    login.navigateCart();
    login.CartItems();
    login.cartRemoveElements();
  });


  
});
