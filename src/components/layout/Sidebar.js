import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Divider,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as ProfileIcon,
  Assessment as AnalyticsIcon,
  Notifications as NotificationsIcon,
  Schedule as PlannerIcon,
  AccountCircle as AccountsIcon,
  Chat as ConversationsIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard',
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: <ProfileIcon />,
    path: '/profile',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: <AnalyticsIcon />,
    subItems: [
      {
        id: 'performance',
        label: 'Performance',
        path: '/analytics/performance',
      },
      { id: 'insights', label: 'Insights', path: '/analytics/insights' },
      { id: 'reports', label: 'Reports', path: '/analytics/reports' },
    ],
  },
  {
    id: 'planner',
    label: 'Planner',
    icon: <PlannerIcon />,
    subItems: [
      { id: 'calendar', label: 'Calendar', path: '/planner/calendar' },
      { id: 'tasks', label: 'Tasks', path: '/planner/tasks' },
      { id: 'goals', label: 'Goals', path: '/planner/goals' },
    ],
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <NotificationsIcon />,
    path: '/notifications',
  },
  {
    id: 'accounts',
    label: 'Connected Accounts',
    icon: <AccountsIcon />,
    subItems: [
      { id: 'social', label: 'Social Media', path: '/accounts/social' },
      {
        id: 'professional',
        label: 'Professional',
        path: '/accounts/professional',
      },
      { id: 'other', label: 'Other Platforms', path: '/accounts/other' },
    ],
  },
  {
    id: 'conversations',
    label: 'Conversations',
    icon: <ConversationsIcon />,
    path: '/conversations',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
  },
];

const Sidebar = ({ open, onClose, variant = 'permanent' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  const handleItemClick = item => {
    if (item.subItems) {
      setExpandedItems(prev => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    } else {
      navigate(item.path);
      if (variant === 'temporary') {
        onClose();
      }
    }
  };

  const isSelected = path => location.pathname === path;

  const renderMenuItem = item => (
    <React.Fragment key={item.id}>
      <ListItem disablePadding>
        <ListItemButton
          onClick={() => handleItemClick(item)}
          selected={item.path ? isSelected(item.path) : false}
          sx={{
            minHeight: 48,
            px: 2.5,
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: isSelected(item.path) ? 600 : 400,
            }}
          />
          {item.subItems &&
            (expandedItems[item.id] ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>

      {item.subItems && (
        <Collapse in={expandedItems[item.id]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.subItems.map(subItem => (
              <ListItemButton
                key={subItem.id}
                onClick={() => handleItemClick(subItem)}
                selected={isSelected(subItem.path)}
                sx={{ pl: 4 }}
              >
                <ListItemText
                  primary={subItem.label}
                  primaryTypographyProps={{
                    fontSize: '0.85rem',
                    fontWeight: isSelected(subItem.path) ? 600 : 400,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </React.Fragment>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <DrawerHeader>
        <Box sx={{ flexGrow: 1, pl: 2 }}>
          <Typography variant="h6" component="div" color="primary">
            SantiSkills
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>{menuItems.map(renderMenuItem)}</List>
    </Drawer>
  );
};

export default Sidebar;
