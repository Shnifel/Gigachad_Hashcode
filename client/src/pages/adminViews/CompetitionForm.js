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
 

function CompetitionCreate() {
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
            Create a new competition
          </Typography>
          <Container sx = {{ mt : 4, mb : 4}}> 
           <Paper>
            <Box component = "form" Vali sx = {{mt:1}} onSubmit = {createTeam}>
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
    </ThemeProvider>
  );
}

export default function CompetitionForm() {
  return <CompetitionCreate />;
}