import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Performance from './Performance';
import Insights from './Insights';
import Reports from './Reports';

const Analytics = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="performance" replace />} />
      <Route path="performance" element={<Performance />} />
      <Route path="insights" element={<Insights />} />
      <Route path="reports" element={<Reports />} />
    </Routes>
  );
};

export default Analytics; 