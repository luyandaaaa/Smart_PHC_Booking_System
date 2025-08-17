// EmergencyView.jsx
import React, { useState, useEffect } from 'react';
import EmergencyCard from '../components/EmergencyCard';
import { AlertTriangle, Phone, MapPin, MessageCircle, X, Send, AlertCircle, CheckCircle, Ambulance, Clock, Navigation, Route, Activity, Zap, HeartPulse, ShieldAlert, Siren, PlusCircle, PhoneCall } from 'lucide-react';
import AmbulanceTrackerReact from './AmbulanceTrackerReact';

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Button = ({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
    emergency: "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white hover:from-red-600 hover:via-red-700 hover:to-red-800 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 shadow-xl border border-red-400/20",
    medical: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-sm hover:shadow-md",
    destructive: "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900 shadow-sm hover:shadow-md",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
    link: "text-blue-600 underline-offset-4 hover:underline"
  };
  const sizes = {
    default: "h-10 px-6 py-2",
    sm: "h-9 rounded-lg px-4",
    lg: "h-14 rounded-xl px-8 text-lg font-semibold",
    xl: "h-16 rounded-xl px-10 text-xl font-bold",
    icon: "h-10 w-10"
  };
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }) => (
  <div className={cn("rounded-xl border bg-white text-gray-900 shadow-xl backdrop-blur-sm overflow-hidden", className)}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={cn("flex flex-col space-y-1.5 p-8", className)}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={cn("text-3xl font-bold leading-none tracking-tight", className)}>{children}</h3>
);

const CardContent = ({ children, className }) => (
  <div className={cn("p-8 pt-0", className)}>{children}</div>
);

const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200",
    secondary: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200",
    destructive: "border-transparent bg-red-100 text-red-800 hover:bg-red-200",
    outline: "text-gray-900 border-gray-300",
    success: "border-transparent bg-green-100 text-green-800 hover:bg-green-200",
    warning: "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    critical: "border-transparent bg-red-600 text-white hover:bg-red-700 animate-pulse"
  };
  return (
    <div className={cn(
      "inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm",
      variants[variant],
      className
    )}>{children}</div>
  );
};

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
        {/* ... (rest of SymptomCheckerModal implementation remains the same) */}
      </div>
    </div>
  );
};

const EmergencyView = ({ setCurrentPage, ...props }) => {
  const [showSymptomChecker, setShowSymptomChecker] = useState(false);
  const [showAmbulanceTracker, setShowAmbulanceTracker] = useState(false);
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
          
          const logEntry = {
            id: Date.now(),
            type: 'location',
            coordinates: coords,
            timestamp: new Date().toLocaleString(),
            status: 'Shared with emergency contacts'
          };
          setEmergencyLog([logEntry, ...emergencyLog]);
          
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

  const handleAmbulanceRequest = () => {
    setShowAmbulanceTracker(true);
  };



  const handleCloseAmbulanceTracker = () => {
    setShowAmbulanceTracker(false);
  };

  return (
    <>
      {showAmbulanceTracker ? (
        <AmbulanceTrackerReact onClose={handleCloseAmbulanceTracker} />
      ) : (
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
                    <button
                      style={{
                        marginTop: 4,
                        padding: '14px 0',
                        background: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: 10,
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        boxShadow: '0 1px 2px 0 rgba(37,99,235,0.08)',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#1d4ed8'}
                      onMouseLeave={e => e.currentTarget.style.background = '#2563eb'}
                      onClick={handleAmbulanceRequest}
                    >
                      Request Ambulance
                    </button>
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
      )}
    </>
  );
};

export default EmergencyView;