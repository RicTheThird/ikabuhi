import React from 'react';
import { Box, Typography, TextField, MenuItem, Card, CardContent, Button, Grid } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const pendingLoans = [
  {
    name: 'Helena Magpantay',
    clientNo: 'U1223623173',
    description: 'apply Loan Application in her next loan on 02/25/2024',
  },
  {
    name: 'Helena Magpantay',
    clientNo: 'U1223623173',
    description: 'apply Loan Application in her next loan on 02/25/2024',
  },
  {
    name: 'Helena Magpantay',
    clientNo: 'U1223623173',
    description: 'apply Loan Application in her next loan on 02/25/2024',
  },
];

const LoanApplication = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f8f4f4', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
          Pending Regular Project Loan Application
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField label="Group" variant="outlined" select sx={{ width: '20%' }}>
          <MenuItem value="Good Girls">Good Girls</MenuItem>
        </TextField>
        <TextField label="Type of Loan" variant="outlined" select sx={{ width: '20%' }}>
          <MenuItem value="Regular Project Loan">Regular Project Loan</MenuItem>
        </TextField>
      </Box>
      <Grid container spacing={3}>
        {pendingLoans.map((loan, index) => (
          <Grid item key={index} xs={12} md={6} lg={4}>
            <Card variant="outlined" sx={{ padding: 2, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                  {loan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {loan.clientNo} {loan.description}
                </Typography>
                <Box mt={2}>
                  <Button variant="contained" color="primary" startIcon={<InsertDriveFileIcon />} sx={{ marginRight: 1 }}>
                    View Applications Form
                  </Button>
                  <Button variant="contained" color="warning">
                    Approve
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LoanApplication;