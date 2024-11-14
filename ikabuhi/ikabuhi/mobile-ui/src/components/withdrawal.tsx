import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

const Withdrawal = () => {

  const navigate = useNavigate();
  const [withdrawalSlip, setWithdrawalSlip] = useState({
    accountNo: "HG2138131834R",
    accountName: "Elenea Rosales",
    groupName: "Good Girls",
    address: "Balete Tanauan City",
    branch: "Tanauan",
    lastPrincipalLoan: "10,000.00",
    savingsBalance: "5,500.00",
    amountToWithdraw: "",
    nextPaymentDate: null,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setWithdrawalSlip({ ...withdrawalSlip, [name]: value });
  };

  const handleDateChange = (date: any) => {
    setWithdrawalSlip({ ...withdrawalSlip, nextPaymentDate: date });
  };

  return (
    <Box
      sx={{
        padding: 2,

        paddingTop: 0,
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
          justifyContent: "left",
          alignItems: "center",
          mb: 2,
          backgroundColor: "#002855",
          padding: 2,
        }}
      >
        <IconButton onClick={() => navigate('/home')}>
          <ArrowBackIcon sx={{ color: "#fff" }} />
        </IconButton>
        <Typography variant="h5" sx={{ color: "#fff", textAlign: "center" }}>
          Apply for Withdraw?
        </Typography>
      </Box>

      <Typography variant="body1" sx={{ mb: 2, textAlign: "center" }}>
        Fill-out the Withdrawal Slip below and click APPLY
      </Typography>

      {/* Withdrawal Slip Section */}
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          width: "100%",
          mb: 3,
          border: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Typography variant="h6" sx={{ color: "#ff8c00", mb: 2 }}>
          Withdrawal Slip
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Account No.:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {withdrawalSlip.accountNo}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Account Name:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {withdrawalSlip.accountName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Group Name:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {withdrawalSlip.groupName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Address:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {withdrawalSlip.address}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Branch:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {withdrawalSlip.branch}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Last Principal Loan:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {withdrawalSlip.lastPrincipalLoan}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body2">Savings Balance:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {withdrawalSlip.savingsBalance}
          </Typography>
        </Box>

        <TextField
          label="Amount to Withdraw"
          fullWidth
          variant="outlined"
          name="amountToWithdraw"
          value={withdrawalSlip.amountToWithdraw}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
          helperText="Maintaining Saving Balance to Withdraw: 500"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date for next payment Transaction"
            value={withdrawalSlip.nextPaymentDate}
            onChange={handleDateChange}
            slots={{
              textField: (textFieldProps) => (
                <TextField
                  fullWidth
                  variant="outlined"
                  name="nextPaymentDate"
                  sx={{ mb: 3 }}
                  {...textFieldProps}
                  InputProps={{
                    endAdornment: (
                      <IconButton>
                        <CalendarMonthIcon sx={{ color: "#ff8c00" }} />
                      </IconButton>
                    ),
                  }}
                />
              ),
            }}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#ff8c00",
            color: "#fff",
            fontWeight: "bold",
            mt: 3,
          }}
        >
          Apply
        </Button>
      </Paper>
    </Box>
  );
};

export default Withdrawal;
