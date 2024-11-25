import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { getMyDetails, postPayment } from "../services/apiService";
import { Member, SnackbarAlert } from "../services/interfaces";

const defaultFormValues = {
  savingsPayment: 0,
  loanPayment: 0,
  paymentDate: dayjs().format('YYYY-MM-DD'),
  receiptFile: null
}

const EPayment = () => {
  const navigate = useNavigate();
  const [myDetails, setMyDetails] = useState<Member>();
  const [loading, setLoading] = useState(false); // Loading state
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState<SnackbarAlert>();
  const [formValues, setFormValues] = useState(defaultFormValues);

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

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setFormValues({
        ...formValues,
        [e.target.name]: e.target.files[0]
      })
    }
  }

  const handleDateChange = (date: any) => {
    setFormValues({
      ...formValues,
      paymentDate: date,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      formValues.paymentDate = dayjs(formValues.paymentDate).format('YYYY-MM-DD')
      const response: any = await postPayment(formValues)
      if (response.status === 202) {
        setAlert({ success: true, message: "Payment successfully submitted!" })
        setFormValues(defaultFormValues)
        getMyDetailsAsync()
      } else {
        setAlert({ success: false, message: response.response.data })
      }
    } catch (error) {
      console.log(error)
      setAlert({ success: false, message: "Payment failed. Please try again later." })
    } finally {
      setSnackOpen(true)
      setLoading(false)
    }
  };

  const disableNonPaymentDates = (date: any) => {
    const paidDates = myDetails?.payments.map(m => dayjs(m.paymentDate).format('YYYY-MM-DD'))
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
          <ArrowBackIcon sx={{ color: "#ff8c00" }} />
        </IconButton>
        <Typography variant="h5" sx={{ color: "#ff8c00", textAlign: "left" }}>
          E-Payment
        </Typography>
      </Box>

      {/* Account Information Section */}
      <Paper elevation={3} sx={{ width: "-webkit-fill-available", padding: 2, mb: 3 }}>
        <Typography variant="body1" fontWeight="bold">
          Account No.:{" "}
          <Typography variant="body1" component="span">
            {myDetails?.accountNo}
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Account Name:{" "}
          <Typography variant="body1" component="span">
            {myDetails?.lastName}, {myDetails?.firstName}
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Address:{" "}
          <Typography variant="body1" component="span">
            {myDetails?.brgy}, {myDetails?.municipality} City
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Current Loan Balance:{" "}
          <Typography variant="body1" component="span">
            ₱{myDetails?.memberLoans.find((m: any) => m.isActive === true)?.loanBalance.toFixed(2) ?? 0.00}
          </Typography>
        </Typography>
        {/* <Typography variant="body1" fontWeight="bold">
          Collector's Name:{" "}
          <Typography variant="body1" component="span">
            Junard Cy
          </Typography>
        </Typography> */}
        <Typography variant="body1" fontWeight="bold">
          Branch:{" "}
          <Typography variant="body1" component="span">
            Tanauan
          </Typography>
        </Typography>
      </Paper>

      <form onSubmit={handleSubmit}>
        {/* Payment Form Section */}
        <TextField
          label="Amount to Pay in Loan"
          variant="outlined"
          fullWidth
          name="loanPayment"
          type="number"
          value={formValues.loanPayment}
          onChange={handleInputChange}
        />
        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <Typography variant="caption">Weekly Payment: ₱{myDetails?.memberLoans?.find((m: any) => m.isActive === true)?.weeklyPayment.toFixed(2) ?? 0.00}</Typography>
        </Box>

        <TextField
          label="Amount to Pay in Savings"
          variant="outlined"
          fullWidth
          name="savingsPayment"
          value={formValues.savingsPayment}
          onChange={handleInputChange}
        />
        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <Typography variant="caption">Minimum Savings: ₱50.00</Typography>
        </Box>
        <Box sx={{ width: "100%", marginBottom: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={dayjs(formValues.paymentDate)}
              minDate={dayjs()}
              onChange={handleDateChange}
              shouldDisableDate={disableNonPaymentDates}
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
        {!formValues.receiptFile && (
          <Typography variant='button' color='#d32f2f' sx={{ marginLeft: 1 }}>
            No file uploaded
          </Typography>
        )}
        {formValues.receiptFile && (
          <Typography variant='button' sx={{ marginLeft: 1 }}>
            Attached: <strong>{formValues.receiptFile['name']}</strong>
          </Typography>
        )}
        <Button
          variant="outlined"
          component="label"
          fullWidth
          startIcon={<UploadFileIcon />}
          sx={{ mb: 3 }}
        >
          Upload image/file
          <input type="file" name="receiptFile" hidden onChange={handleFileSelected} />
        </Button>

        <br />
        {/* Proceed Button */}
        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ backgroundColor: "#ff8c00", color: "#fff" }}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Proceed Payment
        </Button>
      </form>
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

export default EPayment;
