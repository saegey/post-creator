# Monopad Journal

**[Monopad Journal](https://www.monopad.app/)** is a modular journal editor designed for activity-related posts. This project leverages Next.js and AWS Amplify (Gen 1) to provide a robust and scalable solution for managing and sharing your activities.

## Features

- Modular and customizable editor for activity-related posts.
- Integrates with AWS, Cloudinary, Mapbox and MUX for enhanced media and map capabilities.
- Built with modern technologies such as React, Slate.js, and Theme UI.

## Installation

To get started with Monopad Journal, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone git@github.com:saegey/post-creator.git

   cd post-creator
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:

   Set up the necessary environment variables for MUX, Mapbox, Cloudinary, and AWS keys into a `.env.local` file.

   ```bash
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   MUX_TOKEN_ID=your-mux-token-id
   MUX_TOKEN_SECRET=your-mux-token-secret
   ```

4. **Configure Amplify**

   ```bash
   amplify pull -appId your-amplify-app-id -envName your-amplify-env-name
   ```

5. **Run the Development Server**:

   ```
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Configuration

Monopad Journal requires the following configurations:

- **AWS**: For backend services provided by Amplify.
- **Cloudinary**: For image and video storage.
- **Mapbox**: For map rendering and geolocation features.
- **MUX**: For video handling.

## Testing

This project uses **Vitest** for unit testing and **Cypress** for end-to-end testing.

To run the tests:

```bash
# Run Vitest tests
npm run test

# Run Cypress tests
npm run cypress:open
```

## Contribution Guidelines

Contributions are welcome! Please follow the [Contributing Guidelines](https://github.com/nayafia/contributing-template) commonly used in popular open-source projects.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

Monopad Journal was built using the following open-source projects:

- [Amplify](https://github.com/aws-amplify/amplify-js)
- [Moment.js](https://github.com/moment/moment)
- [Next.js](https://github.com/vercel/next.js)
- [React](https://github.com/facebook/react)
- [Recharts](https://github.com/recharts/recharts)
- [Simply.js](https://github.com/your-username/simply.js)
- [Slate.js](https://github.com/ianstormtaylor/slate)
- [Theme UI](https://github.com/system-ui/theme-ui)

## Author

**Adam Saegebarth**
You can reach me at [adam.saegebarth@gmail.com](mailto:adam.saegebarth@gmail.com).

## Dependencies

Monopad Journal relies on the following key dependencies:

```json
"dependencies": {
  "@aws-sdk/client-cognito-identity-provider": "^3.645.0",
  "@aws-sdk/client-iot": "^3.632.0",
  "@cloudinary-util/url-loader": "^5.6.0",
  "@emotion/react": "^11.13.0",
  "@floating-ui/react": "^0.26.6",
  "@mux/mux-player-react": "^2.2.0",
  "@mux/mux-uploader-react": "^1.0.0-beta.13",
  "@slate-serializers/react": "^2.2.1",
  "@theme-ui/color": "^0.16.2",
  "@vitejs/plugin-react": "^4.3.1",
  "aws-amplify": "^5.3.21",
  "gray-matter": "^4.0.3",
  "image-size": "^1.1.1",
  "mapbox-gl": "^2.15.0",
  "moment": "^2.29.4",
  "next": "^14.2.7",
  "next-cloudinary": "^6.1.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-google-recaptcha": "^3.1.0",
  "react-markdown": "^9.0.1",
  "react-slideshow-image": "^4.3.0",
  "recharts": "^2.12.7",
  "remark": "^15.0.1",
  "remark-html": "^16.0.1",
  "slate": "^0.103.0",
  "slate-history": "^0.100.0",
  "slate-react": "^0.108.0"
},
"devDependencies": {
  "@swc/core": "^1.7.11",
  "@testing-library/jest-dom": "^6.4.8",
  "@testing-library/react": "^16.0.0",
  "@testing-library/user-event": "^14.5.2",
  "@types/formidable": "^3.4.0",
  "@types/mapbox-gl": "^2.7.13",
  "@types/mdast": "^4.0.3",
  "@types/react": "^18.2.0",
  "@types/react-google-recaptcha": "^2.1.8",
  "@types/react-test-renderer": "^18.0.7",
  "@vitest/coverage-v8": "^2.0.5",
  "@vitest/ui": "^2.0.5",
  "cypress": "^13.14.1",
  "happy-dom": "^14.12.3",
  "identity-obj-proxy": "^3.0.0",
  "mocha": "^10.7.3",
  "mochawesome": "^7.1.3",
  "mochawesome-merge": "^4.3.0",
  "mochawesome-report-generator": "^6.2.0",
  "node-fetch": "^3.3.2",
  "react-test-renderer": "^18.2.0",
  "theme-ui": "^0.16.2",
  "typescript": "5.1.6",
  "vi-fetch": "^0.8.0",
  "vitest": "^2.0.5"
}
```

## Badges

![GitHub Actions](https://img.shields.io/github/actions/workflow/status/your-username/monopad-journal/ci.yml)
![Amplify Build Status](https://img.shields.io/amplify/build/your-app-id/branch)
![Cypress Tests](https://img.shields.io/cypress/status?branch=main)
![Coverage](https://img.shields.io/coverage/your-coverage-endpoint)
