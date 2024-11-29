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
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
import { PendingLoanResponse, SocialService, Withdrawal } from "../services/interfaces";
import { getMemberWithdrawal, getPendingLoanApplications, getPendingSocialServices } from "../services/apiService";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorAccount, setAnchorAccount] = React.useState(null);
  const [pendingLoans, setPendingLoans] = useState<PendingLoanResponse>();
  const [pendingSocialServices, setPendingSocialServices] = useState<SocialService[]>();
  const [pendingWithdrawal, setPendingWithdrawal] = useState<Withdrawal[]>();
  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    getPendingLoans()
    getPendingSS()
    getWithdrawalApplications()
  }, []);

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
          <Box>
            <IconButton color="primary">
              <NotificationsIcon sx={{ color: "#ff6600", fontSize: "40px" }} />
            </IconButton>
            <IconButton color="primary">
              <ChatIcon sx={{ color: "#ff6600", fontSize: "40px" }} />
            </IconButton>
            <IconButton color="primary" onClick={handleMenuClick2}>
              <PersonIcon sx={{ color: "#ff6600", fontSize: "40px" }} />
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
        <Link
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
        </Link>
        {/* <Link
          to="/transactions"
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
          <Typography variant="h6">Members Transaction</Typography>
        </Link> */}
        <Link
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
        </Link>
        <Link
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
        <Box>
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
        </Box>
      </Box>
      <Box id="box-container">
        <Outlet /> {/* Renders child components based on route */}
      </Box>
    </Box>
  );
};

export default HomePage;
