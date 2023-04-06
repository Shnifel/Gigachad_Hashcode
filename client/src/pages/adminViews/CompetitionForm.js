import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import AppBar from '../../components/layout/AppBar.js';
import myTheme from '../../components/styles/Theme.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createNewCompetitions } from '../../handlers/competitions.js';
import Avatar from '@mui/material/Avatar';
import Error from "@mui/icons-material/Error"
import { useSelector } from 'react-redux';
import Video from "../../assets/black-13495.mp4";
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from '../../components/styles/Theme.js';
import ErrorMessage from '../../components/Error.js';
import Success from '../../components/Success.js';
import { Grid } from '@mui/material';

function CompetitionCreate() {
  const classes = useStyles();
  const id=useSelector(state => state.auth.userID)
  const [err,setError] = useState(null)
  const [success, setSuccess] =  useState(null);
    const createCompetition = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const inputs = {
          uid:id,
          compname : data.get("name"),
          compdesc : data.get("details"),
          regstartdate : data.get("regStart"),
          regenddate : data.get("regClose"),
          teamsize: data.get("numPeople"),
          numteams: data.get("numTeams"),
          compdate : data.get("compDate")

        };
        try {
          const response = await createNewCompetitions(inputs)
          setSuccess(response.compid);
          setError(null);
        } catch (err) {
          setSuccess(null);
          setError(err.response.data)
        }
        console.log(inputs);
        }

  return (
    <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
      <ReactPlayer 
        className = {classes.player}
        url = {Video}
        playing
        loop
        muted
        playbackRate={0.5}
        width= "100%"
        height = "auto"
      />
      <div className={classes.content}>
      <Box sx={{ display: 'flex', backgroundColor:'transparent', justifyContent: 'center'}}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            my: 8,
            mx : 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        > 
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            justifyContent: 'center'
          }}
        >
          <Toolbar />
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
          <Typography component = "h1" fontFamily="'Scififont'" sx = {{textAlign: 'center', fontSize: 30, fontStyle: 'bold', color: "#00FF00"}}>
            CREATE A NEW COMPETITION
          </Typography>
          <Grid container sx = {{ mt : 4, mb : 4}} spacing = {2}> 
           <Paper sx = {{backgroundColor: 'transparent'}}>
            <Box component = "form"  sx = {{mt:1}} onSubmit = {createCompetition} style = {{width: '100vh'}}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                color = "black"
                variant = "filled"
                label="Competition Name"
                name="name"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}
                
                autoFocus
                />
                <TextField
                margin="normal"
                color = "black"
                variant = "filled"
                fullWidth
                multiline
                name="details"
                label="Competition Details"
                id="user"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}
                />
                <Grid container spacing = {3} sx = {{display: 'flex', width: '100%', justifyContent: 'center'}}>
                  <Grid item sx = {{display: 'flex'}}> 
                    <TextField
                      margin="normal"
                      type = "date"
                      color = "black"
                      variant = "filled"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      required
                      name="compDate"
                      label="Date of the Competition"
                      id="compDate"
                      display = "flex"
                      width = "100%"
                      InputProps={{
                        style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                      }}
                    />
                  </Grid>
                  <Grid item sx = {{display: 'flex'}}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      margin = "normal"
                      required
                      fullWidth
                      color = "black"
                      variant = "filled"
                      type = "datetime-local"
                      name = "regStart"
                      label = "Registration open date"
                      id = "regStart"
                      display = "flex"
                      InputProps={{
                        style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                      }}
                    />
                  </Grid>
                  <Grid item sx = {{display: 'flex'}}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      margin = "normal"
                      required
                      fullWidth
                      display = "flex"
                      width = "100%"
                      color = "black"
                      variant = "filled"
                      type = "datetime-local"
                      name = "regClose"
                      label = "Registration closing date"
                      id = "regClose"
                      InputProps={{
                        style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                      }}
                   />
                  </Grid>
                </Grid>

                <Grid container spacing = {2} sx = {{justifyContent : 'center'}}>
                  <Grid item>
                    <TextField
                margin = "normal"
                type = "number"
                required
                color = "black"
                variant = "filled"
                name = "numTeams"
                label = "Max teams"
                id = "numTeams"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}/>
                  </Grid>
                  <Grid item>
                     <TextField
                margin = "normal"
                type = "number"
                required
                color = "black"
                variant = "filled"
                name = "numPeople"
                label = "Max people per team"
                id = "numPeople"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}
                />
                  </Grid>
                </Grid>
              {err && <ErrorMessage errmsg = {err}/> }
              {success && <Success text = "Succesfull created competition" />}
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Register new competition
                </Button>
            </Box>
           
             </Paper>
          </Grid>
          </Container>
        </Box>
      </Box> 
      </Box> 
      </Box></div> </div>
    </ThemeProvider>
  );
}

export default function CompetitionForm() {
  return <CompetitionCreate />;
}