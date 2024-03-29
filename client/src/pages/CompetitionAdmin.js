import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tabs,
  Tab,
  createTheme,
  Card,
  CardMedia,
  Typography, CircularProgress, CssBaseline
} from '@material-ui/core';
import {
    AccountCircle as AccountCircleIcon,
    Leaderboard as LeaderboardIcon,
    Info as InfoIcon,
    Logout,
    Group,
    Quiz,
    Grading,
    EmojiEvents
} from '@mui/icons-material';
import {makeStyles} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { darkTheme } from '../components/styles/Theme';
import { logout } from '../handlers/auth/auth';
import { getCompetition } from '../handlers/competitions';
import './login.scss'
import Teams from './CompetitionsAdmin/Teams';
import ProblemAdmin from './CompetitionsAdmin/Problem';
import Leaderboard from './Competitions/Leaderboard';
import InfoAdmin from './CompetitionsAdmin/Info';
import Submissions from './Competitions/Submissions';
import { getImage } from '../handlers/competitions';
import { Avatar } from '@mui/material';
import { Auth } from '../Firebase';
import CountdownTimer from '../components/CountdownTimer';
import {Grid} from '@mui/material';
import PrizesAdmin from './CompetitionsAdmin/Prizes';
import SubmissionsAdmin from './CompetitionsAdmin/Submissions';




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: '#0D0D0D',
      boxShadow: "none",
      display: 'flex',
      width: '100%'
    },
    tabs: {
      marginLeft: "auto",
    },
  }));


//Handling properties of a competition as Admin
function CompetitionAdmin() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [compUpdate, setUpdate] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const compid = location.state.compid;
  //fetching data
  useEffect(() => {
    async function fetchdata(){
      try {
        const response = await getCompetition({compid: compid})
        setData(response);
        const url = await getImage(await response.id + "/" + await response.data.image)
        setImage(url)
      
      setLoading(false);
      } catch (error) {
        setLoading(false);
      }
      
    }
     fetchdata();

     const interval = setInterval(fetchdata, 20000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
    
    }, [compUpdate]);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
// Handles when a menu is opened 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
//Handling tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setTab(newValue);
  };
//Handling when profile icon is clicked
  const handleProfileClick = () => {
    navigate("/ProfilePage");
  }
//Handling user logout
  const handleLogout = () => {
    logout();
    navigate("/")
  }

  if (loading) {
    return (<ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <CircularProgress/>
    </ThemeProvider>)
  }

  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
     <Card sx = {{borderRadius: 30, display: 'flex', width: '100%', maxWidth: "100%"}}>
     <CardMedia
            component="img"
            alt={data.data.compname}
            height="100"
            image={image}
            /> 

      <Grid container>
        <Typography variant= "h2" style={{fontFamily: 'Arcade', color: "#6700ff"}} sx = {{textAlign: 'center', fontSize: 10, fontStyle: 'bold', color: "#0000FF" }}>
             {data.data.compname}
     </Typography>
     <Grid container style={{display: 'flex', width: '100%', justifyItems: 'right', justifyContent: 'right'}}>
      <CountdownTimer targetDate={new Date(data.data.compenddate)}/>
     </Grid>
      </Grid>
     
     
      <div className={classes.appBar}>
      <AppBar position="static" color = "inherit" >
        <Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor='primary'>
            <Tab label="Info" icon={<InfoIcon/>} value={0} style={{fontFamily: 'Arcade'}}/>
            <Tab label="Teams" icon={<Group/>} value={1} style={{fontFamily: 'Arcade'}}/>
            <Tab label="Problem" icon = {<Quiz/>} value={2} style={{fontFamily: 'Arcade'}}/>
            <Tab label = "Leaderboard" icon={<LeaderboardIcon/>} value = {3} style={{fontFamily: 'Arcade'}}/> 
            <Tab label = "Submissions" icon = {<Grading/>} value = {4} style={{fontFamily: 'Arcade'}}/>
            <Tab label = "Prizes" icon = {<EmojiEvents/>} value = {5} style={{fontFamily: 'Arcade'}}/>
          </Tabs>
          <div style={{ flexGrow: 1 ,color: 'inherit'}} />
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color='inherit'
          >
              <Avatar
      alt="User Avatar" 
      src={Auth.currentUser && Auth.currentUser.photoURL }
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
      }}
    />
          </IconButton>
          <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              color='inherit'
            >
              <MenuItem onClick={handleProfileClick}>
                <ListItemIcon style={{color: "#ffffff"}}>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon style={{color: "#ffffff"}}>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      </div>
     </Card>
      {tab === 0 && !loading && <InfoAdmin data = {data.data} compid = {compid} update = {setUpdate} />}
      {tab === 1 && !loading && <Teams id = {compid} min_teamsize = {parseInt(data.data.min_teamsize)} />}
      {tab === 2 && <ProblemAdmin compid={compid} numtests = {parseInt(data.data.num_tests)}/>}
      {tab === 3 &&  <Leaderboard compid={compid} num_tests={parseInt(data.data.num_tests)} />}
    {tab === 4 && <SubmissionsAdmin compid={compid} numtests={parseInt(data.data.num_tests)}/> }
    {tab === 5 && <PrizesAdmin compid={compid} prizeDetails={data.data.prizeDetails} update = {setUpdate}/>}
    </ThemeProvider>
  );
}

export default CompetitionAdmin;