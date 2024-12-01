import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  AppBar,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { Collector, PendingLoanResponse, SocialService, Withdrawal } from "../services/interfaces";
import { getCollectorDetail, getMemberWithdrawal, getPendingLoanApplications, getPendingSocialServices } from "../services/apiService";
import { ExitToApp } from "@mui/icons-material";
import dayjs from "dayjs";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorAccount, setAnchorAccount] = React.useState(null);
  const [pendingLoans, setPendingLoans] = useState<PendingLoanResponse>();
  const [pendingSocialServices, setPendingSocialServices] = useState<SocialService[]>();
  const [pendingWithdrawal, setPendingWithdrawal] = useState<Withdrawal[]>();
  const [userDetails, setUserDetails] = useState<Collector>();


  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    getUserDetails();
    getPendingLoans()
    getPendingSS()
    getWithdrawalApplications()
  }, []);

  const getUserDetails = async () => {
    const response = await getCollectorDetail();
    setUserDetails(response);
  }

  const getPendingLoans = async () => {
    const response: PendingLoanResponse = await getPendingLoanApplications();
    setPendingLoans(response);
  }

  const getPendingSS = async () => {
    const response: SocialService[] = await getPendingSocialServices();
    setPendingSocialServices(response);
  }

  const getWithdrawalApplications = async () => {
    const response: Withdrawal[] = await getMemberWithdrawal();
    setPendingWithdrawal(response.filter(w => w.status === 'Pending'))
  }

  const handleMenuClick2 = (event: any) => {
    setAnchorAccount(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#f1f1f1" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo */}
          <Box display="flex" alignItems="center">

            <Box
              component="img"
              src="/header-logo.png"
              alt="LifeBank Logo"
              sx={{ height: "100px", width: "300px", mr: 2 }}
            />
          </Box>

          {/* Navigation Links */}

          {/* Notification and Profile Icons */}
          <Box sx={{ display: "flex" }}>
            <Typography variant="h5" sx={{ color: "#0c1e52", mt: 2, mr: 2 }}>
              Good {getTimeOfDay()}, <strong>{userDetails?.firstName} {userDetails?.lastName}</strong>
            </Typography>
            <IconButton color="primary" onClick={() => logout()}>
              <ExitToApp sx={{ color: "#ff6600", fontSize: "40px" }} />
            </IconButton>

            {/* Dropdown Menu for Logout */}
            <Menu
              anchorEl={anchorAccount}
              open={Boolean(anchorAccount)} // Menu is open when anchorEl is not null
              onClose={handleMenuClose} // Close menu when clicked outside
              anchorOrigin={{
                vertical: "bottom", // Menu appears below the icon
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        bgcolor="#0c1e52"
        alignItems="center"
        sx={{ padding: "24px" }}
      >
        {localStorage.getItem('role') === 'admin' && <Link
          to="/home/dashboard"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <DashboardIcon sx={{ color: "#ff6600", mr: 0.5, fontSize: "30px" }} />
          <Typography variant="h6">Dashboard</Typography>
        </Link>
        }

        {localStorage.getItem('role') === 'admin' && <Link
          to="/home/all-members"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <PeopleIcon sx={{ color: "#ff6600", mr: 0.5, fontSize: "30px" }} />
          <Typography variant="h6">Members</Typography>
        </Link>}

        {localStorage.getItem('role') === 'admin' && <Link
          to="/home/all-staff"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <BusinessIcon sx={{ color: "#ff6600", mr: 0.5, fontSize: "30px" }} />
          <Typography variant="h6">Staffs</Typography>
        </Link>}

        {localStorage.getItem('role') === 'admin' && <Link
          to="/home/reports"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <AssessmentIcon sx={{ color: "#ff6600", mr: 0.5, fontSize: "30px" }} />
          <Typography variant="h6">Reports</Typography>
        </Link>}

        {localStorage.getItem('role') === 'collector' && <Link
          to="/home/groups"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <PeopleIcon sx={{ color: "#ff6600", mr: 0.5, fontSize: "30px" }} />
          <Typography variant="h6">Member Groups</Typography>
        </Link>}

        {localStorage.getItem('role') === 'collector' && <Link
          to="/home/savings-credit"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <SavingsIcon sx={{ color: "#ff6600", mr: 0.5, fontSize: "30px" }} />
          <Typography variant="h6">
            Members Savings &amp; Credit Score
          </Typography>
        </Link>}

        {localStorage.getItem('role') === 'collector' && <Link
          to="/home/withdrawal-application"
          style={{
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            marginRight: 16,
          }}
        >
          <AccountBalanceWalletIcon
            sx={{ color: "#ff6600", mr: 0.5, fontSize: "30px" }}
          />
          <Typography variant="h6">Members Withdrawal Application
            <Badge
              badgeContent={pendingWithdrawal?.length || 0}
              color="secondary"
              sx={{
                mx: 2, "& .MuiBadge-badge": {
                  fontSize: "1rem", // Increase the font size
                  bgcolor: "#ff6600",
                  width: "25px",
                  height: "25px",
                  borderRadius: "15px"
                }
              }} // Positions the badge on the right
            />
          </Typography>
        </Link>
        }
        {localStorage.getItem('role') === 'collector' && <Box>
          <Link
            to="#"
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
              textTransform: "none",
              fontWeight: "bold",
            }}
            onClick={handleMenuClick}
          >
            <AccountBalanceWalletIcon
              sx={{ color: "#ff6600", mr: 0.5, fontSize: "30px" }}
            />
            <Typography variant="h6">Members Application
              <Badge
                badgeContent={(pendingSocialServices?.length || 0) + (pendingLoans?.pendingLoanCount || 0)}
                color="secondary"
                sx={{
                  mx: 2, "& .MuiBadge-badge": {
                    fontSize: "1rem", // Increase the font size
                    bgcolor: "#ff6600",
                    width: "25px",
                    height: "25px",
                    borderRadius: "15px"
                  }
                }} // Positions the badge on the right
              /></Typography>
            <ExpandMoreIcon sx={{ ml: 0.5 }} />
          </Link>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/home/loan-application");
              }}
            >
              Loan Application
              <Badge
                badgeContent={pendingLoans?.pendingLoanCount || 0}
                color="secondary"
                style={{ marginLeft: "auto" }} // Positions the badge on the right
              />
            </MenuItem>
            {/* <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/home/insurance-application");
              }}
            >
              Insurance Application
            </MenuItem> */}
            <MenuItem onClick={() => {
              handleMenuClose();
              navigate("/home/social-services-application");
            }}>
              Social Services Application
              <Badge
                badgeContent={pendingSocialServices?.length || 0}
                color="secondary"
                style={{ marginLeft: "20px" }} // Positions the badge on the right
              />
            </MenuItem>
          </Menu>
        </Box>}
      </Box>
      <Box id="box-container">
        <Outlet /> {/* Renders child components based on route */}
      </Box>
    </Box>
  );
};

export default HomePage;
