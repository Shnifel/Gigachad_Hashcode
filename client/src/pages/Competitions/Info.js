import React from 'react'
import { darkTheme } from '../../components/styles/Theme'
import { Box, CssBaseline, TextField, ThemeProvider, Typography, Grid, makeStyles, Paper } from '@material-ui/core'
import '../Competitions/competition.scss';
import '../login.scss';
import { useState } from 'react';
import { CircularProgress, IconButton, Button } from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';
import { MarkdownTextbox } from '../../components/MarkdownTextBox.js';
import { TextareaAutosize }from '@material-ui/core';
import { deleteCompetition, updateCompetition } from '../../handlers/competitions';
import { useNavigate } from 'react-router-dom';

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


const Info = ({data}) => {
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

//Formating table on info table
   const timeString =  `|  | Date | Time |
   |-----------|---------|------------|
   | Registration opens |`+ new Date(regstartdate).toDateString() +`|`  + new Date(regstartdate).toLocaleTimeString() + `| 
   | Registration closes  |` +  new Date(regenddate).toDateString() +`|`  + new Date(regenddate).toLocaleTimeString() + `| 
   | Competition Starts   |` +  new Date(compdate).toDateString() +`|`  + new Date(compdate).toLocaleTimeString() + `|  
   | Competition Closes   |` + new Date(compenddate).toDateString() +`|`  + new Date(compenddate).toLocaleTimeString() + `|`

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Box sx={{m: 2}} >
        <Typography  variant= "h1"  style = {{ fontSize: 40, fontStyle: 'bold', color: "#f500ff", margin: 2 , fontFamily: 'Arcade'}}>
         Description
         </Typography>
            
         <Typography variant="h3" style={{margin: 20, fontSize: 25}}>
                {description}
         </Typography>
            <Typography  variant= "h2"  style = {{ fontSize: 40, fontStyle: 'bold', color: "#2A3492", margin: 2 , fontFamily: 'Arcade'}}>
         Dates
         </Typography>


          <Grid item style = {{margin: 20}}>
          <Grid container>
            <MarkdownTextbox text = { 
             timeString
            }/></Grid> </Grid> 

            <Typography  variant= "h1"  style = {{ fontSize: 40, fontStyle: 'bold', color: "#6ded8a", margin: 2 , fontFamily: 'Arcade'}}>
          DETAILS
         </Typography>

         <Grid item>
         <Grid item style = {{margin: 10}}>
          <Paper style={{ boxShadow: 10, padding: 10, width: '91%'}}>
         <MarkdownTextbox text = {compdetails}/>
          </Paper>
         </Grid> 
         </Grid>

        </Box>
    </ThemeProvider>
  )
}

export default Info