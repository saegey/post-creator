import React from "react";
import Header from "./Header";
import { ThemeUIProvider } from "theme-ui";
import theme from "../../utils/theme";

describe("<Header />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ThemeUIProvider theme={theme}>
        <Header
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
      </ThemeUIProvider>
    );
  });
});
