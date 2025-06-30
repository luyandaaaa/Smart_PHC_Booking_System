// MentalHealthView.jsx
import React, { useState, useEffect } from 'react';
import { Brain, MapPin, Calendar, Phone, X, Check } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const moodEmojis = ['😢', '😟', '😐', '😊', '😄'];
const moodLabels = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];

const moodResponses = {
  0: {
    message: "I'm sorry you're feeling this way. Remember that it's okay to feel sad sometimes - it's a natural part of being human. Would you like to talk about what's bothering you?",
    suggestions: ["Take deep breaths", "Reach out to a friend", "Consider speaking with a counselor", "Try some gentle exercise"]
  },
  1: {
    message: "I understand you're going through a tough time. Your feelings are valid, and it's brave of you to acknowledge them. What usually helps you feel a bit better?",
    suggestions: ["Listen to calming music", "Write in a journal", "Take a warm bath", "Call someone you trust"]
  },
  2: {
    message: "It's perfectly normal to feel neutral sometimes. How would you like to spend your day to maybe lift your spirits a little?",
    suggestions: ["Try a new hobby", "Go for a walk", "Watch something funny", "Do something creative"]
  },
  3: {
    message: "I'm glad to hear you're feeling happy! What's been going well for you today? Keep nurturing those positive feelings.",
    suggestions: ["Share your joy with others", "Do something you love", "Practice gratitude", "Help someone else"]
  },
  4: {
    message: "That's wonderful! Your positive energy is contagious. What's making you feel so great today?",
    suggestions: ["Celebrate your wins", "Spread kindness", "Try something new", "Reflect on your blessings"]
  }
};

const SupportCard = ({ title, subtitle, contact, available, type, onLocationClick, onBookAppointment }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleContactClick = () => {
    if (type === 'phone') {
      window.location.href = `tel:${contact}`;
    } else if (type === 'location') {
      onLocationClick();
    } else if (type === 'booking') {
      onBookAppointment();
    }
  };

  const getContactColor = () => {
    if (type === 'phone') return '#2563eb';
    if (type === 'location') return '#7c3aed';
    if (type === 'booking') return '#059669';
    return '#374151';
  };

  return (
    <div 
      style={{
        background: '#f0fdf4',
        borderRadius: 12,
        boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.1)' : '0 1px 2px rgba(0,0,0,0.05)',
        border: '1px solid #bbf7d0',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 220,
        maxWidth: 320,
        alignItems: 'flex-start',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ fontWeight: 700, fontSize: 17, color: '#047857' }}>{title}</div>
      <div style={{ color: '#047857', fontSize: 15 }}>{subtitle}</div>
      <div 
        style={{ 
          color: getContactColor(), 
          fontSize: 14, 
          cursor: 'pointer',
          textDecoration: isHovered ? 'underline' : 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 4
        }}
        onClick={handleContactClick}
      >
        {type === 'phone' && <Phone size={14} />}
        {type === 'location' && <MapPin size={14} />}
        {type === 'booking' && <Calendar size={14} />}
        {contact}
      </div>
      <div style={{ color: '#64748b', fontSize: 13 }}>{available}</div>
    </div>
  );
};

