import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: "./src/setupTests.ts", // If you have setup files
    include: [
      "__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "src/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "pages/**/*.{test,spec}.{js,ts,jsx,tsx}",
      "amplify/backend/function/**/src/__tests__/*.{test,spec}.{js,ts}",
    ],
    exclude: [...configDefaults.exclude, "*/amplify/#current-cloud-backend/**"],
    coverage: {
      reporter: ["text", "json-summary", "json"],
      reportOnFailure: true,
      include: [
        "pages/**/*.{js,ts,jsx,tsx}",
        "src/**/*.{js,ts,jsx,tsx}",
        "amplify/backend/function/**/src/__tests__/*.{js,ts}",
      ],
    },
  },
});
