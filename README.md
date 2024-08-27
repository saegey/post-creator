# Monopad Journal

**Monopad Journal** is a modular journal editor designed for activity-related posts. This project leverages Next.js and AWS Amplify (Gen 1) to provide a robust and scalable solution for managing and sharing your activities.

## Features

- Modular and customizable editor for activity-related posts.
- Integrates with MUX, Mapbox, Cloudinary, and AWS for enhanced media and map capabilities.
- Built with modern technologies such as React, Slate.js, and Theme UI.

## Installation

To get started with Monopad Journal, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/saegey/monopad-journal.git
   cd monopad-journal
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configuration**:

   Set up the necessary environment variables for MUX, Mapbox, Cloudinary, and AWS keys.

   ```bash
   NEXT_PUBLIC_MUX_API_KEY=your-mux-api-key
   NEXT_PUBLIC_MAPBOX_API_KEY=your-mapbox-api-key
   NEXT_PUBLIC_CLOUDINARY_API_KEY=your-cloudinary-api-key
   AWS_ACCESS_KEY_ID=your-aws-access-key-id
   AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
   ```

4. **Run the Development Server**:

   ```
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Configuration

Monopad Journal requires the following configurations:

- **MUX**: For video handling.
- **Mapbox**: For map rendering and geolocation features.
- **Cloudinary**: For image and video storage.
- **AWS**: For backend services provided by Amplify.

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

- [Slate.js](https://github.com/ianstormtaylor/slate)
- [Next.js](https://github.com/vercel/next.js)
- [Simply.js](https://github.com/your-username/simply.js)
- [Moment.js](https://github.com/moment/moment)
- [Recharts](https://github.com/recharts/recharts)
- [React](https://github.com/facebook/react)
- [Amplify](https://github.com/aws-amplify/amplify-js)
- [Theme UI](https://github.com/system-ui/theme-ui)

## Author

**Adam Saegebarth**
You can reach me at [your-email@example.com](mailto:your-email@example.com).

## Dependencies

Monopad Journal relies on the following key dependencies:

```json
"dependencies": {
"@aws-sdk/client-iot": "^3.632.0",
"@cloudinary-util/url-loader": "^5.6.0",
"@emotion/react": "^11.13.0",
"@floating-ui/react": "^0.26.6",
"@mux/mux-player-react": "^2.2.0",
"@mux/mux-uploader-react": "^1.0.0-beta.13",
"@slate-serializers/react": "^2.2.1",
"@vitejs/plugin-react": "^4.3.1",
"aws-amplify": "^5.3.21",
"gray-matter": "^4.0.3",
"image-size": "^1.1.1",
"mapbox-gl": "^2.15.0",
"moment": "^2.29.4",
"next": "^14.2.5",
"next-cloudinary": "^6.1.0",
"react": "^18.2.0",
"react-dom": "^18.2.0",
"react-google-recaptcha": "^3.1.0",
"react-markdown": "^9.0.1",
"react-slideshow-image": "^4.3.0",
"recharts": "^2.8.0",
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
"cypress": "^13.6.1",
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
