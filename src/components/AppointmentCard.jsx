import React, { useState } from 'react';

const colors = {
  white: '#fff',
  gray200: '#e5e7eb',
  gray800: '#1f2937',
  gray600: '#4b5563',
  gray500: '#6b7280',
  success: '#10b981',
  primary: '#3b82f6',
};

const AppointmentCard = ({ appointment, t }) => {
  const [hover, setHover] = useState(false);
  if (!appointment) return null;

  return (
    <div
      style={{
        background: colors.white,
        borderRadius: 12,
        boxShadow: hover
          ? '0 4px 16px 0 rgba(59,130,246,0.10), 0 1.5px 4px 0 rgba(0,0,0,0.08)'
          : '0 1px 2px 0 rgba(0,0,0,0.05)',
        border: `1px solid ${colors.gray200}`,
        padding: 20,
        marginBottom: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        width: '100%',
        transition: 'box-shadow 0.2s, transform 0.2s',
        transform: hover ? 'translateY(-2px) scale(1.01)' : 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ fontWeight: 700, fontSize: 17, color: colors.gray800 }}>{appointment.clinic}</div>
      <div style={{ color: colors.gray600, fontSize: 15 }}>{appointment.date}  {appointment.time}</div>
      <div style={{ color: colors.gray500, fontSize: 14 }}>{appointment.doctor}</div>
      <div style={{ color: colors.success, fontWeight: 500, fontSize: 15 }}>{appointment.status}</div>
    </div>
  );
};

export default AppointmentCard;
