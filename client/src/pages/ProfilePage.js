import React, { useState,useEffect,useRef } from 'react';
import { Avatar, Button, Container, Grid, TextField } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import "./login.scss" 
import { useNavigate } from 'react-router-dom';
import { darkTheme, useStyles } from '../components/styles/Theme';
import video from "../assets/background.mp4"
import ReactPlayer from 'react-player';
import {  ThemeProvider } from '@mui/material/styles';
import myTheme from '../components/styles/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import { changeEmail, changeProfile, updateUserProfile } from '../handlers/auth/auth';
import { getProfile } from '../handlers/auth/auth';
import {useSelector} from 'react-redux'
import {CircularProgress, Typography} from '@material-ui/core';
import { uploadFile,getImage } from '../handlers/competitions';
import { Auth } from '../Firebase';


//Handles properties of Profile Page
const ProfilePage = () => {
  const uid = useSelector(state => state.auth.userID)
  const classes = useStyles();
  const navigate= useNavigate();
  const [name, setName] = useState('John');
  const [surname, setSurname] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [location, setLocation] = useState('');
  const [data,setData]= useState(null);
  const [loading,setLoading]=useState(false);
  const [profilepic,setprofilepic]=useState(null);
  const [image,setImage]= useState(null);
  const fileInputRef = useRef(null);

//Fetching current data for a user
  useEffect(() => {
    async function fetchdata(){
      try {
        setLoading(true)
        const response = await getProfile({uid})
        
        setData(response);
        setName(await response.name)
        setSurname(await response.surname)
        setEmail(await response.email)
        setLocation(await response.location)
        
        setLoading(false)


      } catch (error) {
        
        setLoading(false)
      }
    }
     fetchdata()
        }, []);
//handles user location change
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
//handles user email change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
//handles user name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
//handles user Surame change
  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };
//handles user Profile Image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
//Handles uploading the new Profile picture
  const handleImageButton = () => {
    fileInputRef.current.click();
  }
console.log(Auth.currentUser.photoURL)
  const handleSaveChanges = async () => {
    
 
    try {
      
      if (email!==data.email) {
        await changeEmail(email)
      }
      if (image) {
        await uploadFile(uid+"/"+image.name,image)
        const url = await getImage(uid+"/"+image.name)
        await changeProfile({photoURL:url})

      }
      await updateUserProfile({uid,name,surname,email,location,image:image?image.name:null})
    } catch (error) {
      console.log(error)
    }
    console.log('Saved changes:', location);
    navigate("/Home")
  };

  if (loading) {
    return (<ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <CircularProgress/>
    </ThemeProvider>)
  }

 
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
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
    <Container maxWidth="sm">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Typography component = "h1" style = {{fontFamily: 'Arcade', fontSize: 40, color: "#0000ff"}} sx = {{textAlign: 'center', fontSize: 30, fontStyle: 'bold', color: "#ffffff"}}>
            MY PROFILE
          </Typography>
        <Grid item xs={12} align="center">
        
           <Avatar sx={{ width: 200, height: 200, m: 5 }}src={image? URL.createObjectURL(image): Auth.currentUser && Auth.currentUser.photoURL}  alt="Profile Picture" /> 
           <input type='file' accept='image/*' onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }}/>
          <Button startIcon={<EditIcon />} variant="outlined" size="small" onClick={handleImageButton} > 
            Change Picture
          </Button>
        </Grid>
        <Grid item xs={12} style={{borderColor:"#FFFFF"}} >
          <TextField label="Name" value={name} onChange={handleNameChange} style={{borderColor: "#FFFFF", display: 'flex'}} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Surname" value={surname} onChange={handleSurnameChange} style={{display: 'flex'}} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" value={email} onChange={handleEmailChange}  style={{display: 'flex'}}/>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Location" value={location} onChange={handleLocationChange} fullWidth  />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Container>
    </div>
    </div>
    </ThemeProvider>
  );
};

export default ProfilePage;


         
