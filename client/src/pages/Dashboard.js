import * as React from 'react';
import {createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import CompetitionCard from '../components/CompetitionCard.js';
import AppBar from '../components/layout/AppBar.js';
import myTheme from '../components/styles/Theme.js';
import { useSelector} from "react-redux";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import Video from "../assets/lines-128089.mp4";
import './login.scss'; 

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






function DashboardContent() {
  const classes = useStyles();
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const navigate = useNavigate();

  const createNew = () => {
    navigate("/CreateCompetition");
  }
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

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
          <Toolbar />
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
          <div className='font'>
          <Typography variant= "h1" fontFamily="'Scififont'" sx = {{textAlign: 'center', fontSize: 50, fontStyle: 'bold', color: "#EF1111" }}>
            CODING COMPETITION
          </Typography></div>
          {isAdmin &&
          <Box sx = {{justifyContent: 'right', width: '100%', display: 'flex'}}>
            <Button variant = "contained" startIcon = { <AddIcon />} onClick = {createNew} sx = {{backgroundColor: (theme) => theme.palette.primary.main, color: 'black', margin: '3vh'}}>
              CREATE NEW COMPETITION
            </Button>
          </Box>}
          <CompetitionCard name = {"HashCode Competition 1"} isrunning = {true} />
          <CompetitionCard name = {"Google Kick Start"} isrunning = {false} />
           
          </Container>
        </Box>
      </Box> </div> </div>
    </ThemeProvider> 
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}