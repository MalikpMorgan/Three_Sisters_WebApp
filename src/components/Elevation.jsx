import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { CircularProgress, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  right: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  maxWidth: 500,
  pointerEvents: 'auto',
}));

const ThreeSistersElevationChart = () => {
  const [elevationData, setElevationData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchElevationData = async () => {
      const apiKey = 'YOUR_GOOGLE_ELEVATION_API_KEY';
      const coordinates = [
        { lat: 44.1034, lng: -121.671 },
        { lat: 44.1284, lng: -121.833 },
        { lat: 44.1392, lng: -121.769 }
      ];

      const requests = coordinates.map(({ lat, lng }) =>
        fetch(`https://maps.googleapis.com/maps/api/elevation/json?locations=${lat},${lng}&key=${apiKey}`)
          .then(response => response.json())
      );

      try {
        const responses = await Promise.all(requests);
        const elevationData = responses.map(response => response.results[0].elevation);
        
        setElevationData(elevationData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching elevation data:', error);
      }
    };

    fetchElevationData();
  }, []);

  return (
    <ChartContainer>
      <Typography variant="h5" gutterBottom>
        Three Sisters Elevation Data
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <LineChart
          width={800}
          height={400}
          data={elevationData.map((elevation, index) => ({ name: `Point ${index + 1}`, elevation }))}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="elevation" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      )}
    </ChartContainer>
  );
};

export default ThreeSistersElevationChart;
