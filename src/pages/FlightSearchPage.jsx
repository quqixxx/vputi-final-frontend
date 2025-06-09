// src/pages/FlightSearchPage.jsx
import React, { useState } from 'react';
import FlightSearchForm from '../components/FlightSearchForm';
import SearchResults from '../components/SearchResults';
import { Container, Box, Typography } from '@mui/material';
import { API_BASE_URL } from '../apiConfig';

function FlightSearchPage() {
    const [flights, setFlights] = useState([]);
    const [currentCurrency, setCurrentCurrency] = useState('RUB');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (originIata, destinationIata, departureDate) => {
        setIsLoading(true);
        setError(null);
        setFlights([]);
        try {
            const flightPricesBackendUrl = `${API_BASE_URL}/api/test-flight-prices?origin=${originIata}&destination=${destinationIata}&departure_at=${departureDate}`;
            const flightsResponse = await fetch(flightPricesBackendUrl);
            if (!flightsResponse.ok) { throw new Error('Ошибка получения цен'); }
            const flightsData = await flightsResponse.json();
            if (flightsData.success && flightsData.data) {
                setFlights(flightsData.data);
                if (flightsData.currency) setCurrentCurrency(flightsData.currency.toUpperCase());
                if (flightsData.data.length === 0) setError('По вашему запросу ничего не найдено.');
            } else { setError(flightsData.message || 'Не удалось получить данные о рейсах.'); }
        } catch (err) { setError(err.message); } finally { setIsLoading(false); }
    };

    const handleBooking = async (flightLink) => {
        try {
            const deeplinkResponse = await fetch(`${API_BASE_URL}/api/generate-flight-deeplink`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aviasales_relative_link: flightLink })
            });
            if (!deeplinkResponse.ok) { throw new Error('Ошибка генерации ссылки'); }
            const deeplinkData = await deeplinkResponse.json();
            if (deeplinkData.success && deeplinkData.deeplink) { window.open(deeplinkData.deeplink, '_blank'); } 
            else { throw new Error('Не удалось получить корректный deeplink.'); }
        } catch (err) { setError(err.message); }
    };

    return (
        <>
            <Box sx={{ pt: 8, pb: 10, background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)' }}>
                <Container maxWidth="md">
                    <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', color: 'text.primary', mb: 4 }}>
                      Куда отправимся сегодня?
                    </Typography>
                    <FlightSearchForm onSearch={handleSearch} isLoading={isLoading} />
                </Container>
            </Box>
            <Container maxWidth="md" sx={{ py: 4, flexGrow: 1 }}>
                <SearchResults isLoading={isLoading} error={error} flights={flights} currentCurrency={currentCurrency} onBooking={handleBooking} />
            </Container>
        </>
    );
}

export default FlightSearchPage;