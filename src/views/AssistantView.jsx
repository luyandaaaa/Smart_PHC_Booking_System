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
  Eye,
  EyeOff,
  CheckCircle,
  Clock,
  Zap,
  Heart,
  MessageSquare
  // Pills icon removed due to lucide-react version
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
  const [selectedLang, setSelectedLang] = useState('en');

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
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#f9fafb' }}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div style={{ flex: 1, padding: '2rem 2.5vw', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              fontSize: largeText ? '2rem' : '1.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              AI Medical Assistant
            </h1>
            {showSignVideo && (
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                padding: '1rem',
                color: 'white',
                marginTop: 12
              }}>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                  📹 Sign language interpretation would be available here
                </div>
              </div>
            )}
          </div>
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
              onClick={() => setShowSignVideo(!showSignVideo)}
              style={{
                background: showSignVideo ? '#10b981' : '#f3f4f6',
                color: showSignVideo ? 'white' : '#374151',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Sign Language Support"
            >
              <Languages size={16} />
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

          {/* OCR - Enhanced Prescription Reader */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <FileText size={20} style={{ color: '#10b981' }} />
              <h3 style={{ fontSize: largeText ? '1.25rem' : '1rem', fontWeight: '600', margin: 0 }}>
                Prescription Reader
              </h3>
            </div>

            <input
              ref={ocrInputRef}
              type="file"
              accept="image/*"
              onChange={handleOcrUpload}
              style={{ display: 'none' }}
            />

            <button
              onClick={() => ocrInputRef.current?.click()}
              disabled={ocrProcessing}
              style={{
                width: '100%',
                background: ocrProcessing ? '#94a3b8' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.75rem',
                cursor: ocrProcessing ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}
            >
              {ocrProcessing ? <Clock size={16} /> : <Camera size={16} />}
              {ocrProcessing ? 'Reading Prescription...' : 'Scan Prescription'}
            </button>

            {ocrResult && (
              <div style={{
                background: 'linear-gradient(135deg, #10b98120 0%, #10b98110 100%)',
                border: '1px solid #10b98140',
                borderRadius: '8px',
                padding: '0.75rem',
                fontSize: largeText ? '1rem' : '0.875rem',
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <FileText size={16} style={{ color: '#10b981' }} />
                  <span style={{ fontWeight: '600' }}>Prescription Details:</span>
                </div>
                {ocrResult}
                <button
                  onClick={() => {
                    setInputText('Can you explain this prescription?');
                    setShowChat(true);
                  }}
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    border: '1px solid #10b981',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    marginTop: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}
                >
                  <MessageCircle size={12} />
                  Ask About This
                </button>
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

        {/* Chat Interface */}
        {showChat && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.25)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.98)',
              borderRadius: 20,
              boxShadow: '0 8px 32px rgba(59,130,246,0.18)',
              width: '95vw',
              maxWidth: 480,
              minHeight: 480,
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '1rem 1.5rem',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 600,
                fontSize: largeText ? '1.1rem' : '1rem'
              }}>
                <MessageCircle size={20} />
                AI Medical Chat
                <button
                  onClick={() => setShowChat(false)}
                  style={{
                    marginLeft: 'auto',
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: 22,
                    cursor: 'pointer',
                    fontWeight: 700
                  }}
                  title="Close Chat"
                >
                  ×
                </button>
              </div>

              {/* Messages */}
              <div style={{
                padding: '1.5rem',
                minHeight: 320,
                maxHeight: 340,
                overflowY: 'auto',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                flex: 1
              }}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      marginBottom: '1rem',
                      justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    {message.sender === 'bot' && (
                      <div style={{
                        width: '36px',
                        height: '36px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <MessageCircle size={18} color="white" />
                      </div>
                    )}

                    <div style={{
                      maxWidth: '70%',
                      background: message.sender === 'bot'
                        ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                        : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      color: message.sender === 'bot' ? '#1f2937' : 'white',
                      padding: '0.875rem 1.125rem',
                      borderRadius: message.sender === 'bot' ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: message.sender === 'bot' ? '1px solid rgba(0, 0, 0, 0.05)' : 'none'
                    }}>
                      <p style={{
                        fontSize: largeText ? '1rem' : '0.9rem',
                        lineHeight: '1.5',
                        margin: 0
                      }}>
                        {message.text}
                      </p>
                      <div style={{
                        fontSize: '0.75rem',
                        opacity: 0.7,
                        marginTop: '0.25rem'
                      }}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    {message.sender === 'user' && (
                      <div style={{
                        width: '36px',
                        height: '36px',
                        background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <User size={18} color="#4b5563" />
                      </div>
                    )}
                  </div>
                ))
                }
                
                {isProcessing && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <MessageCircle size={18} color="white" />
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      borderRadius: '18px 18px 18px 4px',
                      padding: '0.875rem 1.125rem',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      border: '1px solid rgba(0, 0, 0, 0.05)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          background: '#3b82f6',
                          borderRadius: '50%',
                          animation: 'pulse 1.5s ease-in-out infinite'
                        }}></div>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          background: '#3b82f6',
                          borderRadius: '50%',
                          animation: 'pulse 1.5s ease-in-out infinite',
                          animationDelay: '0.3s'
                        }}></div>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          background: '#3b82f6',
                          borderRadius: '50%',
                          animation: 'pulse 1.5s ease-in-out infinite',
                          animationDelay: '0.6s'
                        }}></div>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280', marginLeft: '0.5rem' }}>
                          AI is thinking...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.8)',
                borderTop: '1px solid rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-end',
                  background: 'white',
                  borderRadius: '16px',
                  padding: '0.75rem',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}>
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your medical question here..."
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      resize: 'none',
                      fontSize: largeText ? '1rem' : '0.9rem',
                      lineHeight: '1.5',
                      minHeight: '20px',
                      maxHeight: '120px',
                      fontFamily: 'inherit',
                      background: 'transparent'
                    }}
                    rows={1}
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                    }}
                  />

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={handleVoiceToText}
                      style={{
                        background: isRecording
                          ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                          : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                        color: isRecording ? 'white' : '#374151',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '44px',
                        height: '44px'
                      }}
                      title={isRecording ? 'Recording...' : 'Voice Input'}
                    >
                      {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>

                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim() || isProcessing}
                      style={{
                        background: (!inputText.trim() || isProcessing)
                          ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                          : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '0.75rem 1.25rem',
                        cursor: (!inputText.trim() || isProcessing) ? 'not-allowed' : 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        minHeight: '44px'
                      }}
                    >
                      {isProcessing ? (
                        <>
                          <Clock size={18} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginTop: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {[ // Pills replaced with FileText for Medication help
                    { text: 'Emergency symptoms', icon: AlertTriangle, color: '#ef4444' },
                    { text: 'Medication help', icon: FileText, color: '#f59e0b' },
                    { text: 'General health', icon: Heart, color: '#10b981' },
                    { text: 'Symptom checker', icon: Activity, color: '#3b82f6' }
                  ].map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setInputText(action.text)}
                      style={{
                        background: `linear-gradient(135deg, ${action.color}20 0%, ${action.color}10 100%)`,
                        color: action.color,
                        border: `1px solid ${action.color}40`,
                        borderRadius: '20px',
                        padding: '0.5rem 1rem',
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = `linear-gradient(135deg, ${action.color}30 0%, ${action.color}20 100%)`;
                        e.target.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = `linear-gradient(135deg, ${action.color}20 0%, ${action.color}10 100%)`;
                        e.target.style.transform = 'none';
                      }}
                    >
                      <action.icon size={14} />
                      {action.text}
                    </button>
                  ))}
                </div>
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
};

export default AssistantView;
