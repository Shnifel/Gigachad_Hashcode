import { ThemeProvider } from '@emotion/react'
import React, { useState } from 'react'
import { darkTheme } from '../../components/styles/Theme'
import { Box, CssBaseline, Grid, IconButton, Paper, TextareaAutosize, Typography } from '@mui/material'
import { Edit, Save } from '@mui/icons-material'
import { MarkdownTextbox } from '../../components/MarkdownTextBox'
import { updateCompetition } from '../../handlers/competitions'
// Retrieving Prizes properties
const Prizes = (props) => {

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Box sx={{m: 2}}>
        <Typography  variant= "h1"  style = {{ fontSize: 40, fontStyle: 'bold', color: "#6ded8a", margin: 20 , fontFamily: 'Arcade'}}>
          PRIZES
         </Typography>
        <Grid item>
          <Paper style={{ boxShadow: 10, padding: 10, margin: 20, width: '91%'}}>
         <MarkdownTextbox text = {props.prizeDetails}/>
          </Paper>
         </Grid></Box>
    </ThemeProvider>
    
  )
}

export default Prizes