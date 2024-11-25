import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { applyWithdrawal, getMyDetails } from "../services/apiService";
import { Payments, SnackbarAlert } from "../services/interfaces";
const defaultFormValues = {
  amountToWithdraw: 0,
  withdrawalPaymentDate: dayjs().format('YYYY-MM-DD'),
}

const Withdrawal = () => {

  const navigate = useNavigate();
  const [myDetails, setMyDetails] = useState<any>(null);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [loading, setLoading] = useState(false); // Loading state
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState<SnackbarAlert>();

  useEffect(() => {
    getMyDetailsAsync()
  }, []);

  const getMyDetailsAsync = async () => {
    const response = await getMyDetails();
    setMyDetails(response)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date: any) => {
    setFormValues({
      ...formValues,
      withdrawalPaymentDate: date,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const savings = myDetails?.memberSavings[0]?.runningSavingsAmount ?? 0;

    if (savings <= 0) {
      setAlert({ success: false, message: "Insufficient funds." })
      setSnackOpen(true)
      return;
    }

    if (formValues.amountToWithdraw <= 0) {
      setAlert({ success: false, message: "Invalid withdraw amount. Amount should be greater than 0" })
      setSnackOpen(true)
      return;
    }

    if (formValues.amountToWithdraw > Number(savings)) {
      setAlert({ success: false, message: "Invalid withdraw amount. Make sure you have enough savings funds." })
      setSnackOpen(true)
      return;
    }

    const amountAfterWithdraw = Number(savings) - formValues.amountToWithdraw;
    const maintain = getMaintainingBalance();
    if (maintain > amountAfterWithdraw) {
      setAlert({ success: false, message: "Invalid withdraw amount. Please check your maintaining balance" })
      setSnackOpen(true)
      return;
    }

    setLoading(true)
    try {
      formValues.withdrawalPaymentDate = dayjs(formValues.withdrawalPaymentDate).format('YYYY-MM-DD')
      const response: any = await applyWithdrawal(formValues)
      if (response.status === 202) {
        setAlert({ success: true, message: "Withdrawal application submitted!" })
        setFormValues(defaultFormValues)
        //navigate(`/home`)
      } else {
        setAlert({ success: false, message: response.response.data })
      }
    } catch (error) {
      console.log(error)
      setAlert({ success: false, message: "Process failed. Please try again later." })
    } finally {
      setSnackOpen(true)
      setLoading(false)
    }
  };

  const getMaintainingBalance = (): number => {
    const totalLoan = myDetails?.memberLoans.find((m: any) => m.isActive === true)?.totalLoanAmount ?? 0;
    if (totalLoan > 0)
      return totalLoan * 0.2;
    else
      return totalLoan;
  }

  const disableNonPaymentDates = (date: any) => {
    const paidDates = myDetails?.payments.map((m: Payments) => dayjs(m.paymentDate).format('YYYY-MM-DD'))
    if (paidDates) {
      return paidDates.includes(dayjs(date).format('YYYY-MM-DD')) || dayjs(date).get('day') !== myDetails?.group?.meetingDay
    } else {
      return dayjs(date).get('day') !== myDetails?.group?.meetingDay
    }
  }


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
            {myDetails?.accountNo}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Account Name:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {myDetails?.lastName}, {myDetails?.firstName}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Group Name:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {myDetails?.group.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Address:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {myDetails?.brgy}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Branch:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {myDetails?.municipality}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2">Last Principal Loan:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            ₱{myDetails?.memberLoans.find((m: any) => m.isActive === true)?.totalLoanAmount.toFixed(2) ?? 0.00}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body2">Savings Balance:</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            ₱{myDetails?.memberSavings && myDetails?.memberSavings.length > 0 ? myDetails?.memberSavings[0].runningSavingsAmount.toFixed(2) : 0.00}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Amount to Withdraw"
            fullWidth
            variant="outlined"
            name="amountToWithdraw"
            value={formValues.amountToWithdraw}
            onChange={handleInputChange}
            required
            sx={{ mb: 3 }}
            helperText={`Maintaining Saving Balance to Withdraw: ₱${getMaintainingBalance().toFixed(2)}`}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date for next payment Transaction"
              value={dayjs(formValues.withdrawalPaymentDate)}
              onChange={handleDateChange}
              minDate={dayjs()}
              shouldDisableDate={disableNonPaymentDates}
              format='YYYY-MM-DD'
              slots={{
                textField: (textFieldProps) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="nextPaymentDate"
                    required
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
            type="submit"
            sx={{
              backgroundColor: "#ff8c00",
              color: "#fff",
              fontWeight: "bold",
              mt: 3,
            }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}>
            Apply
          </Button>
        </form>
      </Paper>

      <Snackbar
        open={snackOpen}
        autoHideDuration={10000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackOpen(false)} severity={alert?.success ? "success" : "error"} sx={{ width: '100%' }}>
          {alert?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Withdrawal;
