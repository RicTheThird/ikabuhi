import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Card, CardContent, Button, Grid, Alert, Snackbar } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { SnackbarAlert, Transaction } from '../services/interfaces';
import { downloadECashReceipt, getPendingECashPayments, putTransaction } from '../services/apiService';

const MemberECashPayment = () => {

  const [eCashPayments, setECashPayments] = useState<Transaction[]>([]);
  const [snackOpen, setSnackOpen] = useState(false);
  const [alert, setAlert] = useState<SnackbarAlert>();

  useEffect(() => {
    getEcashList()
  }, []);

  const getEcashList = async () => {
    const response = await getPendingECashPayments();
    setECashPayments(response)
  }

  const downloadECashFile = async (transactionId: string) => {
    try {
      const response = await downloadECashReceipt(transactionId);
      const contentDisposition = response.headers['content-disposition'];
      const fileName = contentDisposition?.split('filename=')[1]?.replace(/"/g, '');

      const blob = new Blob([response.data]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName || 'download';
      link.click();
    } catch (e) {
      console.log(e)
    }
  }

  const handleECashAction = async (transaction: Transaction) => {
    try {
      transaction.member = null;
      transaction.status = 'Approved';
      const response: any = await putTransaction(transaction)
      if (response.status === 204) {
        setAlert({ success: true, message: "ECash payment approved!" })
      } else {
        setAlert({ success: false, message: response?.response?.data ?? "Operation failed. Please try again later." })
      }
    } catch (error) {
      console.log(error)
      setAlert({ success: false, message: "Operation failed. Please try again later." })
    } finally {
      setSnackOpen(true)
    }
  }


  return (
    <Box sx={{ padding: 4, backgroundColor: '#f8f4f4', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
          E-CASH PAYMENT
        </Typography>
      </Box>
      {/* <Box display="flex" justifyContent="space-between" mb={2}>
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
      </Box> */}
      <Grid container spacing={3}>
        {eCashPayments && eCashPayments.map((payment, index) => (
          <Grid item key={index} xs={12} md={3} lg={3}>
            <Card key={index} variant="outlined" sx={{ width: '300px', textAlign: 'center', padding: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                  {payment.member?.firstName} {payment.member?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {payment.member?.accountNo} submitted E-Payment form for her/his transaction on {payment.transactionDate}
                </Typography>
                <Box mt={2}>
                  <Button variant="contained" color="primary" size='small'
                    onClick={() => downloadECashFile(payment.id)}
                    startIcon={<InsertDriveFileIcon />} sx={{ marginRight: 1 }}>
                    Download payment proof
                  </Button>
                  <Button variant="contained" color="warning" size='small' sx={{ mt: 2 }} onClick={() => handleECashAction(payment)}>
                    Approve Payment
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

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

export default MemberECashPayment;
