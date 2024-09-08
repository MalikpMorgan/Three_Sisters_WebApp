import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Typography, Box, Card, CardContent } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  zIndex: 1000,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  maxWidth: 300,
  pointerEvents: 'auto',
}));

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (city !== '') {
      fetchData();
    }
  }, [API_URL, city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box sx={{ width: '100%', maxWidth: 600 }}>
          <StyledCard>
            <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Current Weather
              </Typography>
              <Typography variant="h5" component="h2">
                {weatherData?.name}
              </Typography>
              <Typography variant="body1" component="p">
                Temperature: {weatherData?.main.temp}°C
              </Typography>
              <Typography variant="body1" component="p">
                Weather: {weatherData?.weather[0].main}
              </Typography>
            </CardContent>
          </StyledCard>
      </Box>
    </Box>
  );
};

export default WeatherApp;
