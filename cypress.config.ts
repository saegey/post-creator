import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "cypress/support/index.ts", // Ensure this points to the correct file
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
