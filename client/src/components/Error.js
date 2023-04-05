import React from 'react';
import "./styles/styles.scss";
import { Avatar } from '@mui/material';
import Error from "@mui/icons-material/Error";

const ErrorMessage = (props) => {
   const error = props.errmsg;
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