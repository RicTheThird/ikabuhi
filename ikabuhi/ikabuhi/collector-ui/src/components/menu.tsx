// src/components/Menu.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Menu: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/home">Home</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Menu;
