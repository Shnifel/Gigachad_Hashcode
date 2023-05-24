import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector} from "react-redux";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import '../login.scss'; 
import { useEffect,useState } from 'react';
import { getCompetitions, downloadFile, getUserCompetitions } from '../../handlers/competitions.js';
import { darkTheme } from '../../components/styles/Theme.js';
import { CircularProgress, responsiveFontSizes } from '@material-ui/core';
import { Grid, Card, CardContent, CardMedia, IconButton } from "@material-ui/core";
import CircleIcon from '@mui/icons-material/Circle';
import { ArrowForward } from "@mui/icons-material";

function CompetitionCard(props) {
  const competition = props.competition
  const isAdmin = props.isAdmin

  const navigate = useNavigate();

  const gotoComp = (event, compid) => {
    if (isAdmin){
      navigate("/CompetitionsAdmin", {state:{compid: compid}});
    }else{
      navigate("/Competition", {state:{compid: compid}});
    }
}

  return(
    <Grid key={competition.id} item xs={12} sm={4} md={3} style={{borderRadius: 300}}>
    <Card sx = {{borderRadius : 3}}>
      <CardMedia
        component="img"
        alt={competition.title}
        height="150"
        image = {"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {competition.data.compname}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {competition.data.compdesc}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">

        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {competition.data.compdesc}
        </Typography>
        <IconButton onClick={event => gotoComp(event, competition.id)} style={{color:"#FFFFFF", justifyContent: 'right', display: 'flex', width: '100%'}}>
          <ArrowForward />
        </IconButton>
      </CardContent>
    </Card>
    </Grid>
  )

}


function CompetitionContent() {
    const [comps,setcomps] = useState(null);
    const [userComps, setUserComps] = useState(null);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const uid = useSelector(state => state.auth.userID);



    useEffect(() => {
      async function fetchdata(){
        try {
        const response = await getCompetitions()
        setcomps(response);
        const usercomps = await getUserCompetitions({uid: uid})
        setUserComps(usercomps);
        setLoading(false);
        } catch (error) {
          console.log(error)
          setLoading(false);
        }
        
      }
       fetchdata()
       console.log(comps)
          }, []);
    const isAdmin = useSelector(state => state.auth.isAdmin);
    const navigate = useNavigate();
  

    const createNew = () => {
      navigate("/CreateCompetition");
    }


    if (loading) {
        return (
          <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <CircularProgress />
            </div>
            </ThemeProvider>
          );
    }

    const my_comps = comps.filter(comp => userComps.includes(comp.id))
    const rest = comps.filter(comp => ! my_comps.includes(comp))
    const past = rest.filter(comp => new Date(comp.data.compdate) <= new Date())
    const current = rest.filter(comp => !past.includes(comp))

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

      {my_comps.length !== 0 && <Typography  variant= "h1" fontFamily="'Arcade'" sx = {{ fontSize: 30, fontStyle: 'bold', color: "#2A3492", m: 2 }}>
       My competitions
      </Typography>}
           
       <Grid container spacing={3} style={{margin: 2}}>
         {my_comps.map((competition, index) => (
           <CompetitionCard isAdmin = {isAdmin} competition = {competition}/>
         ))}
        </Grid>


        {current.length !== 0 && <Typography  variant= "h1" fontFamily="'Arcade'" sx = {{ fontSize: 30, fontStyle: 'bold', color: "#f500ff", m: 2 }}>
       Upcoming competitions
      </Typography>}

      <Grid container spacing={3} style={{margin: 2}}>
         {current.map((competition, index) => (
           <CompetitionCard isAdmin = {isAdmin} competition = {competition}/>
         ))}
        </Grid>


      {past.length !== 0 && <Typography  variant= "h1" fontFamily="'Arcade'" sx = {{ fontSize: 30, fontStyle: 'bold', color: "#6ded8a", m: 2 }}>
       Past competitions
      </Typography>}

      <Grid container spacing={3} style={{margin: 2}}>
         {past.map((competition, index) => (
           <CompetitionCard isAdmin = {isAdmin} competition = {competition}/>
         ))}
        </Grid>




        </Container>
        </Box>
      </ThemeProvider> 
    );
  }
  
  export default function CompetitionsHub() {
    return <CompetitionContent />;
  }