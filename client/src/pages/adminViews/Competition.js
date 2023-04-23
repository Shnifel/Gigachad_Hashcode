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


const CompetitionsPage = () => {
  const [teams, setTeams] = useState([
    {
      id: 0,
      name: 'Team A',
      joinCode: '12345',
      members: [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Doe', email: 'janedoe@example.com' },
      ],
    },
    {
      id: 1,
      name: 'Team B',
      joinCode: '67890',
      members: [
        { id: 1, name: 'Bob Smith', email: 'bobsmith@example.com' },
      ],
    },
  ]);
  const [description, setDescription] = useState("Lorem ipsum asjhadddddddddddddddddddddddddduwisaodeiuwqadeijukaoluhjrfdawuijfhrdiejwaskyfhrie")

  const [editMode, setEditMode] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [expandedTeamIndex, setExpandedTeamIndex] = useState(-1);
  const [pdf, setPdf] = useState(null);

  const handleEditClick = (event, teamId) => {
    setEditMode(!editMode);
  }

  const handlePdfFileChange = (event) => {
      setPdf(event.target.files[0])
  }

  const handleTeamNameChange = (event, teamId) => {
    const newTeams = teams.map((team) => {
      if (team.id === teamId) {
        return { ...team, name: event.target.value };
      }
      return team;
    });
    console.log(newTeams);
    setTeams(newTeams);
    setUnsavedChanges(true);
  };

  const handleJoinCodeChange = (event, teamId) => {
    const newTeams = teams.map((team) => {
      if (team.id === teamId) {
        return { ...team, joinCode: event.target.value };
      }
      return team;
    });
    setTeams(newTeams);
    setUnsavedChanges(true);
  };

  const handleMemberNameChange = (event, teamId, memberId) => {
    const newTeams = teams.map((team) => {
      if (team.id === teamId) {
        const newMembers = team.members.map((member) => {
          if (member.id === memberId) {
            return { ...member, name: event.target.value };
          }
          return member;
        });
        return { ...team, members: newMembers };
      }
      return team;
    });
    setTeams(newTeams);
    setUnsavedChanges(true);
  };

  const handleMemberEmailChange = (event, teamId, memberId) => {
    const newTeams = teams.map((team) => {
      if (team.id === teamId) {
        const newMembers = team.members.map((member) => {
          if (member.id === memberId) {
            return { ...member, email: event.target.value };
          }
          return member;
        });
        return { ...team, members: newMembers };
      }
      return team;
    });
    setTeams(newTeams);
    setUnsavedChanges(true);
  };

  const handleTeamDelete = (teamId) => {
    const newTeams = teams.filter((team) => team.id !== teamId);
    setTeams(newTeams);
    setUnsavedChanges(true);
  };

  const handleMemberDelete = (teamIndex, memberIndex) => {
    const newTeams = [...teams];
    newTeams[teamIndex].members.splice(memberIndex, 1);
    setTeams(newTeams);
    setUnsavedChanges(true);
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
      <NavBar/>
       <div className='typewriterDisplay'>
        <TypewriterTitle/>
       </div>
       {editMode ? <TextField value = {description}/> : <Typography>description </Typography>}
       <Box sx = {{display: 'flex', width: '100%',justifyContent: 'right', m : 2}}>
        <IconButton onClick={handleEditClick}>
        {editMode ? <Save /> : <Edit />}
      </IconButton>
       </Box>
      
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team Name</TableCell>
              <TableCell>Join Code</TableCell>
              <TableCell>Number of Members</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team, index) => (
              <React.Fragment key={team.id}>
                <TableRow>
                  <TableCell>
                    {editMode ? (
                      <TextField
                        value={team.name}
                        onChange={(event) =>
                          handleTeamNameChange(event, index)
                        }
                      />
                    ) : (
                      team.name
                    )}
                  </TableCell>
                  <TableCell>{team.joinCode}</TableCell>
                  <TableCell>{team.members.length}</TableCell>
                  <TableCell sx = {{width : '100%', justifyContent: 'right', display: 'flex'}}>
                    <IconButton onClick={() => handleTeamExpand(index)}>
                      {expandedTeamIndex === index ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    {editMode && (
                      <IconButton onClick={() => handleTeamDelete(index)}>
                        <Delete />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
                {expandedTeamIndex === index && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {team.members.map((member, memberIndex) => (
                            <TableRow key={member.id}>
                              <TableCell>
                                {editMode ? (
                                  <TextField
                                    value={member.firstName}
                                    
                                  />
                                ) : (
                                  member.firstName
                                )}
                              </TableCell>
                              <TableCell>
                                {editMode ? (
                                  <TextField
                                    value={member.lastName}
                                   
                                  />
                                ) : (
                                  member.lastName
                                )}
                              </TableCell>
                              <TableCell>
                                {editMode ? (
                                  <TextField
                                    value={member.email}
                                    onChange={(event) =>
                                      handleMemberEmailChange(event, index, memberIndex)
                                    }
                                  />
                                ) : (
                                  member.email
                                )}
                              </TableCell>
                              <TableCell>
                                {editMode && (
                                  <IconButton onClick={() => handleMemberDelete(index, memberIndex)}>
                                    <Delete />
                                  </IconButton>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                         
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
        <Box component={Paper}>
          <Typography component = "h2">
          Competition Problem
          </Typography>
          <input type="file" name = "Upload problem statement for the competition" accept="application/pdf" onChange={handlePdfFileChange} />
          {/* {pdfFile && (
            <div>
              <Document file={pdfFile}>
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
              {editMode && (
                <IconButton onClick={handlePdfDelete}>
                  <Delete />
                </IconButton>
              )}
            </div>
          )} */}
        </Box>
    
        </Box>
        </ThemeProvider>
        )}

export default CompetitionsPage;




