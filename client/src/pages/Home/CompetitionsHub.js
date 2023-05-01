import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CompetitionCard from '../../components/CompetitionCard.js';
import { useSelector} from "react-redux";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import '../login.scss'; 
import { useEffect,useState } from 'react';
import { getCompetitions } from '../../handlers/competitions.js';
import { darkTheme } from '../../components/styles/Theme.js';
import { CircularProgress } from '@material-ui/core';
import { Grid, Card, CardContent, CardMedia, IconButton } from "@material-ui/core";
import { ArrowForward } from "@mui/icons-material";


function CompetitionContent() {
    const [comps,setcomps] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
      async function fetchdata(){
        const response = await getCompetitions()
        setcomps(response);
        setLoading(false);
      }
       fetchdata()
       console.log(comps)
          }, []);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const navigate = useNavigate();
  

    const createNew = () => {
      navigate("/CreateCompetition");
    }

    const gotoComp = (event, compid) => {
        console.log(compid);
        
        if (isAdmin){
          navigate("/CompetitionsAdmin", {state:{compid: compid}});
        }else{
          navigate("/Competition", {state:{compid: compid}});
        }
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </div>
          );
    }

    return (
      
      <ThemeProvider theme={darkTheme}>
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
            <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
            <div className='font'>
            <Typography variant= "h1" fontFamily="'Arcade'" sx = {{textAlign: 'center', fontSize: 50, fontStyle: 'bold', color: "#0000FF" }}>
              CODING COMPETITIONS
            </Typography></div>
            {isAdmin &&
            <Box sx = {{justifyContent: 'right', width: '100%', display: 'flex'}}>
              <Button variant = "contained" startIcon = { <AddIcon />} onClick = {createNew} sx = {{backgroundColor: (theme) => theme.palette.primary.main, color: 'black', margin: '3vh'}}>
                CREATE NEW COMPETITIONS
              </Button>
            </Box>}
            {/* <Box>
            {comps &&
  
                comps.map((comp)=>(
                  
                  <CompetitionCard key ={comp.id} compid = {comp.id} name = {comp.data.compname} compdate = {comp.data.compdate} isrunning = {new Date(comp.data.regenddate)>=  new Date()} />
                ))}
              
              
            </Box> */}
            
            <Grid container>
       
       <Grid container spacing={3}>
         {comps.map((competition) => (
           <Grid key={competition.id} item xs={12} sm={6} md={4}>
             <Card sx = {{borderRadius : 30}}>
               <CardMedia
                 component="img"
                 alt={competition.title}
                 height="200"
                 image="https://source.unsplash.com/random"
               />
               <CardContent>
                 <Typography gutterBottom variant="h5" component="h2">
                   {competition.data.compname}
                 </Typography>
                 <Typography variant="body2" color="textSecondary" component="p">
                   {competition.data.compdesc}
                 </Typography>
                 <IconButton onClick={event => gotoComp(event, competition.id)} style={{color:"#FFFFFF"}}>
                   <ArrowForward />
                 </IconButton>
               </CardContent>
             </Card>
           </Grid>
         ))}
       </Grid>
       </Grid>
            </Container>
          </Box>
      </ThemeProvider> 
    );
  }
  
  export default function CompetitionsHub() {
    return <CompetitionContent />;
  }