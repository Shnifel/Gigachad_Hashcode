import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, TextField } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

const ProfilePage = () => {
  const [name, setName] = useState('John');
  const [surname, setSurname] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [location, setLocation] = useState('');

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSaveChanges = () => {
    // Save changes to the server
    // You can implement your logic here
    console.log('Saved changes:', location);
  };

  const imageUrl = "https://en.wikipedia.org/wiki/University_of_the_Witwatersrand#/media/File:Logo_for_the_University_of_the_Witwatersrand,_Johannesburg_(new_logo_as_of_2015).jpg"

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} align="center">
        <img src={imageUrl} alt="Profile Picture" style={{ width: 120, height: 120, borderRadius: '50%' }} />
          <Avatar sx={{ width: 300, height: 300 }} src={imageUrl} alt="Profile Picture" />
          <Button startIcon={<EditIcon />} variant="outlined" size="small">
            Change Picture
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Name" value={name} fullWidth disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Surname" value={surname} fullWidth disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" value={email} fullWidth disabled />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Location" value={location} onChange={handleLocationChange} fullWidth />
        </Grid>
        <Grid item xs={12} align="center">
          <Button variant="contained" color="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;


         
