// src/utils/theme.ts
export default {
  colors: {
    text: '#202020',
    buttonBorderColor: '#d4d4d4',
    menuItemBackgroundHoverColor: '#ececec',
    buttonBackgroundHoverColor: '#e8e8e8',
		skeletonGradient1: '#7c7c7c',
    postCardTextBackground: 'white',
    cancelButtonColor: '#a1a1a1',
    postCardBorder: '#dadada',
    inputFocusBackground: '#eeeeee',
    background: '#fff',
    primary: 'black',
    secondary: '#3f3f3f',
    muted: '#e0e0e0',
    highlight: '#9f9f9f',
    gray: '#6c6c6c',
    accent: '#3f3f3f',
    modes: {
      dark: {
        text: '#fff',
        background: '#262626',
        postCardTextBackground: '#4b4b4b',
        inputFocusBackground: '#858585',
        buttonBackgroundHoverColor: '#7c7c7c',
				skeletonGradient1: '#7c7c7c',
        postCardBorder: '#6f6f6f',
        menuItemBackgroundHoverColor: '#404040',
        buttonBorderColor: '#7c7c7c',
        primary: '#909090',
        secondary: '#09c',
        muted: '#111',
        cancelButtonColor: '#4f4f4f',
      },
    },
  },
  text: {
    menuItem: {
      // textTransform: 'uppercase',
      // letterSpacing: '.2em',
      '&:hover': {
        backgroundColor: 'menuItemBackgroundHoverColor',
        borderRadius: '5px',
      },
      cursor: 'pointer',
      color: 'text',
      // textDecoration: 'none',
      padding: '5px',
      width: '100%',
      textDecoration: 'none',
    },
  },
  boxes: {
    skeletonButton: {
      height: '33px',
      width: '163px',
      borderRadius: '5px',
      backgroundImage:
        'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
      backgroundSize: '600px',
      animation: 'shine-lines 1.6s infinite linear',
    },
  },
  links: {
    mainMenuItem: {
      fontWeight: 600,
      padding: '5px',
      color: 'text',
      '&:hover': {
        backgroundColor: 'menuItemBackgroundHoverColor',
        borderRadius: '5px',
        color: 'text',
      },
    },
  },
  forms: {
    defaultInput: {
      borderColor: '#898989',
      '&:focus': {
        backgroundColor: 'inputFocusBackground',
      },
    },
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
