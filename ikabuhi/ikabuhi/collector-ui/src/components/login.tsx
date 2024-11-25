// src/components/Login.tsx
import React, { useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Header from "./header";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

const Login: React.FC = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    userName: "",
    password: "",
  });

  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response: any = await login({ userName: formValues.userName, password: formValues.password })
      if (response.status === 200) {
        setLoginError('')
        navigate('/home');
      } else {
        setLoginError("Invalid User name or password")
      }
    } catch (error) {
      setLoginError("Invalid User name or password")
    } finally {
      setLoading(false)
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

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
                sx={{ width: 200, height: 200 }}
              />
              <Typography variant="h5" fontWeight="bold" mt={2} color="primary">
                IKABUHI
              </Typography>
            </Box>

            <Divider orientation="vertical" flexItem />

            {/* Right Side - Form */}
            <form onSubmit={handleLogin}>
              <Box sx={{ p: 3 }}>
                {loginError &&
                  <Typography variant="body2" color="error">
                    {loginError}
                  </Typography>
                }
                <TextField
                  name="userName"
                  fullWidth
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  required
                  onChange={handleInputChange}
                  InputProps={{
                    style: { fontWeight: 600, color: "#3f3f3f" },
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name='password'
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  required
                  onChange={handleInputChange}
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
                  type="submit"
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
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                  Login
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Login;
