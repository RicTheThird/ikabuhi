import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { getMyDetails } from '../services/apiService';
import dayjs from 'dayjs';
import { Label } from '@mui/icons-material';
import { Member, Payments } from '../services/interfaces';

const TransactionHistory = () => {

  const navigate = useNavigate();
  const [myDetails, setMyDetails] = useState<Member>();
  const [recentTransactions, setRecentTransaction] = useState<Payments[]>([]);

  useEffect(() => {
    getMyDetailsAsync()
  }, []);

  const getMyDetailsAsync = async () => {
    const response = await getMyDetails();
    setRecentTransaction(response?.payments);
    setMyDetails(response)
  }
  
  return (
    <Box
      sx={{
        padding: 2,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f8f4f4',
        minHeight: '100vh',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          mb: 2,
          backgroundColor: '#002855',
          padding: 2,
        }}
      >
        <IconButton onClick={() => navigate('/home')}>
          <ArrowBackIcon sx={{ color: '#ff8c00' }} />
        </IconButton>
        <Typography variant="h5" sx={{ color: '#ff8c00', textAlign: 'left' }}>
          Your Transaction
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Your recent borrowed Loan amounting <b>₱{myDetails?.memberLoans.find((m: any) => m.isActive === true && m.status === 'Approved')?.totalLoanAmount.toFixed(2) ?? 0.00}</b> 
        {" "} will process <strong>{myDetails?.memberLoans.find((m: any) => m.isActive === true && m.status === 'Approved')?.productLoan?.transactions ?? 0}</strong> transactions
      </Typography>

      {/* Transactions List */}
      {recentTransactions && recentTransactions.map((payment : Payments, index: number) => (
        <Paper key={index} elevation={3} sx={{ padding: 2, mb: 3, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* <ArrowBackIcon sx={{ color: '#ff8c00', mr: 1 }} /> */}
              <Typography variant="body1">{dayjs(payment.paymentDate).format('YYYY-MM-DD')}</Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold">
              Transaction No.: {recentTransactions.length - index}
            </Typography>
          </Box>
          {/* <Typography color={transaction.status == 'Pending' ? 'warning' : 'info'} variant='caption'>Status: {transaction.status}</Typography> */}
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Savings
              </Typography>
              <Typography variant="body2">Savings/CBU Deposit: ₱ {payment.savingsPayment?.toFixed(2) ?? 0}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: 'none', sm: 'block' } }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Loan Payment
              </Typography>
              <Typography variant="body2">Amount Paid: ₱ {payment.loanPayment?.toFixed(2) ?? 0}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: 'none', sm: 'block' } }} />
            <Box sx={{ flex: 1, mt: 2 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Withdrawal
              </Typography>
              <Typography variant="body2">Amount: ₱ {payment.withdrawalAmount?.toFixed(2) ?? 0}</Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default TransactionHistory;