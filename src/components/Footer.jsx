// src/components/Footer.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

function Footer() {
  return (
    <Box component="footer" sx={{ py: 2, textAlign: 'center', mt: 'auto' }}>
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} ВПути.ру. 
        <Link 
          href="https://ru.freepik.com/free-photo/beautiful-shot-forested-mountain-with-blue-sky-background-dolomite-italy_10400723.htm"
          target="_blank" 
          rel="noopener noreferrer"
          color="inherit"
          underline="hover"
          sx={{ ml: 1 }}
        >
          Фоновое изображение от wirestock на Freepik
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;