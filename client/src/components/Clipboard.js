import React from 'react';
import CopyToClipboard from 'copy-to-clipboard';
import IconButton from '@material-ui/core/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import { darkTheme } from './styles/Theme';
import { ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles({
  iconButton: {
    marginLeft: '8px',
    justifyContent: 'right'
  },
});
// Adding functionality for displaying and copying team codes
const Clipboard = (props) => {
  const label = props.label;
  const copy = props.copy;
  const classes = useStyles();

  const handleCopy = () => {
    CopyToClipboard(copy);
  }

  return (
    <ThemeProvider theme={darkTheme}>
    <Paper sx = {{  borderRadius: 3, backgroundColor: "inherit", color: "inherit"}} color = "inherit">
        <Grid container sx = {{display: 'flex', alignItems : 'center', m: 1}}>
            <Typography container = "h1">
                {label  + copy}
            </Typography> 
            <IconButton onClick={handleCopy} className = {classes.iconButton} color='inherit'>
            <ContentCopyIcon />
            </IconButton>
        </Grid>
    </Paper>
    </ThemeProvider>
  )
}

export default Clipboard