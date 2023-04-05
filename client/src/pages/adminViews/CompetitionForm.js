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

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing(2),
  }
}));
 

function CompetitionCreate() {
  const classes = useStyles();
  const id=useSelector(state => state.auth.userID)
  const [err,setError] = useState(null)
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
          console.log(response.data)
        } catch (err) {
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
      <Box sx={{ display: 'flex', backgroundColor:'transparent'}}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: 'transparent',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
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
          }}
        >
          <Toolbar />
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
          <Typography component = "h1" fontFamily="'Scififont'" sx = {{textAlign: 'center', fontSize: 30, fontStyle: 'bold', color: "#FF000C"}}>
            CREATE A NEW COMPETITION
          </Typography>
          <Container sx = {{ mt : 4, mb : 4}}> 
           <Paper>
            <Box component = "form" Vali sx = {{mt:1}} onSubmit = {createCompetition}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Competition Name"
                name="name"
                autoFocus
                />
                <TextField
                margin="normal"
                fullWidth
                multiline
                name="details"
                label="Competition Details"
                id="user"
                />
                <TextField
                margin="normal"
                type = "date"
                InputLabelProps={{ shrink: true }}
                required
                name="compDate"
                label="Date of the Competition"
                id="compDate"
                />
                <TextField
                InputLabelProps={{ shrink: true }}
                margin = "normal"
                required
                type = "datetime-local"
                name = "regStart"
                label = "Registration open date"
                id = "regStart"
                />
                <TextField
                InputLabelProps={{ shrink: true }}
                margin = "normal"
                required
                type = "datetime-local"
                name = "regClose"
                label = "Registration closing date"
                id = "regClose"
                />
                <TextField
                margin = "normal"
                type = "number"
                required
                name = "numTeams"
                label = "Set a limit on the maximum number of teams"
                id = "numTeams"/>
                <TextField
                margin = "normal"
                type = "number"
                required
                name = "numPeople"
                label = "Set a limit on the maximum number of individuals per team"
                id = "numPeople"/>
              {err && <div className='error'>
              <Avatar sx = {{bgcolor: 'rgb(255, 204, 204)', color: 'red'}} >
              <Error />
              </Avatar>
              <p> {err} </p>
              </div>
              }
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
            
          </Container>
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