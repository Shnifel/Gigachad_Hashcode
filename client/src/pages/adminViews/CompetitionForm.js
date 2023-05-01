import * as React from 'react';
import {ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useRef } from 'react';
import AppBar from '../../components/layout/AppBar.js';
import myTheme from '../../components/styles/Theme.js';
import {CircularProgress} from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { createNewCompetitions } from '../../handlers/competitions.js';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import Video from "../../assets/retro.mp4";
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import { useStyles } from '../../components/styles/Theme.js';
import ErrorMessage from '../../components/Error.js';
import Success from '../../components/Success.js';
import { Grid } from '@mui/material';
import { Edit as EditIcon , Home, Description as PdfIcon} from '@mui/icons-material';
import { select } from 'async';
import { uploadFile } from '../../handlers/competitions.js';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';


function CompetitionCreate() {
  const classes = useStyles();
  const id=useSelector(state => state.auth.userID)
  const [err,setError] = useState(null)
  const [success, setSuccess] =  useState(null);
  const [image, setImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageButton = () => {
    fileInputRef.current.click();
  }

  const handlePdfInput = () => {
    pdfInputRef.current.click();
  }

  const allowedFiles = ['application/pdf'];
  const handleFile = (e) =>{
    const selectedFile = e.target.files[0];
    
    if(selectedFile){
      if(selectedFile&&allowedFiles.includes(selectedFile.type)){
       setPdfFile(selectedFile);
       console.log(pdfFile);
      }
      else{
        setPdfFile(null);
      }
    }
  }


  const createCompetition = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const inputs = {
        uid:id,
        compname : data.get("name"),
        compdesc : data.get("details"),
        regstartdate : data.get("regStart"),
        regenddate : data.get("regClose"),
        max_teamsize: data.get("numPeople"),
        min_teamsize: data.get("minPeople"),
        numteams: data.get("numTeams"),
        compdate : data.get("compDate"),
        num_tests : data.get("NumTests")

      };
      try {
        setLoading(true);
        const response = await createNewCompetitions(inputs)
        
        {image && await uploadFile(response.compid + "/image" + image.name.split('.').pop().toLowerCase(), image)}
        {pdfFile && await uploadFile(response.compid + "/problem.pdf", pdfFile)}
        setLoading(false); 
        setSuccess(response.compid);
        setError(null);
        navigate("Home")
      } catch (err) {
        setLoading(false);
        setSuccess(null);
        setError(err.response.data);
      }
      }



  return (
    <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
      <ReactPlayer 
        className = {classes.player}
        url = {Video}
        playing
        loop
        muted
        playbackRate={0.5}
        width= "100%"
        height = "auto"
      />
      <div className={classes.content}>
      <Box sx={{ display: 'flex', backgroundColor:'transparent', justifyContent: 'center'}}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            my: 4,
            mx : 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        > 
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            justifyContent: 'center'
          }}
        >
          <Toolbar />
          <Container maxWidth="100%" sx={{ mt: 2, mb: 4 }}>
          <Typography component = "h1" fontFamily="'Arcade'" sx = {{textAlign: 'center', fontSize: 30, fontStyle: 'bold', color: "#0000ff"}}>
            CREATE A NEW COMPETITION
          </Typography>
          <Grid item sx = {{width: '100%', justifyContent: 'center', alignItems: 'center', align: "center", display: 'flex', flexDirection: 'column'}}>
            <Avatar sx={{ width: 200, height: 200, m: 1 }} src={image && URL.createObjectURL(image)}/>
            <Button startIcon={<EditIcon />} onClick={handleImageButton} variant="outlined" size="small">
            Change Competition image
            </Button>
            <input type='file' accept='image/*' onChange={handleImageChange} ref={fileInputRef} style={{ display: 'none' }}/>
          </Grid>
          
          <Grid container sx = {{ mt : 1, mb : 4}} spacing = {2}> 
           <Paper sx = {{backgroundColor: 'transparent'}}>
            <Box component = "form"  sx = {{mt:1}} onSubmit = {createCompetition} style = {{width: '100vh'}}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                color = "black"
                variant = "filled"
                label="Competition Name"
                name="name"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}
                
                autoFocus
                />
                <TextField
                margin="normal"
                color = "black"
                variant = "filled"
                fullWidth
                multiline
                name="details"
                label="Competition Details"
                id="user"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}
                />
                <Grid container spacing = {3} sx = {{display: 'flex', width: '100%', justifyContent: 'center'}}>
                  <Grid item sx = {{display: 'flex'}}> 
                    <TextField
                      margin="normal"
                      type = "datetime-local"
                      color = "black"
                      variant = "filled"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      required
                      name="compDate"
                      label="Date of the Competition"
                      id="compDate"
                      display = "flex"
                      width = "100%"
                      InputProps={{
                        style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                      }}
                    />
                  </Grid>
                  <Grid item sx = {{display: 'flex'}}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      margin = "normal"
                      required
                      fullWidth
                      color = "black"
                      variant = "filled"
                      type = "datetime-local"
                      name = "regStart"
                      label = "Registration open date"
                      id = "regStart"
                      display = "flex"
                      InputProps={{
                        style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                      }}
                    />
                  </Grid>
                  <Grid item sx = {{display: 'flex'}}>
                    <TextField
                      InputLabelProps={{ shrink: true }}
                      margin = "normal"
                      required
                      fullWidth
                      display = "flex"
                      width = "100%"
                      color = "black"
                      variant = "filled"
                      type = "datetime-local"
                      name = "regClose"
                      label = "Registration closing date"
                      id = "regClose"
                      InputProps={{
                        style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                      }}
                   />
                  </Grid>
                </Grid>

                <Grid container spacing = {2} sx = {{justifyContent : 'center'}}>
                  <Grid item>
                    <TextField
                margin = "normal"
                type = "number"
                required
                color = "black"
                variant = "filled"
                name = "numTeams"
                label = "Max teams"
                id = "numTeams"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}/>
                  </Grid>
                  <Grid item>
                     <TextField
                margin = "normal"
                type = "number"
                required
                color = "black"
                variant = "filled"
                name = "numPeople"
                label = "Max people per team"
                id = "numPeople"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}
                />
                 
                  </Grid>
                  <Grid item>
                      <TextField
                  margin = "normal"
                  type = "number"
                  required
                  color = "black"
                  variant = "filled"
                  name = "minPeople"
                  label = "Min people per team"
                  id = "minPeople"
                  InputProps={{
                    style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                  }}
                  />
                  </Grid>
                  <Grid item>
                    <TextField
                margin = "normal"
                type = "number"
                required
                color = "black"
                variant = "filled"
                name = "NumTests"
                label = "Number of Test Cases"
                id = "numTeams"
                InputProps={{
                  style: { backgroundColor: 'white', borderRadius: 20, overflow: 'hidden'}
                }}/>
                  </Grid>
                </Grid>
                <input type='file' color='white'  ref = {pdfInputRef} onChange={handleFile} style={{display: 'none'}}/>
                {pdfFile &&
                <Grid container sx = {{alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 5, mt: 2}}>
                <Grid item sx = {{borderRadius: 5, paddingLeft: 2}}>
                <Avatar variant='square' sx = {{backgroundColor: '#ffffff', color: '#ffffff'}}>
                  {pdfFile ? (
                    <div>
                    <PdfIcon sx = {{backgroundColor: 'red'}}/> 
                    
                    </div>
                  ) : (
                    <label htmlFor="pdf-upload">
                      <PdfIcon sx={{backgroundColor: 'red'}}/>
                    </label>
                  )}
                </Avatar></Grid>
                {pdfFile && <Typography sx = {{backgroundColor: '#ffffff', justifyContent: 'center'}}>
                        {pdfFile.name}
                  </Typography>}</Grid>}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handlePdfInput}
                >
                  {pdfFile ? "Change pdf"  : "Upload competition problem"}
                </Button>
              {err && <ErrorMessage errmsg = {err}/> }
              {success && <Success text = "Succesfully created competition" />}
                <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading ={loading}
                >
                Register new competition
                </LoadingButton>
            </Box>
           
             </Paper>
          </Grid>
          </Container>
        </Box>
      </Box> 
      </Box> 
      </Box></div> </div>
    </ThemeProvider>
  );
}

export default function CompetitionForm() {
  return <CompetitionCreate />;
}