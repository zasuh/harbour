import { createTheme, ThemeOptions } from '@mui/material';

const harbourPalette = {
  primary: {
    light: '#ffc947', // light orange
    main: '#FF5722', // dark orange
    dark: '#c41c00', // deep red
    contrastText: '#fff',
  },
  secondary: {
    light: '#ffff81', // light yellow
    main: '#FF9800', // dark yellow
    dark: '#c66900', // brownish yellow
    contrastText: '#fff',
  },
  background: {
    paper: '#fff',
    default: '#F5F5DC', // beige
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#bdbdbd',
  },
};

const theme: ThemeOptions = createTheme({
  palette: harbourPalette,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
        colorPrimary: {
          backgroundColor: '#424242',
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
