import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { skillsGrowthData } from '../../data/personalData';
import './SkillsTimelineChart.css';

const SkillsTimelineChart = () => {
  const [selectedSkills, setSelectedSkills] = useState(['React', 'JavaScript', 'Node.js', 'Python']);
  
  // Extract all skill names from data except 'year'
  const availableSkills = Object.keys(skillsGrowthData[0]).filter(key => key !== 'year');
  
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  
  // Colors for the lines
  const skillColors = {
    'React': '#61dafb',
    'JavaScript': '#f7df1e',
    'Node.js': '#68a063',
    'Python': '#3776ab'
  };
  
  return (
    <div className="skills-timeline-container">
      <h3>Skills Growth Over Time</h3>
      
      <div className="skills-selector">
        {availableSkills.map(skill => (
          <button 
            key={skill}
            className={`skill-toggle ${selectedSkills.includes(skill) ? 'active' : ''}`}
            onClick={() => toggleSkill(skill)}
            style={selectedSkills.includes(skill) ? { backgroundColor: skillColors[skill] || '#8884d8' } : {}}
          >
            {skill}
          </button>
        ))}
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={skillsGrowthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          
          {selectedSkills.map(skill => (
            <Line 
              key={skill}
              type="monotone" 
              dataKey={skill} 
              stroke={skillColors[skill] || '#8884d8'} 
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      
      <div className="skills-timeline-info">
        <p>This chart shows my skill development over the years. Toggle the buttons above to show/hide specific skills.</p>
      </div>
    </div>
  );
};

export default SkillsTimelineChart; 