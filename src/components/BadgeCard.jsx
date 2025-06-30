// BadgeCard.jsx
import React from 'react';

const colors = {
  orange50: '#fff7ed',
  orange400: '#fdba74',
  gray50: '#f9fafb',
  gray200: '#e5e7eb',
  gray600: '#6b7280',
  orange600: '#f59e42',
  orange700: '#b45309',
  green400: '#4ade80',
  gray400: '#9ca3af',
};

const BadgeCard = ({ badge, t, translationMode, translateMedicalTerms }) => {
  return (
    <div style={{
      background: badge.unlocked ? colors.orange50 : colors.gray50,
      borderRadius: 12,
      boxShadow: badge.unlocked ? '0 1px 2px 0 rgba(0,0,0,0.05)' : 'none',
      border: badge.unlocked ? `1px solid ${colors.orange400}` : `1px solid ${colors.gray200}`,
      padding: 20,
      marginBottom: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 180,
      maxWidth: 220,
      alignItems: 'center',
      opacity: badge.unlocked ? 1 : 0.6,
      transition: 'all 0.2s ease-in-out',
    }}>
      <div style={{ fontWeight: 700, fontSize: 17, color: badge.unlocked ? colors.orange600 : colors.gray600 }}>
        {translationMode ? translateMedicalTerms(badge.name) : badge.name}
      </div>
      <div style={{ color: badge.unlocked ? colors.orange600 : colors.gray600, fontSize: 40 }}>
        {badge.unlocked ? badge.icon : '🔒'}
      </div>
      <div style={{ color: badge.unlocked ? colors.orange700 : colors.gray400, fontSize: 15, textAlign: 'center' }}>
        {translationMode ? translateMedicalTerms(badge.description) : badge.description}
      </div>
      <div style={{ fontWeight: 500, fontSize: 14, marginTop: 8, color: badge.unlocked ? colors.green400 : colors.gray400 }}>
        {badge.unlocked ? (translationMode ? translateMedicalTerms(t.unlocked) : t.unlocked) : (translationMode ? translateMedicalTerms(t.locked) : t.locked)}
      </div>
    </div>
  );
};

export default BadgeCard;
