import React from 'react'
import { darkTheme } from '../../components/styles/Theme'
import { Box, CssBaseline, TextField, ThemeProvider, Typography, Grid, makeStyles, Paper } from '@material-ui/core'
import '../Competitions/competition.scss';
import '../login.scss';
import { useState } from 'react';
import { CircularProgress, IconButton } from '@mui/material';
import { Edit, Save } from '@mui/icons-material';
import { MarkdownTextbox } from '../../components/MarkdownTextBox.js';
import { TextareaAutosize }from '@material-ui/core';
import { updateCompetition } from '../../handlers/competitions';

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


const InfoAdmin = ({update, data, compid}) => {
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
   const [unsaved, setUnsaved] = useState(false);
   const [current, setCurrent] = useState(data);
   const [loading, setLoading] = useState(false);
   const [upValue, setUpValue] = useState(0);

   const [editMode, setEditMode] = useState(false);

   const toggleEdit = async () => {
    if (editMode && unsaved){
      try {
        setLoading(true);
        const {teams, ...other} = current
        await updateCompetition({compid, ...other});
        setLoading(false);
        setUnsaved(false);
        update(1 - upValue);
        setUpValue(1 - upValue);
      } catch (error) {
        console.log(error.message)
        setLoading(false);
        setUnsaved(false);
      }
    }
    setEditMode(!editMode);
    setCurrent(data);
   }

   const handleChange = (field, param) => {
    if (data[field] !== param){
      setUnsaved(true);
    }
    setCurrent(prev => ({...prev, [field] : param}))
   }

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
        <Box sx = {{display: 'flex', width: '100%',justifyContent: 'right'}}>
        <IconButton onClick={toggleEdit} color='inherit'>
        {loading && <Grid container>
          <CircularProgress size={17}/>
          <Typography variant = "h4" style = {{ fontSize: 10, fontStyle: 'bold', color: "#FFFFFF", margin: 2 , fontFamily: 'Arcade'}}>
            SAVING CHANGES
          </Typography>
        </Grid>}
        {!loading && editMode ? <Save /> : <Edit />}
        </IconButton>
       </Box>
        <Typography  variant= "h1"  style = {{ fontSize: 40, fontStyle: 'bold', color: "#f500ff", margin: 2 , fontFamily: 'Arcade'}}>
         Description
         </Typography>
            
          {editMode ? <TextField value={current.compdesc} style={{margin: 5, fontSize: 40, width: '90%', maxWidth: '100%' }} onChange={(event) => handleChange('compdesc', event.target.value)}/>
          :<Typography variant="h3" style={{margin: 20, fontSize: 25}}>
                {description}
            </Typography>}
            <Typography  variant= "h2"  style = {{ fontSize: 40, fontStyle: 'bold', color: "#2A3492", margin: 2 , fontFamily: 'Arcade'}}>
         Dates
         </Typography>


         {!editMode ? <Grid item style = {{margin: 20}}>
          <Grid container>
            <MarkdownTextbox text = { 
             timeString
            }/></Grid> </Grid> :
         <Grid item spacing={4}>
          
          <TextField
                      margin="normal"
                      type = "datetime-local"
                      color = "black"
                      variant = "filled"
                      InputLabelProps={{ shrink: true }}
                      name="compDate"
                      label="Registration open date"
                      value = {current.regstartdate}
                      id="compDate"
                      display = "flex"
                      InputProps={{
                        style: { backgroundColor: 'black', borderRadius: 10, overflow: 'hidden', margin: 20}
                      }}
                      onChange = {event => handleChange('regstartdate', event.target.value)}
                      
              />
              <TextField
                      margin="normal"
                      type = "datetime-local"
                      color = "black"
                      variant = "filled"
                      InputLabelProps={{ shrink: true }}
                      name= "compDate"
                      label="Registration closing date"
                      id="compDate"
                      display = "flex"
                      value = {current.regenddate}
                      InputProps={{
                        style: { backgroundColor: 'black', borderRadius: 10, overflow: 'hidden', margin: 20}
                      }}
                      onChange = {event => handleChange('regenddate', event.target.value)}
                    />
                    <TextField
                      margin="normal"
                      type = "datetime-local"
                      color = "black"
                      variant = "filled"
                      InputLabelProps={{ shrink: true }}
                      name="compDate"
                      label="Competition start date"
                      value = {current.compdate}
                      id="compStart"
                      display = "flex"
                      InputProps={{
                        style: { backgroundColor: 'black', borderRadius: 10, overflow: 'hidden', margin: 20}
                      }}
                      onChange = {event => handleChange('compdate', event.target.value)}
                    />
                    <TextField
                      margin="normal"
                      type = "datetime-local"
                      color = "inherit"
                      variant = "filled"
                      InputLabelProps={{ shrink: true }}
                      name="Competition closing date"
                      value = {current.compenddate}
                      label="Competition closing date"
                      id="compClose"
                      display = "flex"
                      InputProps={{
                        style: { backgroundColor: 'black', borderRadius: 10, overflow: 'hidden', margin: 20}
                      }}
                      onChange = {event => handleChange('compenddate', event.target.value)}
                    />
          </Grid>}


            <Typography  variant= "h1"  style = {{ fontSize: 40, fontStyle: 'bold', color: "#6ded8a", margin: 2 , fontFamily: 'Arcade'}}>
          DETAILS
         </Typography>

         <Grid item>
          {editMode &&  <TextareaAutosize minRows={5} style={{width: '90%', borderColor: '#ffffff', backgroundColor: '#0e0e0e', color: '#eeeeee', margin: 10}} 
          placeholder='Please enter markdown text here' value={current.compdetails && current.compdetails} onChange={(event) => handleChange("compdetails", event.target.value)}/>}
         <Grid item style = {{margin: 10}}>
          <Paper style={{ boxShadow: 10, padding: 10, width: '91%'}}>
            {editMode && "Preview"}
         {current.compdetails && <MarkdownTextbox text = {editMode ? current.compdetails : compdetails}/>}
          </Paper>
         </Grid> 
         </Grid>
        </Box>
    </ThemeProvider>
  )
}

export default InfoAdmin