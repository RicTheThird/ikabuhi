import React, { useEffect, useState } from "react";
import { Box, Typography, IconButton, Paper, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SavingsIcon from "@mui/icons-material/Savings";
import { useNavigate } from "react-router-dom";
import { getMyDetails } from "../services/apiService";
import dayjs from "dayjs";

const Savings = () => {

  const navigate = useNavigate();
  const [myDetails, setMyDetails] = useState<any>(null);
  const [recentTransaction, setRecentTransaction] = useState<any>(null);

  useEffect(() => {
    getMyDetailsAsync()
  }, []);

  const getMyDetailsAsync = async () => {
    const response = await getMyDetails();
    setRecentTransaction(response?.transactions);
    setMyDetails(response)
  }

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8f4f4",
        minHeight: "100vh",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          //   backgroundColor: '#ff8c00',
          padding: 2,
          borderRadius: 2,
        }}
      >
        <IconButton onClick={() => navigate('/home')}>
          <ArrowBackIcon sx={{ color: "#ff8c00" }} />
        </IconButton>
      </Box>

      <SavingsIcon sx={{ color: "#ff8c00", fontSize: 100, mb: 2 }} />

      {/* Savings Balance Section */}
{/* 
      <Typography variant="h5" sx={{ color: "black", textAlign: "left" }}>
        Hi, Marites!
      </Typography> */}
      <Box
        sx={{
          backgroundColor: "#ff8c00",
          padding: 2,
          width: "100%",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ color: "#fff" }}>
          Your Total Savings
        </Typography>
        <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
          ₱ {myDetails?.memberSavings && myDetails?.memberSavings.length > 0 ? myDetails?.memberSavings[0].runningSavingsAmount.toFixed(2) : 0.00 }
        </Typography>
      </Box>

      <Divider sx={{ width: "100%", mb: 2 }} />

      {/* Recent Transactions Section */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Typography variant="h6">Recent Savings Transaction</Typography>
        {/* <Typography
          variant="body2"
          sx={{ color: "#ff8c00", cursor: "pointer" }}
        >
          Clear All
        </Typography> */}
      </Box>

      {recentTransaction && recentTransaction.map((transaction : any, index: number) => (
        <Paper
          key={index}
          elevation={3}
          sx={{ padding: 2, mb: 2, width: "100%" }}
        >
          <Typography variant="body2">PHP {transaction?.saveAmount.toFixed(2)} is deposited to your savings on {dayjs(transaction?.transactionDate).format('YYYY-MM-DD')}. 
          {transaction?.status === 'Pending'? 'Your new savings will reflect after we approve this transaction.': '' }</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Savings;
