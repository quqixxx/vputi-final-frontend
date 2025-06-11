// src/components/TourCard.jsx

import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';

function TourCard({ tour, onBooking }) {

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4, transition: '0.2s', '&:hover': {transform: 'scale(1.03)'} }}>
            <CardMedia
                component="img"
                height="200"
                image={tour.hotelPreview}
                alt={tour.hotelName}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                    {tour.hotelName} <Typography component="span" color="text.secondary">{tour.hotelCategoryName}</Typography>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {tour.nights} ночей, заезд {new Date(tour.checkinDate).toLocaleDateString('ru-RU')}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    Рейтинг отеля: {parseFloat(tour.hotelRating).toFixed(1)}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                    {tour.price.toLocaleString('ru-RU')} ₽
                </Typography>
                <Button 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => onBooking(tour.tourPageUrl)}
                >
                    Подробнее
                </Button>
            </CardActions>
        </Card>
    );
}

export default TourCard;