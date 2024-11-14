// src/components/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#0c1e52' }}>
      <Toolbar>
        <Box
          component="img"
          src="./header-logo.png"
          alt="LifeBank Logo"
          sx={{ height: '100px', width: '300px', mr: 2 }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
