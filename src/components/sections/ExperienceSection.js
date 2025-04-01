import React from 'react';
import { experienceData } from '../../data/personalData';
import './ExperienceSection.css';

const ExperienceSection = () => {
  return (
    <div className="experience-section">
      <h2>Work Experience</h2>
      
      <div className="timeline">
        {experienceData.map((experience, index) => (
          <div 
            key={index} 
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            <div className="timeline-content">
              <div className="timeline-date">{experience.duration}</div>
              <h3>{experience.position}</h3>
              <h4>{experience.company}</h4>
              <p>{experience.description}</p>
              <ul className="achievements-list">
                {experience.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        
        <div className="timeline-line"></div>
      </div>
    </div>
  );
};

export default ExperienceSection; 