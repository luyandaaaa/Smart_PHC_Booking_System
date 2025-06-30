import React, { useState } from 'react';
import { Edit, Phone, X, FileText, Search } from 'react-feather';
import { colors } from '../constants';

const ConsultationsView = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [consultationNotes, setConsultationNotes] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock consultations data
  const consultations = {
    upcoming: [
      {
        id: 1,
        patient: 'Nomsa Mthembu',
        date: '2023-06-15',
        time: '09:30',
        type: 'Follow-up',
        status: 'scheduled',
        condition: 'Hypertension',
        duration: '30 min',
        notes: 'Needs BP medication review',
        language: 'isiZulu'
      },
      {
        id: 2,
        patient: 'Thabo Molefe',
        date: '2023-06-15',
        time: '11:00',
        type: 'Initial Consultation',
        status: 'scheduled',
        condition: 'Diabetes screening',
        duration: '45 min',
        notes: 'Family history of diabetes',
        language: 'English'
      }
    ],
    completed: [
      {
        id: 3,
        patient: 'Sarah van der Merwe',
        date: '2023-06-14',
        time: '10:00',
        type: 'Emergency',
        status: 'completed',
        condition: 'Chest pain',
        duration: '60 min',
        notes: 'Referred to cardiology, ECG showed mild abnormalities',
        language: 'Afrikaans'
      },
      {
        id: 4,
        patient: 'Lebohang Sithole',
        date: '2023-06-14',
        time: '14:30',
        type: 'Check-up',
        status: 'completed',
        condition: 'Routine physical',
        duration: '25 min',
        notes: 'All vitals normal, advised to increase exercise',
        language: 'Sesotho'
      }
    ],
    canceled: [
      {
        id: 5,
        patient: 'Zanele Dlamini',
        date: '2023-06-13',
        time: '13:00',
        type: 'Follow-up',
        status: 'canceled',
        condition: 'Type 2 Diabetes',
        duration: '30 min',
        notes: 'Patient called to reschedule',
        language: 'isiZulu'
      }
    ]
  };

  const filteredConsultations = consultations[activeTab].filter(consultation => {
    // Filter by search query
    const matchesSearch = consultation.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         consultation.condition.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by selected filter
    const matchesFilter = selectedFilter === 'all' || consultation.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddNotes = (consultation) => {
    setSelectedConsultation(consultation);
    setConsultationNotes(consultation.notes || '');
    setShowNotesModal(true);
  };

  const saveNotes = () => {
    // In a real app, you would save to an API here
    const updatedConsultation = {
      ...selectedConsultation,
      notes: consultationNotes
    };
    
    // Update the local state (in a real app, this would be handled via API response)
    consultations[activeTab] = consultations[activeTab].map(c => 
      c.id === updatedConsultation.id ? updatedConsultation : c
    );
    
    setShowNotesModal(false);
  };

  const ConsultationCard = ({ consultation }) => (
    <div style={{
      background: '#fff',
      border: `1px solid ${colors.gray200}`,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      transition: 'all 0.2s',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>{consultation.patient}</div>
          <div style={{ fontSize: 12, color: colors.gray500, marginTop: 2 }}>
            {consultation.date} • {consultation.time} • {consultation.duration}
          </div>
          <div style={{ 
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: 12,
            background: consultation.status === 'completed' ? colors.green50 : 
                       consultation.status === 'canceled' ? colors.red50 : colors.blue50,
            color: consultation.status === 'completed' ? colors.success : 
                   consultation.status === 'canceled' ? colors.danger : colors.primary,
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            marginTop: 8
          }}>
            {consultation.status}
          </div>
        </div>
        <div style={{ 
          padding: '4px 8px',
          borderRadius: 8,
          background: colors.gray50,
          color: colors.gray600,
          fontSize: 12,
          fontWeight: 500
        }}>
          {consultation.type}
        </div>
      </div>
      
      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: colors.gray700 }}>{consultation.condition}</div>
        <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>
          <span style={{ fontWeight: 500 }}>Language:</span> {consultation.language}
        </div>
      </div>
      
      {consultation.notes && (
        <div style={{ 
          background: colors.gray50,
          borderRadius: 8,
          padding: 12,
          marginTop: 12,
          fontSize: 13,
          color: colors.gray700
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Notes:</div>
          {consultation.notes}
        </div>
      )}
      
      <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
        <button 
          onClick={() => handleAddNotes(consultation)}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            border: `1px solid ${colors.primary}`,
            background: 'transparent',
            color: colors.primary,
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Edit size={12} />
          {consultation.notes ? 'Edit Notes' : 'Add Notes'}
        </button>
        
        {activeTab === 'upcoming' && (
          <>
            <button style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: `1px solid ${colors.success}`,
              background: 'transparent',
              color: colors.success,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <Phone size={12} />
              Start Call
            </button>
            <button style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: `1px solid ${colors.danger}`,
              background: 'transparent',
              color: colors.danger,
              fontSize: 12,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <X size={12} />
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>Consultations</h1>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color={colors.gray500} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search consultations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: '8px 12px 8px 36px',
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                fontSize: 14,
                width: 200,
              }}
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: `1px solid ${colors.gray300}`,
              fontSize: 14,
              background: '#fff',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Types</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Initial Consultation">Initial Consultation</option>
            <option value="Emergency">Emergency</option>
            <option value="Check-up">Check-up</option>
          </select>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button
          onClick={() => setActiveTab('upcoming')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'upcoming' ? colors.primary : colors.gray100,
            color: activeTab === 'upcoming' ? 'white' : colors.gray700,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'completed' ? colors.primary : colors.gray100,
            color: activeTab === 'completed' ? 'white' : colors.gray700,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Completed
        </button>
        <button
          onClick={() => setActiveTab('canceled')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'canceled' ? colors.primary : colors.gray100,
            color: activeTab === 'canceled' ? 'white' : colors.gray700,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Canceled
        </button>
      </div>
      
      {filteredConsultations.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredConsultations.map(consultation => (
            <ConsultationCard key={consultation.id} consultation={consultation} />
          ))}
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          background: colors.gray50,
          borderRadius: 12,
          border: `1px dashed ${colors.gray300}`,
          textAlign: 'center'
        }}>
          <FileText size={48} color={colors.gray400} style={{ marginBottom: 16 }} />
          <div style={{ fontSize: 16, fontWeight: 500, color: colors.gray600, marginBottom: 8 }}>
            No consultations found
          </div>
          <div style={{ fontSize: 14, color: colors.gray500 }}>
            {searchQuery ? 'Try a different search term' : 'No consultations match your current filters'}
          </div>
        </div>
      )}
      
      {/* Notes Modal */}
      {showNotesModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 12,
            width: '100%',
            maxWidth: 500,
            padding: 24,
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.gray800 }}>
                {selectedConsultation.notes ? 'Edit Consultation Notes' : 'Add Consultation Notes'}
              </h2>
              <button 
                onClick={() => setShowNotesModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: colors.gray500
                }}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: colors.gray700, marginBottom: 8 }}>
                {selectedConsultation.patient} - {selectedConsultation.date} {selectedConsultation.time}
              </div>
              <div style={{ fontSize: 14, color: colors.gray600 }}>
                {selectedConsultation.condition}
              </div>
            </div>
            
            <textarea
              value={consultationNotes}
              onChange={(e) => setConsultationNotes(e.target.value)}
              placeholder="Enter consultation notes..."
              style={{
                width: '100%',
                minHeight: 200,
                padding: 12,
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                fontSize: 14,
                marginBottom: 24
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                onClick={() => setShowNotesModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: `1px solid ${colors.gray300}`,
                  background: 'transparent',
                  color: colors.gray600,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveNotes}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: colors.primary,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationsView;
