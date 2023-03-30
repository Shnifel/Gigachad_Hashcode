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

function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
  }

  const labels = ["id", "date", "name", "shipTo", "paymentMethod", "amount"];
  

  const rows = [
    createData(
      0,
      '16 Mar, 2019',
      'Elvis Presley',
      'Tupelo, MS',
      'VISA ⠀•••• 3719',
      312.44,
    ),
    createData(
      1,
      '16 Mar, 2019',
      'Paul McCartney',
      'London, UK',
      'VISA ⠀•••• 2574',
      '866.99',
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
      3,
      '16 Mar, 2019',
      'Michael Jackson',
      'Gary, IN',
      'AMEX ⠀•••• 2000',
      654.39,
    ),
    createData(
      4,
      '15 Mar, 2019',
      'Bruce Springsteen',
      'Long Branch, NJ',
      'VISA ⠀•••• 5919',
      212.79,
    ),
  ];
  

function TeamRegister() {

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
          <Container sx = {{ mt : 4, mb : 4}}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <DisplayTable rows = {rows} labels = {labels} title = "My table"/>
            </Paper>
            
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