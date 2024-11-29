import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, IconButton, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";
import SavingsIcon from "@mui/icons-material/Savings";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import { useNavigate } from "react-router-dom";
import { getMyDetails } from "../services/apiService";
import dayjs from "dayjs";
import { Member } from "../services/interfaces";
import { ExitToApp } from "@mui/icons-material";
import { logout } from "../services/authService";

const Home = () => {
  const navigate = useNavigate();
  const [myDetails, setMyDetails] = useState<Member>();
  const [recentTransaction, setRecentTransaction] = useState<any>(null);

  useEffect(() => {
    getMyDetailsAsync()
  }, []);

  const getMyDetailsAsync = async () => {
    const response = await getMyDetails();
    if (response?.transactions && response?.transactions?.length > 0) {
      var recentT = response?.transactions.reduce((latest: any, current: any) => {
        const latestDate = new Date(latest.transactionDate);
        const currentDate = new Date(current.transactionDate);
        return currentDate > latestDate ? current : latest;
      });
      setRecentTransaction(recentT);
    }

    setMyDetails(response)
  }

  const getTimeOfDay = (): string => {
    const currentHr = dayjs().hour();
    if (currentHr >= 4 && currentHr < 12)
      return "morning"
    else if (currentHr >= 12 && currentHr < 17)
      return "afternoon"
    else
      return "evening"
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
        }}
      >
        {/* <IconButton>
          <ArrowBackIcon sx={{ color: "#ff8c00" }} />
        </IconButton> */}
        <Box textAlign={"right"} sx={{ width: '100%' }}>
          <IconButton>
            <NotificationsIcon sx={{ color: "#002855" }} />
          </IconButton>
          <IconButton>
            <AccountCircleIcon sx={{ color: "#002855" }} />
          </IconButton>
          <IconButton onClick={() => logout()}>
            <ExitToApp sx={{ color: "#002855" }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Good {getTimeOfDay()}, {myDetails?.firstName ?? ""}
        </Typography>
      </Box>

      {/* Loan Balance Section */}
      <Box
        sx={{
          backgroundColor: "#ff8c00",
          width: "100%",
          borderRadius: 2,
          mb: 2,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Box sx={{ padding: "10px" }}>
          <Typography variant="h6">Your Loan Balance</Typography>
          <Typography variant="h5" fontWeight="bold">
            ₱ {myDetails?.memberLoans.find((m: any) => m.isActive === true && m.status === 'Approved')?.loanBalance.toFixed(2) ?? 0.00}
          </Typography>
        </Box>
      </Box>

      {/* Recent Transaction Section */}
      <Box
        sx={{
          backgroundColor: "#002855",
          width: "100%",
          borderRadius: 2,
          mb: 3,
          color: "#fff",
        }}
      >
        {myDetails?.payments && myDetails?.payments?.length > 0 &&
          <Box sx={{ padding: "10px" }}>
            <Typography variant="body2">Recent Transaction</Typography>
            <Typography variant="body2">
              PHP {myDetails?.payments[0]?.loanPayment?.toFixed(2) ?? 0} is paid to your loan and PHP {myDetails?.payments[0]?.savingsPayment?.toFixed(2) ?? 0} is paid to your savings on {" "}
              {dayjs(myDetails?.payments[0]?.paymentDate).format('YYYY-MM-DD')}. Thank you!
            </Typography>
          </Box>
        }
      </Box>

      {/* Options Grid */}
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 90,
            }}
            onClick={() => navigate('/epayment')}
          >
            <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "#ff8c00" }} />
            <Typography variant="button" display="block" mt={1}>
              E-Payment
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 90,
            }}
            onClick={() => navigate('/transaction')}
          >
            <HistoryIcon sx={{ fontSize: 40, color: "#ff8c00" }} />
            <Typography variant="button" display="block" mt={1}>
              Transaction History
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 90,
            }}
            onClick={() => navigate('/savings')}
          >
            <SavingsIcon sx={{ fontSize: 40, color: "#ff8c00" }} />
            <Typography variant="button" display="block" mt={1}>
              Savings
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 90,
            }}
            onClick={() => navigate('/withdraw')}
          >
            <AttachMoneyIcon sx={{ fontSize: 40, color: "#ff8c00" }} />
            <Typography variant="button" display="block" mt={1}>
              Withdraw
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 90,
            }}
            onClick={() => navigate('/credit-score')}
          >
            <CreditScoreIcon sx={{ fontSize: 40, color: "#ff8c00" }} />
            <Typography variant="button" display="block" mt={1}>
              Credit Score
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 90,
            }}
            onClick={() => navigate('/loan-select')}
          >
            <AssignmentIcon sx={{ fontSize: 40, color: "#ff8c00" }} />
            <Typography variant="button" display="block" mt={1}>
              Apply Loan
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 90,
            }}
            onClick={() => navigate('/insurance')}
          >
            <SavingsIcon sx={{ fontSize: 40, color: "#ff8c00" }} />
            <Typography variant="button" display="block" mt={1}>
              Insurance
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            elevation={3}
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 90,
            }}
            onClick={() => navigate('/social-services')}
          >
            <FamilyRestroomIcon sx={{ fontSize: 40, color: "#ff8c00" }} />
            <Typography variant="button" display="block" mt={1}>
              Social Services
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
