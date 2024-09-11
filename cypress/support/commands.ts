/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { Amplify, Auth } from "aws-amplify"; // Import Amplify and Auth
import awsExports from "../../src/aws-exports"; // Path to your Amplify config
import { IUser } from "../../src/types/common";

// Configure Amplify with your aws-exports file
Amplify.configure(awsExports);

console.log("Cypress support file loaded");

// Cypress command to get the currently authenticated user's attributes (using GetUser API)
declare global {
  namespace Cypress {
    interface Chainable {
      getUserAttributes(): Cypress.Chainable<any>;
      updateUserAttributes(attributes: Partial<IUser>): Cypress.Chainable<any>;
      signIn(username: string, password: string): Cypress.Chainable<any>;
    }
  }
}

Cypress.Commands.add("signIn", (username: string, password: string) => {
  return cy.wrap(
    Auth.signIn(username, password)
      .then((user) => {
        console.log("User signed in successfully:", user);
        return user;
      })
      .catch((err) => {
        console.error("Error signing in:", err);
        throw err;
      })
  );
});

// Custom command to get the currently authenticated user's attributes
Cypress.Commands.add("getUserAttributes", () => {
  return cy.wrap(
    Auth.currentAuthenticatedUser()
      .then((user) => {
        console.log("Authenticated user:", user);
        return user.attributes; // Return the user attributes
      })
      .catch((err) => {
        console.error("Error getting authenticated user:", err);
        throw err; // Handle error (e.g., user not authenticated)
      })
  );
});

// Cypress command to update the currently authenticated user's attributes
Cypress.Commands.add(
  "updateUserAttributes",
  (updatedAttributes: Partial<IUser>) => {
    return cy.wrap(
      Auth.currentAuthenticatedUser() // Get the currently authenticated user
        .then((user: any) => {
          return Auth.updateUserAttributes(user, updatedAttributes); // Update attributes
        })
        .then((response: any) => {
          console.log("Attributes updated successfully", response);
          return response; // Return the response from Cognito
        })
        .catch((err: any) => {
          console.error("Error updating user attributes:", err);
          throw err; // Handle error
        })
    );
  }
);
