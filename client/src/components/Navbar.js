import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tabs,
  Tab,
  createTheme
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    AccountCircle as AccountCircleIcon,
    Dashboard as DashboardIcon,
    Info as InfoIcon,
    ContactMail as ContactMailIcon,
    Logout,
    Home,
    Forum
  } from '@mui/icons-material';
import {makeStyles} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import { useNavigate, Link } from 'react-router-dom';
import { darkTheme } from './styles/Theme';
import { logout } from '../handlers/auth/auth';

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



function NavBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
      <AppBar position="static" >
        <Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} indicatorColor='primary'>
            <Tab label="Competitions Hub" icon={<Home/>} />
            <Tab label="About" icon={<InfoIcon/>}/>
            <Tab label="FAQ" icon = {<Forum/>} />
          </Tabs>
          <div style={{ flexGrow: 1 }} />
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
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
    </ThemeProvider>
  );
}

export default NavBar;
