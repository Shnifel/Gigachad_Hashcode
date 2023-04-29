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
  Box
} from '@material-ui/core';
import {
  Edit,
  Delete,
  ExpandMore,
  ExpandLess,
  Save,
  Add
} from '@mui/icons-material';
import {Document, Page} from 'react-pdf';
import NavBar from '../../components/Navbar';
import '../login.scss'
import TypewriterTitle from '../../components/TypewriterTitle';
import Clipboard from '../../components/Clipboard';
import { useSelector } from 'react-redux';

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


const TeamDisplay = (props) => {
  const data = props.data;
  console.log(data);
  const teamID = data.id
  const teamData = data.teamData
  const members = data.membersData
  const [teamName, setTeamName] = useState(teamData.teamname);
  console.log(teamName);
  const uid = useSelector(state => state.auth.userID);

  const [editMode, setEditMode] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [expandedTeamIndex, setExpandedTeamIndex] = useState(-1);
  const [pdf, setPdf] = useState(null);

  const handleEditClick = (event, teamId) => {
    setEditMode(!editMode);
  }


  const handleTeamNameChange = (event, teamId) => {
    setTeamName(event.target.value);
    setUnsavedChanges(true);
  };



  const handleTeamDelete = (teamId) => {
   
  };

  const handleMemberDelete = (teamIndex, memberIndex) => {
    
  };

  const handleTeamExpand = (index) => {
    setExpandedTeamIndex(index === expandedTeamIndex ? -1 : index);
  };

  const handleSaveChanges = () => {
    // Handle saving changes here
    setUnsavedChanges(false);
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
       <Typography component="h2">
        {teamName}
       </Typography>

      <Clipboard label = "Team join code: " copy = {teamData.teamCode} />

      <Typography component="h1">
        Members
      </Typography>
      
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Surname</TableCell>
              <TableCell>Email</TableCell>
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
                      <IconButton onClick={() => handleMemberDelete(index)}>
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
    
        </Box>
        </ThemeProvider>
        )}

export default TeamDisplay;