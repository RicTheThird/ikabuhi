import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Card, CardContent, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { BusinessLoan, MemberLoans, PendingLoanResponse, WashLoan } from '../services/interfaces';
import { getPendingLoanApplications, updateLoanStatus } from '../services/apiService';

interface Props {
  open: boolean;
  handleClose: any;
  loanDetails: MemberLoans | undefined;
}

interface WashProps {
  open: boolean;
  handleClose: any;
  loanDetails: WashLoan | undefined;
}

interface BizProps {
  open: boolean;
  handleClose: any;
  loanDetails: BusinessLoan | undefined;
}

const WashLoanDetailsModal = ({ open, handleClose, loanDetails }: WashProps) => {
  const handleUpdate = async (id: string | undefined, status: string) => {
    try {
      const response: any = await updateLoanStatus('wash', id ?? '', status)
      if (response.status === 204) {
        handleClose()
      } else {
        alert("Request failed. Please try again later.")
      }
    } catch (error) {
      console.log(error)
      alert("Request failed. Please try again later.")
    } finally {
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Loan and Financial Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Loan Details Section */}
          <Grid item xs={12} md={12}>
            <Typography variant="h6" gutterBottom>
              I. PROJECT INFORMATION AND LOAN DETAILS
            </Typography>
            <TextField fullWidth label="Type of Project" value={loanDetails?.projectType} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Location of Project" value={loanDetails?.projectLocation} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Loan Amount Requested" value={loanDetails?.loanAmount?.toFixed(2)} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Repayment Term" value={loanDetails?.paymentTerms} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Collateral" value={loanDetails?.collateral} variant="outlined" sx={{ mb: 2 }} aria-readonly />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="warning">
          Close
        </Button>
        <Button onClick={() => handleUpdate(loanDetails?.id, 'Approved')} variant="contained" color="success">
          Approve
        </Button>
        <Button onClick={() => handleUpdate(loanDetails?.id, 'Declined')} variant="contained" color="error">
          Decline
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const RegularLoanDetailsModal = ({ open, handleClose, loanDetails }: Props) => {
  const handleUpdate = async (id: string | undefined, status: string) => {
    try {
      const response: any = await updateLoanStatus('regular', id ?? '', status)
      if (response.status === 204) {
        handleClose()
      } else {
        alert("Request failed. Please try again later.")
      }
    } catch (error) {
      console.log(error)
      alert("Request failed. Please try again later.")
    } finally {
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Loan and Financial Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Loan Details Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              I. LOAN DETAILS
            </Typography>
            <TextField fullWidth label="Loan Cycle" value={loanDetails?.cycle} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Loan Amount Requested" value={loanDetails?.loanAmount.toFixed(2)} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Loan Term" value={loanDetails?.productLoan?.name} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Interest Rate" value={loanDetails?.productLoan?.interestRate} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Total Loan Amount" value={loanDetails?.totalLoanAmount.toFixed(2)} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Weekly Payment" value={loanDetails?.weeklyPayment.toFixed(2)} variant="outlined" sx={{ mb: 2 }} aria-readonly />

            <Typography variant="subtitle1" gutterBottom>
              Collateral Offer
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField fullWidth label="Type of Collateral" variant="outlined" value={loanDetails?.collateralType1} aria-readonly />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Amount" variant="outlined" value={loanDetails?.collateralTypeAmount1} aria-readonly />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField fullWidth label="Type of Collateral" variant="outlined" value={loanDetails?.collateralType2} aria-readonly />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Amount" variant="outlined" value={loanDetails?.collateralTypeAmount2} aria-readonly />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <TextField fullWidth label="Type of Collateral" variant="outlined" value={loanDetails?.collateralType3} aria-readonly />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth label="Amount" variant="outlined" value={loanDetails?.collateralTypeAmount3} aria-readonly />
              </Grid>
            </Grid>

          </Grid>

          {/* Financial Obligations and Reference Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              II. FINANCIAL OBLIGATIONS AND REFERENCE
            </Typography>
            <TextField fullWidth label="Current Loan Balance" value={loanDetails?.liabilityLoanBalance} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Current Savings" value={loanDetails?.externalSavingsBalance} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Weekly Repayment Amount" value={loanDetails?.liabilityLoanBalanceWeeklyPayments} variant="outlined" sx={{ mb: 2 }} aria-readonly />

            <TextField fullWidth label="Monthly Expenses" value={loanDetails?.monthlyExpenses} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <Typography variant="subtitle1" gutterBottom>
              Guarantors Information
            </Typography>
            <TextField fullWidth label="Full Name" value={loanDetails?.guarantorName} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Relationship" value={loanDetails?.guarantorRelation} variant="outlined" sx={{ mb: 2 }} aria-readonly />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="warning">
          Close
        </Button>
        <Button onClick={() => handleUpdate(loanDetails?.id, 'Approved')} variant="contained" color="success">
          Approve
        </Button>
        <Button onClick={() => handleUpdate(loanDetails?.id, 'Declined')} variant="contained" color="error">
          Decline
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const BizLoanDetailsModal = ({ open, handleClose, loanDetails }: BizProps) => {
  const handleUpdate = async (id: string | undefined, status: string) => {
    try {
      const response: any = await updateLoanStatus('biz', id ?? '', status)
      if (response.status === 204) {
        handleClose()
      } else {
        alert("Request failed. Please try again later.")
      }
    } catch (error) {
      console.log(error)
      alert("Request failed. Please try again later.")
    } finally {
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Loan and Financial Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* Loan Details Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              I. BUSINESS INFORMATION DETAILS
            </Typography>
            <TextField fullWidth label="Business Name" value={loanDetails?.businessName} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Business Type" value={loanDetails?.businessType} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Business Address" value={loanDetails?.businessAddress} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Loan Amount Requested" value={loanDetails?.loanAmount?.toFixed(2)} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Repayment Term" value={loanDetails?.paymentTerms} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Loan Purpose" value={loanDetails?.purposeLoan} variant="outlined" sx={{ mb: 2 }} aria-readonly />
          </Grid>

          {/* Financial Obligations and Reference Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              II. FINANCIAL OBLIGATIONS
            </Typography>
            <TextField fullWidth label="Current Annual Revenue" value={loanDetails?.annualRevenue?.toFixed(2) ?? 0} variant="outlined" sx={{ mb: 2 }} aria-readonly />
            <TextField fullWidth label="Est. Monthly Expenses" value={loanDetails?.estMonthlyExpenses?.toFixed(2) ?? 0} variant="outlined" sx={{ mb: 2 }} aria-readonly />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="warning">
          Close
        </Button>
        <Button onClick={() => handleUpdate(loanDetails?.id, 'Approved')} variant="contained" color="success">
          Approve
        </Button>
        <Button onClick={() => handleUpdate(loanDetails?.id, 'Declined')} variant="contained" color="error">
          Decline
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const LoanApplication = () => {
  const [pendingLoans, setPendingLoans] = useState<PendingLoanResponse>();
  const [regLoan, setRegLoan] = useState<MemberLoans>();
  const [openRegLoanDetails, setOpenRegLoanDetails] = useState(false);

  const [washLoan, setWashLoan] = useState<WashLoan>();
  const [openWashLoanDetails, setOpenWashLoanDetails] = useState(false);

  const [bizLoan, setBizLoan] = useState<WashLoan>();
  const [openBizLoanDetails, setOpenBizLoanDetails] = useState(false);
  useEffect(() => {
    getPendingLoans()
  }, []);

  const getPendingLoans = async () => {
    const response: PendingLoanResponse = await getPendingLoanApplications();
    setPendingLoans(response);
  }

  const handleCloseLoanDetails = () => {
    getPendingLoans()
    setOpenRegLoanDetails(false);
  };

  const handleCloseWashLoanDetails = () => {
    getPendingLoans()
    setOpenWashLoanDetails(false);
  };

  const handleCloseBizLoanDetails = () => {
    getPendingLoans()
    setOpenBizLoanDetails(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f8f4f4', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
          Pending Loan Applications
        </Typography>
      </Box>
      {/* <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField label="Type of Loan" variant="outlined" select sx={{ width: '20%' }}>
          <MenuItem value="Regular Project Loan">Regular Project Loan</MenuItem>
        </TextField>
      </Box> */}
      <Grid container spacing={3}>
        {pendingLoans && pendingLoans.pendingRegularLoans?.map((loan, index) => (
          <Grid item key={index} xs={12} md={4} lg={3}>
            <Card variant="outlined" sx={{ padding: 2, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                  {loan.member?.firstName} {loan.member?.lastName}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Group: {loan.member?.group?.name} | Account: {loan.member.accountNo}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Applied for Regular loan application
                </Typography>
                <Box mt={2}>
                  <Button variant="contained" color="primary"
                    onClick={() => { setRegLoan(loan); setOpenRegLoanDetails(true); }} startIcon={<InsertDriveFileIcon />}
                    sx={{ marginRight: 1 }}>
                    View Applications Form
                  </Button><br />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {pendingLoans && pendingLoans.pendingBusinessLoans?.map((loan, index) => (
          <Grid item key={index} xs={12} md={4} lg={3}>
            <Card variant="outlined" sx={{ padding: 2, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                  {loan.member?.firstName} {loan.member?.lastName}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Group: {loan.member?.group?.name} | Account: {loan.member.accountNo}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Applied for Business loan
                </Typography>
                <Box mt={2}>
                  <Button variant="contained" color="primary" startIcon={<InsertDriveFileIcon />} sx={{ marginRight: 1 }}
                    onClick={() => { setBizLoan(loan); setOpenBizLoanDetails(true); }}>
                    View Applications Form
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {pendingLoans && pendingLoans.pendingWashLoans?.map((loan, index) => (
          <Grid item key={index} xs={12} md={4} lg={3}>
            <Card variant="outlined" sx={{ padding: 2, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                  {loan.member?.firstName} {loan.member?.lastName}
                </Typography>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }} gutterBottom>
                  Group: {loan.member?.group?.name} | Account: {loan.member.accountNo}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Applied for Wash loan
                </Typography>
                <Box mt={2}>
                  <Button variant="contained" color="primary" startIcon={<InsertDriveFileIcon />} sx={{ marginRight: 1 }}
                    onClick={() => { setWashLoan(loan); setOpenWashLoanDetails(true); }}>
                    View Applications Form
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <BizLoanDetailsModal open={openBizLoanDetails} handleClose={handleCloseBizLoanDetails} loanDetails={bizLoan} />
      <WashLoanDetailsModal open={openWashLoanDetails} handleClose={handleCloseWashLoanDetails} loanDetails={washLoan} />
      <RegularLoanDetailsModal open={openRegLoanDetails} handleClose={handleCloseLoanDetails} loanDetails={regLoan} />
    </Box>
  );
};

export default LoanApplication;