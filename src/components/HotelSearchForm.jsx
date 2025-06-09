// src/components/HotelSearchForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Box, TextField, Button, Typography, Paper, Stack, CircularProgress, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { throttle } from 'lodash';
import dayjs from 'dayjs';
import { API_BASE_URL } from '../apiConfig';

function HotelSearchForm({ onSearch, isLoading }) {
    const [destination, setDestination] = useState(null);
    const [destinationInputValue, setDestinationInputValue] = useState('');
    const [destinationOptions, setDestinationOptions] = useState([]);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [adults, setAdults] = useState(2);

    const fetchSuggestions = React.useCallback(async (inputValue, setOptions) => {
        if (inputValue.length < 2) { setOptions([]); return; }
        try {
            const response = await fetch(`${API_BASE_URL}/api/suggest-places-autocomplete?term=${inputValue}`);
            const data = await response.json();
            if (data && Array.isArray(data)) { setOptions(data); }
        } catch (error) { console.error("Ошибка получения подсказок:", error); setOptions([]); }
    }, []);
    
    const debouncedFetchDestination = useMemo(() => throttle((inputValue) => fetchSuggestions(inputValue, setDestinationOptions), 400), [fetchSuggestions]);

    useEffect(() => { debouncedFetchDestination(destinationInputValue); }, [destinationInputValue, debouncedFetchDestination]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (destination && destination.id && checkIn && checkOut && adults > 0) {
            const formattedCheckIn = dayjs(checkIn).format('YYYY-MM-DD');
            const formattedCheckOut = dayjs(checkOut).format('YYYY-MM-DD');
            onSearch({ cityId: destination.id, destinationName: destination.name, checkIn: formattedCheckIn, checkOut: formattedCheckOut, adults: adults });
        } else {
            alert("Пожалуйста, заполните все поля, выбирая город из списка.");
        }
    };

    return (
        <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4, borderColor: 'grey.300' }}>
            <Typography variant="h5" component="h2" gutterBottom align="center" color="text.primary">
                Поиск отелей
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Autocomplete id="destination-hotel-autocomplete" options={destinationOptions} getOptionLabel={(option) => `${option.name} (${option.code})`} filterOptions={(x) => x} onInputChange={(event, newInputValue) => setDestinationInputValue(newInputValue)} onChange={(event, newValue) => setDestination(newValue)} renderInput={(params) => <TextField {...params} label="Город или отель" required />} noOptionsText="Начните вводить город..." value={destination} isOptionEqualToValue={(option, value) => option.id === value.id}/>
                    <DatePicker label="Заезд" value={checkIn} onChange={(newValue) => setCheckIn(newValue)} format="D MMMM YYYY" slotProps={{ textField: { required: true } }}/>
                    <DatePicker label="Выезд" value={checkOut} onChange={(newValue) => setCheckOut(newValue)} format="D MMMM YYYY" slotProps={{ textField: { required: true } }}/>
                    <TextField id="adults-input" label="Количество гостей" type="number" value={adults} onChange={(e) => setAdults(parseInt(e.target.value, 10) || 1)} InputProps={{ inputProps: { min: 1, max: 8 } }} required />
                    <Button type="submit" variant="contained" color="secondary" disabled={isLoading} fullWidth sx={{ py: 1.5 }}>
                        {isLoading ? 'Идет поиск...' : 'Найти отели'}
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}

export default HotelSearchForm;