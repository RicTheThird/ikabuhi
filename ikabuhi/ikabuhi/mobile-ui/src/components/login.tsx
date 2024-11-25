import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Paper, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleRememberMeChange = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response: any = await login(formValues)
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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f4f4',
        padding: 2,
      }}
    >
      <Box component="img" src="/login-logo.png" alt="Logo" sx={{ width: 140, marginBottom: 3 }} />
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#ff8c00', marginBottom: 1 }}>
        Welcome!
      </Typography>
      <Typography variant="body1" sx={{ color: '#333', marginBottom: 2 }}>
        Login to your Account
      </Typography>

      <Paper elevation={3} sx={{ padding: 3, width: '90%', maxWidth: 360 }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            backgroundColor: '#002855',
            color: '#fff',
            paddingY: 1,
            borderRadius: '4px 4px 0 0',
          }}
        >
          Log In
        </Typography>
        {loginError &&
          <>
            <br />
            <Typography variant="body2" color="error" sx={{
              textAlign: 'center'
            }}>
              {loginError}
            </Typography></>
        }
        <Box mt={2}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={formValues.username}
            name="username"
            onChange={handleInputChange}
            sx={{ marginBottom: 2, backgroundColor: '#fff' }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={formValues.password}
            name='password'
            onChange={handleInputChange}
            sx={{ marginBottom: 2, backgroundColor: '#fff' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <FormControlLabel
              control={<Checkbox color="primary" checked={rememberMe} onChange={handleRememberMeChange} />}
              label="Remember me"
              sx={{ color: '#333', fontSize: '0.875rem' }}
            />
            <Link href="#" sx={{ color: '#002855', textDecoration: 'none', fontSize: '0.875rem' }}>
              Forgot Password?
            </Link>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: '#ff8c00', color: '#fff', paddingY: 1.2, fontWeight: 'bold' }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
            onClick={handleLogin}
          >
            Log In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
