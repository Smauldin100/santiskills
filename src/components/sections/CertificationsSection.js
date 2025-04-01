import React from 'react';
import { certificationsData } from '../../data/personalData';
import './CertificationsSection.css';

const CertificationsSection = () => {
  return (
    <div className="certifications-section">
      <h2>Certifications</h2>
      
      <div className="certifications-grid">
        {certificationsData.map((certification, index) => (
          <div key={index} className="certification-card">
            <div className="certification-badge">
              <span className="badge-icon">🏆</span>
            </div>
            <div className="certification-details">
              <h3>{certification.name}</h3>
              <div className="certification-meta">
                <span className="certification-issuer">{certification.issuer}</span>
                <div className="certification-dates">
                  <span className="certification-date">Issued: {certification.date}</span>
                  {certification.expiry && (
                    <span className="certification-expiry">
                      Expires: {certification.expiry}
                    </span>
                  )}
                </div>
              </div>
              {certification.credentialID && (
                <div className="credential-id">
                  Credential ID: {certification.credentialID}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsSection; 