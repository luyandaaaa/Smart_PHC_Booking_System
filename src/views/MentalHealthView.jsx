import Sidebar from '../components/Sidebar';
import EmotionDetector from '../components/EmotionDetector';
import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Lightbulb, AlertTriangle, Heart, Award, Clock, Navigation2, Phone, MapPin, Calendar, X, Check, Brain } from 'lucide-react';

// SupportCard component remains the same
const SupportCard = ({ title, subtitle, contact, available, type, onLocationClick, onBookAppointment, style }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleContactClick = () => {
    if (type === 'phone') {
      window.location.href = `tel:${contact}`;
    } else if (type === 'location') {
      onLocationClick && onLocationClick();
    } else if (type === 'booking') {
      onBookAppointment && onBookAppointment();
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
        minWidth: 0,
        flex: 1,
        alignItems: 'flex-start',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        ...style
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

// AppointmentModal component remains the same
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
                fontSize: 14}}
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

import { Button } from '../components/ui/Button';

const colors = {
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  secondary: '#f3f4f6',
  danger: '#ef4444',
  dangerHover: '#dc2626',
  success: '#10b981',
  warning: '#f59e0b',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  blue50: '#eff6ff',
  green50: '#ecfdf5',
  purple50: '#f5f3ff',
  red50: '#fef2f2',
  yellow50: '#fffbeb',
};

const MentalHealthSuite = ({ currentPage = 'mentalHealth', setCurrentPage }) => {
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [coachingMessage, setCoachingMessage] = useState('');
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [crisisStatus, setCrisisStatus] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [bookedAppointment, setBookedAppointment] = useState(null);

  const handleEmotionDetected = (emotion) => {
    console.log('Received emotion from CNN detector:', emotion);
    const suggestions = generateCoachingSuggestions(emotion.label);
    setCurrentSuggestions(suggestions);
    setCoachingMessage(generateCoachingMessage(emotion.label, emotion.score));
    const newEntry = {
      timestamp: new Date(),
      emotion: emotion.label,
      confidence: emotion.score,
      suggestions
    };
    setEmotionHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    checkCrisisPatterns([newEntry, ...emotionHistory]);
  };

  function checkCrisisPatterns(history) {
    const crisisEmotions = ['sad', 'sadness', 'negative', 'anger', 'angry', 'fear'];
    const lastThree = history.slice(0, 3);
    if (lastThree.length === 3 && lastThree.every(e => crisisEmotions.includes((e.emotion || '').toLowerCase()))) {
      setCrisisStatus({
        severity: 'high',
        indicators: lastThree.map(e => `${e.emotion} (${Math.round(e.confidence * 100)}%)`),
        recommendation: 'Please consider reaching out to a mental health professional or support line.'
      });
    } else if (lastThree.length > 0 && lastThree.some(e => crisisEmotions.includes((e.emotion || '').toLowerCase()))) {
      setCrisisStatus({
        severity: 'low',
        indicators: lastThree.filter(e => crisisEmotions.includes((e.emotion || '').toLowerCase())).map(e => `${e.emotion} (${Math.round(e.confidence * 100)}%)`),
        recommendation: 'AI noticed some emotional stress. Take care and consider self-care activities.'
      });
    } else {
      setCrisisStatus(null);
    }
  }

  function getEmotionEmoji(label) {
    switch ((label || '').toLowerCase()) {
      case 'anger':
      case 'angry':
        return '😠';
      case 'disgust':
        return '🤢';
      case 'fear':
        return '😨';
      case 'happy':
      case 'joy':
      case 'love':
      case 'positive':
        return '😊';
      case 'neutral':
        return '😐';
      case 'sad':
      case 'sadness':
      case 'negative':
        return '😢';
      case 'surprise':
        return '😲';
      default:
        return '🙂';
    }
  }

  function generateCoachingMessage(emotionLabel, score) {
    const percent = Math.round(score * 100);
    switch ((emotionLabel || '').toLowerCase()) {
      case 'happy':
      case 'joy':
      case 'love':
      case 'positive':
        return `You seem to be in a great mood! (${percent}% confidence) Keep spreading positivity.`;
      case 'sad':
      case 'sadness':
      case 'negative':
        return `It's okay to feel sad sometimes. (${percent}% confidence) Remember, brighter days are ahead.`;
      case 'anger':
      case 'angry':
        return `You might be feeling angry. (${percent}% confidence) Try to pause and breathe before reacting.`;
      case 'fear':
        return `Feeling fearful is natural. (${percent}% confidence) Consider talking to someone you trust.`;
      case 'disgust':
        return `You may be experiencing disgust. (${percent}% confidence) Try to focus on something pleasant.`;
      case 'surprise':
        return `Surprises can be exciting or unsettling. (${percent}% confidence) Embrace the unexpected!`;
      case 'neutral':
        return `You're feeling neutral. (${percent}% confidence) Take a moment to check in with yourself.`;
      default:
        return `Your mood is unique. (${percent}% confidence) Take care of yourself today!`;
    }
  }

  function generateCoachingSuggestions(emotionLabel) {
    switch ((emotionLabel || '').toLowerCase()) {
      case 'happy':
      case 'joy':
      case 'love':
      case 'positive':
        return [
          'Keep up the positive mindset!',
          'Share your happiness with someone today.',
          'Reflect on what made you feel good.'
        ];
      case 'sad':
      case 'sadness':
      case 'negative':
        return [
          'Take a moment to acknowledge your feelings.',
          'Reach out to a friend or loved one.',
          'Try a relaxing activity you enjoy.'
        ];
      case 'anger':
      case 'angry':
        return [
          'Take deep breaths and pause before reacting.',
          'Channel your energy into something productive.',
          'Consider writing down your thoughts.'
        ];
      case 'fear':
        return [
          "Remind yourself that it's okay to feel afraid.",
          'Talk to someone you trust about your worries.',
          'Practice grounding techniques.'
        ];
      case 'disgust':
        return [
          'Reflect on what triggered this feeling.',
          'Engage in a pleasant activity to shift your mood.',
          'Talk it out with someone you trust.'
        ];
      case 'surprise':
        return [
          'Embrace the unexpected!',
          'Share your surprise with a friend.',
          'Reflect on how surprises make you feel.'
        ];
      case 'neutral':
        return [
          'Take a moment to check in with yourself.',
          'Consider setting a small goal for today.',
          'Practice mindfulness for a few minutes.'
        ];
      default:
        return [
          'Remember to take care of yourself.',
          'Reach out if you need support.',
          'Practice gratitude for something today.'
        ];
    }
  }

  const handleLocationClick = () => {
    setLocationStatus('Getting your location...');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus(`Location found! Searching for counselors near you...`);
          setTimeout(() => {
            setLocationStatus('Found 5 counselors within 10km of your location');
          }, 2000);
        },
        (error) => {
          setLocationStatus('Unable to get location. Please enable location services.');
        }
      );
    } else {
      setLocationStatus('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#fff' }}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div
        style={{
          flex: 1,
          padding: '2rem 2.5vw',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          transition: 'box-shadow 0.2s, transform 0.2s',
          position: 'relative',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(59,130,246,0.12)';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
          e.currentTarget.style.transform = 'none';
        }}
      >
        {/* Header */}
        <div style={{
          background: '#e0f2fe',
          borderRadius: 12,
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          border: `1px solid ${colors.gray200}`,
          padding: 24,
          marginBottom: 24,
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: 24,
            fontWeight: 700,
            color: colors.gray800,
            marginBottom: 8,
            letterSpacing: '-0.5px',
          }}>
            Mental Health Suite
          </h1>
          <p style={{ fontSize: '1.1rem', color: colors.gray600 }}>
            CNN-powered emotion detection with advanced sentiment analysis
          </p>
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

        {/* Appointment Modal */}
        <AppointmentModal 
          isOpen={showAppointmentModal}
          onClose={() => setShowAppointmentModal(false)}
          onBookAppointment={(appointment) => {
            setBookedAppointment(appointment);
            setShowAppointmentModal(false);
          }}
        />

        {/* Main Analytics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <EmotionDetector onEmotionDetected={handleEmotionDetected} mode="manual" />
            <div style={{
              background: colors.purple50,
              borderRadius: 18,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1.5px solid #c4b5fd',
              padding: 28,
              marginBottom: 0,
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}>
              <div style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
                <Heart size={22} color={colors.primary} style={{ background: '#fff', borderRadius: '50%', padding: 4, boxShadow: '0 2px 8px rgba(59,130,246,0.08)' }} />
                <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.gray800, margin: 0, letterSpacing: '-0.5px' }}>AI Mood Coach</h2>
              </div>
              {coachingMessage ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{
                    background: '#fff',
                    borderRadius: 14,
                    padding: 18,
                    boxShadow: '0 1px 4px 0 rgba(59,130,246,0.06)',
                    border: '1px solid #dbeafe',
                  }}>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.gray700 }}>{coachingMessage}</p>
                  </div>
                  {currentSuggestions.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, color: colors.primary, marginBottom: 4 }}>
                        <Lightbulb size={18} color={colors.primary} />
                        AI-Generated Suggestions
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {currentSuggestions.map((suggestion, index) => (
                          <div key={index} style={{
                            background: '#f0f9ff',
                            borderRadius: 12,
                            padding: 13,
                            fontSize: 14,
                            color: colors.primary,
                            border: '1px solid #bae6fd',
                            boxShadow: '0 1px 2px 0 rgba(59,130,246,0.04)'
                          }}>
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 0', color: colors.gray500 }}>
                  <p>Start emotion detection to receive personalized AI coaching</p>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {crisisStatus && (
              <div style={{
                borderRadius: 16,
                background: crisisStatus.severity === 'high' ? colors.red50 : colors.yellow50,
                border: `2px solid ${crisisStatus.severity === 'high' ? colors.danger : colors.warning}`,
                padding: 16
              }}>
                <AlertTriangle size={18} color={crisisStatus.severity === 'high' ? colors.danger : colors.warning} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontWeight: 500 }}>
                    {crisisStatus.severity === 'high' ? 'High Risk Detected by AI' : 'Emotional Stress Noticed'}
                  </div>
                  <ul style={{ fontSize: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {crisisStatus.indicators.map((indicator, index) => (
                      <li key={index}>• {indicator}</li>
                    ))}
                  </ul>
                  <p style={{ fontSize: 14, fontWeight: 500, marginTop: 8 }}>{crisisStatus.recommendation}</p>
                </div>
              </div>
            )}

            <div style={{
              background: colors.yellow50,
              borderRadius: 18,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1.5px solid #fde68a',
              padding: 22,
              marginBottom: 0,
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}>
              <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={18} color={colors.primary} />
                <h3 style={{ fontSize: 17, fontWeight: 700, color: colors.gray800, margin: 0 }}>Emotion History</h3>
              </div>
              {emotionHistory.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {emotionHistory.map((entry, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#fff',
                      border: '1px solid #e0e7ef',
                      borderRadius: 12,
                      padding: 13,
                      boxShadow: '0 1px 2px 0 rgba(59,130,246,0.04)'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{getEmotionEmoji(entry.emotion)}</span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 14, fontWeight: 500, color: colors.primary, textTransform: 'capitalize' }}>
                          {entry.emotion}
                        </span>
                        <span style={{ fontSize: 12, color: colors.gray500 }}>
                          {Math.round(entry.confidence * 100)}% confidence
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: colors.gray500 }}>
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px 0', color: colors.gray500 }}>
                  No emotion history yet. Start emotion detection to see your mood timeline.
                </div>
              )}
            </div>

            <div style={{
              background: colors.purple50,
              borderRadius: 18,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '2px solid #a78bfa',
              padding: 22,
              marginBottom: 0,
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}>
              <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Award size={18} color={colors.success} />
                <h3 style={{ fontSize: 17, fontWeight: 700, color: colors.gray800, margin: 0 }}>AI Wellness Score</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: colors.success, letterSpacing: '-1px' }}>85</div>
                  <p style={{ fontSize: 14, color: colors.gray500, margin: 0 }}>CNN-Analyzed Wellness</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span>Emotional Balance</span>
                    <span>Good</span>
                  </div>
                  <Progress value={75} style={{ height: 8, background: '#ede9fe' }} barColor="#7c3aed" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span>Stress Level</span>
                    <span>Low</span>
                  </div>
                  <Progress value={25} style={{ height: 8, background: '#fef9c3' }} barColor="#eab308" />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span>Support Network</span>
                    <span>Strong</span>
                  </div>
                  <Progress value={90} style={{ height: 8, background: '#dcfce7' }} barColor="#059669" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support Cards Row - now in its own dedicated row below the grid */}
        <div style={{
          display: 'flex',
          gap: 18,
          marginTop: 24,
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          width: '100%',
        }}>
          <SupportCard 
            title="SADAG Helpline"
            subtitle="Free mental health support"
            contact="011 234 4837"
            available="24/7"
            type="phone"
            style={{ flex: 1, minWidth: 0 }}
          />
          <SupportCard 
            title="Local Counseling"
            subtitle="Find nearby counselors"
            contact="Find nearby counselors"
            available="Mon-Fri 8AM-5PM"
            type="location"
            onLocationClick={handleLocationClick}
            style={{ flex: 1, minWidth: 0 }}
          />
          <SupportCard 
            title="Book Appointment"
            subtitle="Schedule with a counselor"
            contact="Book appointment"
            available="Available slots"
            type="booking"
            onBookAppointment={() => setShowAppointmentModal(true)}
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>

        {/* Booked Appointment Display - now below support cards, full width */}
        {bookedAppointment && (
          <div style={{
            marginTop: 24,
            background: '#f0fdf4',
            border: '1.5px solid #bbf7d0',
            borderRadius: 14,
            padding: 20,
            paddingRight: 10,
            boxShadow: '0 2px 8px rgba(16,185,129,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '100%',
            maxWidth: '100%',
            alignSelf: 'stretch',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={18} color="#059669" />
              <span style={{ fontWeight: 600, fontSize: 16, color: '#047857' }}>Booked Appointment</span>
            </div>
            <div style={{ fontSize: 15, color: '#047857' }}>
              <strong>Name:</strong> {bookedAppointment.name}<br />
              <strong>Email:</strong> {bookedAppointment.email}<br />
              <strong>Phone:</strong> {bookedAppointment.phone}<br />
              <strong>Date:</strong> {bookedAppointment.date}<br />
              <strong>Time:</strong> {bookedAppointment.time}<br />
              {bookedAppointment.notes && (<><strong>Notes:</strong> {bookedAppointment.notes}</>)}
            </div>
            <div style={{ color: '#64748b', fontSize: 13 }}>Your appointment has been booked and a counselor will contact you soon.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalHealthSuite;