import React from 'react';
import { Box, Typography, Paper, Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {

  const navigate = useNavigate();
  const transactions = [
    {
      date: '02-24-2024',
      transactionNo: 15,
      savings: {
        deposit: 69.55,
        balance: 8065.09,
      },
      loanPayment: {
        installmentNo: 15,
        amountPaid: 1000,
        newLoanBalance: 26000,
      },
    },
    {
      date: '02-17-2024',
      transactionNo: 14,
      savings: {
        deposit: 69.55,
        balance: 8065.09,
      },
      loanPayment: {
        installmentNo: 14,
        amountPaid: 1000,
        loanBalance: 27000,
      },
    },
    // Add more transactions as needed
  ];

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
        Your recent borrowed Loan amounting <b>30,000.00</b> will process 23 transactions
      </Typography>

      {/* Transactions List */}
      {transactions.map((transaction, index) => (
        <Paper key={index} elevation={3} sx={{ padding: 2, mb: 3, width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ArrowBackIcon sx={{ color: '#ff8c00', mr: 1 }} />
              <Typography variant="h6">{transaction.date}</Typography>
            </Box>
            <Typography variant="body2" fontWeight="bold">
              Transaction No.: {transaction.transactionNo}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1, mb: { xs: 2, sm: 0 } }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Savings
              </Typography>
              <Typography variant="body2">Savings/CBU Deposit: {transaction.savings.deposit}</Typography>
              <Typography variant="body2">New Savings Balance: {transaction.savings.balance}</Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mx: 2, display: { xs: 'none', sm: 'block' } }} />
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                Loan Payment
              </Typography>
              <Typography variant="body2">Installment No.: {transaction.loanPayment.installmentNo}</Typography>
              <Typography variant="body2">Amount Paid: {transaction.loanPayment.amountPaid}</Typography>
              <Typography variant="body2">New Loan Balance: {transaction.loanPayment.newLoanBalance}</Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default TransactionHistory;