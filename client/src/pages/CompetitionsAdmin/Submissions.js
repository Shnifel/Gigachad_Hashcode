import { ThemeProvider } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import { darkTheme } from '../../components/styles/Theme'
import {  CircularProgress, CssBaseline } from '@mui/material'
import { getAllSubmissions } from '../../handlers/submissions'

const SubmissionsAdmin = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchdata(){
          try {
           const response = await getAllSubmissions({compid : props.compid})
           console.log(await response)
           setData(response);
           setLoading(false);
    
          } catch (error) {
             setLoading(false);
          }
         }
          fetchdata();
    
          const interval = setInterval(fetchdata, 20000);
    
          // Clean up the interval on component unmount
          return () => {
            clearInterval(interval);
          };
        
        }, [])


if (loading) // Data not yet back
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <div style = {{display: 'flex', width: '100%', height: "100%", justifyContent: 'center'}}>
            <CircularProgress/>
        </div>
    </ThemeProvider>
  )

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
    </ThemeProvider>
  )
}

export default SubmissionsAdmin