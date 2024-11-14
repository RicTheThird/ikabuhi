import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, Link, Paper, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleUsernameChange = (event : any) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event: any) => {
    setRememberMe(event.target.checked);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    // Handle login logic here
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);
    navigate('/home');
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

        <Box mt={2}>
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            sx={{ marginBottom: 2, backgroundColor: '#fff' }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
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
