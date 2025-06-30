// EmergencyCard.jsx
import React, { useState } from 'react';

const EmergencyCard = ({ title, subtitle, icon: Icon, color, urgent, type, contact, onLocationShare, onEmergencyCall }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (type === 'phone') {
      if (onEmergencyCall) {
        onEmergencyCall(contact);
      }
      // Direct call functionality
      window.location.href = `tel:${contact}`;
    } else if (type === 'location' && onLocationShare) {
      onLocationShare();
    }
  };

  return (
    <div
      style={{
        background: urgent ? '#fef2f2' : '#fff7ed',
        border: `2px solid ${color || '#fecaca'}`,
        borderRadius: 14,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        boxShadow: isHovered 
          ? (urgent ? '0 10px 25px rgba(239,68,68,0.2)' : '0 10px 25px rgba(251,191,36,0.15)')
          : (urgent ? '0 2px 8px rgba(239,68,68,0.08)' : '0 1px 2px rgba(251,191,36,0.05)'),
        marginBottom: 0,
        cursor: type ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div
        style={{
          background: color || '#ef4444',
          borderRadius: '50%',
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'transform 0.2s ease',
        }}
      >
        {Icon && <Icon size={28} color={'#fff'} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontWeight: 700, 
          fontSize: 17, 
          color: urgent ? '#b91c1c' : '#b45309', 
          marginBottom: 2,
          textDecoration: isHovered && type ? 'underline' : 'none'
        }}>
          {title}
        </div>
        <div style={{ 
          color: urgent ? '#b91c1c' : '#b45309', 
          fontSize: 15 
        }}>
          {subtitle}
        </div>
        {contact && (
          <div style={{ 
            color: '#2563eb', 
            fontSize: 14, 
            fontWeight: 600,
            marginTop: 4
          }}>
            {contact}
          </div>
        )}
      </div>
      {urgent && (
        <div style={{
          background: '#dc2626',
          color: 'white',
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 600,
          animation: isHovered ? 'pulse 1s infinite' : 'none'
        }}>
          URGENT
        </div>
      )}
    </div>
  );
};

export default EmergencyCard;
