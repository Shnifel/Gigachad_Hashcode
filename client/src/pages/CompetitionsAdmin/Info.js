import React from 'react'
import { darkTheme } from '../../components/styles/Theme'
import { Box, CssBaseline, TextField, ThemeProvider, Typography, Grid, makeStyles } from '@material-ui/core'
import '../Competitions/competition.scss';
import '../login.scss';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import { MarkdownTextbox } from '../../components/MarkdownTextBox.js';
import { TextareaAutosize }from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  input: {
    display: 'flex',
    backgroundColor: 'inherit', // Set background color to inherit
    width: '100vh', // Set the width of the input
    height: '20vh',
    maxWidth: '200%', // Set the fixed height of the input
    resize: 'none', // Prevent textarea from being resizable
    overflow: 'hidden'
 // Add scrollbar when content exceeds the height
    // Set the color of the scrollbar
  },
}));


const InfoAdmin = (props) => {
   const data = props.data;
   const description = data.compdesc;
   const regstartdate = data.regstartdate;
   const regenddate = data.regenddate;
   const compdate = data.compdate;
   const max_teamsize = data.max_teamsize;
   const min_teamsize = data.min_teamsize;
   const num_tests = data.num_tests;
   const compenddate = data.compenddate;
   const compdetails = data.compdetails;
   const classes = useStyles();

   const [editMode, setEditMode] = useState(true);

   const toggleEdit = () => {
    setEditMode(!editMode);
   }

   const [changes, setChanges] = useState(false);
   const [current, setCurrent] = useState(data);

   const handleChange = (field, param) => {
    setCurrent(prev => ({...prev, [field] : param}))
   }

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Box sx={{m: 2}} >
        <Box sx = {{display: 'flex', width: '100%',justifyContent: 'right'}}>
        <IconButton onClick={toggleEdit} color='inherit'>
        {editMode ? <Save /> : <Edit />}

      </IconButton>
       </Box>
        <Typography  variant= "h1"  style = {{ fontSize: 50, fontStyle: 'bold', color: "#f500ff", margin: 2 , fontFamily: 'Arcade'}}>
         Description
         </Typography>
            
          {editMode ? <TextField value={current.compdesc} style={{margin: 5, fontSize: 40, width: '100%', maxWidth: '100%' }} onChange={(event) => handleChange('compdesc', event.target.value)}/>
          :<Typography variant="h3" style={{margin: 20, fontSize: 25}}>
                {description}
            </Typography>}
            <Typography  variant= "h2"  style = {{ fontSize: 40, fontStyle: 'bold', color: "#2A3492", margin: 2 , fontFamily: 'Arcade'}}>
         Dates
         </Typography>

         {editMode ? <Grid item>
          <Grid container>
            Registration opens : {regstartdate}
          </Grid>
         </Grid> :
         <Grid item>
          </Grid>}

         <Typography component="h3" style={{margin: 20}} >
                Competition starts : 
                <Typography style = {{fontSize: 30}}>
                    {(new Date(compdate)).toString()}
                    </Typography>
            </Typography>

            <Typography  variant= "h1"  style = {{ fontSize: 50, fontStyle: 'bold', color: "#6ded8a", margin: 2 , fontFamily: 'Arcade'}}>
          DETAILS
         </Typography>

         <TextareaAutosize minRows={5} style={{width: '90%', borderColor: '#ffffff', backgroundColor: 'inherit', color: '#eeeeee', marginTop: 10}} placeholder='Please enter markdown text here' value={compdetails && compdetails}/>
          <MarkdownTextbox/>
        </Box>
    </ThemeProvider>
  )
}

export default InfoAdmin