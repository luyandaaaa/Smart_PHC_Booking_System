// AssistantView.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  Globe,
  Languages,
  Volume2,
  Mic,
  MicOff,
  User,
  Send,
  Upload,
  Camera,
  FileText,
  Activity,
  AlertTriangle,
  AlertCircle,
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  Zap,
  Heart,
  MessageSquare,
  Map,
  Thermometer
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const AssistantView = ({ currentPage = 'assistant', setCurrentPage }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translationMode, setTranslationMode] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I\'m your AI medical assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [showSignVideo, setShowSignVideo] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Outbreak Radar state
  const [selectedLang, setSelectedLang] = useState('en');
  const [locationConsent, setLocationConsent] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [showHealthMap, setShowHealthMap] = useState(false);
  const [communityHealthData, setCommunityHealthData] = useState({
    alerts: [
      { message: "Increase in diarrhea cases", action: "Practice good hand hygiene", severity: "high" },
      { message: "Fever trend rising", action: "Monitor symptoms, stay hydrated", severity: "medium" }
    ],
    trends: [
      { condition: "Diarrhea", change: "+5%", timeframe: "this week" },
      { condition: "Fever", change: "+3%", timeframe: "this week" },
      { condition: "Cough", change: "-2%", timeframe: "this week" }
    ]
  });

  // Fix: Add requestLocationPermission function
  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationConsent(true);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setLocationConsent(false);
          alert('Location access denied. Some features may be unavailable.');
        }
      );
    } else {
      setLocationConsent(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  // Medical features state
  const [imageResult, setImageResult] = useState(null);
  const [imageAnalyzing, setImageAnalyzing] = useState(false);
  const [ocrResult, setOcrResult] = useState('');
  const [ocrProcessing, setOcrProcessing] = useState(false);
  const [medications, setMedications] = useState('');
  const [medsResult, setMedsResult] = useState('');
  const [medsChecking, setMedsChecking] = useState(false);
  const [severity, setSeverity] = useState(1);

  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const ocrInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Hardcoded responses for different medical queries
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();

    // Emergency symptoms
    if (input.includes('emergency') || input.includes('urgent')) {
      return "For emergency symptoms like chest pain, difficulty breathing, or severe bleeding, please seek immediate medical attention. Would you like me to help you find the nearest emergency facility?";
    }

    // Medication help
    if (input.includes('medication') || input.includes('pill') || input.includes('drug')) {
      return "I can help with medication information. Please provide the name of the medication you're asking about. For prescription verification, you can use our Prescription Reader tool.";
    }

    // General health
    if (input.includes('general health') || input.includes('healthy') || input.includes('diet')) {
      return "Maintaining good health involves balanced nutrition, regular exercise, adequate sleep (7-9 hours), and stress management. Would you like specific recommendations based on your age or health conditions?";
    }

    // Symptom checker
    if (input.includes('symptom') || input.includes('pain') || input.includes('ache')) {
      return "I can help assess symptoms. Please describe: 1) Location of symptom, 2) Duration, 3) Severity (1-10), and 4) Any other associated symptoms. You can also use our Symptom Severity tool.";
    }

    // Prescription related
    if (input.includes('prescription') || input.includes('rx') || input.includes("doctor's note")) {
      return "For prescription questions, you can use our Prescription Reader tool to scan and interpret medication instructions. Would you like me to open that for you?";
    }

    // Default responses
    const defaultResponses = [
      "I understand your concern. Based on medical guidelines, I recommend consulting with a healthcare provider for personalized advice.",
      "Thank you for sharing that information. For accurate medical advice, it's best to consult with a licensed physician.",
      "I can provide general health information, but for specific medical concerns, please consult your doctor.",
      "That's an important health question. Let me provide you with some reliable resources about this topic."
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage = {
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsProcessing(true);

    // Get hardcoded response based on user input
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);

      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          timestamp: new Date()
        }
      ]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageAnalyzing(true);
      setImageResult(null);

      setTimeout(() => {
        const results = [
          { text: 'No serious issues detected. Monitor for changes.', severity: 'low' },
          { text: 'Mild inflammation observed. Consider consulting a doctor.', severity: 'medium' },
          { text: 'Unusual patterns detected. Recommend professional evaluation.', severity: 'high' }
        ];
        const result = results[Math.floor(Math.random() * results.length)];
        setImageResult(result);
        setImageAnalyzing(false);
      }, 2000);
    }
  };

  // Enhanced Prescription Reader functionality
  const handleOcrUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setOcrProcessing(true);
      setOcrResult('');

      // Simulate OCR processing with realistic prescription data
      setTimeout(() => {
        const prescriptions = [
          {
            text: 'Rx: LISINOPRIL 10MG TABLET\nSig: Take 1 tablet by mouth daily for blood pressure\nRefills: 3\nDr. Smith\nExp: 12/25/2023',
            medications: ['Lisinopril 10mg'],
            warnings: 'May cause dizziness. Avoid potassium supplements.'
          },
          {
            text: 'Rx: AMOXICILLIN 500MG CAPSULE\nSig: Take 1 capsule every 8 hours for 10 days\nRefills: 0\nFor: Strep throat\nDr. Johnson\nExp: 06/15/2024',
            medications: ['Amoxicillin 500mg'],
            warnings: 'Complete full course. May cause stomach upset.'
          },
          {
            text: 'Rx: ATORVASTATIN 20MG TABLET\nSig: Take 1 tablet at bedtime\nRefills: 6\nFor: High cholesterol\nDr. Lee\nExp: 09/30/2024\nWARNING: Avoid grapefruit',
            medications: ['Atorvastatin 20mg'],
            warnings: 'Take at bedtime. Report muscle pain.'
          },
          {
            text: 'Rx: METFORMIN 500MG TABLET\nSig: Take 1 tablet twice daily with meals\nRefills: 5\nFor: Type 2 diabetes\nDr. Garcia\nExp: 03/15/2025',
            medications: ['Metformin 500mg'],
            warnings: 'May cause GI upset. Avoid excessive alcohol.'
          }
        ];

        const result = prescriptions[Math.floor(Math.random() * prescriptions.length)];
        setOcrResult(result.text);

        // Add a message about the prescription to the chat
        const botMessage = {
          sender: 'bot',
          text: `I found a prescription for ${result.medications.join(', ')}. Important: ${result.warnings}`,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setOcrProcessing(false);
      }, 1800);
    }
  };

  const handleMedsCheck = () => {
    if (!medications.trim()) return;

    setMedsChecking(true);
    setMedsResult('');

    setTimeout(() => {
      const interactions = [
        { text: 'No dangerous interactions found.', severity: 'safe' },
        { text: 'Mild interaction possible. Monitor for side effects.', severity: 'caution' },
        { text: 'Potential interaction detected. Consult your doctor.', severity: 'warning' }
      ];
      const result = interactions[Math.floor(Math.random() * interactions.length)];
      setMedsResult(result);
      setMedsChecking(false);
    }, 1200);
  };

  const handleVoiceToText = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported in your browser');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = currentLanguage === 'en' ? 'en-US' : 'zu-ZA';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => setIsRecording(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.start();
  };

  const getSeverityColor = (level) => {
    switch(level) {
      case 'low': case 'safe': return '#10b981';
      case 'medium': case 'caution': return '#f59e0b';
      case 'high': case 'warning': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getSeverityStatus = () => {
    if (severity <= 3) return { text: 'Mild', color: '#10b981' };
    if (severity <= 6) return { text: 'Moderate', color: '#f59e0b' };
    if (severity <= 8) return { text: 'Severe', color: '#ef4444' };
    return { text: 'Critical', color: '#dc2626' };
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
          background: '#e0f2fe', // light blue
          color: '#1e293b',
          padding: 24,
          borderRadius: 12,
          marginBottom: 24,
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          border: '1px solid #bae6fd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', margin: 0, color: '#2563eb' }}>AI Medical Assistant</h2>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={() => setLargeText(!largeText)}
              style={{
                background: largeText ? '#3b82f6' : '#f3f4f6',
                color: largeText ? 'white' : '#374151',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Toggle Large Text"
            >
              {largeText ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <button
              onClick={() => setShowChat(true)}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
              title="Open AI Medical Chat"
            >
              <MessageSquare size={18} />
              Chat
            </button>
          </div>
        </div>

        {/* Medical Tools Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          {/* Image Analysis */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Camera size={20} style={{ color: '#3b82f6' }} />
              <h3 style={{ fontSize: largeText ? '1.25rem' : '1rem', fontWeight: '600', margin: 0 }}>
                Medical Image Analysis
              </h3>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={imageAnalyzing}
              style={{
                width: '100%',
                background: imageAnalyzing ? '#94a3b8' : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.75rem',
                cursor: imageAnalyzing ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s',
                marginBottom: '1rem'
              }}
            >
              {imageAnalyzing ? <Clock size={16} /> : <Upload size={16} />}
              {imageAnalyzing ? 'Analyzing...' : 'Upload Medical Image'}
            </button>

            {imageResult && (
              <div style={{
                background: `linear-gradient(135deg, ${getSeverityColor(imageResult.severity)}20 0%, ${getSeverityColor(imageResult.severity)}10 100%)`,
                border: `1px solid ${getSeverityColor(imageResult.severity)}40`,
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: largeText ? '1rem' : '0.875rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} style={{ color: getSeverityColor(imageResult.severity) }} />
                  {imageResult.text}
                </div>
              </div>
            )}
          </div>

          {/* Outbreak Radar */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Map size={20} style={{ color: '#ef4444' }} />
              <h3 style={{ fontSize: largeText ? '1.25rem' : '1rem', fontWeight: '600', margin: 0 }}>
                Outbreak Radar
              </h3>
            </div>

            <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
              View health trends in your community and contribute anonymous symptom reports.
            </div>

            {!locationConsent ? (
              <div style={{
                background: 'linear-gradient(135deg, #f59e0b20 0%, #f59e0b10 100%)',
                border: '1px solid #f59e0b40',
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertTriangle size={16} style={{ color: '#f59e0b' }} />
                  <span>Location access required</span>
                </div>
                <button
                  onClick={requestLocationPermission}
                  style={{
                    background: '#f59e0b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    marginTop: '0.5rem'
                  }}
                >
                  Enable Location
                </button>
              </div>
            ) : (
              <div style={{
                background: 'linear-gradient(135deg, #10b98120 0%, #10b98110 100%)',
                border: '1px solid #10b98140',
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} style={{ color: '#10b981' }} />
                  <span>Location sharing enabled</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowHealthMap(true)}
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.75rem',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}
            >
              <Map size={16} />
              View Health Map
            </button>

            {communityHealthData.alerts.length > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #ef444420 0%, #ef444410 100%)',
                border: '1px solid #ef444440',
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: '0.875rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <AlertCircle size={16} style={{ color: '#ef4444' }} />
                  <span style={{ fontWeight: '600' }}>Community Alerts</span>
                </div>
                {communityHealthData.alerts.slice(0, 2).map((alert, index) => (
                  <div key={index} style={{ marginBottom: '0.25rem' }}>
                    <div style={{ fontWeight: '500' }}>{alert.message}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                      Action: {alert.action}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Medication Checker */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <FileText size={20} style={{ color: '#f59e0b' }} />
              <h3 style={{ fontSize: largeText ? '1.25rem' : '1rem', fontWeight: '600', margin: 0 }}>
                Drug Interaction Checker
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                value={medications}
                onChange={e => setMedications(e.target.value)}
                placeholder="Enter medications (comma separated)"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: largeText ? '1rem' : '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#3b82f6'}
                onBlur={e => e.target.style.borderColor = '#d1d5db'}
              />
              <button
                onClick={handleMedsCheck}
                disabled={medsChecking || !medications.trim()}
                style={{
                  background: medsChecking ? '#94a3b8' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  cursor: (medsChecking || !medications.trim()) ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  opacity: !medications.trim() ? 0.5 : 1
                }}
              >
                {medsChecking ? 'Checking...' : 'Check'}
              </button>
            </div>

            {medsResult && (
              <div style={{
                background: `linear-gradient(135deg, ${getSeverityColor(medsResult.severity)}20 0%, ${getSeverityColor(medsResult.severity)}10 100%)`,
                border: `1px solid ${getSeverityColor(medsResult.severity)}40`,
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: largeText ? '1rem' : '0.875rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {medsResult.severity === 'safe' ?
                    <CheckCircle size={16} style={{ color: getSeverityColor(medsResult.severity) }} /> :
                    <AlertTriangle size={16} style={{ color: getSeverityColor(medsResult.severity) }} />
                  }
                  {medsResult.text}
                </div>
              </div>
            )}
          </div>

          {/* Symptom Severity */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Activity size={20} style={{ color: '#ef4444' }} />
              <h3 style={{ fontSize: largeText ? '1.25rem' : '1rem', fontWeight: '600', margin: 0 }}>
                Symptom Severity
              </h3>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <input
                type="range"
                min={1}
                max={10}
                value={severity}
                onChange={e => setSeverity(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: `linear-gradient(to right, #10b981 0%, #f59e0b 50%, #ef4444 100%)`,
                  outline: 'none',
                  marginBottom: '0.5rem'
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: largeText ? '1.5rem' : '1.25rem', fontWeight: 'bold' }}>
                  {severity}/10
                </span>
                <span style={{
                  color: getSeverityStatus().color,
                  fontWeight: '600',
                  fontSize: largeText ? '1rem' : '0.875rem'
                }}>
                  {getSeverityStatus().text}
                </span>
              </div>
            </div>

            {severity >= 8 && (
              <div style={{
                background: 'linear-gradient(135deg, #ef444420 0%, #ef444410 100%)',
                border: '1px solid #ef444440',
                borderRadius: '8px',
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertTriangle size={16} style={{ color: '#ef4444' }} />
                <span style={{ fontSize: largeText ? '1rem' : '0.875rem', fontWeight: '500' }}>
                  High severity! Consider emergency care.
                </span>
                <button
                  onClick={() => setCurrentPage('emergency')}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    marginLeft: 'auto'
                  }}
                >
                  Emergency
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Health Map Modal */}
        {showHealthMap && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}>
            <div style={{
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              width: '90%',
              maxWidth: '800px',
              maxHeight: '90%',
              padding: '1.5rem',
              overflow: 'auto',
              position: 'relative',
              display: 'block',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                paddingBottom: '0.5rem',
                borderBottom: '1px solid #e5e7eb',
                background: '#e0f2fe',
                borderRadius: '12px 12px 0 0',
                paddingTop: '1rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
              }}>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Map size={20} style={{ color: '#ef4444' }} />
                  Community Health Map
                </h2>
                <button
                  onClick={() => setShowHealthMap(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#6b7280',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    padding: '0.25rem'
                  }}
                >
                  ×
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  background: '#f9fafb',
                  borderRadius: '12px',
                  padding: '1rem',
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: '0 0 1rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Thermometer size={16} style={{ color: '#ef4444' }} />
                    Heatmap
                  </h3>
                  <div style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Simulated heatmap visualization */}
                    <div style={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      background: 'radial-gradient(circle at 30% 40%, rgba(239,68,68,0.3) 0%, transparent 70%), radial-gradient(circle at 70% 60%, rgba(245,158,11,0.2) 0%, transparent 70%)'
                    }}></div>
                    <div style={{
                      position: 'absolute',
                      top: '40%',
                      left: '30%',
                      width: '24px',
                      height: '24px',
                      background: 'rgba(239,68,68,0.7)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      15
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '60%',
                      left: '70%',
                      width: '18px',
                      height: '18px',
                      background: 'rgba(245,158,11,0.7)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      8
                    </div>
                    {userLocation && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '12px',
                        height: '12px',
                        background: '#3b82f6',
                        borderRadius: '50%',
                        border: '2px solid white'
                      }}></div>
                    )}
                    <div style={{
                      position: 'absolute',
                      bottom: '0.5rem',
                      left: '0.5rem',
                      background: 'white',
                      borderRadius: '4px',
                      padding: '0.25rem 0.5rem',
                      fontSize: '0.75rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></div>
                        <span>Diarrhea</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></div>
                        <span>Fever</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{
                  background: '#f9fafb',
                  borderRadius: '12px',
                  padding: '1rem',
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    margin: '0 0 1rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Activity size={16} style={{ color: '#3b82f6' }} />
                    Recent Trends
                  </h3>
                  <div style={{
                    flex: 1,
                    background: 'white',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    overflow: 'auto'
                  }}>
                    {communityHealthData.trends.map((trend, index) => (
                      <div key={index} style={{
                        padding: '0.5rem',
                        borderBottom: index < communityHealthData.trends.length - 1 ? '1px solid #e5e7eb' : 'none',
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}>
                        <span style={{ fontWeight: '500' }}>{trend.condition}</span>
                        <span style={{
                          color: trend.change.startsWith('+') ? '#ef4444' : '#10b981',
                          fontWeight: '600'
                        }}>
                          {trend.change} {trend.timeframe}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{
                background: '#f9fafb',
                borderRadius: '12px',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  margin: '0 0 1rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <AlertCircle size={16} style={{ color: '#ef4444' }} />
                  Active Alerts
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '0.75rem'
                }}>
                  {communityHealthData.alerts.map((alert, index) => (
                    <div key={index} style={{
                      background: 'white',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.25rem'
                      }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          background: getSeverityColor(alert.severity),
                          borderRadius: '50%'
                        }}></div>
                        <span style={{ fontWeight: '500' }}>{alert.message}</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        Recommended: {alert.action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.5rem'
              }}>
                <button
                  onClick={() => setShowHealthMap(false)}
                  style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowHealthMap(false);
                    setShowChat(false);
                    setTimeout(() => {
                      setShowChat(true);
                      setInputText('Tell me more about the community health alerts');
                    }, 50);
                  }}
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Ask About This
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chat Interface */}
        {showChat && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.10)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto',
          }}>
            <div style={{
              background: '#f3f4f6',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(59,130,246,0.18)',
              width: '95%',
              maxWidth: 520,
              minHeight: 480,
              maxHeight: '90%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              padding: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <div style={{
                background: 'white',
                borderRadius: 16,
                width: '100%',
                height: '100%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
              }}>
                <button
                  onClick={() => setShowChat(false)}
                  style={{
                    position: 'absolute',
                    top: 12,
                    right: 16,
                    background: 'rgba(0,0,0,0.05)',
                    border: 'none',
                    color: '#374151',
                    fontSize: 22,
                    cursor: 'pointer',
                    fontWeight: 700,
                    zIndex: 2,
                    borderRadius: 8,
                    width: 36,
                    height: 36
                  }}
                  title="Close Chat"
                >
                  ×
                </button>
                <iframe
                  src="https://www.chatbase.co/chatbot-iframe/lVv9jnfLqeGT_lBuyRLBK"
                  width="100%"
                  style={{ height: '100%', minHeight: 700, border: 'none' }}
                  frameBorder="0"
                  title="Chatbase Medical Assistant"
                  allow="clipboard-write;"
                />
              </div>
            </div>
          </div>
        )}

        {/* Status Bar */}
        <div style={{
          marginTop: '1rem',
          padding: '1rem 1.5rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.875rem',
          color: '#6b7280',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '8px',
              height: '8px',
              background: '#10b981',
              borderRadius: '50%'
            }}></div>
            <span>AI Medical Assistant Online</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span>🔒 HIPAA Compliant</span>
            <span>⚡ Real-time Analysis</span>
            <span>🌍 Multi-language Support</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
          40%, 43% { transform: translateY(-8px); }
          70% { transform: translateY(-4px); }
          90% { transform: translateY(-2px); }
        }

        /* Custom scrollbar */
        div::-webkit-scrollbar {
          width: 6px;
        }

        div::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }

        div::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 3px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .medical-tools-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Focus states */
        input:focus, textarea:focus {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }

        /* Button hover effects */
        button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        button:active:not(:disabled) {
          transform: translateY(0);
        }

        /* Accessibility improvements */
        button:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* High contrast mode support */
        @media (prefers-contrast: high) {
          * {
            border-color: #000 !important;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}

// ...existing code...

export default AssistantView;
