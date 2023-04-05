import { Typography } from '@mui/material'
import React from 'react'
import {Card} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'

const CompetitionCard = (props) => {
 const open = props.isrunning;
 const msg = open ? "Currently open for registration" : "Closed"
 const navigate = useNavigate();

 const handleClick = () => {
  navigate("/Teams", {state: {compName : props.name,compid:props.compid}})
 }
  return (
    console.log("Test"),

    <Card sx={{ display: 'flex', margin: '3vh', backgroundColor: 'white', borderRadius : 5}} onClick = {handleClick} >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {props.name}
          </Typography>
          <Typography variant="subtitle1" color= {open ? "green" : "red"} component="div">
             {msg}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

export default CompetitionCard