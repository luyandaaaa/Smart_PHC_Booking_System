// EmergencyView.jsx
import React, { useState } from 'react';
import EmergencyCard from '../components/EmergencyCard';
import { AlertTriangle, Phone, MapPin, MessageCircle, X, Send, AlertCircle, CheckCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';

const SymptomCheckerModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [symptoms, setSymptoms] = useState('');
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = [
    {
      id: 'pain_level',
      question: 'Rate your pain level (1-10)',
      type: 'scale',
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    {
      id: 'duration',
      question: 'How long have you been experiencing these symptoms?',
      type: 'multiple',
      options: ['Less than 1 hour', '1-6 hours', '6-24 hours', 'More than 24 hours']
    },
    {
      id: 'breathing',
      question: 'Are you having difficulty breathing?',
      type: 'boolean',
      options: ['Yes', 'No']
    }
  ];

  const handleStartCheck = () => {
    if (symptoms.trim()) {
      setCurrentStep(1);
    }
  };

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentStep - 1].id]: answer };
    setAnswers(newAnswers);
    
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate result based on answers
      generateResult(newAnswers);
    }
  };

  const generateResult = (finalAnswers) => {
    const painLevel = finalAnswers.pain_level || 0;
    const breathing = finalAnswers.breathing;
    
    if (painLevel >= 8 || breathing === 'Yes') {
      setResult({
        urgency: 'high',
        recommendation: 'Seek immediate medical attention. Call 10177 or go to the nearest emergency room.',
        color: '#dc2626'
      });
    } else if (painLevel >= 5) {
      setResult({
        urgency: 'medium',
        recommendation: 'Consider visiting a doctor within 24 hours or calling a medical helpline.',
        color: '#f59e0b'
      });
    } else {
      setResult({
        urgency: 'low',
        recommendation: 'Monitor your symptoms. If they worsen, seek medical advice.',
        color: '#059669'
      });
    }
  };

  const resetChecker = () => {
    setCurrentStep(0);
    setSymptoms('');
    setAnswers({});
    setResult(null);
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
          <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#374151', display: 'flex', alignItems: 'center', gap: 8 }}>
            <MessageCircle size={20} />
            AI Symptom Checker
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
          >
            <X size={20} />
          </button>
        </div>

        {currentStep === 0 && !result && (
          <div>
            <p style={{ color: '#6b7280', marginBottom: 16, fontSize: 14 }}>
              Describe your symptoms in detail. This is not a substitute for professional medical advice.
            </p>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe what you're experiencing..."
              rows={4}
              style={{
                width: '100%',
                padding: 12,
                border: '1px solid #d1d5db',
                borderRadius: 8,
                fontSize: 14,
                resize: 'vertical',
                marginBottom: 16
              }}
            />
            <button
              onClick={handleStartCheck}
              disabled={!symptoms.trim()}
              style={{
                width: '100%',
                padding: 12,
                background: symptoms.trim() ? '#3b82f6' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                cursor: symptoms.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <Send size={16} />
              Start Assessment
            </button>
          </div>
        )}

        {currentStep > 0 && currentStep <= questions.length && !result && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
                Question {currentStep} of {questions.length}
              </div>
              <div style={{ 
                width: '100%', 
                height: 4, 
                background: '#e5e7eb', 
                borderRadius: 2,
                marginBottom: 16
              }}>
                <div style={{ 
                  width: `${(currentStep / questions.length) * 100}%`, 
                  height: '100%', 
                  background: '#3b82f6', 
                  borderRadius: 2,
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
            
            <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#374151' }}>
              {questions[currentStep - 1].question}
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {questions[currentStep - 1].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  style={{
                    padding: 12,
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    background: 'white',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    fontSize: 14
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.borderColor = '#3b82f6';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8, 
              marginBottom: 16,
              padding: 12,
              background: result.urgency === 'high' ? '#fef2f2' : result.urgency === 'medium' ? '#fffbeb' : '#f0f9ff',
              borderRadius: 8,
              border: `1px solid ${result.color}33`
            }}>
              {result.urgency === 'high' ? <AlertCircle size={20} color={result.color} /> : <CheckCircle size={20} color={result.color} />}
              <span style={{ fontWeight: 600, color: result.color, textTransform: 'uppercase', fontSize: 12 }}>
                {result.urgency} Priority
              </span>
            </div>
            
            <div style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                Recommendation
              </h4>
              <p style={{ color: '#374151', lineHeight: 1.5 }}>
                {result.recommendation}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={resetChecker}
                style={{
                  flex: 1,
                  padding: 10,
                  border: '1px solid #d1d5db',
                  borderRadius: 6,
                  background: 'white',
                  color: '#374151',
                  cursor: 'pointer'
                }}
              >
                Check Again
              </button>
              {result.urgency === 'high' && (
                <button
                  onClick={() => window.location.href = 'tel:10177'}
                  style={{
                    flex: 1,
                    padding: 10,
                    border: 'none',
                    borderRadius: 6,
                    background: '#dc2626',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4
                  }}
                >
                  <Phone size={16} />
                  Call 10177
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const EmergencyView = ({ setCurrentPage, ...props }) => {
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [emergencyLog, setEmergencyLog] = useState([]);

  const handleEmergencyCall = (number) => {
    const logEntry = {
      id: Date.now(),
      type: 'call',
      number: number,
      timestamp: new Date().toLocaleString(),
      status: 'Initiated'
    };
    setEmergencyLog([logEntry, ...emergencyLog]);
  };

  const handleLocationShare = () => {
    setLocationStatus('Getting your location...');
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = `${position.coords.latitude}, ${position.coords.longitude}`;
          setLocationStatus(`Location shared: ${coords}`);
          
          // Simulate sharing location with emergency contacts
          const logEntry = {
            id: Date.now(),
            type: 'location',
            coordinates: coords,
            timestamp: new Date().toLocaleString(),
            status: 'Shared with emergency contacts'
          };
          setEmergencyLog([logEntry, ...emergencyLog]);
          
          // Auto-clear status after 5 seconds
          setTimeout(() => setLocationStatus(''), 5000);
        },
        (error) => {
          setLocationStatus('Unable to get location. Please enable location services.');
          setTimeout(() => setLocationStatus(''), 3000);
        }
      );
    } else {
      setLocationStatus('Geolocation is not supported by this browser.');
      setTimeout(() => setLocationStatus(''), 3000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#f9fafb' }}>
      <Sidebar currentPage="emergency" setCurrentPage={setCurrentPage} />
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 16, padding: 24 }}>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#991b1b', marginBottom: 16, display: 'flex', alignItems: 'center' }}>
              <AlertTriangle size={24} style={{ marginRight: 8 }} />
              Emergency Help
            </h2>
            <p style={{ color: '#b91c1c', marginBottom: 24 }}>
              If this is a life-threatening emergency, call 10177 immediately or go to the nearest hospital.
            </p>
            
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
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, marginBottom: 24, maxWidth: 700 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <EmergencyCard 
                  title="Call Emergency Services"
                  subtitle="National Emergency Hotline"
                  contact="10177"
                  icon={Phone}
                  color="#ef4444"
                  urgent={true}
                  type="phone"
                  onEmergencyCall={handleEmergencyCall}
                />
                <EmergencyCard 
                  title="Share Location"
                  subtitle="Send GPS to emergency contacts"
                  icon={MapPin}
                  color="#f59e42"
                  type="location"
                  onLocationShare={handleLocationShare}
                />
              </div>
            </div>
            
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 24 }}>
              <h3 style={{ fontWeight: 600, color: '#1f2937', marginBottom: 12 }}>AI Symptom Checker</h3>
              <p style={{ fontSize: 14, color: '#64748b', marginBottom: 16 }}>
                Describe your symptoms and get guidance on what to do next.
              </p>
              <button 
                onClick={() => setShowSymptomChecker(true)}
                style={{ 
                  width: '100%', 
                  background: '#3b82f6', 
                  color: 'white', 
                  padding: '12px 0', 
                  borderRadius: 10, 
                  fontWeight: 500, 
                  fontSize: 16, 
                  border: 'none', 
                  cursor: 'pointer', 
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#2563eb'}
                onMouseLeave={e => e.currentTarget.style.background = '#3b82f6'}
              >
                <MessageCircle size={18} />
                Start Symptom Check
              </button>
            </div>

            {/* Emergency Log */}
            {emergencyLog.length > 0 && (
              <div style={{ background: '#fff', borderRadius: 12, padding: 16 }}>
                <h3 style={{ fontWeight: 600, color: '#1f2937', marginBottom: 12 }}>Emergency Activity</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {emergencyLog.slice(0, 3).map((entry) => (
                    <div key={entry.id} style={{
                      background: entry.type === 'call' ? '#fef2f2' : '#f0f9ff',
                      border: `1px solid ${entry.type === 'call' ? '#fecaca' : '#bfdbfe'}`,
                      borderRadius: 8,
                      padding: 10,
                      fontSize: 13
                    }}>
                      <div style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                        {entry.type === 'call' ? <Phone size={14} /> : <MapPin size={14} />}
                        {entry.type === 'call' ? `Emergency call to ${entry.number}` : 'Location shared'}
                      </div>
                      <div style={{ color: '#6b7280', marginTop: 2 }}>
                        {entry.timestamp} - {entry.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <SymptomCheckerModal 
        isOpen={showSymptomChecker}
        onClose={() => setShowSymptomChecker(false)}
      />
    </div>
  );
};

export default EmergencyView;
