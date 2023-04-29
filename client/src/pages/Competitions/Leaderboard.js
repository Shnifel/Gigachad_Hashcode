import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@material-ui/core';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  highlightRow: {
    background: 'blue',
  },
});

const Leaderboard = ({ teams }) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Leaderboard">
        <TableHead>
          <TableRow>
            <TableCell>Team</TableCell>
            <TableCell align="right">Test Case 1</TableCell>
            <TableCell align="right">Test Case 2</TableCell>
            <TableCell align="right">Test Case 3</TableCell>
            <TableCell align="right">Total Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team, index) => (
            <TableRow key={team.name} className={team.isHighlighted ? classes.highlightRow : ''}>
              <TableCell component="th" scope="row">
                {index + 1}. {team.name}
              </TableCell>
              {team.scores.map((score, idx) => (
                <TableCell align="right" key={idx}>
                  {score}
                </TableCell>
              ))}
              <TableCell align="right">{team.totalScore}</TableCell>
            </TableRow>
          ))}
          {teams.length > 1 && (
            <TableRow>
              <TableCell component="th" scope="row">
                ...
              </TableCell>
              <TableCell colSpan={teams[0].scores.length + 1}></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Leaderboard;
