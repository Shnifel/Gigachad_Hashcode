import React from 'react';
import { Box, Typography, makeStyles, IconButton, ThemeProvider, CssBaseline } from '@material-ui/core';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { darkTheme } from './styles/Theme';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#1d1d1d',
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2),
    display: 'inline-block',
    flexDirection: "column",
    
  },
  heading: {
    backgroundColor: '#C8A2C8',
    padding: theme.spacing(1),
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
}));

const TestCasesBox = () => {
  const classes = useStyles();

  // Mock test case data
  const testCases = ['Test Case 1', 'Test Case 2', 'Test Case 3'];

  const handleDownload = (testCase) => {
    // Logic to download the text file for the given testCase
    console.log(`Downloading file for ${testCase}`);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
    <Box className={classes.container}>
      <Box className={classes.heading}>
        <Typography variant="h6">Test cases</Typography>
      </Box>
      {testCases.map((testCase, index) => (
        <Box key={index} className={classes.row}>
          <Typography>{testCase}</Typography>
          <IconButton onClick={() => handleDownload(testCase)} color='inherit'>
            <SaveAltIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
    </ThemeProvider>
  );
};

export default TestCasesBox;
