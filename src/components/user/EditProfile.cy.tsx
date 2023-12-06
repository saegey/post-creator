import React from "react";
import EditProfile from "./EditProfile";

describe("<EditProfile />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <EditProfile
        user={{
          userId: "fsdafs",
          email: "sfdf",
          attributes: { name: "bob doe" },
        }}
      />
    );
  });
});
