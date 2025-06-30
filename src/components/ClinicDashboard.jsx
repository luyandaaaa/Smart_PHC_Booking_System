import React from 'react';
import { Link } from 'react-router-dom';

const ClinicCard = ({ clinic, onSelect }) => {
  return (
    <div className="clinic-card" onClick={() => onSelect(clinic)}>
      <div className="clinic-image">
        <img src={clinic.image} alt={clinic.name} />
      </div>
      <div className="clinic-info">
        <h3>{clinic.name}</h3>
        <p>{clinic.specialty}</p>
        <div className="clinic-meta">
          <span className="location">
            <i className="material-icons">location_on</i> {clinic.location}
          </span>
          <span className="rating">
            <i className="material-icons">star</i> {clinic.rating}
          </span>
        </div>
      </div>
      <style jsx>{`
        .clinic-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .clinic-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 32px rgba(25,118,210,0.15);
        }
        
        .clinic-image {
          width: 100%;
          height: 120px;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        
        .clinic-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .clinic-info h3 {
          margin: 0 0 8px 0;
          color: #333;
          font-size: 1.1rem;
        }
        
        .clinic-info p {
          margin: 0 0 12px 0;
          color: #666;
          font-size: 0.9rem;
        }
        
        .clinic-meta {
          display: flex;
          justify-content: space-between;
          margin-top: auto;
        }
        
        .clinic-meta span {
          display: flex;
          align-items: center;
          color: #666;
          font-size: 0.8rem;
        }
        
        .clinic-meta i {
          font-size: 1rem;
          margin-right: 4px;
          color: var(--primary);
        }
      `}</style>
    </div>
  );
};

export default ClinicCard;