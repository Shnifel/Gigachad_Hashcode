import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import AppBar from '../components/layout/AppBar.js';
import myTheme from '../components/styles/Theme.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useSelector } from 'react-redux';
import { createTeam,joinTeams } from '../handlers/competitions.js';
import { Avatar } from '@mui/material';
import Error from '@mui/icons-material/Error.js';
import './login.scss';
import { useStyles } from '../components/styles/Theme.js';
import video from "../assets/chain-25380.mp4";
import ReactPlayer from 'react-player';
import ErrorMessage from '../components/Error.js';
import Success from '../components/Success.js';
import Clipboard from '../components/Clipboard.js';
import { darkTheme } from '../components/styles/Theme.js';

export function TeamRegister(props) {
  const classes = useStyles();
  const [error,setError] = useState(null) ;
  const [success, setSuccess] = useState(null);
  const compid = props.compid;
  const userid = useSelector(state=>state.auth.userID)
  const [selectedValue, setSelected] = useState('');
  const [code,setcode] = useState(null)
  const toggleChange = (event) => {
    setSelected(event.target.value);
    setSuccess(null);
    setError(null);
    setcode(null);
  }

  const handlecreateTeam = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputs = {
      teamname: data.get('name'),
      uid: userid,
      compid: compid,
    };
    

    try { 
    const code= await createTeam(inputs)
    setcode(code.teamCode)
    setSuccess("Succesfully created team, share the code above to invite your friends to join")
    setError(null)
    } catch (error) {
      setError(error.response.data)
      setSuccess(null)
    }
  }

  const handlejoinTeam = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputs = {
      teamCode: data.get('Code'),
      uid: userid,
      compid: compid
    };
    
    console.log(userid)
    try { 
     await joinTeams(inputs)
     setSuccess("Successfully joined team")
     setError(null)

      
    } catch (error) {
      setError(error.response.data)
      setSuccess(null)
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
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
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
          <Container sx = {{ mt : 4, mb : 4}}>
            <RadioGroup value = {selectedValue} onChange = {toggleChange}>
              <FormControlLabel
                value = "create"
                control={<Radio sx={{
                  color: '#ffffff',
                  '&.Mui-checked': {
                    color: '#ffffff',
                  },
                }}/>}
                label = "Create a new team"
                sx = {{
                  color: '#ffffff'
                }}
              />
              {selectedValue == 'create' && 
                <Box component = "form" sx = {{mt:1}} onSubmit = {handlecreateTeam}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Team Name"
                    variant = "filled"
                    name="name"
                    InputProps={{
                      style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden', color: "black"}
                    }}
                    autoFocus
                  />
                  {code && <Clipboard label = "Team join code: " copy = {code}/>}
                   {success && <Success text = {success} />}
                   {error && <ErrorMessage errmsg = {error} />}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Register new team
                  </Button>
                </Box>
              }
              <FormControlLabel
                value = "join"
                control = {<Radio sx={{
                  color: '#ffffff',
                  '&.Mui-checked': {
                    color: '#ffffff',
                  },
                }}/>}
                label = "Join an existing team"
                sx = {{
                  color: '#ffffff'
                }}
              />
              { selectedValue == "join" && 
              <Box component = "form"
              onSubmit={handlejoinTeam}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Code"
                    label="Enter the team code"
                    id="Team Code"
                    InputProps={{
                      style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden',color: "black"}
                    }}
                    variant='filled'
                  
                  />
                {success && <Success text = {success} />}
               {error && <ErrorMessage errmsg = {error} />}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    
                  >
                  Join Team
                  </Button>
              </Box>
              }

            </RadioGroup>
            
          </Container>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Teams() {
  return <TeamRegister />;
}