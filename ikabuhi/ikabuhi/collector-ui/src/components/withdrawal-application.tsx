import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Card, CardContent, Button, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Paper, styled } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Groups, Withdrawal } from '../services/interfaces';
import { getMemberWithdrawal, getMyGroups, putMemberWithdrawal } from '../services/apiService';
import dayjs from 'dayjs';

const StyledPaper = styled(Paper)({
  padding: '20px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fafafa',
  borderRadius: '8px',
});
// const pendingWithdrawals = [
//   {
//     name: 'Helena Magpantay',
//     clientNo: 'U1223623173',
//     description: 'apply Withdrawal Application in her next loan payment on 02/25/2024',
//   },
//   {
//     name: 'Ric Dela Cruz',
//     clientNo: 'U1223623173',
//     description: 'apply Withdrawal Application in her next loan payment on 02/25/2024',
//   },
// ];

const WithdrawalApplication = () => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [activeWithdrawal, setActiveWithdrawal] = useState<Withdrawal | null>();
  const [groups, setGroups] = useState<Groups[]>([]);
  const [filteredGroupId, setFilteredGroupId] = useState<string>("");
  const [open, setOpen] = useState(false);

  const handleOpen = (withdrawal: Withdrawal) => {
    setActiveWithdrawal(withdrawal);
    setOpen(true);
  };



  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (status: string, data: Withdrawal) => {
    updateWithdrawalApplication(status, data)
  };

  const updateWithdrawalApplication = async (status: string, data: Withdrawal) => {
    data.status = status;
    data.member = null;
    //data.withdrawalDateTime = dayjs(data.withdrawalDateTime).format('YYYY-MM-DD')
    try {
      const response: any = await putMemberWithdrawal(data.id, data)
      if (response.status === 204) {
        setOpen(false)
        setActiveWithdrawal(null);
        getWithdrawalApplications()
      } else {
        alert('Request failed. Please try again later.')
      }
    } catch (error) {
      console.log(error)
      alert('Request failed. Please try again later.')
    } finally {
      //setLoading(false)
    }
  }

  useEffect(() => {
    getWithdrawalApplications();
    getMyCollectorGroups();
  }, []);

  const getWithdrawalApplications = async () => {
    const response = await getMemberWithdrawal();
    setWithdrawals(response)
  }

  const getMyCollectorGroups = async () => {
    const response = await getMyGroups();
    setGroups(response)
  }

  const handleGroupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (withdrawals && withdrawals.length > 0) {
    //   const filterByGroup = withdrawals.filter(w => w.member?.group.id === e.target.value)
    //   setWithdrawals(filterByGroup)
    // }
    setFilteredGroupId(e.target.value);
  }


  return (
    <Box sx={{ padding: 4, backgroundColor: '#f8f4f4', minHeight: '100vh' }}>
      <Box mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
          Pending Withdrawal Application
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <TextField
          label="Group"
          variant="outlined"
          select
          onChange={handleGroupChange}
          sx={{ width: '20%' }}>
          {groups && groups.map((group: Groups, index: number) => (
            <MenuItem key={index} value={group.id}>{group.name} ({group.memberCount} Members)</MenuItem>
          ))}
        </TextField>
      </Box>
      <Grid container spacing={3}>
        {withdrawals.filter(w => w.status === 'Pending' && (filteredGroupId !== "" ? w.member?.group.id === filteredGroupId : true)).map((withdrawal, index) => (
          <Grid item key={index} xs={12} md={3} lg={3}>
            <Card variant="outlined" sx={{ padding: 2, textAlign: 'center' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }} gutterBottom>
                  {withdrawal?.member?.firstName} {withdrawal.member?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {withdrawal?.member?.accountNo} applied Withdrawal Application in her/his next loan payment on {dayjs(withdrawal.withdrawalDateTime).format('YYYY-MM-DD')}
                </Typography>
                <Box mt={2}>
                  <Button variant="contained" color="primary" onClick={() => handleOpen(withdrawal)} startIcon={<InsertDriveFileIcon />} sx={{ marginRight: 1 }}>
                    View Applications Form
                  </Button>
                  {/* <Button variant="contained" color="warning">
                    Approve
                  </Button> */}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth
        PaperProps={{ component: StyledPaper }}>

        <DialogTitle>Withdrawal Slip</DialogTitle>
        {/* <Paper
          elevation={3}
          sx={{
            padding: 1,
            // width: "30vw",
            mb: 3,
            border: "1px solid #ccc",
            backgroundColor: "#f0f0f0",
          }}
        > */}

        {activeWithdrawal && <>
          <DialogContent sx={{ padding: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">Account No.:</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {activeWithdrawal?.member?.accountNo}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">Account Name:</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {activeWithdrawal?.member?.lastName}, {activeWithdrawal?.member?.firstName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">Group Name:</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {activeWithdrawal?.member?.group?.name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">Payment Date:</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {dayjs(activeWithdrawal?.withdrawalDateTime).format('YYYY-MM-DD')}
              </Typography>
            </Box>
            {/* <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">Branch:</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {myDetails?.municipality}
              </Typography>
            </Box> */}
            {
              activeWithdrawal?.member?.memberSavings && activeWithdrawal?.member?.memberSavings.length > 0 &&
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body2">Current Savings Balance:</Typography>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  ₱{activeWithdrawal?.member.memberSavings[0].runningSavingsAmount.toFixed(2) ?? 0.00}
                </Typography>
              </Box>
            }
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">Withdrawal Amount:</Typography>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                ₱{activeWithdrawal?.withdrawAmount.toFixed(2) ?? 0.00}
              </Typography>
            </Box>
          </DialogContent>
          {/* </Paper> */}
          <DialogActions>
            <Button onClick={() => handleSubmit('Approved', activeWithdrawal)} color="success">
              Approve
            </Button>
            <Button onClick={() => handleSubmit('Declined', activeWithdrawal)} color="error">
              Decline
            </Button>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>

        </>
        }
      </Dialog>



    </Box>
  );
};

export default WithdrawalApplication;
