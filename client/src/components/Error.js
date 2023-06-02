import React from 'react';
import "./styles/styles.scss";
import { Avatar } from '@mui/material';
import Error from "@mui/icons-material/Error";
// Defining error message to be alled when an error occurs
const ErrorMessage = (props) => {
  //retrieves the appropriate error message 
   const error = props.errmsg;
  //returns UI for error message
   return (
    <div className='error'>
      <Avatar sx = {{bgcolor: 'rgb(255, 204, 204)', color: 'red'}} >
       <Error />
       </Avatar>
      <p> {error} </p>
    </div>

  )
}

export default ErrorMessage