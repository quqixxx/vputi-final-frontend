// src/App.jsx

import React from 'react';
import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; 
import FlightSearchPage from './pages/FlightSearchPage';
import HotelSearchPage from './pages/HotelSearchPage';
import { Box, Tabs, Tab, Typography, Container } from '@mui/material';

// Компонент для навигационных вкладок
function NavigationTabs() {
  const location = useLocation();
  // Добавляем новый путь '/tours' в список
  const currentTab = ['/', '/hotels', '/tours'].includes(location.pathname) ? location.pathname : false;

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Tabs value={currentTab} centered>
          <Tab label="Авиабилеты" value="/" to="/" component={RouterLink} />
          <Tab label="Отели" value="/hotels" to="/hotels" component={RouterLink} />
          {/* === НОВАЯ ВКЛАДКА "ТУРЫ" === */}
          <Tab label="Туры" value="/tours" to="/tours" component={RouterLink} />
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
          {/* Здесь будут отображаться разные страницы в зависимости от URL */}
          <Routes>
            <Route path="/" element={<FlightSearchPage />} />
            <Route path="/hotels" element={<HotelSearchPage />} />
            
            {/* === НОВЫЙ МАРШРУТ ДЛЯ СТРАНИЦЫ "ТУРЫ" === */}
            <Route path="/tours" element={
              <Box sx={{textAlign: 'center', p: 5}}>
                <Typography variant="h4">Поиск Туров</Typography>
                <Typography>Этот раздел скоро появится! Сначала проверим API.</Typography>
              </Box>
            } />

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