import {createTheme } from '@mui/material/styles';

const myTheme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      type: 'dark',
      primary: {
        main: '#03dac6',
        light: '#fefefe',
      },
      secondary: {
        main: '#fefefe',
      },
      neutral: {
        main: '#ffffff',
        contrastText: '#fff',
      },
      black: {
        main: '#000000',
      }
    },
  });

export default myTheme;