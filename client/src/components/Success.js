import React from 'react'
import { Avatar } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import "./styles/styles.scss";
//Defining Success dialog to return to the user
const Success = (props) => {
  //Retrieving response to return as success text
const text = props.text;
  return (
    <div className='success'>
    <Avatar sx = {{bgcolor: 'rgb(25, 135, 84)', color: 'green'}} >
     <CheckCircleRoundedIcon />
     </Avatar>
    <p> {text} </p>
  </div>

  )
}

export default Success