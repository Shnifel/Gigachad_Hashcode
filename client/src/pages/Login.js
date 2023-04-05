import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Error from "@mui/icons-material/Error"
import Typography from '@mui/material/Typography';
import {  ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import "./login.scss"
import {loginHandler, googleAuth} from "../handlers/auth/auth.js"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterTitle from '../components/TypewriterTitle';
import {  useDispatch } from 'react-redux'
import { setUserID, setAdmin, setLoggedIn } from '../stateManagement/state.js'
import video from "../assets/tunnel-65492.mp4"
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import myTheme from '../components/styles/Theme';
import GoogleButton from 'react-google-button';



const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  player: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: theme.spacing(2),
  }
}));


export default function Login() {
  const classes = useStyles();
  const dispatch= useDispatch();
  

  const [error, setError] = useState(null);
  const navigate = useNavigate();
 
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputs = {
      email: data.get('email'),
      
      password: data.get('password'),
    };
    
    try{
      
      const login = await loginHandler(inputs);
      console.log(login)
      
      navigate("/Dashboard")
      console.log(login)
    }
    catch (err){
      setError(err.message);
      
    }
  };


  const handlegoogle = async(event) => {
    event.preventDefault()
    try {
      await googleAuth()
      
      navigate('/Dashboard')
    } catch (err) {
      setError(err.message);
    }
  }

  return (

    <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
      <ReactPlayer 
        className = {classes.player}
        url = {video}
        playing
        loop
        muted
        width= "100%"
        height = "auto"
      />
      <div className={classes.content}>
      <Grid container component="main" sx={{ justifyContent: 'center' }}>
        <CssBaseline />


        {/* Handles left hand side of screen */}


        <Grid item >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
           <div className='typewriter' style={{background: 'transparent'}}>
            <TypewriterTitle />
           </div>
              
            
            <Avatar sx={{ m: 1, color: 'primary' , bgcolor: 'transparent' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="secondary">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, color: 'white' }} style = {{width: '100vh'}}>
              <TextField
                margin="normal"
                required
                fullWidth
                color = "black"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant = "filled"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20}
                }}
                
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                variant='filled'
                color = "black"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20}
                }}

              />
              <FormControlLabel
                control={<Checkbox value="remember" color="secondary" />}
                label="Remember me"
              />

              {error && <div className='error'>
              <Avatar sx = {{bgcolor: 'rgb(255, 204, 204)', color: 'red'}} >
              <Error />
              </Avatar>
              <p> {error} </p>
              </div>
              }
              
      
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container sx = {{mt: 2}}>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink to = "/Register">
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>

              <Grid container sx = {{mt : 1, mb : 1, width: '100%', justifyContent: 'center'}}>
                <Grid item>
                  <Typography component = "h3" sx = {{textAlign: 'center'}}>
                      OR
                  </Typography>
                </Grid>
                
              </Grid>
              <div className='googleButton'>
                <GoogleButton
                  type="light" // can be light or dark
                  onClick={handlegoogle}
                  className= 'googleButton'
                />  
              </div>
                
            </Box>
          </Box>
        </Grid>
      </Grid> 
      </div>
      </div>
    </ThemeProvider>
  );
}