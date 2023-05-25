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



function Home() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
 

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

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.appBar}>
      <AppBar position="static" color='inherit'>
        <Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor='primary'>
            <Tab label="Competitions Hub" icon={<HomeIcon/>} value={0}/>
            <Tab label="About" icon={<InfoIcon/>} value={1}/>
            <Tab label="FAQ" icon = {<Forum/>} value={2}/>
          </Tabs>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfileClick}
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
              color='inherit'
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfileClick} style={{color: '#ffffff'}}>
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
      {tab === 0 && <CompetitionsHub/>}
      {tab === 1 && <div> Hello world </div>}
    </ThemeProvider>
  );
}

export default Home;