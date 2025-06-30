// QuickActionCard.jsx
import React from 'react';

const colors = {
  gray200: '#e5e7eb',
  blue50: '#eff6ff',
  gray800: '#1f2937',
  gray100: '#f3f4f6',
  primary: '#3b82f6',
};

const QuickActionCard = ({ icon: Icon, title, color, onClick, translationMode, translateMedicalTerms }) => (
  <button
    onClick={onClick}
    style={{
      padding: 20,
      border: `1px solid ${colors.gray200}`,
      borderRadius: 12,
      background: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'background 0.2s, border 0.2s',
      cursor: 'pointer',
      marginBottom: 0,
      outline: 'none',
      color,
    }}
    onMouseEnter={e => {
      e.currentTarget.style.background = colors.blue50;
      e.currentTarget.style.borderColor = colors.primary;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.background = '#fff';
      e.currentTarget.style.borderColor = colors.gray200;
    }}
  >
    <Icon size={28} color={color} style={{ marginBottom: 8 }} />
    <span style={{ fontSize: 14, fontWeight: 500, color: colors.gray800, textAlign: 'center' }}>
      {translationMode ? translateMedicalTerms(title) : title}
    </span>
  </button>
);

export default QuickActionCard;
