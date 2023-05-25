import React from 'react'
import { darkTheme } from '../../components/styles/Theme'
import { Box, CssBaseline, ThemeProvider, Typography } from '@material-ui/core'
import '../Competitions/competition.scss';
import '../login.scss';

const Info = (props) => {
   const data = props.data;
   const description = data.compdesc;
   const regstartdate = data.regstartdate;
   const regenddate = data.regenddate;
   const compdate = data.compdate;
   const max_teamsize = data.max_teamsize;
   const min_teamsize = data.min_teamsize;
   const num_tests = data.num_tests;
   const compenddate = data.compenddate;
   

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Box sx={{m: 2}} >
        <Typography  variant= "h1"  style = {{ fontSize: 50, fontStyle: 'bold', color: "#f500ff", margin: 2 , fontFamily: 'Arcade'}}>
         Description
         </Typography>
            
            <Typography component="h3" style={{margin: 20}}>
                {description}
            </Typography>

            <Typography  variant= "h1"  style = {{ fontSize: 50, fontStyle: 'bold', color: "#2A3492", margin: 2 , fontFamily: 'Arcade'}}>
         Dates
         </Typography>

         <Typography component="h3" style={{margin: 20}} >
                Competition starts : 
                <Typography style = {{fontSize: 30}}>
                    {(new Date(compdate)).toString()}
                    </Typography>
            </Typography>

            <Typography  variant= "h1"  style = {{ fontSize: 50, fontStyle: 'bold', color: "#6ded8a", margin: 2 , fontFamily: 'Arcade'}}>
          DETAILS
         </Typography>


            <Typography style = {{margin: 20, fontSize: 20}}>
            <ul style={{ listStyleType: 'circle' }}>
            <li>At least {min_teamsize} participants in a team</li>
            <li>At most {max_teamsize} participants in a team</li>
            <li>Competition has 1 question with {num_tests} test cases to submit solutions to</li>
            <li> Submit both your zip files and outputs as text files for each test case</li>
          </ul>
            </Typography>
        </Box>
    </ThemeProvider>
  )
}

export default Info