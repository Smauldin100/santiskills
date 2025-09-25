import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChatIcon from '@mui/icons-material/Chat';
import WorkIcon from '@mui/icons-material/Work';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskIcon from '@mui/icons-material/Task';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MapIcon from '@mui/icons-material/Map';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #263238; /* Darker, more modern background */
  color: #e0e0e0; /* Lighter text color */
  padding: 20px 0;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); /* Subtle shadow on the right */

  /* Scrollbar Styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #37474f; /* Track color */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #546e7a; /* Thumb color */
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #78909c; /* Thumb color on hover */
  }
`;

const Logo = styled.div`
  padding: 20px;
  font-size: 1.8rem; /* Slightly larger font */
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #37474f; /* Darker border */
  margin-bottom: 20px;
  color: #ffffff; /* White color for logo */
`;

const NavSection = styled.div`
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #37474f; /* Darker border */

  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.div`
  padding: 10px 20px;
  color: #90a4ae; /* Muted color for section title */
  font-size: 0.9rem; /* Slightly larger font */
  text-transform: uppercase;
  letter-spacing: 1.5px; /* Increased letter spacing */
  font-weight: 500;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: ${props =>
    props.active
      ? '#ffffff'
      : '#e0e0e0'}; /* White for active, light grey for inactive */
  text-decoration: none;
  transition: all 0.3s ease;
  background: ${props =>
    props.active
      ? 'rgba(255, 255, 255, 0.1)'
      : 'transparent'}; /* Subtle background for active */

  &:hover {
    background: rgba(255, 255, 255, 0.05); /* Subtle hover effect */
    color: #ffffff; /* White text on hover */
  }

  .icon {
    margin-right: 10px;
    font-size: 20px; /* Standard icon size */
  }
`;

const ClickableNavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #e0e0e0; /* Light grey text */
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05); /* Subtle hover effect */
    color: #ffffff; /* White text on hover */
  }

  .icon {
    margin-right: 10px;
    font-size: 20px; /* Standard icon size */
  }
`;

const Sidebar = () => {
  const location = useLocation();
  const [showSidebarMap, setShowSidebarMap] = useState(false);
  const [userPosition, setUserPosition] = useState(null);

  // Get user location when map is opened
  useEffect(() => {
    if (showSidebarMap && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
        () => setUserPosition(null)
      );
    }
  }, [showSidebarMap]);

  const navSections = [
    {
      title: 'Main',
      items: [
        {
          path: '/',
          icon: <DashboardIcon className="icon" />,
          label: 'Dashboard',
        },
        {
          path: '/profile',
          icon: <PersonIcon className="icon" />,
          label: 'Profile',
        },
      ],
    },
    {
      title: 'Communication',
      items: [
        {
          path: '/notifications',
          icon: <NotificationsIcon className="icon" />,
          label: 'Notifications',
        },
      ],
    },
    {
      title: 'Organization',
      items: [
        {
          path: '/calendar',
          icon: <CalendarMonthIcon className="icon" />,
          label: 'Calendar',
        },
        { path: '/tasks', icon: <TaskIcon className="icon" />, label: 'Tasks' },
        {
          path: '/projects',
          icon: <WorkIcon className="icon" />,
          label: 'Projects',
        },
      ],
    },
    {
      title: 'Finance & Tracking',
      items: [
        {
          path: '/finances',
          icon: <AccountBalanceWalletIcon className="icon" />,
          label: 'Finances',
        },
        {
          path: '/trackers',
          icon: <TrackChangesIcon className="icon" />,
          label: 'Trackers',
        },
      ],
    },
    {
      title: 'System',
      items: [
        {
          path: '/files',
          icon: <CloudUploadIcon className="icon" />,
          label: 'Files & Media',
        },
        {
          path: '/settings',
          icon: <SettingsIcon className="icon" />,
          label: 'Settings',
        },
      ],
    },
    {
      title: 'Map',
      items: [
        {
          label: 'Map',
          icon: <MapIcon className="icon" />,
          onClick: () => setShowSidebarMap(true),
        },
      ],
    },
  ];

  return (
    <SidebarContainer>
      <Logo>SantiSkills</Logo>
      {navSections.map((section, index) => (
        <NavSection key={index}>
          <SectionTitle>{section.title}</SectionTitle>
          {section.items.map(item =>
            item.onClick ? (
              <ClickableNavItem key={item.label} onClick={item.onClick}>
                {item.icon}
                {item.label}
              </ClickableNavItem>
            ) : (
              <NavItem
                key={item.path}
                to={item.path}
                active={location.pathname === item.path ? 1 : 0}
              >
                {item.icon}
                {item.label}
              </NavItem>
            )
          )}
        </NavSection>
      ))}
      {/* Fullscreen Map Modal */}
      {showSidebarMap && (
        <div className="global-modal-overlay">
          <div
            className="global-modal-content"
            style={{ padding: 0, overflow: 'hidden' }}
          >
            {' '}
            {/* Adjust padding for map content */}
            <button
              className="global-modal-close"
              onClick={() => setShowSidebarMap(false)}
            >
              ✖
            </button>
            <div style={{ width: '100%', height: '100%' }}>
              <MapContainer
                center={userPosition || [51.505, -0.09]}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {userPosition && (
                  <Marker position={userPosition}>
                    <Popup>You are here!</Popup>
                  </Marker>
                )}
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
