// src/components/SearchResults.jsx
import React from 'react';
import { Box, Typography, CircularProgress, Card, CardContent, Grid, Button } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';

function FlightCard({ flight, currency, onBooking }) {
    const departureTime = new Date(flight.departure_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const departureDate = new Date(flight.departure_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    const formatDuration = (totalMinutes) => {
        if (!totalMinutes) return '';
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}ч ${minutes > 0 ? `${minutes}м` : ''}`;
    };
    const transfersInfo = flight.transfers === 0 ? 'Прямой рейс' : flight.transfers === 1 ? '1 пересадка' : `${flight.transfers} пересадки`;

    return (
        <Card sx={{ mb: 2, borderRadius: 4, transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' } }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}><Box component="img" sx={{ height: 40, mb: 1, objectFit: 'contain' }} alt={`Логотип ${flight.airline}`} src={`https://pics.avs.io/120/40/${flight.airline}.png`} /><Typography variant="caption" display="block" color="text.secondary">{flight.airline}</Typography></Grid>
                    <Grid item xs={12} sm={7}><Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}><Box sx={{ textAlign: 'center' }}><Typography variant="h5" component="div">{departureTime}</Typography><Typography variant="body2" color="text.secondary">{flight.origin_airport}</Typography><Typography variant="caption" color="text.secondary">{departureDate}</Typography></Box><Box sx={{ textAlign: 'center', mx: 2, flexGrow: 1 }}><Typography variant="caption" color="text.secondary">{formatDuration(flight.duration_to)}</Typography><Box sx={{ borderBottom: '1px solid #ccc', my: 0.5, position: 'relative' }}><FlightIcon color="action" sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%) rotate(90deg)', bgcolor: 'background.paper', p: '2px' }} /></Box><Typography variant="caption" color="text.secondary">{transfersInfo}</Typography></Box><Box sx={{ textAlign: 'center' }}><Typography variant="h5" component="div">{flight.destination_airport}</Typography><Typography variant="body2" color="text.secondary">Прибытие</Typography></Box></Box></Grid>
                    <Grid item xs={12} sm={3} sx={{ textAlign: 'center', mt: { xs: 2, sm: 0 } }}><Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>от {flight.price.toLocaleString('ru-RU')} {currency}</Typography><Button variant="contained" color="secondary" size="large" sx={{ mt: 1, width: '100%', maxWidth: '150px' }} onClick={() => onBooking(flight.link)}>Купить</Button></Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}

function SearchResults({ isLoading, error, flights, currentCurrency, onBooking }) {
  if (isLoading) { return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress />; }
  if (error) { return <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>{error}</Typography>; }
  if (flights.length === 0) { return null; }
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>Найденные рейсы:</Typography>
      {flights.map((flight) => (<FlightCard key={flight.link} flight={flight} currency={currentCurrency} onBooking={onBooking} />))}
    </Box>
  );
}

export default SearchResults;