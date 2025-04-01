import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { projectsData } from '../../data/personalData';
import './ProjectsSection.css';

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  
  const getSortedProjects = () => {
    const sorted = [...projectsData];
    
    if (sortBy === 'name') {
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'completion') {
      return sorted.sort((a, b) => b.completion - a.completion);
    }
    
    return sorted;
  };
  
  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };
  
  const closeProjectDetails = () => {
    setSelectedProject(null);
  };
  
  const sortedProjects = getSortedProjects();
  
  return (
    <div className="projects-section">
      <div className="projects-header">
        <h2>Project Portfolio</h2>
        <div className="projects-sort">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="completion">Completion</option>
          </select>
        </div>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedProjects}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="completion" 
              fill="#82ca9d" 
              name="Completion %" 
              onClick={handleProjectClick}
              cursor="pointer"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="projects-grid">
        {sortedProjects.map((project) => (
          <div 
            key={project.name} 
            className="project-card"
            onClick={() => handleProjectClick(project)}
          >
            <div className="project-completion-indicator" style={{ width: `${project.completion}%` }}></div>
            <h3>{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-completion">
              <div className="completion-text">Completion: {project.completion}%</div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedProject && (
        <div className="project-details-overlay">
          <div className="project-details">
            <button className="close-button" onClick={closeProjectDetails}>×</button>
            <h2>{selectedProject.name}</h2>
            <div className="project-detail-completion">
              <div className="completion-bar">
                <div 
                  className="completion-progress" 
                  style={{ width: `${selectedProject.completion}%` }}
                ></div>
              </div>
              <span>{selectedProject.completion}% Complete</span>
            </div>
            <p className="project-detail-description">{selectedProject.description}</p>
            
            <div className="project-detail-technologies">
              <h3>Technologies Used</h3>
              <div className="tech-tags">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="project-detail-actions">
              <a 
                href={selectedProject.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection; 