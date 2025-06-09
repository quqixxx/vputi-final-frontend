// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

function Header() {
  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <FlightTakeoffIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            ВПути.ру
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;