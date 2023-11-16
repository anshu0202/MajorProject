import React from 'react';
import Button from 'react-bootstrap/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  
} from '@mui/material';

import './Test.css'

function AssignTeachers() {
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
     <h1>Assign Teachers here </h1>
    </>
  );
}

export default AssignTeachers;
