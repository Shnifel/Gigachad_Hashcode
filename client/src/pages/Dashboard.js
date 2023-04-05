import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CompetitionCard from '../components/CompetitionCard.js';
import myTheme from '../components/styles/Theme.js';
import { useSelector} from "react-redux";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import Video from "../assets/chain-25380.mp4";
import './login.scss'; 
import { useEffect,useState } from 'react';
import { getCompetitions } from '../handlers/competitions.js';

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
  const [comps,setcomps] = useState(null)
  useEffect(() => {
    async function fetchdata(){
      const response = await getCompetitions()
      setcomps(response)
    }
     fetchdata()
     console.log(comps)
        }, []);
  const classes = useStyles();
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const navigate = useNavigate();

  const createNew = () => {
    navigate("/CreateCompetition");
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
          <Toolbar />
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
          <div className='font'>
          <Typography variant= "h1" fontFamily="'Scififont'" sx = {{textAlign: 'center', fontSize: 50, fontStyle: 'bold', color: "#FF000C" }}>
            CODING COMPETITIONS
          </Typography></div>
          {isAdmin &&
          <Box sx = {{justifyContent: 'right', width: '100%', display: 'flex'}}>
            <Button variant = "contained" startIcon = { <AddIcon />} onClick = {createNew} sx = {{backgroundColor: (theme) => theme.palette.primary.main, color: 'black', margin: '3vh'}}>
              CREATE NEW COMPETITIONS
            </Button>
          </Box>}
          <Box>
          {comps &&

            
              comps.map((comp)=>(
                
                <CompetitionCard key ={comp.id} compid = {comp.id} name = {comp.data.compname} isrunning = {new Date(comp.data.regenddate)>=  new Date()} />
              ))}
            
              

           
            
          </Box>
          
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