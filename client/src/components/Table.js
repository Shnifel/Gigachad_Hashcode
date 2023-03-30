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
    const rows = props.rows
    const labels = props.labels
    const title = props.title

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
                {labels.map((label) => (
                    <TableCell> {row[label]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See more orders
        </Link>
      </React.Fragment>
    );
  }