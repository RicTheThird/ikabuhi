import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Paper,
  Alert,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Badge,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Groups, Payments, SnackbarAlert, Transaction, Withdrawal } from "../services/interfaces";
import { getECashPaymentsByDate, getGroupById, getMemberWithdrawalByDate, getPaymentsByGroupDate, postPayment, postPayments } from "../services/apiService";
import dayjs from "dayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const MemberTransactions = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [loading, setLoading] = useState(false); // Loading state
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState<SnackbarAlert>();

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = (open: boolean) => {
    setOpenDialog(open);
  };

  const [formSearch, setFormSearch] = useState({
    groupId: groupId,
    paymentDate: dayjs().format('YYYY-MM-DD')
  });

  const [payments, setPayments] = useState<Payments[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [group, setGroup] = useState<Groups>();

  useEffect(() => {
    getGroupDetails();
  }, []);

  const updatePaymentItem = (id: string, key: string, value: string) => {
    const updatedItems = payments.map(item =>
      item.id === id ? { ...item, [key]: Number(value) } : item
    );
    setPayments(updatedItems);
  };

  const getGroupDetails = async () => {
    const response = await getGroupById(groupId || "");
    setGroup(response)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleOpen(true);
  };

  const submitPayment = async () => {

    if (payments.find(p => p.paymentStatus === 'Pending' || p.withdrawalStatus === 'Pending')) {
      setAlert({ success: false, message: "You have a pending payments to review. Please approve / decline to continue" })
      setSnackOpen(true);
      setOpenDialog(false)
      return;
    }


    payments.map(p => {
      p.member = null
      p.memberLoan = null;
      p.memberSavings = null;
    })

    setLoading(true)
    try {
      const response: any = await postPayments(payments)
      if (response.status === 202) {
        setAlert({ success: true, message: "Payment successfully submitted!" })
      } else {
        setAlert({ success: false, message: response?.response?.data ?? "Payments failed to save. Please try again later." })
      }
    } catch (error) {
      console.log(error)
      setAlert({ success: false, message: "Payments failed to save. Please try again later." })
    } finally {
      setSnackOpen(true)
      setLoading(false)
      getPaymentsGroup(formSearch);
      setOpenDialog(false)
    }
  }

  const getPaymentsGroup = async (request: any) => {
    const response = await getPaymentsByGroupDate(request);
    //setPayments(response);
    getECashPaymentsByDateAsync(formSearch, response);
  }

  const getECashPaymentsByDateAsync = async (request: any, payments: Payments[]) => {
    const response = await getECashPaymentsByDate(request)
    const wresponse = await getMemberWithdrawalByDate(request);
    //setTransactions(response);

    if (payments && payments.length > 0) {
      payments.map(p => {
        p.savingsPayment = response?.find((t: Transaction) => t.memberId === p.memberId && t.transactionDate === p.paymentDate && t.status !== 'Declined')?.saveAmount ?? p.savingsPayment ?? 0;
        p.loanPayment = response?.find((t: Transaction) => t.memberId === p.memberId && t.transactionDate === p.paymentDate && t.status !== 'Declined')?.loanPayment ?? p.loanPayment ?? 0;
        p.paymentMethod = response?.find((t: Transaction) => t.memberId === p.memberId && t.transactionDate === p.paymentDate) ? "ECash" : "Cash";
        p.paymentStatus = response?.find((t: Transaction) => t.memberId === p.memberId && t.transactionDate === p.paymentDate)?.status ?? "";
        p.withdrawalAmount = wresponse?.find((t: Withdrawal) => t.memberId === p.memberId && t.withdrawalDateTime === p.paymentDate && t.status !== 'Declined')?.withdrawAmount ?? p.withdrawalAmount ?? 0;
        p.withdrawalStatus = wresponse?.find((t: Withdrawal) => t.memberId === p.memberId && t.withdrawalDateTime === p.paymentDate)?.status ?? "";
      })
      setPayments(payments)
    }

  }

  const handleDateChangeSearch = (date: any) => {
    setFormSearch({
      ...formSearch,
      paymentDate: dayjs(date).format('YYYY-MM-DD'),
    });

    formSearch.paymentDate = dayjs(date).format('YYYY-MM-DD')
    getPaymentsGroup(formSearch);
  };

  const disableNonPaymentDates = (date: any) => dayjs(date).get('day') !== group?.meetingDay


  return (
    <Box sx={{ padding: 4, backgroundColor: "#f8f4f4", minHeight: "100vh" }}>
      <Box mb={4}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
          DAY {group?.meetingDay}: {group?.meetingTime}
        </Typography>
        <Typography variant="h6">GROUP NAME: {group?.name}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        {/* <TextField
          label="Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          sx={{ width: "20%" }}
        /> */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Payment Date"
            value={dayjs(formSearch.paymentDate)}
            minDate={dayjs()}
            shouldDisableDate={disableNonPaymentDates}
            format='YYYY-MM-DD'
            onChange={handleDateChangeSearch}
            slots={{
              textField: (textFieldProps) => (
                <TextField sx={{ width: "30%" }} required {...textFieldProps} />
              ),
            }}
          />
        </LocalizationProvider>
        {/* <TextField label="Week" variant="outlined" select sx={{ width: "20%" }}>
          <MenuItem value="1">Week 1</MenuItem>
          <MenuItem value="2">Week 2</MenuItem>
          <MenuItem value="Week 1">Week 3</MenuItem>
          <MenuItem value="Week 2">Week 4</MenuItem>
          <MenuItem value="Week 2">Week 5</MenuItem>
        </TextField> */}

        {/* <TextField label="PL" variant="outlined" select sx={{ width: "20%" }}>
          <MenuItem value="PL-1">PL-1</MenuItem>
          <MenuItem value="PL-2">PL-2</MenuItem>
        </TextField> */}

        {/* <TextField label="E-CASH" variant="outlined" sx={{ width: "20%" }} /> */}
        <Button
          variant="contained"
          color="info"
          onClick={() => navigate("/home/ecash")}
        >
          E-Cash
        </Button>
      </Box>
      <form onSubmit={handleSubmit}>
        {payments && payments.length > 0 && payments[0].status === 'Submitted' &&
          <Typography color="error">Note: These payments are already submitted.</Typography>}
        <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell> */}
                <TableCell>Account No.</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Loan Product</TableCell>
                <TableCell>Loan Balance</TableCell>
                <TableCell>Current Savings</TableCell>
                {/* <TableCell>OLB (P+I)</TableCell> */}
                <TableCell>Installment Amount</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Loan</TableCell>
                <TableCell>Savings</TableCell>
                <TableCell>Withdrawal</TableCell>
                {/* <TableCell>Total</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {payments && payments.map((payment, index) => (
                <TableRow key={index}>
                  {/* <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell> */}
                  <TableCell>{payment.member?.accountNo}</TableCell>
                  <TableCell>{payment.member?.firstName} {payment.member?.lastName}</TableCell>
                  <TableCell>{payment.memberLoan?.productLoan?.name}</TableCell>
                  <TableCell>{payment.memberLoan?.loanBalance?.toFixed(2) ?? 0} {payment.memberLoan?.status === 'Paid' && <Badge
                    badgeContent="Paid"
                    color="secondary"
                    sx={{
                      marginLeft: "20px"
                    }} 
                    />}</TableCell>
                  <TableCell>₱{payment.memberSavings?.runningSavingsAmount.toFixed(2)}</TableCell>
                  {/* <TableCell>{transaction.olb}</TableCell> */}
                  <TableCell>₱{payment.memberLoan?.weeklyPayment.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color={
                        payment.paymentMethod === "Cash" ? "success" : "info"
                      }
                    >
                      {payment.paymentMethod}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      type="number"
                      name="loanPayment"
                      required
                      value={payment.loanPayment}
                      onChange={(e) => updatePaymentItem(payment.id, "loanPayment", e.target.value)}
                      disabled={payment?.memberLoan?.status === 'Paid'}
                      helperText={payment?.paymentStatus && payment?.paymentStatus !== 'Declined' ? `${payment?.paymentStatus} ECash payment` : ''}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      size="small"
                      fullWidth
                      type="number"
                      name="savingsPayment"
                      required
                      onChange={(e) => updatePaymentItem(payment.id, "savingsPayment", e.target.value)}
                      value={payment.savingsPayment}
                      //disabled={payment?.paymentStatus !== '' ? true : false}
                      helperText={payment?.paymentStatus && payment?.paymentStatus !== 'Declined' ? `${payment?.paymentStatus} ECash payment` : ''}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      variant="outlined"
                      name="withdrawalAmount"
                      required
                      value={payment.withdrawalAmount}
                      //disabled={payment?.withdrawalStatus !== '' ? true : false}
                      helperText={payment?.withdrawalStatus && payment?.withdrawalStatus !== 'Declined' ? `${payment?.withdrawalStatus} Withdrawal payment` : ''}
                      onChange={(e) => updatePaymentItem(payment.id, "withdrawalAmount", e.target.value)}
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  {/* <TableCell>
                    Total here
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="warning">
            Back
          </Button>
          <Button variant="contained" color="primary" type="submit"
            disabled={payments && payments.length > 0 && payments[0].status === 'Submitted'}
            startIcon={loading ? <CircularProgress size={20} /> : null}>
            Submit
          </Button>
        </Box>
      </form>

      <Dialog open={openDialog} onClose={() => handleOpen(false)}>
        <DialogTitle>Confirm Payment Submission</DialogTitle>
        <DialogContent>
          <p>
            By submitting this payment, member savings and loans will be updated and cannot be undone.
            Any changes you want to make after can be adjusted on the next week's payment.
            Do you want to continue?
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpen(false)} color="warning">
            Cancel
          </Button>
          <Button onClick={submitPayment} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

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

export default MemberTransactions;
