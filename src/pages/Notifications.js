import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Chip,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Task as TaskIcon,
  Message as MessageIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const notifications = [
  {
    id: 1,
    type: 'task',
    title: 'New Task Assigned',
    message:
      'You have been assigned a new task: "Complete Project Documentation"',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    message: 'John Doe sent you a message about the project timeline',
    time: '5 hours ago',
    read: false,
  },
  {
    id: 3,
    type: 'system',
    title: 'System Update',
    message: 'The system will be undergoing maintenance tomorrow at 2 AM',
    time: '1 day ago',
    read: true,
  },
  {
    id: 4,
    type: 'achievement',
    title: 'Achievement Unlocked',
    message: 'Congratulations! You have completed 10 tasks in a row',
    time: '2 days ago',
    read: true,
  },
];

const Notifications = () => {
  const [tabValue, setTabValue] = useState(0);
  const [notificationList, setNotificationList] = useState(notifications);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDeleteNotification = id => {
    setNotificationList(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const getNotificationIcon = type => {
    switch (type) {
      case 'task':
        return <TaskIcon />;
      case 'message':
        return <MessageIcon />;
      case 'system':
        return <WarningIcon />;
      case 'achievement':
        return <CheckCircleIcon />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getNotificationColor = type => {
    switch (type) {
      case 'task':
        return 'primary';
      case 'message':
        return 'info';
      case 'system':
        return 'warning';
      case 'achievement':
        return 'success';
      default:
        return 'default';
    }
  };

  const filteredNotifications = notificationList.filter(notification => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return !notification.read;
    return notification.read;
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Notifications
      </Typography>

      <Card>
        <CardContent>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
            <Tab label="All" />
            <Tab label="Unread" />
            <Tab label="Read" />
          </Tabs>

          <List>
            {filteredNotifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    bgcolor: notification.read ? 'transparent' : 'action.hover',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: `${getNotificationColor(notification.type)}.main`,
                      }}
                    >
                      {getNotificationIcon(notification.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Typography variant="subtitle1">
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <Chip
                            label="New"
                            size="small"
                            color="primary"
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="textSecondary">
                          {notification.message}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {notification.time}
                        </Typography>
                      </>
                    }
                  />
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={() => handleDeleteNotification(notification.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
                {index < filteredNotifications.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>

          {filteredNotifications.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="textSecondary">
                No notifications found
              </Typography>
            </Box>
          )}

          {notificationList.some(n => !n.read) && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setNotificationList(prev =>
                    prev.map(notification => ({ ...notification, read: true }))
                  );
                }}
              >
                Mark All as Read
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Notifications;
