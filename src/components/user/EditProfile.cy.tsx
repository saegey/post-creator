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
          email_verified: true,
          attributes: {
            name: "bob doe",
            zoneinfo: "metric",
            preferred_username: "bobjoe",
            picture: "fasfds",
            sub: "sfsd32432434",
            profile: "safsdfsdfsd",
          },
        }}
      />
    );
  });
});
