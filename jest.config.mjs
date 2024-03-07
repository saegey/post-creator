import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // verbose: true,
  coverageReporters: ["html", "json", "lcov", ["text", { skipFull: true }]],
  // testEnvironment: "jest-environment-jsdom",
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(@aws-amplify|ui-react|@aws-sdk)/)",
  ],
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/amplify/#current-cloud-backend/"],
  setupFilesAfterEnv: ["./jest.setup.js"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
