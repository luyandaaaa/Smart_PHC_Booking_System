import React, { useState } from 'react';
import { Pill, Plus, Search, X } from 'lucide-react';
import { colors } from '../constants';

const PrescriptionsView = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  // Form state for new prescription
  const [newPrescription, setNewPrescription] = useState({
    patient: '',
    medication: '',
    dosage: '',
    frequency: 'Once daily',
    duration: '7 days',
    instructions: '',
    startDate: new Date().toISOString().split('T')[0],
    condition: ''
  });

  // Mock prescriptions data
  const prescriptions = {
    active: [
      {
        id: 1,
        patient: 'Nomsa Mthembu',
        patientId: 'PT1001',
        medication: 'Amlodipine 5mg',
        dosage: '1 tablet',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take in the morning with food',
        prescribedDate: '2023-06-01',
        startDate: '2023-06-01',
        endDate: '2023-06-30',
        condition: 'Hypertension',
        status: 'active',
        refills: 2
      },
      {
        id: 2,
        patient: 'Thabo Molefe',
        patientId: 'PT1002',
        medication: 'Metformin 500mg',
        dosage: '1 tablet',
        frequency: 'Twice daily',
        duration: '90 days',
        instructions: 'Take with meals',
        prescribedDate: '2023-05-15',
        startDate: '2023-05-15',
        endDate: '2023-08-13',
        condition: 'Type 2 Diabetes',
        status: 'active',
        refills: 1
      }
    ],
    expired: [
      {
        id: 3,
        patient: 'Sarah van der Merwe',
        patientId: 'PT1003',
        medication: 'Ibuprofen 400mg',
        dosage: '1 tablet',
        frequency: 'Every 6 hours as needed',
        duration: '7 days',
        instructions: 'Take with water, not more than 4 tablets per day',
        prescribedDate: '2023-04-10',
        startDate: '2023-04-10',
        endDate: '2023-04-17',
        condition: 'Back pain',
        status: 'expired',
        refills: 0
      }
    ],
    discontinued: [
      {
        id: 4,
        patient: 'Lebohang Sithole',
        patientId: 'PT1004',
        medication: 'Simvastatin 20mg',
        dosage: '1 tablet',
        frequency: 'At bedtime',
        duration: '30 days',
        instructions: 'Take at night',
        prescribedDate: '2023-03-01',
        startDate: '2023-03-01',
        endDate: '2023-03-31',
        condition: 'High cholesterol',
        status: 'discontinued',
        reason: 'Patient reported muscle pain',
        refills: 0
      }
    ]
  };

  // Mock patient data for dropdown
  const patients = [
    { id: 'PT1001', name: 'Nomsa Mthembu' },
    { id: 'PT1002', name: 'Thabo Molefe' },
    { id: 'PT1003', name: 'Sarah van der Merwe' },
    { id: 'PT1004', name: 'Lebohang Sithole' },
    { id: 'PT1005', name: 'Zanele Dlamini' }
  ];

  const filteredPrescriptions = prescriptions[activeTab].filter(prescription => {
    // Filter by search query
    const matchesSearch = prescription.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         prescription.medication.toLowerCase().includes(searchQuery.toLowerCase());
    // Filter by selected filter
    const matchesFilter = selectedFilter === 'all' || prescription.condition === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleViewPrescription = (prescription) => {
    setSelectedPrescription(prescription);
    setShowPrescriptionModal(true);
  };

  const handleCreatePrescription = () => {
    setShowCreateModal(true);
  };

  const saveNewPrescription = () => {
    // In a real app, you would save to an API here
    const newPrescriptionWithDetails = {
      ...newPrescription,
      id: Math.max(...prescriptions.active.map(p => p.id), 0) + 1,
      patientId: patients.find(p => p.name === newPrescription.patient)?.id || 'PT' + Math.floor(Math.random() * 10000),
      prescribedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      refills: 0
    };
    // Update local state (in a real app, this would be handled via API response)
    prescriptions.active.push(newPrescriptionWithDetails);
    // Reset form and close modal
    setNewPrescription({
      patient: '',
      medication: '',
      dosage: '',
      frequency: 'Once daily',
      duration: '7 days',
      instructions: '',
      startDate: new Date().toISOString().split('T')[0],
      condition: ''
    });
    setShowCreateModal(false);
  };

  const PrescriptionCard = ({ prescription }) => (
    <div style={{
      background: '#fff',
      border: `1px solid ${colors.gray200}`,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      transition: 'all 0.2s',
      cursor: 'pointer',
    }}
    onClick={() => handleViewPrescription(prescription)}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = '0 4px 12px -4px rgba(0,0,0,0.1)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'none';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>{prescription.patient}</div>
          <div style={{ fontSize: 12, color: colors.gray500, marginTop: 2 }}>
            ID: {prescription.patientId} • {prescription.prescribedDate}
          </div>
        </div>
        <div style={{ 
          padding: '4px 8px',
          borderRadius: 8,
          background: prescription.status === 'active' ? colors.green50 : 
                     prescription.status === 'expired' ? colors.yellow50 : colors.red50,
          color: prescription.status === 'active' ? colors.success : 
                 prescription.status === 'expired' ? colors.warning : colors.danger,
          fontSize: 12,
          fontWeight: 500,
          textTransform: 'capitalize'
        }}>
          {prescription.status}
        </div>
      </div>
      
      <div style={{ marginTop: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Pill size={16} color={colors.primary} />
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{prescription.medication}</div>
        </div>
        <div style={{ fontSize: 13, color: colors.gray600, marginTop: 4 }}>
          {prescription.dosage} • {prescription.frequency} • {prescription.duration}
        </div>
      </div>
      
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 12, color: colors.gray500 }}>
          <span style={{ fontWeight: 500 }}>For:</span> {prescription.condition}
        </div>
        {prescription.refills > 0 && (
          <div style={{ fontSize: 12, color: colors.primary, fontWeight: 500, marginTop: 4 }}>
            {prescription.refills} refill{prescription.refills !== 1 ? 's' : ''} remaining
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>Prescriptions</h1>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color={colors.gray500} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search prescriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="prescription-search"
              name="prescriptionSearch"
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
            <option value="all">All Conditions</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Type 2 Diabetes">Type 2 Diabetes</option>
            <option value="High cholesterol">High cholesterol</option>
            <option value="Back pain">Back pain</option>
          </select>
          <button
            onClick={handleCreatePrescription}
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
            }}
          >
            <Plus size={16} />
            New Prescription
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
        <button
          onClick={() => setActiveTab('active')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'active' ? colors.primary : colors.gray100,
            color: activeTab === 'active' ? 'white' : colors.gray700,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Active
        </button>
        <button
          onClick={() => setActiveTab('expired')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'expired' ? colors.primary : colors.gray100,
            color: activeTab === 'expired' ? 'white' : colors.gray700,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Expired
        </button>
        <button
          onClick={() => setActiveTab('discontinued')}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            background: activeTab === 'discontinued' ? colors.primary : colors.gray100,
            color: activeTab === 'discontinued' ? 'white' : colors.gray700,
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Discontinued
        </button>
      </div>
      
      {filteredPrescriptions.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {filteredPrescriptions.map(prescription => (
            <PrescriptionCard key={prescription.id} prescription={prescription} />
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
          <Pill size={48} color={colors.gray400} style={{ marginBottom: 16 }} />
          <div style={{ fontSize: 16, fontWeight: 500, color: colors.gray600, marginBottom: 8 }}>
            No prescriptions found
          </div>
          <div style={{ fontSize: 14, color: colors.gray500 }}>
            {searchQuery ? 'Try a different search term' : 'No prescriptions match your current filters'}
          </div>
        </div>
      )}
      
      {/* Prescription Detail Modal */}
      {showPrescriptionModal && selectedPrescription && (
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
            maxWidth: 600,
            padding: 24,
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.gray800 }}>
                Prescription Details
              </h2>
              <button 
                onClick={() => setShowPrescriptionModal(false)}
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
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              <div>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Patient</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>
                  {selectedPrescription.patient} (ID: {selectedPrescription.patientId})
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Status</div>
                <div style={{ 
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: 20,
                  background: selectedPrescription.status === 'active' ? colors.green50 : 
                             selectedPrescription.status === 'expired' ? colors.yellow50 : colors.red50,
                  color: selectedPrescription.status === 'active' ? colors.success : 
                         selectedPrescription.status === 'expired' ? colors.warning : colors.danger,
                  fontSize: 14,
                  fontWeight: 600,
                  textTransform: 'capitalize'
                }}>
                  {selectedPrescription.status}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Medication</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>
                  {selectedPrescription.medication}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Prescribed Date</div>
                <div style={{ fontSize: 16, color: colors.gray800 }}>
                  {selectedPrescription.prescribedDate}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Dosage</div>
                <div style={{ fontSize: 16, color: colors.gray800 }}>
                  {selectedPrescription.dosage}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Frequency</div>
                <div style={{ fontSize: 16, color: colors.gray800 }}>
                  {selectedPrescription.frequency}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Duration</div>
                <div style={{ fontSize: 16, color: colors.gray800 }}>
                  {selectedPrescription.duration}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Refills</div>
                <div style={{ fontSize: 16, color: colors.gray800 }}>
                  {selectedPrescription.refills} remaining
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Condition</div>
                <div style={{ fontSize: 16, color: colors.gray800 }}>
                  {selectedPrescription.condition}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Instructions</div>
                <div style={{ 
                  background: colors.gray50,
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 14,
                  color: colors.gray800
                }}>
                  {selectedPrescription.instructions}
                </div>
              </div>
              {selectedPrescription.status === 'discontinued' && selectedPrescription.reason && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Reason for discontinuation</div>
                  <div style={{ 
                    background: colors.red50,
                    borderRadius: 8,
                    padding: 12,
                    fontSize: 14,
                    color: colors.gray800
                  }}>
                    {selectedPrescription.reason}
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                onClick={() => setShowPrescriptionModal(false)}
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
                Close
              </button>
              {selectedPrescription.status === 'active' && (
                <>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: `1px solid ${colors.primary}`,
                      background: 'transparent',
                      color: colors.primary,
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Print
                  </button>
                  <button
                    style={{
                      padding: '8px 16px',
                      borderRadius: 8,
                      border: 'none',
                      background: colors.danger,
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Discontinue
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Create Prescription Modal */}
      {showCreateModal && (
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
            maxWidth: 600,
            padding: 24,
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.gray800 }}>
                Create New Prescription
              </h2>
              <button 
                onClick={() => setShowCreateModal(false)}
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
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Patient</label>
                <select
                  value={newPrescription.patient}
                  onChange={(e) => setNewPrescription({...newPrescription, patient: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 14,
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select patient</option>
                  {patients.map(patient => (
                    <option key={patient.id} value={patient.name}>{patient.name} (ID: {patient.id})</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Condition</label>
                <input
                  type="text"
                  value={newPrescription.condition}
                  onChange={(e) => setNewPrescription({...newPrescription, condition: e.target.value})}
                  placeholder="e.g. Hypertension"
                  id="prescription-condition"
                  name="condition"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 14,
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Medication</label>
                <input
                  type="text"
                  value={newPrescription.medication}
                  onChange={(e) => setNewPrescription({...newPrescription, medication: e.target.value})}
                  placeholder="e.g. Amlodipine 5mg"
                  id="prescription-medication"
                  name="medication"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 14,
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Dosage</label>
                <input
                  type="text"
                  value={newPrescription.dosage}
                  onChange={(e) => setNewPrescription({...newPrescription, dosage: e.target.value})}
                  placeholder="e.g. 1 tablet"
                  id="prescription-dosage"
                  name="dosage"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 14,
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Frequency</label>
                <select
                  value={newPrescription.frequency}
                  onChange={(e) => setNewPrescription({...newPrescription, frequency: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 14,
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Four times daily">Four times daily</option>
                  <option value="Every 6 hours">Every 6 hours</option>
                  <option value="Every 8 hours">Every 8 hours</option>
                  <option value="Every 12 hours">Every 12 hours</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Duration</label>
                <select
                  value={newPrescription.duration}
                  onChange={(e) => setNewPrescription({...newPrescription, duration: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 14,
                    background: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  <option value="7 days">7 days</option>
                  <option value="14 days">14 days</option>
                  <option value="30 days">30 days</option>
                  <option value="60 days">60 days</option>
                  <option value="90 days">90 days</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Instructions</label>
                <textarea
                  value={newPrescription.instructions}
                  onChange={(e) => setNewPrescription({...newPrescription, instructions: e.target.value})}
                  placeholder="Special instructions for the patient"
                  style={{
                    width: '100%',
                    minHeight: 80,
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 14,
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, color: colors.gray500, marginBottom: 4 }}>Start Date</label>
                <input
                  type="date"
                  value={newPrescription.startDate}
                  onChange={(e) => setNewPrescription({...newPrescription, startDate: e.target.value})}
                  id="prescription-start-date"
                  name="startDate"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1px solid ${colors.gray300}`,
                    fontSize: 14,
                  }}
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                onClick={() => setShowCreateModal(false)}
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
                onClick={saveNewPrescription}
                disabled={!newPrescription.patient || !newPrescription.medication}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: !newPrescription.patient || !newPrescription.medication ? colors.gray300 : colors.primary,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: !newPrescription.patient || !newPrescription.medication ? 'not-allowed' : 'pointer',
                }}
              >
                Save Prescription
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionsView;
