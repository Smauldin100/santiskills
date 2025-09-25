import React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  LinearProgress,
  Box,
  Grow,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  AttachMoney,
  ShowChart,
} from '@mui/icons-material';
import { usePlaidLink } from 'react-plaid-link';
import { useState, useEffect } from 'react';
import axios from 'axios';
import WalletConnectButton from '../common/WalletConnectButton';
import { fetchCryptoPrice } from '../../services/cryptoService';
import { useNavigate } from 'react-router-dom';

const FinancesContainer = styled.div`
  padding: 20px;
`;

const StatsCard = styled(Card)`
  height: 100%;
  background: ${props => props.gradient || 'white'} !important;
  color: ${props => (props.light ? 'white' : 'inherit')} !important;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  .icon {
    font-size: 2rem;
    margin-right: 10px;
    color: ${props => (props.light ? 'white' : '#1a73e8')};
  }
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const FinancesSection = () => {
  const navigate = useNavigate();
  const [btcPrice, setBtcPrice] = useState(null);

  useEffect(() => {
    const loadPrice = async () => {
      try {
        const price = await fetchCryptoPrice('bitcoin');
        setBtcPrice(price);
      } catch (err) {
        console.error(err);
      }
    };
    loadPrice();
  }, []);

  const stats = [
    {
      title: 'Total Balance',
      value: '$12,750.00',
      icon: <AccountBalance className="icon" />,
      gradient: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
      light: true,
    },
    {
      title: 'Monthly Income',
      value: '$4,250.00',
      icon: <TrendingUp className="icon" />,
      gradient: 'linear-gradient(135deg, #FF0099 0%, #FF6B6B 100%)',
      light: true,
    },
    {
      title: 'Expenses',
      value: '$2,850.00',
      icon: <AttachMoney className="icon" />,
      gradient: 'linear-gradient(135deg, #02AABD 0%, #00CDAC 100%)',
      light: true,
    },
    {
      title: 'Investments',
      value: '$5,650.00',
      icon: <ShowChart className="icon" />,
      gradient: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)',
      light: true,
    },
  ];

  const budgets = [
    { category: 'Housing', spent: 1200, total: 1500, percentage: 80 },
    { category: 'Transportation', spent: 300, total: 400, percentage: 75 },
    { category: 'Food', spent: 450, total: 600, percentage: 75 },
    { category: 'Utilities', spent: 180, total: 200, percentage: 90 },
  ];

  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8080/create_link_token',
          { client_user_id: 'unique_user_id' }
        );
        setLinkToken(response.data.link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };
    fetchLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      console.log('Plaid Link Success!', public_token, metadata);
    },
    onEvent: (eventName, metadata) => {
      console.log('Plaid Link Event:', eventName, metadata);
    },
    onExit: (err, metadata) => {
      console.error('Plaid Link Exit:', err, metadata);
    },
  });

  return (
    <FinancesContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <WalletConnectButton />
        {btcPrice && (
          <Typography variant="body2" sx={{ ml: 2 }}>
            BTC Price: ${btcPrice}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={() => navigate('/crypto-data')}
          sx={{ ml: 2 }}
        >
          btcc link api
        </Button>
      </Box>

      <Grow in={true} timeout={500}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <StatsCard gradient={stat.gradient} light={stat.light}>
                <CardContent>
                  <IconWrapper light={stat.light}>
                    {stat.icon}
                    <Typography variant="h6">{stat.title}</Typography>
                  </IconWrapper>
                  <Typography variant="h4">{stat.value}</Typography>
                </CardContent>
              </StatsCard>
            </Grid>
          ))}
        </Grid>
      </Grow>

      <Card style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Monthly Budget Overview
          </Typography>
          {budgets.map((budget, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <ProgressLabel>
                <Typography variant="body2">{budget.category}</Typography>
                <Typography variant="body2">
                  ${budget.spent} / ${budget.total}
                </Typography>
              </ProgressLabel>
              <LinearProgress
                variant="determinate"
                value={budget.percentage}
                color={budget.percentage > 90 ? 'error' : 'primary'}
              />
            </div>
          ))}
          <Button
            variant="contained"
            color="primary"
            onClick={() => open()}
            disabled={!ready || !linkToken}
            style={{ marginTop: '20px' }}
          >
            Link Bank Account
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </FinancesContainer>
  );
};

export default FinancesSection;
