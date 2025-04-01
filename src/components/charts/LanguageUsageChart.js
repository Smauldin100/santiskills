import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { languageUsageData } from '../../data/personalData';
import './LanguageUsageChart.css';

const LanguageUsageChart = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="language-tooltip">
          <p className="language-name">{`${payload[0].name}`}</p>
          <p className="language-value">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="language-usage-container">
      <h3>Programming Languages Usage</h3>
      
      <div className="language-chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={languageUsageData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {languageUsageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="language-stats">
        {languageUsageData.map((language, index) => (
          <div 
            key={index} 
            className="language-stat-item"
            style={{ borderLeft: `4px solid ${COLORS[index % COLORS.length]}` }}
          >
            <span className="language-stat-name">{language.name}</span>
            <span className="language-stat-percentage">{language.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageUsageChart; 