import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  MessageCircle, 
  FileText, 
  Camera, 
  Upload, 
  Save, 
  Send, 
  Clock, 
  User, 
  Heart, 
  Activity, 
  Thermometer, 
  Zap, 
  Plus, 
  Minus, 
  Calendar, 
  Stethoscope, 
  Pill, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  Filter, 
  Settings, 
  Maximize, 
  Minimize, 
  Volume2, 
  VolumeX,
  Edit3,
  Eye,
  Download,
  Share,
  Printer,
  X,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

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

const ConsultationView = () => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [activeTab, setActiveTab] = useState('notes');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [vitals, setVitals] = useState({
    bloodPressure: '120/80',
    heartRate: '72',
    temperature: '36.5',
    oxygenSat: '98',
    respiratoryRate: '16',
    weight: '70',
    height: '170'
  });
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  });
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState([]);
  const [consultationTimer, setConsultationTimer] = useState(0);
  const [isConsultationStarted, setIsConsultationStarted] = useState(false);

  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // Mock patient data
  const currentPatient = {
    id: 1,
    name: 'Nomsa Mthembu',
    age: 45,
    gender: 'Female',
    id_number: '7801154567890',
    medical_aid: 'Discovery Health',
    contact: '+27 82 123 4567',
    language: 'isiZulu',
    address: 'Soweto, Johannesburg',
    emergency_contact: 'Sipho Mthembu (+27 83 987 6543)',
    allergies: ['Penicillin', 'Shellfish'],
    chronic_conditions: ['Type 2 Diabetes', 'Hypertension'],
    current_medications: ['Metformin 850mg', 'Amlodipine 5mg'],
    last_visit: '2024-05-15',
    consultation_reason: 'Follow-up for diabetes management and blood pressure check'
  };

  const commonDiagnoses = [
    'Hypertension',
    'Type 2 Diabetes Mellitus',
    'Upper Respiratory Tract Infection',
    'Gastroenteritis',
    'Migraine',
    'Anxiety Disorder',
    'Chronic Fatigue Syndrome',
    'Allergic Rhinitis',
    'Osteoarthritis',
    'Depression'
  ];

  const commonMedications = [
    { name: 'Metformin', strengths: ['500mg', '850mg', '1000mg'] },
    { name: 'Amlodipine', strengths: ['2.5mg', '5mg', '10mg'] },
    { name: 'Lisinopril', strengths: ['5mg', '10mg', '20mg'] },
    { name: 'Paracetamol', strengths: ['500mg', '1000mg'] },
    { name: 'Ibuprofen', strengths: ['200mg', '400mg', '600mg'] },
    { name: 'Amoxicillin', strengths: ['250mg', '500mg', '875mg'] }
  ];

  // Timer effect
  useEffect(() => {
    if (isConsultationStarted) {
      timerRef.current = setInterval(() => {
        setConsultationTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isConsultationStarted]);

  // Recording timer effect
  useEffect(() => {
    let recordingInterval;
    if (isRecording) {
      recordingInterval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => {
      if (recordingInterval) {
        clearInterval(recordingInterval);
      }
    };
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startConsultation = () => {
    setIsConsultationStarted(true);
    setIsCallActive(true);
  };

  const endConsultation = () => {
    setIsConsultationStarted(false);
    setIsCallActive(false);
    setConsultationTimer(0);
  };

  const addPrescription = () => {
    if (newPrescription.medication && newPrescription.dosage) {
      setPrescriptions([...prescriptions, { ...newPrescription, id: Date.now() }]);
      setNewPrescription({
        medication: '',
        dosage: '',
        frequency: '',
        duration: '',
        instructions: ''
      });
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, {
        id: Date.now(),
        sender: 'doctor',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setNewMessage('');
    }
  };

  const toggleDiagnosis = (diagnosis) => {
    setSelectedDiagnosis(prev => 
      prev.includes(diagnosis) 
        ? prev.filter(d => d !== diagnosis)
        : [...prev, diagnosis]
    );
  };

  const PatientInfoPanel = () => (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      border: `1px solid ${colors.gray200}`,
      overflow: 'hidden'
    }}>
      <div style={{
        background: colors.blue50,
        padding: '16px 20px',
        borderBottom: `1px solid ${colors.gray200}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
            fontSize: 18
          }}>
            {currentPatient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, margin: 0 }}>
              {currentPatient.name}
            </h3>
            <p style={{ fontSize: 14, color: colors.gray600, margin: '2px 0 0 0' }}>
              {currentPatient.age} years • {currentPatient.gender} • {currentPatient.language}
            </p>
          </div>
        </div>
      </div>
      
      <div style={{ padding: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500 }}>Medical Aid</label>
            <p style={{ fontSize: 14, color: colors.gray800, margin: '4px 0 0 0' }}>{currentPatient.medical_aid}</p>
          </div>
          <div>
            <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500 }}>Contact</label>
            <p style={{ fontSize: 14, color: colors.gray800, margin: '4px 0 0 0' }}>{currentPatient.contact}</p>
          </div>
        </div>
        
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500 }}>Reason for Visit</label>
          <p style={{ fontSize: 14, color: colors.gray800, margin: '4px 0 0 0' }}>{currentPatient.consultation_reason}</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500 }}>Allergies</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
            {currentPatient.allergies.map((allergy, idx) => (
              <span key={idx} style={{
                padding: '4px 8px',
                background: colors.red50,
                color: colors.danger,
                fontSize: 12,
                borderRadius: 6,
                fontWeight: 500
              }}>
                {allergy}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500 }}>Chronic Conditions</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
            {currentPatient.chronic_conditions.map((condition, idx) => (
              <span key={idx} style={{
                padding: '4px 8px',
                background: colors.yellow50,
                color: colors.warning,
                fontSize: 12,
                borderRadius: 6,
                fontWeight: 500
              }}>
                {condition}
              </span>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500 }}>Current Medications</label>
          <div style={{ marginTop: 4 }}>
            {currentPatient.current_medications.map((med, idx) => (
              <div key={idx} style={{
                padding: '8px 12px',
                background: colors.green50,
                color: colors.gray800,
                fontSize: 13,
                borderRadius: 8,
                marginBottom: 6,
                border: `1px solid ${colors.gray200}`
              }}>
                {med}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const VideoCallPanel = () => (
    <div style={{
      background: '#000',
      borderRadius: 12,
      overflow: 'hidden',
      position: 'relative',
      height: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {isVideoOn ? (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: 24,
          fontWeight: 600
        }}>
          Video Call Active
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          color: colors.gray400
        }}>
          <VideoOff size={48} />
          <span>Video is off</span>
        </div>
      )}

      {/* Call Timer */}
      {isCallActive && (
        <div style={{
          position: 'absolute',
          top: 16,
          left: 16,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '6px 12px',
          borderRadius: 20,
          fontSize: 14,
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: colors.success,
            animation: 'pulse 2s infinite'
          }} />
          {formatTime(consultationTimer)}
        </div>
      )}

      {/* Call Controls */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 12,
        background: 'rgba(0,0,0,0.7)',
        padding: 12,
        borderRadius: 50
      }}>
        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: 'none',
            background: isVideoOn ? colors.gray600 : colors.danger,
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
        >
          {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
        </button>

        <button
          onClick={() => setIsAudioOn(!isAudioOn)}
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: 'none',
            background: isAudioOn ? colors.gray600 : colors.danger,
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
        >
          {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
        </button>

        {!isCallActive ? (
          <button
            onClick={startConsultation}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: 'none',
              background: colors.success,
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <Phone size={20} />
          </button>
        ) : (
          <button
            onClick={endConsultation}
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: 'none',
              background: colors.danger,
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <PhoneOff size={20} />
          </button>
        )}
      </div>
    </div>
  );

  const VitalsPanel = () => (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      border: `1px solid ${colors.gray200}`,
      padding: 20
    }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
        Vital Signs
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {Object.entries(vitals).map(([key, value]) => {
          const vitalConfig = {
            bloodPressure: { icon: <Heart size={16} />, label: 'Blood Pressure', unit: 'mmHg', color: colors.danger },
            heartRate: { icon: <Activity size={16} />, label: 'Heart Rate', unit: 'bpm', color: colors.primary },
            temperature: { icon: <Thermometer size={16} />, label: 'Temperature', unit: '°C', color: colors.warning },
            oxygenSat: { icon: <Zap size={16} />, label: 'Oxygen Sat', unit: '%', color: colors.success },
            respiratoryRate: { icon: <Activity size={16} />, label: 'Respiratory Rate', unit: '/min', color: colors.purple },
            weight: { icon: <User size={16} />, label: 'Weight', unit: 'kg', color: colors.gray600 },
            height: { icon: <User size={16} />, label: 'Height', unit: 'cm', color: colors.gray600 }
          };
          
          const config = vitalConfig[key];
          
          return (
            <div key={key} style={{
              padding: 12,
              background: colors.gray50,
              borderRadius: 8,
              border: `1px solid ${colors.gray200}`
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8,
                color: config.color
              }}>
                {config.icon}
                <span style={{ fontSize: 12, fontWeight: 500 }}>{config.label}</span>
              </div>
              <input
                type="text"
                value={value}
                onChange={(e) => setVitals(prev => ({ ...prev, [key]: e.target.value }))}
                style={{
                  width: '100%',
                  padding: 8,
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: 6,
                  fontSize: 14,
                  background: '#fff'
                }}
              />
              <div style={{ fontSize: 11, color: colors.gray500, marginTop: 4 }}>
                {config.unit}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const ConsultationTabs = () => {
    const tabs = [
      { id: 'notes', label: 'Clinical Notes', icon: <FileText size={16} /> },
      { id: 'diagnosis', label: 'Diagnosis', icon: <Stethoscope size={16} /> },
      { id: 'prescriptions', label: 'Prescriptions', icon: <Pill size={16} /> },
      { id: 'chat', label: 'Patient Chat', icon: <MessageCircle size={16} /> }
    ];

    return (
      <div style={{
        background: '#fff',
        borderRadius: 12,
        border: `1px solid ${colors.gray200}`,
        overflow: 'hidden'
      }}>
        {/* Tab Headers */}
        <div style={{
          display: 'flex',
          borderBottom: `1px solid ${colors.gray200}`,
          background: colors.gray50
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 16px',
                border: 'none',
                background: activeTab === tab.id ? '#fff' : 'transparent',
                color: activeTab === tab.id ? colors.primary : colors.gray600,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                borderBottom: activeTab === tab.id ? `2px solid ${colors.primary}` : 'none'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ padding: 20 }}>
          {activeTab === 'notes' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, margin: 0 }}>
                  Clinical Notes
                </h4>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 8,
                      border: 'none',
                      background: isRecording ? colors.danger : colors.primary,
                      color: 'white',
                      fontSize: 12,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Mic size={12} />
                    {isRecording ? `Recording ${formatTime(recordingTime)}` : 'Record'}
                  </button>
                </div>
              </div>
              
              <textarea
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
                placeholder="Enter clinical notes, observations, and findings..."
                style={{
                  width: '100%',
                  height: 300,
                  padding: 16,
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: 8,
                  fontSize: 14,
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          )}

          {activeTab === 'diagnosis' && (
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
                Diagnosis & Assessment
              </h4>
              
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: colors.gray700, marginBottom: 8, display: 'block' }}>
                  Common Diagnoses
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {commonDiagnoses.map((diagnosis) => (
                    <button
                      key={diagnosis}
                      onClick={() => toggleDiagnosis(diagnosis)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 20,
                        border: `1px solid ${selectedDiagnosis.includes(diagnosis) ? colors.primary : colors.gray300}`,
                        background: selectedDiagnosis.includes(diagnosis) ? colors.blue50 : 'white',
                        color: selectedDiagnosis.includes(diagnosis) ? colors.primary : colors.gray600,
                        fontSize: 12,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {diagnosis}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 14, fontWeight: 500, color: colors.gray700, marginBottom: 8, display: 'block' }}>
                  Selected Diagnoses
                </label>
                {selectedDiagnosis.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {selectedDiagnosis.map((diagnosis, idx) => (
                      <div key={idx} style={{
                        padding: 12,
                        background: colors.green50,
                        border: `1px solid ${colors.success}`,
                        borderRadius: 8,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <span style={{ fontSize: 14, color: colors.gray800 }}>{diagnosis}</span>
                        <button
                          onClick={() => toggleDiagnosis(diagnosis)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: colors.danger,
                            cursor: 'pointer',
                            padding: 4
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 14, color: colors.gray500, fontStyle: 'italic' }}>
                    No diagnoses selected yet
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
                Prescriptions
              </h4>
              
              {/* Add New Prescription */}
              <div style={{
                padding: 16,
                background: colors.gray50,
                borderRadius: 8,
                marginBottom: 20,
                border: `1px solid ${colors.gray200}`
              }}>
                <h5 style={{ fontSize: 14, fontWeight: 600, color: colors.gray700, marginBottom: 12 }}>
                  Add New Prescription
                </h5>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500, marginBottom: 4, display: 'block' }}>
                      Medication
                    </label>
                    <select
                      value={newPrescription.medication}
                      onChange={(e) => setNewPrescription(prev => ({ ...prev, medication: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: 8,
                        border: `1px solid ${colors.gray300}`,
                        borderRadius: 6,
                        fontSize: 14,
                        background: '#fff'
                      }}
                    >
                      <option value="">Select medication</option>
                      {commonMedications.map((med) => (
                        <option key={med.name} value={med.name}>{med.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500, marginBottom: 4, display: 'block' }}>
                      Dosage
                    </label>
                    <input
                      type="text"
                      value={newPrescription.dosage}
                      onChange={(e) => setNewPrescription(prev => ({ ...prev, dosage: e.target.value }))}
                      placeholder="e.g., 500mg"
                      style={{
                        width: '100%',
                        padding: 8,
                        border: `1px solid ${colors.gray300}`,
                        borderRadius: 6,
                        fontSize: 14,
                        background: '#fff'
                      }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500, marginBottom: 4, display: 'block' }}>
                      Frequency
                    </label>
                    <select
                      value={newPrescription.frequency}
                      onChange={(e) => setNewPrescription(prev => ({ ...prev, frequency: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: 8,
                        border: `1px solid ${colors.gray300}`,
                        borderRadius: 6,
                        fontSize: 14,
                        background: '#fff'
                      }}
                    >
                      <option value="">Select frequency</option>
                      <option value="Once daily">Once daily</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Three times daily">Three times daily</option>
                      <option value="Four times daily">Four times daily</option>
                      <option value="As needed">As needed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500, marginBottom: 4, display: 'block' }}>
                      Duration
                    </label>
                    <input
                      type="text"
                      value={newPrescription.duration}
                      onChange={(e) => setNewPrescription(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="e.g., 7 days"
                      style={{
                        width: '100%',
                        padding: 8,
                        border: `1px solid ${colors.gray300}`,
                        borderRadius: 6,
                        fontSize: 14,
                        background: '#fff'
                      }}
                    />
                  </div>
                </div>
                
                <div style={{ marginBottom: 12 }}>
                  <label style={{ fontSize: 12, color: colors.gray500, fontWeight: 500, marginBottom: 4, display: 'block' }}>
                    Instructions
                  </label>
                  <textarea
                    value={newPrescription.instructions}
                    onChange={(e) => setNewPrescription(prev => ({ ...prev, instructions: e.target.value }))}
                    placeholder="Special instructions for the patient"
                    style={{
                      width: '100%',
                      minHeight: 60,
                      padding: 8,
                      border: `1px solid ${colors.gray300}`,
                      borderRadius: 6,
                      fontSize: 14,
                      resize: 'vertical',
                      background: '#fff'
                    }}
                  />
                </div>
                
                <button
                  onClick={addPrescription}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: colors.primary,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = colors.primaryHover}
                  onMouseLeave={e => e.currentTarget.style.background = colors.primary}
                >
                  <Plus size={16} />
                  Add Prescription
                </button>
              </div>
              
              {/* Current Prescriptions */}
              <div>
                <h5 style={{ fontSize: 14, fontWeight: 600, color: colors.gray700, marginBottom: 12 }}>
                  Current Prescriptions
                </h5>
                
                {prescriptions.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {prescriptions.map((prescription) => (
                      <div key={prescription.id} style={{
                        padding: 16,
                        background: colors.blue50,
                        border: `1px solid ${colors.primary}`,
                        borderRadius: 8,
                        position: 'relative'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                          <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>
                            {prescription.medication} {prescription.dosage}
                          </div>
                          <button
                            onClick={() => setPrescriptions(prescriptions.filter(p => p.id !== prescription.id))}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: colors.danger,
                              cursor: 'pointer',
                              padding: 4
                            }}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                          <div>
                            <span style={{ fontSize: 12, color: colors.gray500 }}>Frequency:</span>
                            <span style={{ fontSize: 14, color: colors.gray800, marginLeft: 8 }}>
                              {prescription.frequency}
                            </span>
                          </div>
                          <div>
                            <span style={{ fontSize: 12, color: colors.gray500 }}>Duration:</span>
                            <span style={{ fontSize: 14, color: colors.gray800, marginLeft: 8 }}>
                              {prescription.duration}
                            </span>
                          </div>
                        </div>
                        
                        {prescription.instructions && (
                          <div style={{ marginTop: 8 }}>
                            <span style={{ fontSize: 12, color: colors.gray500 }}>Instructions:</span>
                            <p style={{ fontSize: 14, color: colors.gray800, margin: '4px 0 0 0' }}>
                              {prescription.instructions}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: 14, color: colors.gray500, fontStyle: 'italic' }}>
                    No prescriptions added yet
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
                Patient Chat
              </h4>
              
              {/* Chat Messages */}
              <div style={{
                height: 300,
                overflowY: 'auto',
                marginBottom: 16,
                padding: 12,
                background: colors.gray50,
                borderRadius: 8,
                border: `1px solid ${colors.gray200}`
              }}>
                {chatMessages.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        style={{
                          alignSelf: msg.sender === 'doctor' ? 'flex-end' : 'flex-start',
                          maxWidth: '80%',
                          padding: '8px 12px',
                          background: msg.sender === 'doctor' ? colors.blue50 : colors.gray100,
                          borderRadius: 12,
                          borderTopRightRadius: msg.sender === 'doctor' ? 0 : 12,
                          borderTopLeftRadius: msg.sender === 'doctor' ? 12 : 0,
                          border: `1px solid ${msg.sender === 'doctor' ? colors.primary : colors.gray300}`
                        }}
                      >
                        <div style={{ fontSize: 14, color: colors.gray800 }}>{msg.message}</div>
                        <div style={{
                          fontSize: 10,
                          color: colors.gray500,
                          textAlign: msg.sender === 'doctor' ? 'right' : 'left',
                          marginTop: 4
                        }}>
                          {msg.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.gray400
                  }}>
                    <MessageCircle size={32} />
                    <p style={{ marginTop: 8 }}>No messages yet</p>
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    border: `1px solid ${colors.gray300}`,
                    borderRadius: 8,
                    fontSize: 14,
                    background: '#fff'
                  }}
                />
                <button
                  onClick={sendMessage}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: colors.primary,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = colors.primaryHover}
                  onMouseLeave={e => e.currentTarget.style.background = colors.primary}
                >
                  <Send size={16} />
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ActionButtons = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: 20
    }}>
      <div style={{ display: 'flex', gap: 12 }}>
        <button style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: `1px solid ${colors.gray300}`,
          background: 'white',
          color: colors.gray700,
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          transition: 'all 0.2s'
        }}>
          <Download size={16} />
          Save Draft
        </button>
        
        <button style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: `1px solid ${colors.gray300}`,
          background: 'white',
          color: colors.gray700,
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          transition: 'all 0.2s'
        }}>
          <Printer size={16} />
          Print
        </button>
      </div>
      
      <div style={{ display: 'flex', gap: 12 }}>
        <button style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: `1px solid ${colors.success}`,
          background: colors.success,
          color: 'white',
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          transition: 'all 0.2s'
        }}>
          <CheckCircle size={16} />
          Complete Consultation
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      maxWidth: 1400,
      margin: '0 auto',
      padding: 24,
      background: colors.gray50,
      minHeight: '100vh'
    }}>
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Left Column */}
        <div style={{ flex: 1, minWidth: 300 }}>
          <PatientInfoPanel />
          <div style={{ marginTop: 24 }}>
            <VitalsPanel />
          </div>
        </div>
        
        {/* Right Column */}
        <div style={{ flex: 2 }}>
          <VideoCallPanel />
          <div style={{ marginTop: 24 }}>
            <ConsultationTabs />
          </div>
          <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default ConsultationView;