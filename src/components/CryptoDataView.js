import React, { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import axios from 'axios';

const CryptoDataView = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual backend endpoint to fetch crypto data
        const response = await axios.get(
          'http://localhost:8080/api/crypto-data'
        ); // Example endpoint
        setData(response.data);
      } catch (err) {
        console.error('Error fetching crypto data:', err);
        setError('Failed to fetch crypto data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Loading crypto data...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  // TODO: Render the fetched data here
  // The structure of 'data' depends on the response from your backend endpoint
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cryptocurrency Data
      </Typography>
      <Typography variant="body1">Data fetched successfully!</Typography>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* Add more detailed rendering of your data here */}
    </Container>
  );
};

export default CryptoDataView;
