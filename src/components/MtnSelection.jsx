import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 1000,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  maxWidth: 300,
  pointerEvents: 'auto',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const MtnSelection = ({ onSelectPoint }) => {
  const [selectedPoint, setSelectedPoint] = useState('');

  const handleChange = (event) => {
    setSelectedPoint(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedPoint) {
      onSelectPoint(selectedPoint);
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <StyledTitle variant="h6">
          Select Elevation Point
        </StyledTitle>
        <StyledFormControl component="fieldset">
          <RadioGroup aria-label="elevation point" name="elevationPoint" value={selectedPoint} onChange={handleChange}>
            <FormControlLabel value="north" control={<Radio />} label="North Sister (3074m)" />
            <FormControlLabel value="middle" control={<Radio />} label="Middle Sister (3062m)" />
            <FormControlLabel value="south" control={<Radio />} label="South Sister (3157m)" />
          </RadioGroup>
        </StyledFormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!selectedPoint}>
          Show Elevation
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default MtnSelection;