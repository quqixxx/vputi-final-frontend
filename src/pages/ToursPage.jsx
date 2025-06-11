// src/pages/ToursPage.jsx

import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress, Grid } from '@mui/material';
import { API_BASE_URL } from '../apiConfig';
import TourCard from '../components/TourCard'; // <<< Наш новый компонент для карточки тура

function ToursPage() {
    const [tours, setTours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTours = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`${API_BASE_URL}/api/get-cheapest-tours`);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке туров');
                }
                const data = await response.json();
                if (data.success && Array.isArray(data.data)) {
                    setTours(data.data);
                } else {
                    throw new Error(data.message || 'Не удалось получить данные о турах.');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTours();
    }, []); // Пустой массив зависимостей, чтобы запрос выполнился один раз при загрузке страницы

    const handleBooking = async (tourPageUrl) => {
        // ... (логика генерации deeplink для тура)
    };

    return (
        <Box sx={{ pt: 8, pb: 10, background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)', flexGrow: 1 }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', color: 'text.primary', mb: 4 }}>
                    Горящие туры
                </Typography>
                
                {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>}
                {error && <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}
                
                {!isLoading && !error && (
                    <Grid container spacing={3}>
                        {tours.map((tour) => (
                            <Grid item key={tour.tourIdentity} xs={12} sm={6} md={4}>
                                <TourCard tour={tour} onBooking={handleBooking} />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
}

export default ToursPage;