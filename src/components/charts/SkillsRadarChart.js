import React, { useState, useEffect } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { skillsData } from '../../data/personalData';
import './SkillsRadarChart.css';

const SkillsRadarChart = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredSkills, setFilteredSkills] = useState(skillsData);
  
  // Extract unique categories
  const categories = ['All', ...new Set(skillsData.map(skill => skill.category))];
  
  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredSkills(skillsData);
    } else {
      setFilteredSkills(skillsData.filter(skill => skill.category === selectedCategory));
    }
  }, [selectedCategory]);
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{`${payload[0].payload.name}`}</p>
          <p className="tooltip-data">{`Level: ${payload[0].value}/100`}</p>
          <p className="tooltip-category">{`Category: ${payload[0].payload.category}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="skills-radar-container">
      <div className="skills-filter">
        <h3>Filter by Category:</h3>
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={filteredSkills}>
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Skill Level"
            dataKey="level"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
      
      <div className="skills-legend">
        <h3>Skill Levels</h3>
        <div className="skill-levels">
          <div className="skill-level-item">
            <span className="skill-level-color" style={{ backgroundColor: '#8884d8' }}></span>
            <span className="skill-level-text">Skill Proficiency (0-100)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsRadarChart; 