import React, { useState, useEffect } from 'react';
import { TextField, Typography, Grid, Card, CardContent } from '@material-ui/core';

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
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center" gutterBottom>
          Weather App
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Enter city name"
          variant="outlined"
          fullWidth
          value={city}
          onChange={handleCityChange}
        />
      </Grid>
      {weatherData && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                {weatherData.name}
              </Typography>
              <Typography variant="body1" component="p">
                Temperature: {weatherData.main.temp}°C
              </Typography>
              <Typography variant="body1" component="p">
                Weather: {weatherData.weather[0].main}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );
};

export default WeatherApp;
