import awsExports from "../../src/aws-exports"; // Path to your Amplify config

import { Auth, Amplify } from "aws-amplify"; // Import

// Configure Amplify with your aws-exports file
Amplify.configure(awsExports);

describe("Profile", () => {
  let originalAttributes: any;

  beforeEach(() => {
    // Sign in before any tests
    cy.signIn("adam.saegebarth+test@gmail.com", "TPQ!jfb*zwv2yzd6fjt").then(
      () => {
        // Once signed in, get the user's attributes
        cy.getUserAttributes().then((attributes) => {
          originalAttributes = attributes;
          console.log("Original user attributes:", originalAttributes);
        });
      }
    );

    cy.session(
      "loginTestingUser",
      () => {
        cy.visit("http://localhost:3000/login");
        cy.get("#email").type("adam.saegebarth+test@gmail.com");
        cy.get("#password").type(`TPQ!jfb*zwv2yzd6fjt`);
        cy.get("#submit-login").click();
        cy.wait(5000);
        cy.location("pathname").should("eq", "/posts");
      },
      {
        cacheAcrossSpecs: true,
      }
    );
  });

  it("should load profile page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/profile");
    // cy.wait(2000);
    cy.log("profile page loaded");

    // The full name should be correct
    // cy.get("#fullName").contains("Adam S");
    cy.get("#fullName", { timeout: 10000 }).should("have.value", "Test User");

    // The username should be correct
    cy.get("#username", { timeout: 10000 }).should("have.value", "testuser");
    // cy.get("#username").contains("saegey");

    // The new page should contain an h1 with "About page"
    cy.get("#location", { timeout: 10000 }).should(
      "have.value",
      "Test Location"
    );

    // cy.get("img", { timeout: 10000 })
    //   .should("have.attr", "src")
    //   .and(
    //     "include",
    //     "https://res.cloudinary.com/dprifih4o/image/upload/u_rsdz1sdlkoc55m7jbdkf,c_fill,w_1.0,h_1.0,fl_relative/fl_layer_apply,fl_no_overflow/c_limit,w_400/rsdz1sdlkoc55m7jbdkf?_a=BAVCr+DW0"
    //   );
  });

  it("should update the user profile", () => {
    cy.visit("http://localhost:3000/profile");

    // Clear the location input and type a new value
    cy.get("#location", { timeout: 10000 }).clear().type("New York, NY");

    // Click the save button
    cy.get("#save-profile").click();

    // Ensure the loading spinner appears
    cy.get("#loading-spinner", { timeout: 10000 }).should("exist");

    // Ensure the loading spinner disappears
    // cy.get("#loading-spinner", { timeout: 10000 }).should("not.exist");

    // Reload the page after the spinner disappears
    cy.reload();

    // Verify that the location is updated
    // cy.get("#location").should("have.value", "New York, NY");
  });

  after(() => {
    // Restore the original attributes after the test completes
    cy.signIn("adam.saegebarth+test@gmail.com", "TPQ!jfb*zwv2yzd6fjt").then(
      () => {
        cy.updateUserAttributes(originalAttributes).then((response) => {
          console.log("Original attributes restored:", response);
        });
      }
    );
  });
});
