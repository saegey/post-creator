import React from "react";
import EditProfile from "./EditProfile";
import { UserContext } from "../UserContext";

describe("<EditProfile />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    const user = {
      userId: "fsdafs",
      email: "sfdf",
      email_verified: true,
      attributes: {
        name: "bob doe",
        zoneinfo: "metric" as "metric",
        preferred_username: "bobjoe",
        picture: "fasfds",
        sub: "sfsd32432434",
        profile: "safsdfsdfsd",
      },
    };

    cy.mount(
      <UserContext.Provider value={{ user, setUser: () => {} }}>
        <EditProfile />
      </UserContext.Provider>
    );
  });
});
