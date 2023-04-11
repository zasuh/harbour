import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/system';

// Create custom theme object
const theme: Theme = createTheme({
  palette: {
    text: {
      primary: '#FFFFFF',
      secondary: '#FFFFFF',
    },
    mode: 'light',
    primary: {
      main: '#9479CE', // A custom primary color
    },
    secondary: {
      main: '#83E4C7', // A custom secondary color
    },
    error: {
      main: '#C0392B', // A custom error color
    },
    warning: {
      main: '#F1C40F', // A custom warning color
    },
    info: {
      main: '#8E44AD', // A custom info color
    },
    success: {
      main: '#27AE60', // A custom success color
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Roboto, sans-serif',
          fontSize: 14,
        },
        h1: {
          fontSize: '3rem',
          fontWeight: 700,
          lineHeight: 1.167,
        },
        h2: {
          fontSize: '2.5rem',
          fontWeight: 600,
          lineHeight: 1.2,
        },
        h3: {
          fontSize: '2rem',
          fontWeight: 600,
          lineHeight: 1.167,
        },
        h4: {
          fontSize: '1.5rem',
          fontWeight: 600,
          lineHeight: 1.235,
        },
        h5: {
          fontSize: '1.25rem',
          fontWeight: 600,
          lineHeight: 1.334,
        },
        h6: {
          fontSize: '1rem',
          fontWeight: 600,
          lineHeight: 1.6,
        },
        subtitle1: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5,
        },
        subtitle2: {
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.57,
        },
        body1: {
          fontSize: '1rem',
          fontWeight: 400,
          lineHeight: 1.5,
        },
        body2: {
          fontSize: '0.875rem',
          fontWeight: 400,
          lineHeight: 1.43,
        },
        button: {
          fontSize: '0.875rem',
          fontWeight: 500,
          lineHeight: 1.75,
          textTransform: 'uppercase',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        colorPrimary: {
          backgroundColor: '#092D48',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
          flexShrink: 0,
          backgroundColor: '#092D48',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '.MuiOutlinedInput-root': {
            color: '#9479CE',
            '.MuiInputLabel-root': {
              color: '#9479CE', // set label color
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#9479CE',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9479CE',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#9479CE',
            },
          },
        },
      },
    },
  },
});

export default theme;
