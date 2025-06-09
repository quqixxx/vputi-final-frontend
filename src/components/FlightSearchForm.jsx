// src/components/FlightSearchForm.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Box, TextField, Button, Typography, Paper, Stack, CircularProgress, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { throttle } from 'lodash';
import dayjs from 'dayjs';
import { API_BASE_URL } from '../apiConfig';

function FlightSearchForm({ onSearch, isLoading }) {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [originInputValue, setOriginInputValue] = useState('');
    const [destinationInputValue, setDestinationInputValue] = useState('');
    const [originOptions, setOriginOptions] = useState([]);
    const [destinationOptions, setDestinationOptions] = useState([]);
    const [departureDate, setDepartureDate] = useState(null);

    const fetchSuggestions = React.useCallback(async (inputValue, setOptions) => {
        if (inputValue.length < 2) { 
            setOptions([]);
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/suggest-places-autocomplete?term=${inputValue}`);
            const data = await response.json();
            if (data && Array.isArray(data)) {
                setOptions(data);
            }
        } catch (error) {
            console.error("Ошибка получения подсказок:", error);
            setOptions([]);
        }
    }, []);
    
    const debouncedFetchOrigin = useMemo(() => throttle((inputValue) => fetchSuggestions(inputValue, setOriginOptions), 400), [fetchSuggestions]);
    const debouncedFetchDestination = useMemo(() => throttle((inputValue) => fetchSuggestions(inputValue, setDestinationOptions), 400), [fetchSuggestions]);

    useEffect(() => { debouncedFetchOrigin(originInputValue); }, [originInputValue, debouncedFetchOrigin]);
    useEffect(() => { debouncedFetchDestination(destinationInputValue); }, [destinationInputValue, debouncedFetchDestination]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (origin && destination && departureDate) {
            const formattedDate = dayjs(departureDate).format('YYYY-MM');
            onSearch(origin.code, destination.code, formattedDate);
        } else {
            alert("Пожалуйста, выберите города и укажите дату.");
        }
    };

    return (
        <Paper elevation={0} variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4, borderColor: 'grey.300' }}>
            <Typography variant="h5" component="h2" gutterBottom align="center" color="text.primary">
                Поиск авиабилетов
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <Autocomplete id="origin-autocomplete" options={originOptions} getOptionLabel={(option) => `${option.name} (${option.code})`} filterOptions={(x) => x} onInputChange={(event, newInputValue) => setOriginInputValue(newInputValue)} onChange={(event, newValue) => setOrigin(newValue)} renderInput={(params) => <TextField {...params} label="Откуда" required />} noOptionsText="Начните вводить город..." value={origin} isOptionEqualToValue={(option, value) => option.id === value.id} />
                    <Autocomplete id="destination-autocomplete" options={destinationOptions} getOptionLabel={(option) => `${option.name} (${option.code})`} filterOptions={(x) => x} onInputChange={(event, newInputValue) => setDestinationInputValue(newInputValue)} onChange={(event, newValue) => setDestination(newValue)} renderInput={(params) => <TextField {...params} label="Куда" required />} noOptionsText="Начните вводить город..." value={destination} isOptionEqualToValue={(option, value) => option.id === value.id} />
                    <DatePicker label="Дата вылета" value={departureDate} onChange={(newValue) => setDepartureDate(newValue)} views={['year', 'month']} format="MMMM YYYY" slotProps={{ textField: { required: true, helperText: 'ГГГГ-ММ' } }} />
                    <Button type="submit" variant="contained" color="secondary" disabled={isLoading} fullWidth sx={{ py: 1.5 }}>
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Найти билеты'}
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}

export default FlightSearchForm;