const AppointmentModal = ({ isOpen, onClose, onBookAppointment }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.phone && formData.date && formData.time) {
      onBookAppointment(formData);
      setFormData({ name: '', email: '', phone: '', date: '', time: '', notes: '' });
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        maxWidth: 500,
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#374151' }}>Book Appointment</h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
          >
            <X size={20} />
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500, color: '#374151' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: 8,
                border: '1px solid #d1d5db',
                borderRadius: 6,
                fontSize: 14
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500, color: '#374151' }}>
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                width: '100%',
                padding: 8,
                border: '1px solid #d1d5db',
                borderRadius: 6,
                fontSize: 14
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500, color: '#374151' }}>
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              style={{
                width: '100%',
                padding: 8,
                border: '1px solid #d1d5db',
                borderRadius: 6,
                fontSize: 14
              }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500, color: '#374151' }}>
                Preferred Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                style={{
                  width: '100%',
                  padding: 8,
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500, color: '#374151' }}>
                Preferred Time *
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                style={{
                  width: '100%',
                  padding: 8,
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  fontSize: 14
                }}
              />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500, color: '#374151' }}>
              Additional Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows={3}
              style={{
                width: '100%',
                padding: 8,
                border: '1px solid #d1d5db',
                borderRadius: 6,
                fontSize: 14,
                resize: 'vertical'
              }}
              placeholder="Any specific concerns or preferences..."
            />
          </div>
          
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 20 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 16px',
                border: '1px solid #d1d5db',
                borderRadius: 6,
                background: 'white',
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: 6,
                background: '#059669',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <Calendar size={16} />
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MentalHealthView = ({ currentPage = 'mentalHealth', setCurrentPage }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [showMoodResponse, setShowMoodResponse] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [locationStatus, setLocationStatus] = useState('');

  const t = {
    mentalHealth: 'Mental Health',
    moodTracker: 'Daily Mood Tracker'
  };

  const handleMoodClick = (moodIndex) => {
    setSelectedMood(moodIndex);
    setShowMoodResponse(true);
  };

  const handleLocationClick = () => {
    setLocationStatus('Getting your location...');
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationStatus(`Location found! Searching for counselors near you...`);
          
          // Simulate finding nearby counselors
          setTimeout(() => {
            setLocationStatus('Found 5 counselors within 10km of your location');
          }, 2000);
        },
        (error) => {
          setLocationStatus('Unable to get location. Please enable location services.');
          console.error('Location error:', error);
        }
      );
    } else {
      setLocationStatus('Geolocation is not supported by this browser.');
    }
  };

  const handleBookAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      status: 'Pending Confirmation'
    };
    setAppointments([...appointments, newAppointment]);
    setShowAppointmentModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#fff' }}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div style={{ flex: 1, padding: '2rem', background: '#fff' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            width: '100%',
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
            padding: 24
          }}
        >
          <div style={{ background: 'white', borderRadius: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 'bold', color: '#4b5563', marginBottom: 24, display: 'flex', alignItems: 'center' }}>
              <Brain size={24} style={{ marginRight: 8, color: '#a21caf' }} />
              {t.mentalHealth}
            </h2>
            
            {/* Mood Tracker */}
            <div style={{ background: '#f3e8ff', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontWeight: 600, color: '#4b5563', marginBottom: 16 }}>{t.moodTracker}</h3>
              <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 16 }}>How are you feeling today?</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                {moodEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    style={{
                      width: 48,
                      height: 48,
                      fontSize: 28,
                      background: selectedMood === index ? '#a855f7' : 'transparent',
                      border: selectedMood === index ? '2px solid #7c3aed' : 'none',
                      borderRadius: '50%',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      transform: selectedMood === index ? 'scale(1.1)' : 'scale(1)'
                    }}
                    onClick={() => handleMoodClick(index)}
                    onMouseOver={e => {
                      if (selectedMood !== index) {
                        e.currentTarget.style.boxShadow = '0 2px 8px 0 rgba(0,0,0,0.10)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseOut={e => {
                      if (selectedMood !== index) {
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    }}
                    title={moodLabels[index]}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              
              {showMoodResponse && selectedMood !== null && (
                <div style={{ 
                  background: 'rgba(255,255,255,0.8)', 
                  borderRadius: 8, 
                  padding: 16, 
                  marginTop: 16,
                  border: '1px solid #e5e7eb'
                }}>
                  <p style={{ fontSize: 14, color: '#374151', marginBottom: 12, fontWeight: 500 }}>
                    {moodResponses[selectedMood].message}
                  </p>
                  <div style={{ fontSize: 13, color: '#6b7280' }}>
                    <strong>Suggestions:</strong>
                    <ul style={{ marginTop: 4, paddingLeft: 16 }}>
                      {moodResponses[selectedMood].suggestions.map((suggestion, index) => (
                        <li key={index} style={{ marginBottom: 2 }}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            {/* Support Resources */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
              <SupportCard 
                title="SADAG Helpline"
                subtitle="Free mental health support"
                contact="011 234 4837"
                available="24/7"
                type="phone"
              />
              <SupportCard 
                title="Local Counseling"
                subtitle="Find nearby counselors"
                contact="Find nearby counselors"
                available="Mon-Fri 8AM-5PM"
                type="location"
                onLocationClick={handleLocationClick}
              />
              <SupportCard 
                title="Book Appointment"
                subtitle="Schedule with a counselor"
                contact="Book appointment"
                available="Available slots"
                type="booking"
                onBookAppointment={() => setShowAppointmentModal(true)}
              />
            </div>
            
            {/* Location Status */}
            {locationStatus && (
              <div style={{ 
                background: '#eff6ff', 
                border: '1px solid #bfdbfe', 
                borderRadius: 8, 
                padding: 12, 
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <MapPin size={16} style={{ color: '#2563eb' }} />
                <span style={{ fontSize: 14, color: '#1e40af' }}>{locationStatus}</span>
              </div>
            )}
            
            {/* Appointments List */}
            {appointments.length > 0 && (
              <div style={{ marginTop: 24 }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: '#374151', marginBottom: 12 }}>
                  Your Appointments
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {appointments.map((appointment) => (
                    <div key={appointment.id} style={{
                      background: '#f0f9ff',
                      border: '1px solid #bae6fd',
                      borderRadius: 8,
                      padding: 12,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: 500, color: '#0c4a6e' }}>
                          {appointment.name} - {appointment.date} at {appointment.time}
                        </div>
                        <div style={{ fontSize: 12, color: '#0369a1' }}>
                          {appointment.phone} | {appointment.status}
                        </div>
                      </div>
                      <Check size={16} style={{ color: '#059669' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <AppointmentModal 
        isOpen={showAppointmentModal}
        onClose={() => setShowAppointmentModal(false)}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
};

export default MentalHealthView;
