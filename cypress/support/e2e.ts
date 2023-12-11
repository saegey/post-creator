// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(() => {
  cy.session(
    "loginTestingUser",
    () => {
      cy.visit("http://localhost:3000/login");
      cy.get("#email").type("adam.saegebarth@gmail.com");
      cy.get("#password").type(`mec4czd8YGE@gut@feh`);
      cy.get("#submit-login").click();
      cy.wait(500);
      cy.location("pathname").should("eq", "/");
    },
    {
      cacheAcrossSpecs: true,
    }
  );
});
