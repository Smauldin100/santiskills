import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const CryptoContainer = styled.div`
  background-color: #ffffff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e0e0e0;
  margin-bottom: 20px; /* Add some space below */
`;

const Title = styled.h2`
  color: #333;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.5rem;
  text-align: center;
`;

const PriceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const PriceItem = styled.li`
  margin-bottom: 10px;
  font-size: 1.1rem;
  color: #555;
  display: flex;
  justify-content: space-between;
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
  }
`;

const CryptoPricesDisplay = () => {
  const [prices, setPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Updated to include 10 popular cryptocurrencies
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,solana,polkadot,dogecoin,shiba-inu,avalanche,chainlink,litecoin&vs_currencies=usd'
        );
        setPrices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching crypto prices.');
        setLoading(false);
        console.error('Error fetching crypto prices:', err);
      }
    };

    fetchPrices();
    // Fetch prices every 60 seconds (CoinGecko API rate limits should be considered for production)
    const intervalId = setInterval(fetchPrices, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading)
    return (
      <CryptoContainer>
        <Title>Real-time Crypto Prices</Title>
        <p>Loading prices...</p>
      </CryptoContainer>
    );
  if (error)
    return (
      <CryptoContainer>
        <Title>Real-time Crypto Prices</Title>
        <p style={{ color: 'red' }}>{error}</p>
      </CryptoContainer>
    );
  if (!prices || Object.keys(prices).length === 0)
    return (
      <CryptoContainer>
        <Title>Real-time Crypto Prices</Title>
        <p>No crypto data available.</p>
      </CryptoContainer>
    );

  // List of coins to display, using the IDs from the API call
  const coinsToDisplay = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'solana', name: 'Solana', symbol: 'SOL' },
    { id: 'polkadot', name: 'Polkadot', symbol: 'DOT' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE' },
    { id: 'shiba-inu', name: 'Shiba Inu', symbol: 'SHIB' },
    { id: 'avalanche', name: 'Avalanche', symbol: 'AVAX' },
    { id: 'chainlink', name: 'Chainlink', symbol: 'LINK' },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC' },
  ];

  return (
    <CryptoContainer className="dashboard-item">
      {' '}
      {/* Use dashboard-item class for consistent styling */}
      <Title>Real-time Crypto Prices</Title>
      <PriceList>
        {coinsToDisplay.map(
          coin =>
            prices[coin.id] && (
              <PriceItem key={coin.id}>
                <span>
                  {coin.name} ({coin.symbol})
                </span>
                <span>${prices[coin.id].usd}</span>
              </PriceItem>
            )
        )}
      </PriceList>
    </CryptoContainer>
  );
};

export default CryptoPricesDisplay;
