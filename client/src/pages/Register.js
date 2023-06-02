import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import { registerHandler } from '../handlers/auth/auth';
import Error from '@mui/icons-material/Error';
import './login.scss';
import ErrorMessage from '../components/Error';
import Success from '../components/Success';
import { useStyles } from '../components/styles/Theme';
import video from "../assets/tunnel-65492.mp4";
import ReactPlayer from 'react-player';
import TypewriterTitle from '../components/TypewriterTitle';
import myTheme from '../components/styles/Theme';

//Handling properties of Signup
export default function SignUp() {
  const classes = useStyles();
  const [error,setError]=React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const Inputs={
      email: data.get('email'),
      name: data.get('firstName'),
      surname:data.get('lastName'),
      password: data.get('password'),
    };
    try{//Trying to Register new user
      const response = await registerHandler(Inputs);
      setError(null);
      setSuccess(response.message);
   }
   catch (err){//Returning error message
      setSuccess(null);
     setError(err.message);
   }
  };

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
      <Grid container component="main" sx = {{justifyContent: 'center'}}>
        <CssBaseline />
        <Grid item>
        <Box
          sx={{
            my: 8,
            mx : 4,
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
          <Typography component="h1" variant="h5" color = "secondary">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 , color: 'white' }} style = {{width: '100vh'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  color = "black"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  variant = "filled"
                  InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  color = "black"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  variant = "filled"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  color = "black"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant = "filled"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  color = "black"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant = "filled"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}
                />
              </Grid>
              <Grid item xs={12}>
                
              </Grid>
            </Grid>
            {error && <ErrorMessage errmsg = {error} />}
            {success && <Success text = {success} />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to ="/" style={{color:"#FFFFFF"}}>
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        </Grid>
      </Grid>
      </div>
      </div>
    </ThemeProvider>
  );
}