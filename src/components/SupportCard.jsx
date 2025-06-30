// SupportCard.jsx
import React from 'react';

const colors = {
  green50: '#f0fdf4',
  green200: '#bbf7d0',
  green700: '#047857',
  green800: '#065f46',
  white: '#fff',
  success: '#10b981',
};

const SupportCard = ({ title, subtitle, contact, available }) => {
  return (
    <div style={{
      background: colors.green50,
      borderRadius: 12,
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
      border: `1px solid ${colors.green200}`,
      padding: 20,
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 220,
      maxWidth: 320,
      alignItems: 'flex-start',
    }}>
      <div style={{ fontWeight: 700, fontSize: 17, color: colors.green700 }}>{title}</div>
      <div style={{ color: colors.green700, fontSize: 15 }}>{subtitle}</div>
      <div style={{ color: colors.green800, fontSize: 14 }}>{contact}</div>
      <div style={{ color: '#64748b', fontSize: 13 }}>{available}</div>
    </div>
  );
};

export default SupportCard;
