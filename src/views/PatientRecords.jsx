import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Phone, 
  Video,
  ChevronRight,
  Calendar,
  Heart,
  AlertTriangle,
  Download,
  Upload,
  Mail,
  MapPin,
  User,
  FileText,
  Activity
} from 'lucide-react';

const colors = {
  primary: '#3b82f6',
  primaryHover: '#2563eb',
  secondary: '#f3f4f6',
  danger: '#ef4444',
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

const PatientRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const patients = [
    {
      id: 1,
      name: 'Nomsa Mthembu',
      age: 45,
      gender: 'Female',
      idNumber: '7804155678901',
      phone: '+27 81 234 5678',
      email: 'nomsa.mthembu@email.com',
      address: '123 Main Street, Johannesburg, 2001',
      language: 'isiZulu',
      medicalAid: 'Discovery Health',
      memberNumber: 'DH123456789',
      lastVisit: '2024-06-28',
      nextAppointment: '2024-07-15',
      conditions: ['Type 2 Diabetes', 'Hypertension'],
      riskLevel: 'medium',
      vitals: { 
        bp: '140/90', 
        glucose: '8.2 mmol/L', 
        bmi: '28.5',
        weight: '75kg',
        height: '165cm'
      },
      allergies: ['Penicillin'],
      medications: ['Metformin 500mg', 'Amlodipine 5mg'],
      emergencyContact: {
        name: 'Thabo Mthembu',
        relationship: 'Husband',
        phone: '+27 82 345 6789'
      }
    },
    {
      id: 2,
      name: 'Pieter Johnson',
      age: 62,
      gender: 'Male',
      idNumber: '6203125432109',
      phone: '+27 83 456 7890',
      email: 'pieter.johnson@email.com',
      address: '456 Oak Avenue, Cape Town, 8001',
      language: 'Afrikaans',
      medicalAid: 'Bonitas',
      memberNumber: 'BON987654321',
      lastVisit: '2024-06-25',
      nextAppointment: '2024-07-10',
      conditions: ['Hypertension', 'High Cholesterol'],
      riskLevel: 'high',
      vitals: { 
        bp: '160/100', 
        glucose: '6.1 mmol/L', 
        bmi: '31.2',
        weight: '95kg',
        height: '175cm'
      },
      allergies: ['Aspirin', 'Shellfish'],
      medications: ['Enalapril 10mg', 'Simvastatin 20mg'],
      emergencyContact: {
        name: 'Marie Johnson',
        relationship: 'Wife',
        phone: '+27 84 567 8901'
      }
    },
    {
      id: 3,
      name: 'Fatima Hassan',
      age: 34,
      gender: 'Female',
      idNumber: '9001087654321',
      phone: '+27 85 678 9012',
      email: 'fatima.hassan@email.com',
      address: '789 Rose Street, Durban, 4001',
      language: 'English',
      medicalAid: 'Momentum Health',
      memberNumber: 'MOM456789123',
      lastVisit: '2024-06-27',
      nextAppointment: '2024-07-08',
      conditions: ['Pregnancy - 28 weeks'],
      riskLevel: 'low',
      vitals: { 
        bp: '115/75', 
        glucose: '5.4 mmol/L', 
        bmi: '26.8',
        weight: '68kg',
        height: '160cm'
      },
      allergies: ['None known'],
      medications: ['Prenatal vitamins', 'Folic acid'],
      emergencyContact: {
        name: 'Ahmed Hassan',
        relationship: 'Husband',
        phone: '+27 86 789 0123'
      }
    },
    {
      id: 4,
      name: 'Lebohang Sithole',
      age: 28,
      gender: 'Male',
      idNumber: '9604193456789',
      phone: '+27 87 890 1234',
      email: 'lebohang.sithole@email.com',
      address: '321 Hill Road, Pretoria, 0001',
      language: 'Sesotho',
      medicalAid: 'Medihelp',
      memberNumber: 'MED789123456',
      lastVisit: '2024-06-20',
      nextAppointment: '2024-07-20',
      conditions: ['Asthma'],
      riskLevel: 'low',
      vitals: { 
        bp: '120/80', 
        glucose: '5.1 mmol/L', 
        bmi: '24.5',
        weight: '70kg',
        height: '172cm'
      },
      allergies: ['Dust mites'],
      medications: ['Salbutamol inhaler'],
      emergencyContact: {
        name: 'Mpho Sithole',
        relationship: 'Sister',
        phone: '+27 88 901 2345'
      }
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.conditions.some(condition => 
                           condition.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    
    const matchesFilter = selectedFilter === 'all' || 
                         patient.riskLevel === selectedFilter ||
                         (selectedFilter === 'chronic' && 
                          patient.conditions.some(condition => 
                            ['diabetes', 'hypertension', 'asthma'].some(chronic => 
                              condition.toLowerCase().includes(chronic)
                            )
                          ));
    
    return matchesSearch && matchesFilter;
  });

  const PatientCard = ({ patient }) => (
    <div style={{
      background: '#fff',
      border: `1px solid ${colors.gray200}`,
      borderRadius: 16,
      padding: 24,
      transition: 'all 0.2s',
      cursor: 'pointer',
      height: 'fit-content'
    }}
    onClick={() => setSelectedPatient(patient)}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = '0 8px 25px -8px rgba(0,0,0,0.15)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'none';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
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
            fontSize: 18,
          }}>
            {patient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: colors.gray800 }}>{patient.name}</div>
            <div style={{ fontSize: 14, color: colors.gray600 }}>
              {patient.gender} • Age {patient.age} • {patient.language}
            </div>
          </div>
        </div>
        <div style={{
          padding: '4px 12px',
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 600,
          textTransform: 'uppercase',
          background: patient.riskLevel === 'high' ? colors.red50 : 
                     patient.riskLevel === 'medium' ? colors.yellow50 : colors.green50,
          color: patient.riskLevel === 'high' ? colors.danger : 
                 patient.riskLevel === 'medium' ? colors.warning : colors.success,
        }}>
          {patient.riskLevel} Risk
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, color: colors.gray600, marginBottom: 8 }}>Primary Conditions:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {patient.conditions.map((condition, idx) => (
            <span key={idx} style={{
              padding: '4px 8px',
              borderRadius: 12,
              fontSize: 12,
              fontWeight: 500,
              background: colors.blue50,
              color: colors.primary,
            }}>
              {condition}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        <div style={{ textAlign: 'center', padding: 8, background: colors.gray50, borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: colors.gray500 }}>Blood Pressure</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{patient.vitals.bp}</div>
        </div>
        <div style={{ textAlign: 'center', padding: 8, background: colors.gray50, borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: colors.gray500 }}>BMI</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{patient.vitals.bmi}</div>
        </div>
        <div style={{ textAlign: 'center', padding: 8, background: colors.gray50, borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: colors.gray500 }}>Last Visit</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
            {new Date(patient.lastVisit).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: `1px solid ${colors.primary}`,
            background: colors.primary,
            color: 'white',
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <Eye size={12} />
            View Full Record
          </button>
          <button style={{
            padding: '8px 12px',
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
            Call
          </button>
        </div>
        <ChevronRight size={16} color={colors.gray400} />
      </div>
    </div>
  );

  const PatientDetailModal = ({ patient, onClose }) => (
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
      padding: 20,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 20,
        width: '100%',
        maxWidth: 800,
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
      }}>
        <div style={{
          position: 'sticky',
          top: 0,
          background: '#fff',
          borderBottom: `1px solid ${colors.gray200}`,
          padding: 24,
          borderRadius: '20px 20px 0 0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600,
                fontSize: 24,
              }}>
                {patient.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.gray800, margin: 0 }}>
                  {patient.name}
                </h2>
                <p style={{ fontSize: 16, color: colors.gray600, margin: '4px 0 0 0' }}>
                  {patient.gender} • Age {patient.age} • ID: {patient.idNumber}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                padding: 8,
                borderRadius: 8,
                border: 'none',
                background: colors.gray100,
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {/* Contact Information */}
            <div style={{
              background: colors.gray50,
              borderRadius: 12,
              padding: 20,
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
                Contact Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Phone size={16} color={colors.gray500} />
                  <span style={{ fontSize: 14, color: colors.gray700 }}>{patient.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Mail size={16} color={colors.gray500} />
                  <span style={{ fontSize: 14, color: colors.gray700 }}>{patient.email}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <MapPin size={16} color={colors.gray500} />
                  <span style={{ fontSize: 14, color: colors.gray700 }}>{patient.address}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <User size={16} color={colors.gray500} />
                  <span style={{ fontSize: 14, color: colors.gray700 }}>Language: {patient.language}</span>
                </div>
              </div>
            </div>

            {/* Medical Aid */}
            <div style={{
              background: colors.blue50,
              borderRadius: 12,
              padding: 20,
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
                Medical Aid
              </h3>
              <div style={{ fontSize: 16, fontWeight: 600, color: colors.primary, marginBottom: 4 }}>
                {patient.medicalAid}
              </div>
              <div style={{ fontSize: 14, color: colors.gray600 }}>
                Member: {patient.memberNumber}
              </div>
            </div>

            {/* Current Vitals */}
            <div style={{
              background: colors.green50,
              borderRadius: 12,
              padding: 20,
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
                Current Vitals
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {Object.entries(patient.vitals).map(([key, value]) => (
                  <div key={key} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: colors.gray500, textTransform: 'uppercase' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div style={{
              background: colors.red50,
              borderRadius: 12,
              padding: 20,
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
                Emergency Contact
              </h3>
              <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 4 }}>
                {patient.emergencyContact.name}
              </div>
              <div style={{ fontSize: 14, color: colors.gray600, marginBottom: 8 }}>
                {patient.emergencyContact.relationship}
              </div>
              <div style={{ fontSize: 14, color: colors.gray700 }}>
                {patient.emergencyContact.phone}
              </div>
            </div>
          </div>

          {/* Medical History Section */}
          <div style={{ marginTop: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
              {/* Conditions */}
              <div style={{
                background: '#fff',
                border: `1px solid ${colors.gray200}`,
                borderRadius: 12,
                padding: 20,
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
                  Medical Conditions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {patient.conditions.map((condition, idx) => (
                    <div key={idx} style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      fontSize: 14,
                      background: colors.blue50,
                      color: colors.primary,
                      fontWeight: 500,
                    }}>
                      {condition}
                    </div>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div style={{
                background: '#fff',
                border: `1px solid ${colors.gray200}`,
                borderRadius: 12,
                padding: 20,
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
                  Current Medications
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {patient.medications.map((medication, idx) => (
                    <div key={idx} style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      fontSize: 14,
                      background: colors.green50,
                      color: colors.success,
                      fontWeight: 500,
                    }}>
                      {medication}
                    </div>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div style={{
                background: '#fff',
                border: `1px solid ${colors.gray200}`,
                borderRadius: 12,
                padding: 20,
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
                  Known Allergies
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {patient.allergies.map((allergy, idx) => (
                    <div key={idx} style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      fontSize: 14,
                      background: allergy === 'None known' ? colors.gray50 : colors.red50,
                      color: allergy === 'None known' ? colors.gray600 : colors.danger,
                      fontWeight: 500,
                    }}>
                      {allergy}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: 12,
            marginTop: 32,
            paddingTop: 24,
            borderTop: `1px solid ${colors.gray200}`,
            flexWrap: 'wrap',
          }}>
            <button style={{
              padding: '12px 24px',
              borderRadius: 12,
              border: 'none',
              background: colors.primary,
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <Calendar size={16} />
              Schedule Appointment
            </button>
            <button style={{
              padding: '12px 24px',
              borderRadius: 12,
              border: `1px solid ${colors.success}`,
              background: 'transparent',
              color: colors.success,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <Phone size={16} />
              Call Patient
            </button>
            <button style={{
              padding: '12px 24px',
              borderRadius: 12,
              border: `1px solid ${colors.warning}`,
              background: 'transparent',
              color: colors.warning,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <Edit size={16} />
              Update Record
            </button>
            <button style={{
              padding: '12px 24px',
              borderRadius: 12,
              border: `1px solid ${colors.gray300}`,
              background: 'transparent',
              color: colors.gray600,
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              <Download size={16} />
              Export Records
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 24, background: colors.gray50, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.gray800, margin: 0 }}>
          Patient Records
        </h1>
        <p style={{ fontSize: 16, color: colors.gray600, margin: '4px 0 0 0' }}>
          Manage and view patient information
        </p>
      </div>

      {/* Search and Filters */}
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: 24,
        marginBottom: 24,
        border: `1px solid ${colors.gray200}`,
      }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} color={colors.gray400} style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
              }} />
              <input
                type="text"
                placeholder="Search patients by name or condition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 44px',
                  border: `1px solid ${colors.gray300}`,
                  borderRadius: 12,
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = colors.primary}
                onBlur={e => e.target.style.borderColor = colors.gray300}
              />
            </div>
          </div>

          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            style={{
              padding: '12px 16px',
              border: `1px solid ${colors.gray300}`,
              borderRadius: 12,
              fontSize: 14,
              background: '#fff',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <option value="all">All Patients</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="low">Low Risk</option>
            <option value="chronic">Chronic Conditions</option>
          </select>

          <button style={{
            padding: '12px 20px',
            borderRadius: 12,
            border: 'none',
            background: colors.primary,
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <Plus size={16} />
            New Patient
          </button>

          <button style={{
            padding: '12px 16px',
            borderRadius: 12,
            border: `1px solid ${colors.gray300}`,
            background: '#fff',
            color: colors.gray600,
            fontSize: 14,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <Upload size={16} />
            Import
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 14, color: colors.gray600 }}>
          Showing {filteredPatients.length} of {patients.length} patients
        </span>
      </div>

      {/* Patient Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
        gap: 24,
      }}>
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: 60,
          color: colors.gray500,
        }}>
          <User size={48} color={colors.gray300} style={{ marginBottom: 16 }} />
          <p style={{ fontSize: 18, marginBottom: 8 }}>No patients found</p>
          <p style={{ fontSize: 14 }}>Try adjusting your search terms or filters</p>
        </div>
      )}

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <PatientDetailModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default PatientRecords;