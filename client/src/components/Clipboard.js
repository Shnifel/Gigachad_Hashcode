import React from 'react';
import CopyToClipboard from 'copy-to-clipboard';
import IconButton from '@material-ui/core/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles({
  iconButton: {
    marginLeft: '8px',
    justifyContent: 'right'
  },
});

const Clipboard = (props) => {
  const label = props.label;
  const copy = props.copy;
  const classes = useStyles();

  const handleCopy = () => {
    CopyToClipboard(copy);
  }

  return (
    <Paper sx = {{ m: 1, borderRadius: 3}}>
        <Grid container sx = {{display: 'flex', alignItems : 'center', m: 1}}>
            <Typography container = "h1">
                {label  + copy}
            </Typography> 
            <IconButton onClick={handleCopy} className = {classes.iconButton}>
            <ContentCopyIcon />
            </IconButton>
        </Grid>
    </Paper>
  )
}

export default Clipboard