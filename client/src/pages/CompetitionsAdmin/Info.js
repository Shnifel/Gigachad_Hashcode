import React from 'react'
import { darkTheme } from '../../components/styles/Theme'
import { Box, CssBaseline, ThemeProvider, Typography } from '@material-ui/core'
import './competition.scss'

const InfoAdmin = (props) => {
   const data = props.data;
   const description = data.compdesc;
   const regstartdate = data.regstartdate;
   const regenddate = data.regenddate;
   const compdate = data.compdate;
   const max_teamsize = data.max_teamsize;
   const min_teamsize = data.min_teamsize;

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Box >
            <div className='date'>
                COMPETITION DATE: {compdate}
            </div>
            
            <Typography component="h3">
                {description}
            </Typography>
            
            <Typography component="h2">
                Create a team of between {min_teamsize} and {max_teamsize}
            </Typography>
        </Box>
    </ThemeProvider>
  )
}

export default InfoAdmin