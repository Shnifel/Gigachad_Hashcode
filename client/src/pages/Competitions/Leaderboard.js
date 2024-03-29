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
import { LocationCity, LocationOn, Scoreboard, Leaderboard as LeaderboardIcon } from '@mui/icons-material';

//Defining leadeboard's properties
const Leaderboard = ( props ) => {
  const num_tests=props.num_tests;
  const compid=props.compid;
  const [teams, setTeams] = useState([]);
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('location');
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    //fetching leaderboard data
    async function fetchdata(){
      try {
       const response = await getLeaderboard({compid})
       //setting data
       setTeams(response)
       setLoading(false)
      } catch (error) {
         setLoading(false);
      }
      
     }
      fetchdata();

      const interval = setInterval(fetchdata, 20000);

      // Clean up the interval on component unmount
      return () => {
        clearInterval(interval);
      };
    
    }, [])

    //handles sort for columns
  const handleSort = (column) => {
    if (column === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };
  //Handling Team click to expand team
  const handleTeamClick = (team) => {
    setExpandedTeam(team);
  };
  //Handles rendering test cases for for leaderboard
  const renderTestCases = (team) => {
    return team.scores.map((score, index) => (
      <TableCell key={index}  style = {{color:props.teamid === team.id ?  "#000000" : "#ffffff"}}>{score ? score : "--"}</TableCell>
    ));
  };
//Hanfles finding the aggregate across all test case scores
  const findAgregate = (team) => {
    return team.scores.reduce((acc, curr) => curr === null || curr === -1 ? acc : acc + curr, 0)
    
  }

//Handles rendering teams into the leaderboard by rank
  const renderTeams = () => {
    const rankedTeams = [...teams].sort((a, b) => {
      const scoreA = findAgregate(a);
      const scoreB = findAgregate(b);

      if (scoreA < scoreB) return 1
      if (scoreA > scoreB) return -1
    })
//Creating Teams by ranks
    const teamsWithRanks = Array(rankedTeams.length);

    let currentScore = -1;
    let currentRank = -1;
    for (let i = 0; i < rankedTeams.length; i++){
      const currentAggregate = findAgregate(rankedTeams[i])
      if (currentAggregate < currentScore || currentScore === -1){
        currentScore = currentAggregate
        currentRank += 1
      }

      teamsWithRanks[i] = {...rankedTeams[i], rank: currentRank}
    }

    //Handling sorting leaderboard by aggregate
    const sortedTeams = [...teamsWithRanks].sort((a, b) => {
      let aValue,bValue
      if (sortBy === "aggregate") {
         aValue=findAgregate(a)
         bValue=findAgregate(b)
    //Handling sorting leaderboard by testCase   
      }else if (sortBy.slice(0,-1) === "testcase"){
        const num=parseInt(sortBy.slice(-1))
        aValue=a.scores[num]
        bValue=b.scores[num]  
      }
      else{
        aValue = a[sortBy];
        bValue = b[sortBy]; 
      }
       //Handling sorted in ascending or descending
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      
      return 0;
    });
    
    return sortedTeams.map((team, index) => (
      <React.Fragment key={index}>
        <TableRow style = {{backgroundColor : props.teamid === team.id ?  "#EEEB3B" : "inherit", color: "#000000"}} onClick={() => handleTeamClick(team)}>
          <TableCell style = {{color:props.teamid === team.id ?  "#000000" : "#ffffff"}}>{team.rank}</TableCell>
        <TableCell  style = {{color:props.teamid === team.id ?  "#000000" : "#ffffff"}}>{team.teamname}</TableCell>
          <TableCell  style = {{color:props.teamid === team.id ?  "#000000" : "#ffffff"}}>{team.location ? team.location : "--"}</TableCell>
          {renderTestCases(team)}
          <TableCell  style = {{color:props.teamid === team.id ?  "#000000" : "#ffffff"}}>{findAgregate(team)}</TableCell>
          
          
        </TableRow>
      </React.Fragment>
    ));
  };

  return (
    <ThemeProvider theme= {darkTheme}>
      <CssBaseline/>
      <Box sx = {{m : 3}}> 
      <Typography  variant= "h1"  style = {{ fontSize: 30, fontStyle: 'bold', color: "#6ded8a", margin: 10 , fontFamily: 'Arcade'}}>
          LEADERBOARD
         </Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead style={{backgroundColor: "#0000ff"}}>
          <TableRow >
            <TableCell style={{fontFamily: 'Arcade'}}>
            <TableSortLabel
                active={sortBy === 'aggregate'}
                direction={sortOrder}
                onClick={() => handleSort('aggregate')}
              >
                <LeaderboardIcon/>
                Rank
              </TableSortLabel>
            </TableCell>
          <TableCell style={{fontFamily: 'Arcade'}}>
              <TableSortLabel
                active={sortBy === 'teamname'}
                direction={sortOrder}
                onClick={() => handleSort('teamname')}
              >
                Team Name
              </TableSortLabel>
            </TableCell>
            <TableCell style={{fontFamily: 'Arcade'}}>
              <TableSortLabel
                active={sortBy === 'location'}
                direction={sortOrder}
                onClick={() => handleSort('location')}
              >
                <LocationOn/>
                Location
              </TableSortLabel>
            </TableCell >
            {Array(num_tests).fill(null).map((val,index) => ( <TableCell style={{fontFamily: 'Arcade'}}><TableSortLabel
              
               active={sortBy === 'testcase'+index}
                direction={sortOrder}
                onClick={() => handleSort('testcase'+index)}
              >
                Test case {index+1}
              </TableSortLabel> </TableCell>))}
            <TableCell style={{fontFamily: 'Arcade'}}>
              <TableSortLabel
                active={sortBy === 'aggregate'}
                direction={sortOrder}
                onClick={() => handleSort('aggregate')}
              >
                <Scoreboard/>
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
