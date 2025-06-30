// Badge.jsx
import React from 'react';

const colors = {
  yellow50: '#fef3c7',
  gray600: '#4b5563',
};

const Badge = ({ icon, title, translationMode, translateMedicalTerms }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{
      width: 48,
      height: 48,
      background: colors.yellow50,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      margin: '0 auto 8px auto',
    }}>
      {icon}
    </div>
    <span style={{ fontSize: 13, color: colors.gray600 }}>
      {translationMode ? translateMedicalTerms(title) : title}
    </span>
  </div>
);

export default Badge;
