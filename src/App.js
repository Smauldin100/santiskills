import React, { useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import SkillsRadarChart from './components/charts/SkillsRadarChart';
import ProjectsSection from './components/sections/ProjectsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import EducationSection from './components/sections/EducationSection';
import CertificationsSection from './components/sections/CertificationsSection';
import SkillsTimelineChart from './components/charts/SkillsTimelineChart';
import LanguageUsageChart from './components/charts/LanguageUsageChart';
import Chatbot from './components/Chatbot';
import './App.css';

function App() {
  const [activeSections, setActiveSections] = useState({
    profile: true,
    skills: true,
    projects: true,
    experience: true,
    education: true,
    certifications: true,
    skillsTimeline: true,
    languageUsage: true
  });

  const toggleSection = (section) => {
    setActiveSections({
      ...activeSections,
      [section]: !activeSections[section]
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SantiSkills Dashboard</h1>
        <div className="dashboard-controls">
          <button 
            className={`control-button ${activeSections.profile ? 'active' : ''}`}
            onClick={() => toggleSection('profile')}
          >
            Profile
          </button>
          <button 
            className={`control-button ${activeSections.skills ? 'active' : ''}`}
            onClick={() => toggleSection('skills')}
          >
            Skills
          </button>
          <button 
            className={`control-button ${activeSections.projects ? 'active' : ''}`}
            onClick={() => toggleSection('projects')}
          >
            Projects
          </button>
          <button 
            className={`control-button ${activeSections.experience ? 'active' : ''}`}
            onClick={() => toggleSection('experience')}
          >
            Experience
          </button>
          <button 
            className={`control-button ${activeSections.education ? 'active' : ''}`}
            onClick={() => toggleSection('education')}
          >
            Education
          </button>
          <button 
            className={`control-button ${activeSections.certifications ? 'active' : ''}`}
            onClick={() => toggleSection('certifications')}
          >
            Certifications
          </button>
        </div>
      </header>
      
      <main className="dashboard-container">
        {activeSections.profile && <ProfileHeader />}
        
        <div className="dashboard-grid">
          {activeSections.skills && (
            <div className="dashboard-item skills-item">
              <SkillsRadarChart />
            </div>
          )}
          
          {activeSections.languageUsage && (
            <div className="dashboard-item language-item">
              <LanguageUsageChart />
            </div>
          )}
        </div>
        
        {activeSections.skillsTimeline && <SkillsTimelineChart />}
        {activeSections.projects && <ProjectsSection />}
        {activeSections.experience && <ExperienceSection />}
        {activeSections.education && <EducationSection />}
        {activeSections.certifications && <CertificationsSection />}
      </main>
      
      <footer className="App-footer">
        <p>&copy; 2023 Santiago Mauldin. All rights reserved.</p>
      </footer>
      
      {/* Chatbot component */}
      <Chatbot />
    </div>
  );
}

export default App;
