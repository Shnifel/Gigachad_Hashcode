import { ThemeProvider } from '@emotion/react'
import React, { useState } from 'react'
import { darkTheme } from '../../components/styles/Theme'
import { Box, CssBaseline, Grid, IconButton, Paper, TextareaAutosize, Typography } from '@mui/material'
import { Edit, Save } from '@mui/icons-material'
import { MarkdownTextbox } from '../../components/MarkdownTextBox'
import { updateCompetition } from '../../handlers/competitions'

const PrizesAdmin = ({update, ...props}) => {

    const [editMode, setEditMode] = useState(false);
    const [text, setText] = useState(props.prizeDetails);
    const [updateVal, setUpdateVal] = useState(5);

    const handleTextChange = (event) => {
        setText(event.target.value)
    }

    const toggleEdit = async () => {

        try {
            if (editMode && text !== props.prizeDetails) {
          await updateCompetition({compid: props.compid, prizeDetails: text})
            }
            update(10-updateVal);
        } catch (error) {
            console.log(error.message);
        }

        setEditMode(!editMode)
    }

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Box sx={{m: 2}}>
        <Typography  variant= "h1"  style = {{ fontSize: 40, fontStyle: 'bold', color: "#6ded8a", margin: 20 , fontFamily: 'Arcade'}}>
          PRIZES
         </Typography>
        <Box sx = {{display: 'flex', width: '100%',justifyContent: 'right'}}>
        <IconButton onClick={toggleEdit} color='inherit'>
        { editMode ? <Save /> : <Edit />}
        </IconButton>
        </Box>
        <Grid item>
          {editMode &&  <TextareaAutosize minRows={5} style={{width: '90%', borderColor: '#ffffff', backgroundColor: '#0e0e0e', color: '#eeeeee', margin: 10}} 
          placeholder='Please enter markdown text here' value={text} onChange={handleTextChange}/>}
         <Grid item style = {{margin: 10}}>
          <Paper style={{ boxShadow: 10, padding: 10, width: '91%'}}>
            {editMode && "Preview"}
         <MarkdownTextbox text = {text}/>
          </Paper>
         </Grid> 
         </Grid></Box>
    </ThemeProvider>
    
  )
}

export default PrizesAdmin