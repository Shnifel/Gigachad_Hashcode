import React, { useState, useEffect} from 'react';
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
import { darkTheme } from '../../components/styles/Theme';
import {CircularProgress} from '@material-ui/core';
import { getTeams } from '../../handlers/competitions';


const Teams = (props) => {
    const id = props.id; // Get competition id
    const [teams, setTeams] = useState(null); // Team related information
    const [loading, setLoading] = useState(true); // Loading state
    const [editMode, setEditMode] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [expandedTeamIndex, setExpandedTeamIndex] = useState(-1);
     
    
    useEffect(() => {
        async function fetchdata(){
         try {
          const response = await getTeams({compid: id})
          setTeams(response);
          setLoading(false);

         } catch (error) {
            setLoading(false);
         }
         
        }
         fetchdata()}, []);

  const handleEditClick = (event, teamId) => {
    setEditMode(!editMode);
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

  if (loading) // Data not yet back
  return (
    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <div style = {{display: 'flex', width: '100%', justifyContent: 'center'}}>
            <CircularProgress/>
        </div>
    </ThemeProvider>
  )

return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Box sx = {{m : 2}} color="inherit">
       <Box sx = {{display: 'flex', width: '100%',justifyContent: 'right', m : 2}}>
        <IconButton onClick={handleEditClick} color='inherit'>
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
                        value={team.teamData.teamname}
                        onChange={(event) =>
                          handleTeamNameChange(event, index)
                        }
                      />
                    ) : (
                      team.teamData.teamname
                    )}
                  </TableCell>
                  <TableCell>{team.teamData.teamCode}</TableCell>
                  <TableCell>{team.members.length}</TableCell>
                  <TableCell sx = {{width : '100%', justifyContent: 'right', display: 'flex'}}>
                    <IconButton onClick={() => handleTeamExpand(index)} color='inherit'>
                      {expandedTeamIndex === index ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                    {editMode && (
                      <IconButton onClick={() => handleTeamDelete(index)} color='inherit'>
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
                                
                                  {member.name}
                                
                              </TableCell>
                              <TableCell>
                                {member.surname}
                                
                              </TableCell>
                              <TableCell>
                                {member.email}
                              </TableCell>
                              <TableCell>
                                {editMode && (
                                  <IconButton onClick={() => handleMemberDelete(index, memberIndex)} color='inherit'>
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
        </Box>
        </Box>
        </ThemeProvider>
        )}

export default Teams;