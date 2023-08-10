// src/utils/theme.ts
export default {
  colors: {
    text: '#111',
    background: '#fff',
    primary: 'black',
    secondary: '#3f3f3f',
    muted: '#e0e0e0',
    highlight: '#9f9f9f',
    gray: '#6c6c6c',
    accent: '#3f3f3f',
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  styles: {
    h1: {
      fontSize: 40,
      fontFamily: 'heading',
      fontWeight: 'heading',
      color: 'primary',
      mt: 4,
      mb: 2,
    },
  },
  sizes: {
    container: {
      maxWidth: '1100px',
    },
  },
};
