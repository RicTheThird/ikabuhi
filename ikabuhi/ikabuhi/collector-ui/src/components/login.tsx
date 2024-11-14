// src/components/Login.tsx
import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  Container,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Header from "./header";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box>
      <Header />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: "row",
              maxWidth: 900,
              p: 4,
              borderRadius: 2,
              backgroundColor: "#e0e0e0",
            }}
          >
            {/* Left Side - Logo and Title */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                p: 2,
                bgcolor: "#ffffff",
                borderRadius: 2,
              }}
            >
              <Box
                component="img"
                src="./login-logo.png" // Replace with actual logo URL
                alt="Logo"
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h5" fontWeight="bold" mt={2} color="primary">
                IKABUHI
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Right Side - Form */}
            <Box sx={{ width: "50%", p: 2 }}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                InputProps={{
                  style: { fontWeight: 600, color: "#3f3f3f" },
                }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { fontWeight: 600, color: "#3f3f3f" },
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#ff7f27",
                  color: "#ffffff",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#e06b22",
                  },
                }}
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
