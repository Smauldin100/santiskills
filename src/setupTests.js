import '@testing-library/jest-dom';
import React from 'react';

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="mock-map">{children}</div>,
  TileLayer: () => null,
  Marker: ({ children }) => <div>{children}</div>,
  Popup: ({ children }) => <div>{children}</div>,
  useMap: jest.fn(),
  useMapEvent: jest.fn(),
  useMapEvents: jest.fn(),
}));
