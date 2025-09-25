import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      taskReminders: true,
      mentions: true,
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      compactMode: false,
    },
    language: 'en',
    timezone: 'UTC',
    storage: {
      autoBackup: true,
      backupFrequency: 'daily',
    },
  });

  const handleNotificationChange = setting => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: !prev.notifications[setting],
      },
    }));
  };

  const handleAppearanceChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [setting]: value,
      },
    }));
  };

  const handleLanguageChange = event => {
    setSettings(prev => ({
      ...prev,
      language: event.target.value,
    }));
  };

  const handleTimezoneChange = event => {
    setSettings(prev => ({
      ...prev,
      timezone: event.target.value,
    }));
  };

  const handleStorageChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      storage: {
        ...prev.storage,
        [setting]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log('Saving settings:', settings);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Notifications Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <NotificationsIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive notifications via email"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Push Notifications"
                    secondary="Receive push notifications"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Task Reminders"
                    secondary="Get reminded about upcoming tasks"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.taskReminders}
                      onChange={() => handleNotificationChange('taskReminders')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Mentions"
                    secondary="Get notified when mentioned"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.notifications.mentions}
                      onChange={() => handleNotificationChange('mentions')}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaletteIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Appearance</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Theme"
                    secondary="Choose your preferred theme"
                  />
                  <ListItemSecondaryAction>
                    <Select
                      value={settings.appearance.theme}
                      onChange={e =>
                        handleAppearanceChange('theme', e.target.value)
                      }
                      size="small"
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="system">System</MenuItem>
                    </Select>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Font Size"
                    secondary="Adjust the text size"
                  />
                  <ListItemSecondaryAction>
                    <Select
                      value={settings.appearance.fontSize}
                      onChange={e =>
                        handleAppearanceChange('fontSize', e.target.value)
                      }
                      size="small"
                    >
                      <MenuItem value="small">Small</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="large">Large</MenuItem>
                    </Select>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Compact Mode"
                    secondary="Use a more compact layout"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.appearance.compactMode}
                      onChange={e =>
                        handleAppearanceChange('compactMode', e.target.checked)
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Language and Region */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LanguageIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Language & Region</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Language"
                    secondary="Select your preferred language"
                  />
                  <ListItemSecondaryAction>
                    <Select
                      value={settings.language}
                      onChange={handleLanguageChange}
                      size="small"
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Spanish</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="de">German</MenuItem>
                    </Select>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Timezone"
                    secondary="Set your local timezone"
                  />
                  <ListItemSecondaryAction>
                    <Select
                      value={settings.timezone}
                      onChange={handleTimezoneChange}
                      size="small"
                    >
                      <MenuItem value="UTC">UTC</MenuItem>
                      <MenuItem value="EST">Eastern Time</MenuItem>
                      <MenuItem value="PST">Pacific Time</MenuItem>
                    </Select>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Storage and Backup */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <StorageIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Storage & Backup</Typography>
              </Box>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Auto Backup"
                    secondary="Automatically backup your data"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={settings.storage.autoBackup}
                      onChange={e =>
                        handleStorageChange('autoBackup', e.target.checked)
                      }
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Backup Frequency"
                    secondary="How often to backup your data"
                  />
                  <ListItemSecondaryAction>
                    <Select
                      value={settings.storage.backupFrequency}
                      onChange={e =>
                        handleStorageChange('backupFrequency', e.target.value)
                      }
                      size="small"
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSettings}
        >
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
