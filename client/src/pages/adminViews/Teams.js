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
import { useLocation } from 'react-router-dom';
import { FormControlLabel, RadioGroup, Radio } from '@mui/material';
import DisplayTable from '../../components/Table.js';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { getTeams } from '../../handlers/competitions.js';

function createData(id, teamName, code, numMembers) {
    return { id, teamName, code, numMembers };
}



  

function TeamDisplay() {

  const location = useLocation();
  const compName = location.state.compName;
  const compid = location.state.compid;
  const [teams, setTeams] = useState(null);
  const [rows, setRows] = useState(null);
  const labels = ["Team Name", "Team Join Code", "Number of members"];
  const cols = ["teamName", "code", "numMembers"];


  useEffect(() => {
    async function fetchdata(){
      const inputs = { compid: compid};
      const response = await getTeams(inputs); 
      setRows(response.map((team) => {
        return createData(team.id, team.teamname, team.teamCode, team.members.length)
      }
      ))
      
    }
     fetchdata()
  
        }, []);


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
            My Competition
          </Typography>
          {rows && 
           <Container sx = {{ mt : 4, mb : 4}}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <DisplayTable rows = {rows} labels = {labels} cols = {cols} title = "My table"/>
            </Paper>
            
          </Container>}
          
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Teams() {
  return <TeamDisplay />;
}