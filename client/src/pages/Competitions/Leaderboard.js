import React, { useState } from 'react';
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
} from '@mui/material';

const Leaderboard = ({ teams }) => {
  const [expandedTeam, setExpandedTeam] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('location');

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
    return team.testCases.map((score, index) => (
      <TableCell key={index}>{score}</TableCell>
    ));
  };

  const renderTeams = () => {
    const sortedTeams = [...teams].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sortedTeams.map((team, index) => (
      <React.Fragment key={index}>
        <TableRow onClick={() => handleTeamClick(team)}>
          <TableCell>{team.location}</TableCell>
          {renderTestCases(team)}
          <TableCell>{team.aggregate}</TableCell>
          <TableCell>{team.timeTaken}</TableCell>
        </TableRow>
        <Collapse in={team === expandedTeam}>
          <Box px={4} pb={2}>
            <Typography variant="subtitle2">More details for {team.location}</Typography>
            {/* Additional rows with more details */}
          </Box>
        </Collapse>
      </React.Fragment>
    ));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'location'}
                direction={sortOrder}
                onClick={() => handleSort('location')}
              >
                Location
              </TableSortLabel>
            </TableCell>
            {/* Render test case columns */}
            <TableCell>
              <TableSortLabel
                active={sortBy === 'aggregate'}
                direction={sortOrder}
                onClick={() => handleSort('aggregate')}
              >
                Aggregate
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === 'timeTaken'}
                direction={sortOrder}
                onClick={() => handleSort('timeTaken')}
              >
                Time Taken
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderTeams()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
