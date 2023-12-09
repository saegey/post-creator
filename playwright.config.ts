import { defineConfig } from "@playwright/test";

export default defineConfig({
  // Run your local dev server before starting the tests
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
  use: {
    baseURL: "http://127.0.0.1:3000",
  },
	reporter: [['json', { outputFile: 'playright/playright-results.json' }]],
});
