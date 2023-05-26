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
import { deleteTeam, getTeams, removeMember, updateTeam } from '../../handlers/competitions';


const Teams = (props) => {
    const id = props.id; // Get competition id
    const [teams, setTeams] = useState(null); // Team related information
    const [loading, setLoading] = useState(true); // Loading state
    const [editMode, setEditMode] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [expandedTeamIndex, setExpandedTeamIndex] = useState(-1);
    const [teamsChange, setTeamsChange] = useState(null);
    const [change, setChanges] = useState(false);
     
    
    useEffect(() => {
        async function fetchdata(){
         try {
          const response = await getTeams({compid: id})
          setTeams(response);
          setTeamsChange(Array.from(response));
          setLoading(false);

         } catch (error) {
            setLoading(false);
         }
         
        }
         fetchdata()}, [change]);

  const handleEditClick = async (event) => {

    if (editMode && unsavedChanges) {
      setLoading(true);
      const updatedTeams = teamsChange.filter((team, index) => {
        return team.teamData.teamname !== teams[index].teamData.teamname;
      })
      console.log(updatedTeams);
      for (const team of updatedTeams){
        await updateTeam({teamid: team.id, teamname: team.teamData.teamname})
      }

      setChanges(!change);
      setUnsavedChanges(false);
    }

    setEditMode(!editMode);
  }

  const handleTeamNameChange = (event, index, teamId) => {
    const updatedTeamName = event.target.value;

    // Create a copy of the updated teams array
   const newUpdatedTeams = Array.from(teamsChange);

  // Update the team name in the copied array
  newUpdatedTeams[index] = { ...newUpdatedTeams[index], teamData: {teamname: updatedTeamName}};

  // Set the updated teams state
  setTeamsChange(newUpdatedTeams);
    setUnsavedChanges(true);
  };


  const handleTeamDelete = async (teamId) => {
    setLoading(true);
    await deleteTeam({teamid: teamId, compid: id})
    setChanges(!change);
  };

  const handleMemberDelete = async (teamIndex, memberIndex) => {
    setLoading(true);
    await removeMember({uid: memberIndex, teamid: teamIndex});
    setChanges(!change);
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
            {teams && teams.map((team, index) => (
              <React.Fragment key={team.id}>
                <TableRow>
                  <TableCell>
                    {editMode ? (
                      <TextField
                        value={teamsChange[index].teamData.teamname}
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
                      <IconButton onClick={() => handleTeamDelete(team.id)} color='inherit'>
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
                                  <IconButton onClick={() => handleMemberDelete(team.id, member.id)} color='inherit'>
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