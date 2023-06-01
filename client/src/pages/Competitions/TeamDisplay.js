import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Collapse,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Grid
} from '@material-ui/core';
import {
  Edit,
  Delete,
  ExpandMore,
  ExpandLess,
  Save,
  Add,
  ChangeCircle,
  Logout
} from '@mui/icons-material';
import {Document, Page} from 'react-pdf';
import NavBar from '../../components/Navbar';
import '../login.scss'
import TypewriterTitle from '../../components/TypewriterTitle';
import Clipboard from '../../components/Clipboard';
import { useSelector } from 'react-redux';
import { removeMember } from '../../handlers/competitions';
import ErrorMessage from '../../components/Error';

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});


const TeamDisplay = ({change,...props}) => {
  const data = props.data;
  const teamID = data.id
  const teamData = data.teamData
  const compid = props.compid
  const members = data.membersData
  const [teamName, setTeamName] = useState(teamData.teamname);
  const uid = useSelector(state => state.auth.userID);

  const [editMode, setEditMode] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [expandedTeamIndex, setExpandedTeamIndex] = useState(-1);
  const [pdf, setPdf] = useState(null);

  const handleEditClick = (event, teamId) => {
    setEditMode(!editMode);
  }

  const handleMemberDelete = async (id) => {
   try {
    await removeMember({uid : id, teamid: teamID, compid});
    change(true)
   } catch (error) {
    
   } 
   };


return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Box sx = {{m : 2}}>
        
       <Box sx = {{display: 'flex', width: '100%',justifyContent: 'right', m : 2}}>
       {uid === members[0].id && <IconButton onClick={handleEditClick}>
        {editMode ? <Save /> : <Edit />}
      </IconButton>}
       </Box>
       <Typography  variant= "h1"  style = {{ fontSize: 40, fontStyle: 'bold', color: "#6ded8a", margin: 2 , fontFamily: 'Arcade'}}>
          {teamName}
         </Typography>

      <Clipboard label = "Team join code: " copy = {teamData.teamCode} color = "inherit" />
      {members.length < props.minteamsize && <ErrorMessage errmsg = {"Your team does not have enough members to participate. Please Invite more members or join a team with more members to participate"}/>}
      <Typography  variant= "h3"  style = {{ fontSize: 20, fontStyle: 'bold', color: "#ffffff", marginBottom: 25, marginTop: 20, fontFamily: 'Arcade'}}>
          Members
         </Typography>
      
      <TableContainer component={Paper}  >
        <Table>
          <TableHead>
            <TableRow style={{backgroundColor: "#0000ff"}}>
              <TableCell style={{fontFamily: 'Arcade'}}>Name</TableCell>
              <TableCell style={{fontFamily: 'Arcade'}}>Surname</TableCell>
              <TableCell style={{fontFamily: 'Arcade'}}>Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => (
              <React.Fragment key={member.id}>
                <TableRow>
                  <TableCell>
                    { member.name}
                  </TableCell>
                  <TableCell>{member.surname}</TableCell>
                  <TableCell> {member.email} </TableCell>
                  <TableCell sx = {{width : '100%', justifyContent: 'right', display: 'flex'}}>
                    {editMode && (
                      <IconButton onClick={async () => handleMemberDelete(member.id)}>
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        </TableContainer>

        <Grid container>
          <Button onClick={async () => handleMemberDelete(uid)} startIcon={<Logout/>} style = {{backgroundColor: "#DC143C", margin: 10, padding: 10}}>
            
            LEAVE TEAM
          </Button>
        </Grid>
    
        </Box>
        </ThemeProvider>
        )}

export default TeamDisplay;