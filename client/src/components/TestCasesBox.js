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
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
}));

const TestCasesBox = (props) => {
  const classes = useStyles();

  const testCases = props.testCases;

  const downloadFileLocal = (data, filename) => {
    const link = document.createElement("a");
    link.href = data;
    link.download = filename;
    link.target = "_blank";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Mock test case data
  

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
          <Typography>{"Test Case " + (index + 1)}</Typography>
          {testCase && <IconButton onClick={() => downloadFileLocal(testCase, "test_case_" + (index+1) + ".txt")} color='inherit'>
            <SaveAltIcon />
          </IconButton>}
        </Box>
      ))}
    </Box>
    </ThemeProvider>
  );
};

export default TestCasesBox;
