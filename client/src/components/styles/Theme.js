import {createTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing(2),
    width: '100%'
  }
}));


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
      },
      white: {
        main: '#ffffff',
      }
    },
  });

export const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
    icon: {
      primary: '#ffffff'
    }
  },
});

export default myTheme;