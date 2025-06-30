// LeaderboardItem.jsx
import React from 'react';

const colors = {
  blue50: '#eff6ff',
  gray50: '#f9fafb',
  blue200: '#bfdbfe',
  gray200: '#e5e7eb',
  gray800: '#1f2937',
  blue700: '#1e40af',
  blue500: '#3b82f6',
};

const LeaderboardItem = ({ rank, name, xp, avatar, isCurrentUser }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    border: '2px solid',
    transition: 'all 0.2s',
    background: isCurrentUser ? colors.blue50 : colors.gray50,
    borderColor: isCurrentUser ? colors.blue200 : colors.gray200,
    boxShadow: isCurrentUser ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        fontWeight: 700,
        color: rank <= 3 ? colors.gray800 : colors.blue500,
        background: rank === 1 ? '#fef9c3' :
                    rank === 2 ? colors.gray200 :
                    rank === 3 ? '#fee2e2' :
                    colors.blue50,
      }}>
        {rank <= 3 ? avatar : rank}
      </div>
      <div>
        <div style={{ fontWeight: 600, color: isCurrentUser ? colors.blue700 : colors.gray800 }}>{name}</div>
        <div style={{ fontSize: 14, color: '#4b5563' }}>{xp} XP</div>
      </div>
    </div>
    {isCurrentUser && (
      <div style={{
        fontSize: 12,
        background: colors.blue200,
        color: colors.blue700,
        padding: '4px 8px',
        borderRadius: 9999,
        fontWeight: 500,
      }}>
        You
      </div>
    )}
  </div>
);

export default LeaderboardItem;
