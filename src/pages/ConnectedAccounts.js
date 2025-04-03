import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Microsoft as MicrosoftIcon,
  Apple as AppleIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Close as CloseIcon,
} from '@mui/icons-material';

const ConnectedAccounts = () => {
  const [connectedServices, setConnectedServices] = useState([
    { id: 'google', name: 'Google', icon: <GoogleIcon />, connected: true },
    { id: 'microsoft', name: 'Microsoft', icon: <MicrosoftIcon />, connected: true },
    { id: 'apple', name: 'Apple', icon: <AppleIcon />, connected: false },
    { id: 'linkedin', name: 'LinkedIn', icon: <LinkedInIcon />, connected: false },
    { id: 'github', name: 'GitHub', icon: <GitHubIcon />, connected: false },
  ]);

  const [disconnectDialog, setDisconnectDialog] = useState({
    open: false,
    service: null,
  });

  const handleConnect = (serviceId) => {
    setConnectedServices((prev) =>
      prev.map((service) =>
        service.id === serviceId ? { ...service, connected: true } : service
      )
    );
  };

  const handleDisconnectClick = (service) => {
    setDisconnectDialog({ open: true, service });
  };

  const handleDisconnectConfirm = () => {
    setConnectedServices((prev) =>
      prev.map((service) =>
        service.id === disconnectDialog.service.id
          ? { ...service, connected: false }
          : service
      )
    );
    setDisconnectDialog({ open: false, service: null });
  };

  const handleDisconnectCancel = () => {
    setDisconnectDialog({ open: false, service: null });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Connected Accounts
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Manage your connected services and applications
      </Typography>

      <Grid container spacing={3}>
        {connectedServices.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {service.icon}
                    <Typography variant="h6">{service.name}</Typography>
                  </Box>
                  {service.connected ? (
                    <Tooltip title="Disconnect">
                      <IconButton
                        color="error"
                        onClick={() => handleDisconnectClick(service)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleConnect(service.id)}
                    >
                      Connect
                    </Button>
                  )}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  {service.connected
                    ? 'Connected and syncing data'
                    : 'Not connected'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={disconnectDialog.open}
        onClose={handleDisconnectCancel}
      >
        <DialogTitle>Disconnect Service</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to disconnect {disconnectDialog.service?.name}?
            This will stop syncing data from this service.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisconnectCancel}>Cancel</Button>
          <Button onClick={handleDisconnectConfirm} color="error">
            Disconnect
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConnectedAccounts; 