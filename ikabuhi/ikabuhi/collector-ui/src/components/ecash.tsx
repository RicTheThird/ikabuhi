import React from 'react';
import { Box, Typography, TextField, MenuItem, Card, CardContent, Button } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const eCashPayments = [
  {
    name: 'Helena Magpantay',
    clientNo: 'U123623173',
    description: 'Submit E-Payment form for her transaction in 12/24/2024',
  },
  {
    name: 'Helena Magpantay',
    clientNo: 'U123623173',
    description: 'Submit E-Payment form for her transaction in 12/24/2024',
  },
  {
    name: 'Helena Magpantay',
    clientNo: 'U123623173',
    description: 'Submit E-Payment form for her transaction in 12/24/2024',
  },
];

const MemberECashPayment = () => {
  return (
    <Box sx={{ padding: 4, backgroundColor: '#f8f4f4', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
          E-CASH PAYMENT
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField label="Date" type="date" InputLabelProps={{ shrink: true }} variant="outlined" sx={{ width: '20%' }} />
        <TextField label="Week" variant="outlined" select sx={{ width: '20%' }}>
          <MenuItem value="Week 1">Week 1</MenuItem>
          <MenuItem value="Week 2">Week 2</MenuItem>
        </TextField>
        <TextField label="PL" variant="outlined" select sx={{ width: '20%' }}>
          <MenuItem value="PL-1">PL-1</MenuItem>
          <MenuItem value="PL-2">PL-2</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" sx={{ height: '56px', width: '15%' }}>Submit</Button>
      </Box>
      <Box display="flex" justifyContent="space-around" flexWrap="wrap" gap={2}>
        {eCashPayments.map((payment, index) => (
          <Card key={index} variant="outlined" sx={{ width: '300px', textAlign: 'center', padding: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                {payment.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {payment.clientNo} {payment.description}
              </Typography>
              <Box mt={2}>
                <Button variant="contained" color="primary" startIcon={<InsertDriveFileIcon />} sx={{ marginRight: 1 }}>
                  View E-Payment Form
                </Button>
                <Button variant="contained" color="warning">
                  Notify
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MemberECashPayment;
