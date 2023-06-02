import React, { useState } from 'react';
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
  createTheme
} from '@material-ui/core';
import {
    AccountCircle as AccountCircleIcon,
    Dashboard as DashboardIcon,
    Info as InfoIcon,
    ContactMail as ContactMailIcon,
    Logout,
    Home as HomeIcon,
    Forum
  } from '@mui/icons-material';
import {makeStyles} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { useNavigate, Link } from 'react-router-dom';
import { darkTheme } from '../components/styles/Theme';
import { logout } from '../handlers/auth/auth';
import CompetitionsHub from './Home/CompetitionsHub';
import { Avatar } from '@mui/material';
import { Auth } from '../Firebase';
import TypewriterTitle from '../components/TypewriterTitle';
//Setting components for video background
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


//handling Home page properties
function Home() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
 
//Handling when a menu is closed
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
//Handling when a menu is opened
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
//Handling tab changes
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setTab(newValue);
  };
//handling when Profile Icon is clicked
  const handleProfileClick = () => {
    navigate("/ProfilePage");
  }
//Handling User logout
  const handleLogout = () => {
    logout();
    navigate("/")
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.appBar}>
      <AppBar position="static" color='inherit'>
        <Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor='primary'>
            <Tab label="Competitions Hub" icon={<HomeIcon/>} value={0} style={{fontFamily: 'Arcade'}}/>
          </Tabs>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
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
              color='inherit'
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfileClick} style={{color: '#FFFFFF'}}>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="small" style={{color:"#FFFFFF"}} />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{color:"#FFFFFF"}} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      </div>
      {tab === 0 && <CompetitionsHub/>}
    </ThemeProvider>
  );
}

export default Home;