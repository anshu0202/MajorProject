import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
} from '@mui/material';

function CreateTest() {
  const subjects = [
    {
      name: 'Maths',
      id: '1',
    },
    {
      name: 'Physics',
      id: '2',
    },
    {
      name: 'English',
      id: '3',
    },
    {
      name: 'Chemistry',
      id: '4',
    },
    {
      name: 'History',
      id: '5',
    },
    {
      name: 'SST',
      id: '6',
    },
  ];

  return (
    <>
      {/* <h1>Create CreateTest</h1> */}

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Subject ID</TableCell>
                  <TableCell>Create Test</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>{subject.id}</TableCell>
                    <TableCell>
                      <Button variant='contained' color='success'>
                        Create 
                      </Button>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default CreateTest;
