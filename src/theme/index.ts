import { createTheme } from '@mui/material/styles';
import { Theme } from '@mui/system';

// Define custom color palette
const harborColors = {
  primary: '#006699',
  secondary: '#F5A623',
  error: '#D32F2F',
  success: '#4CAF50',
  warning: '#FFC107',
  info: '#2196F3',
};

// Create custom theme object
const theme: Theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'Roboto', 'sans-serif'].join(','),
  },
  palette: {
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
    background: {
      default: '#F7DCDC', // A custom background color
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
          backgroundColor: '#133651',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
          flexShrink: 0,
        },
      },
    },
  },
});

export default theme;
