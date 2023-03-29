import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from 'react';

const drawerWidth = 0;

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));





export default function AppBar() {

 return (<StyledAppBar open={true} color = "neutral" sx = {{display: 'flex', width: '100%'}}>
          <Toolbar
            sx={{
              display: 'flex',
              width: '100%',
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="black"
              display="flex"
              width = "100%"
            >
              HashCode Competition
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} >
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </StyledAppBar>)};