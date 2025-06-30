// ClinicCard.jsx
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

const ClinicCard = ({ clinic, t }) => {
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', date: '', time: '' });
  if (!clinic) return null;

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could add logic to submit the booking
    setShowModal(false);
    setForm({ name: '', date: '', time: '' });
    alert('Appointment booked!');
  };

  return (
    <>
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
          width: '95%',
          transition: 'box-shadow 0.2s, transform 0.2s',
          transform: hover ? 'translateY(-2px) scale(1.01)' : 'none',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div style={{ fontWeight: 700, fontSize: 17, color: colors.gray800 }}>{clinic.name}</div>
        <div style={{ color: colors.gray600, fontSize: 15 }}>{clinic.address}</div>
        <div style={{ color: colors.gray500, fontSize: 14 }}>{clinic.phone}</div>
        <button
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
          onClick={() => setShowModal(true)}
        >
          {t.bookAppointment || 'Book Appointment'}
        </button>
      </div>
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 16,
            boxShadow: '0 8px 32px 0 rgba(59,130,246,0.15)',
            padding: 32,
            minWidth: 320,
            maxWidth: 400,
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: 12,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: 22,
                color: colors.gray500,
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: colors.primary, marginBottom: 8 }}>Book Appointment</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleInputChange}
                required
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: `1px solid ${colors.gray200}`,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              />
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleInputChange}
                required
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: `1px solid ${colors.gray200}`,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              />
              <input
                name="time"
                type="time"
                value={form.time}
                onChange={handleInputChange}
                required
                style={{
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: `1px solid ${colors.gray200}`,
                  fontSize: 15,
                  marginBottom: 4,
                }}
              />
              <button
                type="submit"
                style={{
                  background: colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 0',
                  fontWeight: 600,
                  fontSize: 16,
                  marginTop: 8,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ClinicCard;
