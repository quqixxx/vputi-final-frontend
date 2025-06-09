// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', mt: 'auto' }}>
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} ВПути.ру. Все права защищены (на самом деле нет, но звучит хорошо).
      </Typography>
    </Box>
  );
}

export default Footer;