import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function preventDefault(event) {
    event.preventDefault();
  }
  
  export default function DisplayTable(props) {
    const rows = props.rows;
    const labels = props.labels;
    const title = props.title;
    const cols = props.cols;

    return (
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow>
             {labels.map((label) => (
                <TableCell> {label} </TableCell>
             ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {cols.map((col) => (
                    <TableCell key = {row.id + col}> {row[col]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }