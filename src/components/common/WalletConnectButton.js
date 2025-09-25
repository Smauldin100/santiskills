import React, { useState } from 'react';
import { Button } from '@mui/material';

const WalletConnectButton = () => {
  const [account, setAccount] = useState(null);

  const handleConnect = async () => {
    if (!window.ethereum) {
      alert('MetaMask not found. Please install it to connect your wallet.');
      return;
    }
    try {
      const [selected] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(selected);
    } catch (err) {
      console.error('Wallet connection error:', err);
    }
  };

  const label = account
    ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
    : 'Connect Wallet';

  return (
    <Button variant="contained" onClick={handleConnect}>
      {label}
    </Button>
  );
};

export default WalletConnectButton;
