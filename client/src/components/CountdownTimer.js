import { Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import "../pages/login.scss"
//Defining Countdown Timer for competition dates by using the Current time, The Time of the competition and calculating the difference that is used
const CountdownTimer = ({ targetDate }) => {
  const calculateTimeRemaining = () => {
    const currentTime = new Date().getTime();
    const targetTime = targetDate.getTime();
    const timeDifference = targetTime - currentTime;
//Checking negative condition from calculation
    if (timeDifference <= 0) {
      // Target date has passed
      return { days: 0, hours: 0, minutes: 0 };
    }
//Defining time numerics
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    const days = Math.floor(timeDifference / oneDay);
    const hours = Math.floor((timeDifference % oneDay) / oneHour);
    const minutes = Math.floor((timeDifference % oneHour) / oneMinute);

    return { days, hours, minutes };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
//Creating UseEffect for Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
//Returning the amount of time
    return () => {
      clearInterval(timer);
    };
  }, [targetDate]);

  return (
    <Grid>
        <Typography variant= "h3"  style = {{ fontSize: 20, fontStyle: 'bold', color: "#00ff00", margin: 2 , fontFamily: 'Arcade', justifyContent: "right"}}>
        {`                     `+ timeRemaining.days + `                    ` + timeRemaining.hours + `                         ` + timeRemaining.minutes  }
    </Typography>
    <Typography variant= "h3"  style = {{ fontSize: 20, fontStyle: 'bold', color: "#feod2a", margin: 2 , fontFamily: 'Arcade'}}>
     days hrs mins
</Typography>
    </Grid>
    
        
      
  );
};

export default CountdownTimer;
