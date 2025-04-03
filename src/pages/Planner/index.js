import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Calendar from './Calendar';
import Tasks from './Tasks';
import Goals from './Goals';

const Planner = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="calendar" replace />} />
      <Route path="calendar" element={<Calendar />} />
      <Route path="tasks" element={<Tasks />} />
      <Route path="goals" element={<Goals />} />
    </Routes>
  );
};

export default Planner; 