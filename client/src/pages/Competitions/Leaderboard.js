import React, { useState,useEffect } from 'react';
import { getLeaderboard } from '../../handlers/submissions';
import { darkTheme } from '../../components/styles/Theme';


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  Collapse,
  Box,
  Typography,
  CssBaseline,
} from '@mui/material';
import Team from './Team';
import TestCasesBox from '../../components/TestCasesBox';
import { ThemeProvider } from '@emotion/react';

const Leaderboard = ( props ) => {
  const num_tests=props.num_tests;
  const compid=props.compid;
  const [teams, setTeams] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('location');
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    async function fetchdata(){
      try {
       const response = await getLeaderboard({compid})
       setTeams(response)
       setLoading(false)
        console.log(response)
      } catch (error) {
         setLoading(false);
      }
      
     }
      fetchdata()}, [])


  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleTeamClick = (team) => {
    setExpandedTeam(team);
  };

  const renderTestCases = (team) => {
    return team.scores.map((score, index) => (
      <TableCell key={index}>{score}</TableCell>
    ));
  };

  const findAgregate = (team) => {
    return team.scores.reduce((acc, curr) => curr === null || curr === -1 ? acc : acc + curr, 0)
    
  }


  const renderTeams = () => {
    
    const sortedTeams = [...teams].sort((a, b) => {
      let aValue,bValue
      if (sortBy === "aggregate") {
         aValue=findAgregate(a)
         bValue=findAgregate(b)
         
      }else if (sortBy.slice(0,-1) === "testcase"){
        const num=parseInt(sortBy.slice(-1))
        aValue=a.scores[num]
        bValue=b.scores[num]  
      }
      else{
        aValue = a[sortBy];
        bValue = b[sortBy]; 
      }
       
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      
      return 0;
    });

    return sortedTeams.map((team, index) => (
      <React.Fragment key={index}>
        <TableRow onClick={() => handleTeamClick(team)}>
        <TableCell>{team.teamname}</TableCell>
          <TableCell>{team.location}</TableCell>
          {renderTestCases(team)}
          <TableCell>{findAgregate(team)}</TableCell>
          
          
        </TableRow>
      </React.Fragment>
    ));
  };

  return (
    <ThemeProvider theme= {darkTheme}>
      <CssBaseline/>
      <Box sx = {{m : 2}}> 
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>
              <TableSortLabel
                active={sortBy === 'teamname'}
                direction={sortOrder}
                onClick={() => handleSort('teamname')}
              >
                Team Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'location'}
                direction={sortOrder}
                onClick={() => handleSort('location')}
              >
                Location
              </TableSortLabel>
            </TableCell>
            {Array(num_tests).fill(null).map((val,index) => ( <TableCell><TableSortLabel
              
               active={sortBy === 'testcase'+index}
                direction={sortOrder}
                onClick={() => handleSort('testcase'+index)}
              >
                Test case {index+1}
              </TableSortLabel> </TableCell>))}
            <TableCell>
              <TableSortLabel
                active={sortBy === 'aggregate'}
                direction={sortOrder}
                onClick={() => handleSort('aggregate')}
              >
                Aggregate
              </TableSortLabel>
            </TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>{renderTeams()}</TableBody>
      </Table>
    </TableContainer>
    </Box>
    </ThemeProvider>
  );
};

export default Leaderboard;
