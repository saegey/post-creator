describe("<RaceResultsImport />", () => {
  skip("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.visit("http://localhost:3000/posts");
    cy.get("#create-new-post").click();
    // cy.wait(6000);
    // cy.get("#new-component").click();
    cy.get(".hoverAction", { timeout: 10000 }).trigger("mouseover");
    cy.get(".hoverIcon").click();
    cy.get("#add-race-results").click();
    // cy.wait(100);
    cy.get("#url").type("http://my.raceresult.com/262579/results");
    cy.get("#import-results").click();
    cy.get("#category").select(1);
    cy.get("#division").select(1);
    cy.get("#get-race-results").click();
    cy.get("#race-result-row-0").should("be.visible");

    // cleanup
    cy.get("#close-button").click();
    // cy.get("#close-sidebar-menu").click();
    cy.get("#settings-button").click();
    cy.get("#delete-post").click();
  });
});
