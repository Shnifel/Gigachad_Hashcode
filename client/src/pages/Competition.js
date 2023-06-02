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
  Typography, CircularProgress, CssBaseline, Grid
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
import { getCompetition, getImage, getTeam } from '../handlers/competitions';
import './login.scss'
import Info from './Competitions/Info';
import Team from './Competitions/Team';
import Leaderboard from './Competitions/Leaderboard';
import PdfViewer from './Competitions/Problem';
import Submissions from './Competitions/Submissions';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { Auth } from '../Firebase';
import Prizes from './Competitions/Prizes';
import CountdownTimer from '../components/CountdownTimer';



//Handling video background
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


//Handling properties of Competiiton
function Competition() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [tab, setTab] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const compid = location.state.compid;
  const [subsid, setSubsid] = useState(null);
  const [image, setImage] = useState(null);
  const [teamid, setTeamid] = useState(null);
  const uid = useSelector(state => state.auth.userID);

//Fetching data for a competition
  useEffect(() => {
    async function fetchdata(){
      try {
        const response = await getCompetition({compid: compid})
        setData(response);
        const url = await getImage(await response.id + "/" + await response.data.image)
        setImage(url)
        const team = await getTeam({compid, uid})
        setSubsid(team.teamData.subsRef);
        setTeamid(team.id);

        
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
    
    }, []);
//Handling when a menu is closed
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
//Handling the creation of a menu
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
//Handling tabs changing
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setTab(newValue);
  };
//Handling navigation for when a profile icon is clicked
  const handleProfileClick = () => {
    navigate("/ProfilePage");
  }
//Handling a user to logout
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

  const isrunning = new Date(data.data.compdate) <= new Date()
  const isrunningopen = isrunning &&  new Date() <= new Date(data.data.compenddate) 
  const regopen = new Date(data.data.regstartdate) <= new Date() && new Date() <= new Date(data.data.regenddate) 

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
     <Typography variant= "h2" sx = {{textAlign: 'center', fontSize: 20, fontStyle: 'bold', }} style={{fontFamily: 'Arcade', color: "#6700ff"}}>
             {data.data.compname}
     </Typography>
     <Grid container style={{display: 'flex', width: '100%', justifyItems: 'right', justifyContent: 'right'}}>
      <CountdownTimer targetDate={new Date(data.data.compenddate)}/>
     </Grid>
      

      <div className={classes.appBar}>
      <AppBar position="static" color = "inherit" >
        <Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor='primary' >
            <Tab label="Info" icon={<InfoIcon/>} value={0} style={{fontFamily: 'Arcade'}}/>
            {(regopen || subsid) && <Tab label="My Team" icon={<Group/>} value={1} style={{fontFamily: 'Arcade'}}/>}
            {isrunning && <Tab label="Problem" icon = {<Quiz/>} value={2} style={{fontFamily: 'Arcade'}}/>}
            <Tab label = "Leaderboard" icon={<LeaderboardIcon/>} value = {3} style={{fontFamily: 'Arcade'}}/> 
            {isrunningopen && subsid && <Tab label = "Submissions" icon = {<Grading/>} value = {4} style={{fontFamily: 'Arcade'}}/>}
            <Tab label = "Prizes" icon = {<EmojiEvents/>} value = {5} style={{fontFamily: 'Arcade'}} />
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
      src={Auth.currentUser && Auth.currentUser.photoURL}
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
                </ListItemIcon >
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
      {tab === 0 && !loading && <Info data = {data.data} />}
      {tab === 1 && !loading && <Team id = {compid} minteamsize={data.data.min_teamsize}  />}
      {tab === 2 && !loading && <PdfViewer compid= {compid} numtests = {parseInt(data.data.num_tests)}/>}
      {tab === 3 && 
      <Leaderboard compid={compid} num_tests={parseInt(data.data.num_tests)} teamid={teamid}/>
    }
    {tab === 4 && <Submissions compid={compid} numtests = {parseInt(data.data.num_tests)} subsid = {subsid}/>}
    {tab === 5 && <Prizes prizeDetails = {data.data.prizeDetails}/>}
    </ThemeProvider>
  );
}

export default Competition;