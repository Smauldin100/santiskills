import React from 'react';
import { personalInfo } from '../data/personalData';
import './ProfileHeader.css';

const ProfileHeader = () => {
  return (
    <div className="profile-header">
      <div className="profile-header-content">
        <div className="profile-avatar">
          {/* Placeholder for profile image */}
          <div className="avatar-placeholder">
            {personalInfo.name.charAt(0)}
          </div>
        </div>
        <div className="profile-info">
          <h1>{personalInfo.name}</h1>
          <h2>{personalInfo.title}</h2>
          <p className="profile-bio">{personalInfo.bio}</p>
          <div className="profile-contact">
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>{personalInfo.location}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>{personalInfo.email}</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <span>{personalInfo.phone}</span>
            </div>
          </div>
          <div className="profile-links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="profile-link">
              GitHub
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">
              LinkedIn
            </a>
            <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="profile-link">
              Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader; 