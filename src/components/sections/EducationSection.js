import React from 'react';
import { educationData } from '../../data/personalData';
import './EducationSection.css';

const EducationSection = () => {
  return (
    <div className="education-section">
      <h2>Education</h2>
      
      <div className="education-cards">
        {educationData.map((education, index) => (
          <div key={index} className="education-card">
            <div className="education-header">
              <h3>{education.institution}</h3>
              <span className="education-year">{education.year}</span>
            </div>
            <h4>{education.degree}</h4>
            {education.gpa && (
              <div className="education-gpa">
                <span>GPA: {education.gpa}</span>
              </div>
            )}
            
            <div className="education-courses">
              <h5>Key Courses</h5>
              <div className="courses-list">
                {education.courses.map((course, i) => (
                  <span key={i} className="course-tag">{course}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationSection; 