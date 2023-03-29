import {createTheme } from '@mui/material/styles';

const myTheme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#fbfcfa',
        light: '#fefefe',
        darker: '#053e85',
      },
      neutral: {
        main: '#ffffff',
        contrastText: '#fff',
      },
    },
  });

export default myTheme;