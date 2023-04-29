import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

const Leaderboard = ({ teams }) => {
  const [sortConfig, setSortConfig] = useState({ field: null, direction: 'asc' });

  const handleSort = (field) => {
    let direction = 'asc';
    if (sortConfig.field === field && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ field, direction });
  };

  const sortedTeams = [...teams].sort((a, b) => {
    if (sortConfig.field) {
      const fieldA = a[sortConfig.field];
      const fieldB = b[sortConfig.field];
      if (fieldA < fieldB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={sortConfig.field === 'name'}
              direction={sortConfig.field === 'name' ? sortConfig.direction : 'asc'}
              onClick={() => handleSort('name')}
            >
              Team
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortConfig.field === 'scores'}
              direction={sortConfig.field === 'scores' ? sortConfig.direction : 'asc'}
              onClick={() => handleSort('scores')}
            >
              Scores
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortConfig.field === 'totalScore'}
              direction={sortConfig.field === 'totalScore' ? sortConfig.direction : 'asc'}
              onClick={() => handleSort('totalScore')}
            >
              Total Score
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <TableSortLabel
              active={sortConfig.field === 'location'}
              direction={sortConfig.field === 'location' ? sortConfig.direction : 'asc'}
              onClick={() => handleSort('location')}
            >
              Location
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedTeams.map((team) => (
          <TableRow key={team.name}>
            <TableCell>{team.name}</TableCell>
            <TableCell>{team.scores.join(', ')}</TableCell>
            <TableCell>{team.totalScore}</TableCell>
            <TableCell>{team.location}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Leaderboard;
