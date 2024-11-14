import React from "react";
import { Box, Typography, IconButton, Paper, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SavingsIcon from "@mui/icons-material/Savings";
import { useNavigate } from "react-router-dom";

const Savings = () => {

  const navigate = useNavigate();
  const recentTransactions = [
    "Hi MARITES! U1750516, PHP 50.00 is deposited to your savings on 03/07/2024. Your Loan Balance in Lifebank is 5,600.00. Thank you.",
    "Hi MARITES! U1750516, PHP 50.00 is deposited to your savings on 03/07/2024. Your Loan Balance in Lifebank is 5,600.00. Thank you.",
    "Hi MARITES! U1750516, PHP 50.00 is deposited to your savings on 03/07/2024. Your Loan Balance in Lifebank is 5,600.00. Thank you.",
  ];

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
          ₱ 6,850.00
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
        <Typography
          variant="body2"
          sx={{ color: "#ff8c00", cursor: "pointer" }}
        >
          Clear All
        </Typography>
      </Box>

      {recentTransactions.map((transaction, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{ padding: 2, mb: 2, width: "100%" }}
        >
          <Typography variant="body2">{transaction}</Typography>
        </Paper>
      ))}
    </Box>
  );
};

export default Savings;
