import React from "react";
import {
  Typography,
  Box,
  Container,
  AppBar,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, Outlet, useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
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
            <IconButton color="primary">
              <PersonIcon sx={{ color: "#ff6600", fontSize: "40px" }} />
            </IconButton>
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
          <Typography variant="h6">Members Withdrawal Application</Typography>
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
            <Typography variant="h6">Members Application</Typography>
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
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/home/insurance-application");
              }}
            >
              Insurance Application
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              Social Services Application
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
