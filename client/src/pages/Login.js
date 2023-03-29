import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Error from "@mui/icons-material/Error"
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import "./login.scss"
import {loginHandler, googleAuth} from "../handlers/auth/auth.js"
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gapi } from 'gapi-script';
import { GoogleLogin } from "react-google-login";
import TypewriterTitle from '../components/TypewriterTitle';
import { useSelector, useDispatch } from 'react-redux'
import { setUserID, setAdmin, setLoggedIn } from '../stateManagement/state.js'
import video from "../assets/tunnel-65495.mp4"


const theme = createTheme();

const google_access_token = '706697422532-7dr63k4qq2a7m7t98v4fvt2698r7bf8n.apps.googleusercontent.com';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Login() {

  const userID = useSelector(state => state.auth.isLoggedIn);
  console.log(userID);
  const dispatch = useDispatch();


  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    function start() {
        gapi.client.init({
        clientId: google_access_token,
        scope: 'email',
        });
    }
    
    gapi.load('client:auth2', start);
    }, []); 

  const handleSubmit = async (event) => {
    setError(userID);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputs = {
      email: data.get('email'),
      
      password: data.get('password'),
    };
    
    try{
       await loginHandler(inputs);
       navigate("/Dashboard");
    }
    catch (err){
      setError(err.response.data);
      
    }
  };

  const googleResponse = async (response) => {
    try{
      const res = await googleAuth(response);
      navigate("/Dashboard");
    }catch (err){
      setError(err.response.data);
    }

  }

  return (

    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        {/* Handles left hand side of screen */}

        <Grid item sm = {4} md = {7}  style = {{ alignItems: 'center'}}>
            <p> Hello </p>
          <div style = {{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <video width="100%" height="100%" autoPlay loop muted style = {{objectFit: 'cover'}} >
                <source src={video} type="video/mp4"/>
            </video>

          </div>
          
        </Grid>
        
        {/* Right hand side of screem */}

        <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'grey' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} style = {{width: '100%'}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
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

              <GoogleLogin
                clientId = {google_access_token}
                buttonText='CONTINUE WITH GOOGLE'
                onSuccess={googleResponse}
                onFailure={googleResponse}
                className = "googleButton"
              />
             
               
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}