import React from 'react';
import { Box, Typography, TextField, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const weeks = [
  { weekNo: 'Week 1', withdrawals: '', savings: '', loan: '', total: '' },
  { weekNo: 'Week 2', withdrawals: '', savings: '', loan: '', total: '' },
  { weekNo: 'Week 3', withdrawals: '', savings: '', loan: '', total: '' },
  { weekNo: 'Week 4', withdrawals: '', savings: '', loan: '', total: '' },
  { weekNo: 'Week 5', withdrawals: '', savings: '', loan: '', total: '' },
];

const MemberTransactionsReport = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f8f4f4', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
          DAY 1: 8:00AM
        </Typography>
        <Typography variant="h6">GROUP NAME:</Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField label="Month" variant="outlined" select sx={{ width: '20%' }}>
          <MenuItem value="January">January</MenuItem>
          <MenuItem value="February">February</MenuItem>
          <MenuItem value="March">March</MenuItem>
          <MenuItem value="April">April</MenuItem>
          <MenuItem value="May">May</MenuItem>
          <MenuItem value="June">June</MenuItem>
          <MenuItem value="July">July</MenuItem>
          <MenuItem value="August">August</MenuItem>
          <MenuItem value="September">September</MenuItem>
          <MenuItem value="October">October</MenuItem>
          <MenuItem value="November">November</MenuItem>
          <MenuItem value="December">December</MenuItem>
        </TextField>
      </Box>
      <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Week No.</TableCell>
              <TableCell>Withdrawals</TableCell>
              <TableCell>Savings</TableCell>
              <TableCell>Loan</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weeks.map((week, index) => (
              <TableRow key={index}>
                <TableCell>{week.weekNo}</TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" sx={{ width: '100px' }} />
                </TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" sx={{ width: '100px' }} />
                </TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" sx={{ width: '100px' }} />
                </TableCell>
                <TableCell>
                  <TextField variant="outlined" size="small" sx={{ width: '100px' }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MemberTransactionsReport;
