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


function TeamRegister() {
  const location = useLocation();
  const compName = location.state.compName;

  const [selectedValue, setSelected] = useState('');

  const toggleChange = (event) => {
    setSelected(event.target.value);
  }

  const createTeam = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputs = {
      teamName: data.get('name'),
      
      user: data.get('user'),
    };
    console.log(inputs);
  }

  

  return (
    <ThemeProvider theme={myTheme}>
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar />
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
          <Typography component = "h1" sx = {{textAlign: 'center', fontSize: 30, fontStyle: 'bold', color: "grey"}}>
            Create/Register a team for the {compName}
          </Typography>
          <Container sx = {{ mt : 4, mb : 4}}>
            <RadioGroup value = {selectedValue} onChange = {toggleChange}>
              <FormControlLabel
                value = "create"
                control={<Radio/>}
                label = "Create a new team"
              />
              {selectedValue == 'create' && 
                <Box component = "form" Vali sx = {{mt:1}} onSubmit = {createTeam}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Team Name"
                    name="name"
                    autoFocus
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="user"
                    label="User"
                    id="user"
                  />
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
                control = {<Radio/>}
                label = "Join an existing team"
              />
              { selectedValue == "join" && 
              <Box component = "form">
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Enter the team code"
                    id="Team Code"
                  />
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