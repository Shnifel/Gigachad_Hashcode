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
import { getCompetition, getTeam } from '../handlers/competitions';
import './login.scss'
import Info from './Competitions/Info';
import Team from './Competitions/Team';
import Leaderboard from './Competitions/Leaderboard';
import PdfViewer from './Competitions/Problem';
import Submissions from './Competitions/Submissions';
import { useSelector } from 'react-redux';




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
  const uid = useSelector(state => state.auth.userID);


  useEffect(() => {
    async function fetchdata(){
      try {
        const response = await getCompetition({compid: compid})
       setData(response);
        const team = await getTeam({compid, uid})
        setSubsid(team.teamData.subsRef);
        console.log(subsid)
      setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      
    }
     fetchdata()}, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setTab(newValue);
  };

  const handleProfileClick = () => {
    navigate("/ProfilePage");
  }

  const handleLogout = () => {
    logout();
  }

  const teams =  [
    {
      location: 'Team A',
      testCases: [10, 20, 30],
      aggregate: 60,
      timeTaken: '2h 30m',
    },
    {
      location: 'Team B',
      testCases: [15, 25, 35],
      aggregate: 75,
      timeTaken: '1h 45m',
    },
    // Add more team objects as needed
  ];

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
            image="https://www.computersciencedegreehub.com/wp-content/uploads/2023/02/shutterstock_535124956-scaled.jpg"
            /> 
     <Typography variant= "h1" sx = {{textAlign: 'center', fontSize: 50, fontStyle: 'bold', }} style={{fontFamily: 'Arcade', color: "#6700ff"}}>
             {data.data.compname}
     </Typography>

      <div className={classes.appBar}>
      <AppBar position="static" color = "inherit" >
        <Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor='primary' >
            <Tab label="Info" icon={<InfoIcon/>} value={0} style={{fontFamily: 'Arcade'}}/>
            <Tab label="My Team" icon={<Group/>} value={1} style={{fontFamily: 'Arcade'}}/>
            <Tab label="Problem" icon = {<Quiz/>} value={2} style={{fontFamily: 'Arcade'}}/>
            <Tab label = "Leaderboard" icon={<LeaderboardIcon/>} value = {3} style={{fontFamily: 'Arcade'}}/> 
            <Tab label = "Submissions" icon = {<Grading/>} value = {4} style={{fontFamily: 'Arcade'}}/>
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
            <AccountCircleIcon />
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
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      </div>
     </Card>
      {tab === 0 && !loading && <Info data = {data.data}/>}
      {tab === 1 && !loading && <Team id = {compid} />}
      {tab === 2 && !loading && <PdfViewer compid= {compid} numtests = {parseInt(data.data.num_tests)}/>}
      {tab === 3 && 
      <Leaderboard teams={teams} compid={compid} num_tests={parseInt(data.data.num_tests)} />
    }
    {tab === 4 && <Submissions compid={compid} numtests = {parseInt(data.data.num_tests)} subsid = {subsid}/>}
    </ThemeProvider>
  );
}

export default Competition;