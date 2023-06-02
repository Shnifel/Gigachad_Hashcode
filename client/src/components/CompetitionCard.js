import { Typography } from '@mui/material'
import React from 'react'
import {Card} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
//Defining Information displyed on competition card: whether or not its open for registration, and the corresponding navigate function
const CompetitionCard = (props) => {
 const open = props.isrunning;
 const msg = open ? "Currently open for registration" : "Closed"
 const navigate = useNavigate();
//Handles Onclick for when a compeition card is onclicked, navigating to the corresponding competition
 const handleClick = () => {
  navigate("/Teams", {state: {compName : props.name,compid:props.compid}})
 }
  return (
    console.log("Test"),

    <Card sx={{ display: 'flex', margin: '3vh', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius : 5}} onClick = {handleClick} >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
        <Grid container sx = {{display: 'flex', width: '100%'}}>
          <Grid item sx = {{display: 'flex'}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {props.name}
          </Typography>
          <Typography variant="subtitle1" color= {open ? "green" : "red"} component="div">
             {msg}
          </Typography>
        </CardContent>
          </Grid>
          <Grid item sx = {{display : 'flex', justifyContent: 'right', width: '100%'}}>
          <Typography component="div" variant = "h5" sx = {{ marginRight : 3}}>
          Starts : {props.compdate}
        </Typography>
          </Grid>
        </Grid>
        
        
        
      </Box>
    </Card>
  )
}

export default CompetitionCard