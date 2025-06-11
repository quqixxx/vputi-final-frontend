// src/App.jsx

import React from 'react';
import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import FlightSearchPage from './pages/FlightSearchPage';
import HotelSearchPage from './pages/HotelSearchPage';
import ToursPage from './pages/ToursPage'; // <<< НОВЫЙ ИМПОРТ
import { Box, Tabs, Tab, Typography, Container } from '@mui/material';

function NavigationTabs() {
  const location = useLocation();
  const currentTab = ['/', '/hotels', '/tours'].includes(location.pathname) ? location.pathname : false;

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Tabs value={currentTab} centered>
          <Tab label="Авиабилеты" value="/" to="/" component={RouterLink} />
          <Tab label="Отели" value="/hotels" to="/hotels" component={RouterLink} />
          <Tab label="Туры" value="/tours" to="/tours" component={RouterLink} /> {/* <<< НОВАЯ ВКЛАДКА */}
        </Tabs>
      </Container>
    </Box>
  );
}

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Header />
        <NavigationTabs />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<FlightSearchPage />} />
            <Route path="/hotels" element={<HotelSearchPage />} />
            <Route path="/tours" element={<ToursPage />} /> {/* <<< НОВЫЙ МАРШРУТ */}
            <Route path="*" element={
              <Box sx={{textAlign: 'center', p: 5}}>
                <Typography variant="h4">404 - Страница не найдена</Typography>
              </Box>
            } />
          </Routes>
        </Box>
        <Footer /> 
    </Box>
  );
}

export default App;