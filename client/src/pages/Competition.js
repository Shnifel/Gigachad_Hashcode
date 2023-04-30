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
import Info from './Competitions/Info';
import Team from './Competitions/Team';
import Leaderboard from './Competitions/Leaderboard';
import PdfViewer from './Competitions/Problem';
import Teams from './CompetitionsAdmin/Teams';
import ProblemAdmin from './CompetitionsAdmin/Problem';


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

  useEffect(() => {
    async function fetchdata(){
      console.log("Competition: " + compid);
      const response = await getCompetition({compid: compid})
      setData(response);
      setLoading(false);
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

  const teams = [
    { name: 'Team A', scores: [10, 15, 20], totalScore: 45, isHighlighted: false },
    { name: 'Team B', scores: [5, 8, 12], totalScore: 25, isHighlighted: true },
    { name: 'Team C', scores: [7, 12, 15], totalScore: 34, isHighlighted: false },
    { name: 'Team D', scores: [9, 14, 19], totalScore: 42, isHighlighted: false },
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
    <div className='font'>
     <Typography variant= "h1" fontFamily="'Scififont'" sx = {{textAlign: 'center', fontSize: 50, fontStyle: 'bold', color: "#0000FF" }}>
             {data.data.compname}
     </Typography>
     </div>
      <div className={classes.appBar}>
      <AppBar position="static" color = "inherit" >
        <Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor='primary'>
            <Tab label="Info" icon={<InfoIcon/>} value={0}/>
            <Tab label="My Team" icon={<Group/>} value={1}/>
            <Tab label="Problem" icon = {<Quiz/>} value={2}/>
            <Tab label = "Leaderboard" icon={<LeaderboardIcon/>} value = {3}/> 
            <Tab label = "Submissions" icon = {<Grading/>} value = {4} />
            <Tab label = "Prizes" icon = {<EmojiEvents/>} value = {5} />
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
      {tab === 1 && !loading && <Teams id = {compid} />}
      {tab === 2 && <PdfViewer pdfFile = { {
  name: 'dummy.pdf',
  url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
}} textFiles={["test1"]}/>}
      {tab === 3 && <div>
      <Typography variant="h4" component="h1">
        Leaderboard
      </Typography>
      <Leaderboard teams={teams} />
    </div>}
    {tab === 4 && <ProblemAdmin/>}
    </ThemeProvider>
  );
}

export default Competition;