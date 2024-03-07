
// ChatGPT
// If you prefer not to use jsdom as the test environment, you have another option: mocking the DOM-related functionality that is causing the "ReferenceError: document is not defined" error.

// In this approach, you can mock the necessary DOM-related functions and objects using Jest's mocking capabilities. Here's how you can do it:

// Create a file (e.g., mocks/dom.js) to define the mock DOM environment:
// javascript
// Copy code
// mocks/dom.js

// Mock document object
// global.document = {
//   createElement: jest.fn(),
//   createTextNode: jest.fn(),
//   querySelector: jest.fn(),
//   querySelectorAll: jest.fn(),
//   // Add other necessary methods or properties
// };

// // Mock window object
// global.window = {
//   addEventListener: jest.fn(),
//   // Add other necessary methods or properties
// };
