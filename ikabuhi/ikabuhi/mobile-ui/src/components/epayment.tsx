import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const EPayment = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState("");
  const [savingsAmount, setSavingsAmount] = useState("");
  const [date, setDate] = useState<any>(dayjs());
  const [file, setFile] = useState(null);

  const handleLoanAmountChange = (event: any) => {
    setLoanAmount(event.target.value);
  };

  const handleSavingsAmountChange = (event: any) => {
    setSavingsAmount(event.target.value);
  };

  const handleDateChange = (newDate: any) => {
    setDate(newDate);
  };

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
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
          <ArrowBackIcon sx={{ color: "#ff8c00" }} />
        </IconButton>
        <Typography variant="h5" sx={{ color: "#ff8c00", textAlign: "left" }}>
          E-Payment
        </Typography>
      </Box>

      {/* Account Information Section */}
      <Paper elevation={3} sx={{ width: "100%", padding: 2, mb: 3 }}>
        <Typography variant="body1" fontWeight="bold">
          Account No.:{" "}
          <Typography variant="body1" component="span">
            HG128492613
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Account Name:{" "}
          <Typography variant="body1" component="span">
            Dela Cruz, Juana
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Address:{" "}
          <Typography variant="body1" component="span">
            Boot Tanauan City
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Current Loan Balance:{" "}
          <Typography variant="body1" component="span">
            17,200.00
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Collector's Name:{" "}
          <Typography variant="body1" component="span">
            Junard Cy
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Branch:{" "}
          <Typography variant="body1" component="span">
            Tanauan
          </Typography>
        </Typography>
      </Paper>

      {/* Payment Form Section */}
      <TextField
        label="Amount to Pay in Loan"
        variant="outlined"
        fullWidth
        value={loanAmount}
        onChange={handleLoanAmountChange}
      />
      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <Typography variant="caption">Weekly Payment: 1,000.00</Typography>
      </Box>

      <TextField
        label="Amount to Pay in Savings"
        variant="outlined"
        fullWidth
        value={savingsAmount}
        onChange={handleSavingsAmountChange}
      />
      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <Typography variant="caption">Minimum Savings: 50.00</Typography>
      </Box>
      <Box sx={{ width: "100%", marginBottom: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            onChange={handleDateChange}
            slots={{
              textField: (textFieldProps) => (
                <TextField fullWidth required {...textFieldProps} />
              ),
            }}
          />
        </LocalizationProvider>
      </Box>

      {/* Upload Section */}
      <Typography variant="body2" sx={{ mb: 2 }}>
        Upload the e-receipt below for proof of payment
      </Typography>
      <Button
        variant="outlined"
        component="label"
        fullWidth
        startIcon={<UploadFileIcon />}
        sx={{ mb: 3 }}
      >
        Upload image/file
        <input type="file" hidden onChange={handleFileChange} />
      </Button>

      {/* Proceed Button */}
      <Button
        variant="contained"
        fullWidth
        sx={{ backgroundColor: "#ff8c00", color: "#fff" }}
      >
        Proceed
      </Button>
    </Box>
  );
};

export default EPayment;
