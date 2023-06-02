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
import "./login.scss";
import {loginHandler, googleAuth, passwordReset} from "../handlers/auth/auth.js"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TypewriterTitle from '../components/TypewriterTitle';
import {  useDispatch } from 'react-redux';
import { setUserID, setAdmin, setLoggedIn } from '../stateManagement/state.js';
import video from "../assets/tunnel-65492.mp4"
import ReactPlayer from 'react-player';
import myTheme from '../components/styles/Theme';
import GoogleButton from 'react-google-button';
import { useStyles } from '../components/styles/Theme';
import Success from '../components/Success';

//Hadnling Login properties
export default function Login() {
  const classes = useStyles();
  const dispatch= useDispatch();
  

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
 
  const handleSubmit = async (event) => {
    //Setting default Username and password
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const inputs = {
      email: data.get('email'),
      
      password: data.get('password'),
    };
    //Trying to log user in with their details
    try{
      const login = await loginHandler(inputs);
      const isAdmin = login.isAdmin;
      dispatch(setAdmin(isAdmin));
      navigate("/Home");
    }//Displaying the error if there is one
    catch (err){
      setError(err.message);
      
    }
  };
//Handling when an email changes
  const onEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  }

//Handles Google Log in
  const handlegoogle = async(event) => {
    event.preventDefault()
    try {
      const creds = await googleAuth();
      const isAdmin = creds.isAdmin;
      dispatch(setAdmin(isAdmin));
      navigate('/Home')
    } catch (err) {
      console.log(err)
      setError(err.message);
    }
  }
//Handles Password reset
  const handlePasswordReset = async () => {
    try {
      console.log(email);
      await passwordReset(email);
      setError(null);
      setSuccess(true);
    } catch (error) {
      console.log(error.message);
      setError("Please enter a valid email address");
      setSuccess(null);
    }
  }

  return (

    <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
      <ReactPlayer
        data-testid = "Background"
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
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}
                onChange = {onEmailChange}
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
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}

              />
             

              {error && <div className='error'>
              <Avatar sx = {{bgcolor: 'rgb(255, 204, 204)', color: 'red'}} >
              <Error />
              </Avatar>
              <p> {error} </p>
              </div>
              }
              {success && <Success text = "Please check your emails to reset your password"/>}
              
      
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
                  <Link href="#" variant="body2" onClick={handlePasswordReset} style={{color: "#FFFFFF"}}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <NavLink to = "/Register" style={{color:"#FFFFFF"}}>
                    {"Don't have an account? Sign Up"}
                    
                  </NavLink>
                </Grid>
              </Grid>

              <Grid container sx = {{mt : 1, mb : 1, width: '100%', justifyContent: 'center'}}>
                <Grid item>
                  <Typography component = "h3" sx = {{textAlign: 'center'} } style={{color:"#FFFFFF"}}>
                      OR
                  </Typography>
                </Grid>
                
              </Grid>
              
                <GoogleButton
                  label = "CONTINUE WITH GOOGLE"
                  type="light" // can be light or dark
                  onClick={handlegoogle}
                  className= 'googleButton'
                  style = {{width: '100%', borderRadius: 10}}
                />  
             
                
            </Box>
          </Box>
        </Grid>
      </Grid> 
      </div>
      </div>
    </ThemeProvider>
  );
}