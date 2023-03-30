import {createTheme } from '@mui/material/styles';

const myTheme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#4681f4',
        light: '#fefefe',
      },
      secondary: {
        main: '#4681f4',
      },
      neutral: {
        main: '#ffffff',
        contrastText: '#fff',
      },
    },
  });

export default myTheme;