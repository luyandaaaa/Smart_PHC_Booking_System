// GameCard.jsx
import React from 'react';

const colors = {
  white: '#fff',
  gray200: '#e5e7eb',
  blue700: '#1d4ed8',
  gray600: '#4b5563',
  primary: '#3b82f6',
};

const GameCard = ({ game, onPlay, t, translationMode, translateMedicalTerms }) => (
  <div style={{
      background: colors.white,
      borderRadius: 12,
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
      border: `1px solid ${colors.gray200}`,
      padding: 20,
      marginBottom: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      minWidth: 220,
      maxWidth: 320,
      alignItems: 'flex-start',
    }}>
    <div style={{ fontWeight: 700, fontSize: 17, color: colors.blue700 }}>
      {translationMode ? translateMedicalTerms(game.title) : game.title}
    </div>
    <div style={{ color: colors.gray600, fontSize: 15 }}>
      {translationMode ? translateMedicalTerms(game.description) : game.description}
    </div>
    <button 
      onClick={onPlay}
      style={{
        marginTop: 8,
        background: colors.primary,
        color: 'white',
        border: 'none',
        borderRadius: 8,
        padding: '8px 16px',
        fontWeight: 500,
        cursor: 'pointer',
        fontSize: 15,
        transition: 'background 0.2s',
      }}
    >
      {translationMode ? translateMedicalTerms(t.playNow) : t.playNow}
    </button>
  </div>
);

export default GameCard;
