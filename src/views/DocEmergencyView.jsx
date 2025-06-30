import React, { useState } from 'react';
import { 
  AlertTriangle,
  Bell,
  BellOff,
  Clock,
  User,
  Phone,
  Video,
  MapPin,
  Heart,
  Thermometer,
  Activity,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  MessageCircle,
  FileText,
  Plus,
  X,
  Check,
  ArrowLeft
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

const DocEmergencyView = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedCase, setSelectedCase] = useState(null);
  const [isNotificationsOn, setIsNotificationsOn] = useState(true);
  const [newNote, setNewNote] = useState('');

  // Mock data for emergency cases
  const emergencyCases = [
    {
      id: 1,
      patient: 'Thabo Molefe',
      age: 62,
      gender: 'Male',
      condition: 'Severe chest pain',
      priority: 'critical',
      time: '2 min ago',
      location: 'Soweto, Johannesburg (2.3km away)',
      vitals: {
        bp: '180/110',
        hr: '112',
        temp: '37.2°C',
        oxygen: '92%'
      },
      notes: [
        { id: 1, text: 'Patient reports crushing chest pain radiating to left arm', time: '2 min ago', doctor: 'Dr. Khumalo' },
        { id: 2, text: 'History of hypertension and high cholesterol', time: '1 min ago', doctor: 'System' }
      ],
      status: 'active'
    },
    {
      id: 2,
      patient: 'Sarah van der Merwe',
      age: 34,
      gender: 'Female',
      condition: 'Severe allergic reaction',
      priority: 'high',
      time: '15 min ago',
      location: 'Pretoria Central (5.1km away)',
      vitals: {
        bp: '90/60',
        hr: '130',
        temp: '38.1°C',
        oxygen: '88%'
      },
      notes: [
        { id: 1, text: 'Patient reports difficulty breathing after bee sting', time: '15 min ago', doctor: 'Dr. Khumalo' },
        { id: 2, text: 'Known allergy to bee venom - carries EpiPen', time: '12 min ago', doctor: 'System' }
      ],
      status: 'active'
    },
    {
      id: 3,
      patient: 'Nomsa Mthembu',
      age: 45,
      gender: 'Female',
      condition: 'Uncontrolled blood sugar',
      priority: 'medium',
      time: '32 min ago',
      location: 'Alexandra (3.7km away)',
      vitals: {
        bp: '140/90',
        hr: '98',
        temp: '36.8°C',
        oxygen: '96%'
      },
      notes: [
        { id: 1, text: 'Blood glucose reading of 22 mmol/L', time: '32 min ago', doctor: 'Dr. Khumalo' },
        { id: 2, text: 'Patient reports nausea and blurred vision', time: '28 min ago', doctor: 'System' }
      ],
      status: 'active'
    },
    {
      id: 4,
      patient: 'Pieter Johnson',
      age: 58,
      gender: 'Male',
      condition: 'Severe headache',
      priority: 'medium',
      time: '1 hour ago',
      location: 'Sandton (4.5km away)',
      vitals: {
        bp: '160/100',
        hr: '88',
        temp: '37.0°C',
        oxygen: '97%'
      },
      notes: [
        { id: 1, text: 'Sudden onset severe headache with photophobia', time: '1 hour ago', doctor: 'Dr. Khumalo' },
        { id: 2, text: 'No history of migraines', time: '55 min ago', doctor: 'System' }
      ],
      status: 'resolved'
    }
  ];

  const filteredCases = emergencyCases.filter(caseItem => {
    if (activeTab === 'active') return caseItem.status === 'active';
    if (activeTab === 'resolved') return caseItem.status === 'resolved';
    if (activeTab === 'all') return true;
    return false;
  });

  const handleAddNote = () => {
    if (newNote.trim() && selectedCase) {
      const newNoteObj = {
        id: Date.now(),
        text: newNote,
        time: 'Just now',
        doctor: 'Dr. Khumalo'
      };
      // In a real app, would update the case notes
      setSelectedCase({
        ...selectedCase,
        notes: [...selectedCase.notes, newNoteObj]
      });
      setNewNote('');
    }
  };

  const CaseCard = ({ caseItem }) => (
    <div
      onClick={() => setSelectedCase(caseItem)}
      style={{
        background: colors.white,
        borderRadius: 12,
        border: `1px solid ${colors.gray200}`,
        padding: 16,
        marginBottom: 12,
        cursor: 'pointer',
        transition: 'all 0.2s',
        ':hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: colors.red50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: colors.danger,
          }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>
              {caseItem.patient}, {caseItem.age}
            </div>
            <div style={{ fontSize: 12, color: colors.gray500 }}>
              {caseItem.gender} • {caseItem.condition}
            </div>
          </div>
        </div>
        <div style={{
          padding: '4px 8px',
          borderRadius: 20,
          background: caseItem.priority === 'critical' ? colors.red50 : 
                     caseItem.priority === 'high' ? colors.yellow50 : colors.blue50,
          color: caseItem.priority === 'critical' ? colors.danger : 
                 caseItem.priority === 'high' ? colors.warning : colors.primary,
          fontSize: 12,
          fontWeight: 600,
          textTransform: 'uppercase'
        }}>
          {caseItem.priority}
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: colors.gray500 }}>BP</div>
          <div style={{ 
            fontSize: 14, 
            fontWeight: 600, 
            color: caseItem.vitals.bp.split('/')[0] > 140 ? colors.danger : colors.gray800 
          }}>
            {caseItem.vitals.bp}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: colors.gray500 }}>HR</div>
          <div style={{ 
            fontSize: 14, 
            fontWeight: 600, 
            color: caseItem.vitals.hr > 100 ? colors.danger : colors.gray800 
          }}>
            {caseItem.vitals.hr}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: colors.gray500 }}>Temp</div>
          <div style={{ 
            fontSize: 14, 
            fontWeight: 600, 
            color: parseFloat(caseItem.vitals.temp) > 37.5 ? colors.warning : colors.gray800 
          }}>
            {caseItem.vitals.temp}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: colors.gray500 }}>O2</div>
          <div style={{ 
            fontSize: 14, 
            fontWeight: 600, 
            color: parseInt(caseItem.vitals.oxygen) < 94 ? colors.danger : colors.gray800 
          }}>
            {caseItem.vitals.oxygen}
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Clock size={14} color={colors.gray500} />
          <span style={{ fontSize: 12, color: colors.gray500 }}>{caseItem.time}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <MapPin size={14} color={colors.gray500} />
          <span style={{ fontSize: 12, color: colors.gray500 }}>{caseItem.location}</span>
        </div>
      </div>
    </div>
  );

  const CaseDetail = () => (
    <div style={{
      background: colors.white,
      borderRadius: 12,
      border: `1px solid ${colors.gray200}`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Case Header */}
      <div style={{
        padding: 16,
        borderBottom: `1px solid ${colors.gray200}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button 
          onClick={() => setSelectedCase(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: colors.gray600
          }}
        >
          <ArrowLeft size={18} />
          <span style={{ fontSize: 14 }}>Back</span>
        </button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: `1px solid ${colors.primary}`,
            background: colors.white,
            color: colors.primary,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <Video size={16} />
            Video Call
          </button>
          <button style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: `1px solid ${colors.success}`,
            background: colors.white,
            color: colors.success,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <Phone size={16} />
            Call
          </button>
        </div>
      </div>

      {/* Case Content */}
      <div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.gray800, marginBottom: 4 }}>
                {selectedCase.patient}, {selectedCase.age}
              </h2>
              <div style={{ 
                fontSize: 14, 
                color: colors.gray600,
                display: 'flex',
                alignItems: 'center',
                gap: 16
              }}>
                <span>{selectedCase.gender}</span>
                <span>{selectedCase.condition}</span>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: 20,
                  background: selectedCase.priority === 'critical' ? colors.red50 : 
                              selectedCase.priority === 'high' ? colors.yellow50 : colors.blue50,
                  color: selectedCase.priority === 'critical' ? colors.danger : 
                         selectedCase.priority === 'high' ? colors.warning : colors.primary,
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  {selectedCase.priority} priority
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, color: colors.gray500 }}>{selectedCase.time}</div>
              <div style={{ 
                fontSize: 14, 
                color: colors.gray600,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                marginTop: 4
              }}>
                <MapPin size={14} />
                {selectedCase.location}
              </div>
            </div>
          </div>

          {/* Vitals */}
          <div style={{ 
            background: colors.gray50,
            borderRadius: 12,
            padding: 16,
            marginBottom: 24,
            border: `1px solid ${colors.gray200}`
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
              Vital Signs
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: colors.red50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                  color: colors.danger
                }}>
                  <Heart size={20} />
                </div>
                <div style={{ fontSize: 12, color: colors.gray500 }}>Blood Pressure</div>
                <div style={{ 
                  fontSize: 16, 
                  fontWeight: 700, 
                  color: selectedCase.vitals.bp.split('/')[0] > 140 ? colors.danger : colors.gray800 
                }}>
                  {selectedCase.vitals.bp}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: colors.blue50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                  color: colors.primary
                }}>
                  <Activity size={20} />
                </div>
                <div style={{ fontSize: 12, color: colors.gray500 }}>Heart Rate</div>
                <div style={{ 
                  fontSize: 16, 
                  fontWeight: 700, 
                  color: selectedCase.vitals.hr > 100 ? colors.danger : colors.gray800 
                }}>
                  {selectedCase.vitals.hr} bpm
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: colors.yellow50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                  color: colors.warning
                }}>
                  <Thermometer size={20} />
                </div>
                <div style={{ fontSize: 12, color: colors.gray500 }}>Temperature</div>
                <div style={{ 
                  fontSize: 16, 
                  fontWeight: 700, 
                  color: parseFloat(selectedCase.vitals.temp) > 37.5 ? colors.warning : colors.gray800 
                }}>
                  {selectedCase.vitals.temp}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: colors.green50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 8px',
                  color: colors.success
                }}>
                  <Activity size={20} />
                </div>
                <div style={{ fontSize: 12, color: colors.gray500 }}>Oxygen Saturation</div>
                <div style={{ 
                  fontSize: 16, 
                  fontWeight: 700, 
                  color: parseInt(selectedCase.vitals.oxygen) < 94 ? colors.danger : colors.gray800 
                }}>
                  {selectedCase.vitals.oxygen}%
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
              Case Notes
            </h3>
            <div style={{ 
              background: colors.gray50,
              borderRadius: 12,
              padding: 16,
              border: `1px solid ${colors.gray200}`,
              marginBottom: 16
            }}>
              {selectedCase.notes.map(note => (
                <div key={note.id} style={{ 
                  padding: '12px 0',
                  borderBottom: `1px solid ${colors.gray200}`,
                  ':last-child': {
                    borderBottom: 'none'
                  }
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                      {note.doctor}
                    </div>
                    <div style={{ fontSize: 12, color: colors.gray500 }}>
                      {note.time}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: colors.gray700 }}>
                    {note.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Note */}
            <div style={{ 
              border: `1px solid ${colors.gray300}`,
              borderRadius: 8,
              overflow: 'hidden'
            }}>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add case note..."
                style={{
                  width: '100%',
                  minHeight: 80,
                  padding: 12,
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  fontSize: 14,
                  fontFamily: 'inherit'
                }}
              />
              <div style={{
                padding: '8px 12px',
                background: colors.gray50,
                borderTop: `1px solid ${colors.gray200}`,
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
                <button
                  onClick={handleAddNote}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: 'none',
                    background: colors.primary,
                    color: colors.white,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Actions */}
      <div style={{
        padding: 16,
        borderTop: `1px solid ${colors.gray200}`,
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <button style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: `1px solid ${colors.gray300}`,
          background: colors.white,
          color: colors.gray700,
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <FileText size={16} />
          View Patient Records
        </button>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: `1px solid ${colors.gray300}`,
            background: colors.white,
            color: colors.gray700,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <MessageCircle size={16} />
            Message
          </button>
          <button style={{
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            background: colors.success,
            color: colors.white,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <Check size={16} />
            Resolve Case
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      padding: 24,
      background: colors.gray50,
      minHeight: '100vh'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>Emergency Cases</h1>
        <button 
          onClick={() => setIsNotificationsOn(!isNotificationsOn)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: isNotificationsOn ? colors.danger : colors.success,
            color: colors.white,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          {isNotificationsOn ? <BellOff size={16} /> : <Bell size={16} />}
          {isNotificationsOn ? 'Disable Alerts' : 'Enable Alerts'}
        </button>
      </div>

      {/* Case Tabs */}
      <div style={{ 
        display: 'flex',
        gap: 8,
        marginBottom: 24
      }}>
        <button
          onClick={() => setActiveTab('active')}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'active' ? colors.primary : colors.white,
            color: activeTab === 'active' ? colors.white : colors.gray700,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          Active Cases
          <span style={{
            background: activeTab === 'active' ? 'rgba(255,255,255,0.2)' : colors.gray100,
            color: activeTab === 'active' ? colors.white : colors.gray700,
            borderRadius: 20,
            padding: '2px 8px',
            fontSize: 12,
            fontWeight: 600
          }}>
            {emergencyCases.filter(c => c.status === 'active').length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('resolved')}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'resolved' ? colors.success : colors.white,
            color: activeTab === 'resolved' ? colors.white : colors.gray700,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          Resolved Cases
        </button>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            padding: '10px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'all' ? colors.gray800 : colors.white,
            color: activeTab === 'all' ? colors.white : colors.gray700,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          All Cases
        </button>
      </div>

      {/* Main Content */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: selectedCase ? '1fr 2fr' : '1fr',
        gap: 24
      }}>
        {/* Case List */}
        <div style={{ 
          background: colors.white,
          borderRadius: 12,
          border: `1px solid ${colors.gray200}`,
          padding: 16,
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 200px)'
        }}>
          {filteredCases.length > 0 ? (
            filteredCases.map(caseItem => (
              <CaseCard key={caseItem.id} caseItem={caseItem} />
            ))
          ) : (
            <div style={{ 
              padding: 40, 
              textAlign: 'center',
              color: colors.gray500
            }}>
              No {activeTab === 'active' ? 'active' : activeTab === 'resolved' ? 'resolved' : ''} emergency cases
            </div>
          )}
        </div>

        {/* Case Detail */}
        {selectedCase ? (
          <CaseDetail />
        ) : (
          <div style={{ 
            background: colors.white,
            borderRadius: 12,
            border: `1px solid ${colors.gray200}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40
          }}>
            <div style={{ textAlign: 'center', color: colors.gray500 }}>
              <AlertTriangle size={48} style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Select an emergency case</h3>
              <p style={{ fontSize: 14 }}>Click on a case from the list to view details and take action</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocEmergencyView;