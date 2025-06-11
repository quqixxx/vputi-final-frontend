// src/pages/HotelSearchPage.jsx
import React, { useState } from 'react';
import HotelSearchForm from '../components/HotelSearchForm';
import { Container, Box, Typography } from '@mui/material';
import { API_BASE_URL } from '../apiConfig';

function HotelSearchPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleHotelSearch = async (searchParams) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/api/generate-hotel-deeplink`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchParams)
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Ошибка генерации ссылки на отель');
            }
            const data = await response.json();
            if (data.success && data.deeplink) {
                window.open(data.deeplink, '_blank'); 
            } else {
                throw new Error('Не удалось получить корректный deeplink от сервера.');
            }
        } catch (err) {
            setError(err.message);
        } 
        finally { setIsLoading(false); }
    };

    return (
        <Box sx={{ pt: 8, pb: 10, background: 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)', flexGrow: 1 }}>
            <Container maxWidth="md">
                <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', color: 'text.primary', mb: 4 }}>
                  Найдите отель своей мечты
                </Typography>
                <HotelSearchForm onSearch={handleHotelSearch} isLoading={isLoading} />
                {error && <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>{error}</Typography>}
            </Container>
        </Box>
    );
}

export default HotelSearchPage;