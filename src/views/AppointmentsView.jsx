import React, { useState } from 'react';
import { Calendar, FileText, Stethoscope, AlertTriangle, Search, X } from 'lucide-react';
import { colors } from '../constants';

const AppointmentsView = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock appointments data
  const appointments = {
    today: [
      {
        id: 1,
        patient: 'Nomsa Mthembu',
        patientId: 'PT1001',
        time: '09:30',
        type: 'Follow-up',
        status: 'confirmed',
        duration: 30,
        condition: 'Hypertension',
        language: 'isiZulu',
        notes: 'BP medication review needed',
        priority: 'high',
        vitals: { bp: '142/88', hr: 72 }
      },
      {
        id: 2,
        patient: 'Thabo Molefe',
        patientId: 'PT1002',
        time: '10:15',
        type: 'Diabetes Check',
        status: 'confirmed',
        duration: 45,
        condition: 'Type 2 Diabetes',
        language: 'English',
        notes: 'HbA1c follow-up',
        priority: 'medium',
        vitals: { glucose: '8.2 mmol/L' }
      },
      {
        id: 3,
        patient: 'Sarah van der Merwe',
        patientId: 'PT1003',
        time: '11:00',
        type: 'Emergency',
        status: 'urgent',
        duration: 60,
        condition: 'Chest pain',
        language: 'Afrikaans',
        notes: 'Possible MI - needs ECG',
        priority: 'critical',
        vitals: { bp: '165/95', hr: 98 }
      }
    ],
    upcoming: [
      {
        id: 4,
        patient: 'Lebohang Sithole',
        patientId: 'PT1004',
        date: '2023-06-16',
        time: '09:00',
        type: 'Physical Exam',
        status: 'confirmed',
        duration: 30,
        condition: 'Annual Checkup',
        language: 'Sesotho',
        priority: 'normal'
      }
    ],
    completed: [
      {
        id: 5,
        patient: 'Zanele Dlamini',
        patientId: 'PT1005',
        date: '2023-06-14',
        time: '14:00',
        type: 'Follow-up',
        status: 'completed',
        duration: 20,
        condition: 'Asthma',
        language: 'isiZulu',
        notes: 'Prescribed new inhaler',
        outcome: 'Treatment adjusted'
      }
    ]
  };

  const filteredAppointments = appointments[activeTab].filter(appointment => {
    const matchesSearch = appointment.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         appointment.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || appointment.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const timeSlots = [];
  for (let hour = 8; hour <= 17; hour++) {
    timeSlots.push(`${hour}:00`, `${hour}:30`);
  }

  const handleStartConsultation = (appointment) => {
    console.log(`Starting consultation for ${appointment.patient}`);
  };

  const handleViewPatient = (patientId) => {
    console.log(`Viewing patient ${patientId} records`);
  };

  const AppointmentCard = ({ appointment }) => (
    <div className="appointment-card">
      <div className="appointment-header">
        <div>
          <h3>{appointment.patient}</h3>
          <p>{appointment.time} • {appointment.duration} min • {appointment.language}</p>
        </div>
        <span className={`status-badge ${appointment.status}`}>
          {appointment.status}
        </span>
      </div>
      
      <div className="appointment-details">
        <p>{appointment.type} • {appointment.condition}</p>
        {appointment.vitals && (
          <div className="vitals-container">
            {Object.entries(appointment.vitals).map(([key, value]) => (
              <div key={key} className="vital-item">
                <span className="vital-label">{key}:</span> {value}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {appointment.notes && (
        <div className="notes-container">
          <p className="notes-label">Notes:</p>
          {appointment.notes}
        </div>
      )}
      
      <div className="action-buttons">
        <button 
          onClick={() => handleStartConsultation(appointment)}
          className="btn-primary"
        >
          <Stethoscope size={12} />
          Start Consultation
        </button>
        
        <button
          onClick={() => handleViewPatient(appointment.patientId)}
          className="btn-secondary"
        >
          <FileText size={12} />
          View Patient
        </button>

        {appointment.priority === 'critical' && (
          <button className="btn-emergency">
            <AlertTriangle size={12} />
            Emergency Protocol
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="view-container centered-layout">
      <div className="view-header">
        <h1>My Appointments</h1>
        
        <div className="controls-container">
          <div className="search-container">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Initial Consultation">New Patient</option>
            <option value="Emergency">Emergency</option>
            <option value="Check-up">Check-up</option>
          </select>
        </div>
      </div>
      
      <div className="tab-buttons">
        <button
          onClick={() => setActiveTab('today')}
          className={activeTab === 'today' ? 'active' : ''}
        >
          Today
        </button>
        <button
          onClick={() => setActiveTab('upcoming')}
          className={activeTab === 'upcoming' ? 'active' : ''}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={activeTab === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>

      {activeTab === 'today' ? (
        <div className="schedule-view">
          {/* Calendar Time Slots */}
          <div className="time-slots">
            {timeSlots.map(time => (
              <div key={time} className="time-slot">
                {time}
              </div>
            ))}
          </div>
          
          {/* Appointment Schedule */}
          <div className="appointments-list">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(appointment => (
                <div key={appointment.id} className="appointment-wrapper">
                  <AppointmentCard appointment={appointment} />
                </div>
              ))
            ) : (
              <div className="empty-state">
                <Calendar size={48} />
                <h3>No appointments scheduled for today</h3>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="btn-primary"
                >
                  Schedule New Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid-view">
          {filteredAppointments.length > 0 ? (
            <div className="appointments-grid">
              {filteredAppointments.map(appointment => (
                <AppointmentCard key={appointment.id} appointment={appointment} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Calendar size={48} />
              <h3>No {activeTab} appointments found</h3>
              {activeTab === 'upcoming' && (
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="btn-primary"
                >
                  Schedule New Appointment
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Schedule New Appointment Modal */}
      {showScheduleModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Schedule New Appointment</h2>
              <button onClick={() => setShowScheduleModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="form-grid">
              <div>
                <label>Patient</label>
                <select>
                  <option value="">Select patient</option>
                  <option value="PT1001">Nomsa Mthembu (Hypertension)</option>
                  <option value="PT1002">Thabo Molefe (Diabetes)</option>
                  <option value="PT1003">Sarah van der Merwe (Cardiac)</option>
                  <option value="PT1004">Lebohang Sithole (General)</option>
                  <option value="new">+ New Patient</option>
                </select>
              </div>
              <div>
                <label>Appointment Type</label>
                <select>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Initial Consultation">New Patient</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Check-up">Check-up</option>
                  <option value="Procedure">Procedure</option>
                </select>
              </div>
              <div>
                <label>Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label>Time</label>
                <select>
                  {Array.from({ length: 20 }, (_, i) => {
                    const hour = 8 + Math.floor(i / 2);
                    const minute = i % 2 === 0 ? '00' : '30';
                    return `${hour}:${minute}`;
                  }).map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Duration</label>
                <select>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="45">45 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                </select>
              </div>
              <div>
                <label>Priority</label>
                <select>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Reason</label>
                <input
                  type="text"
                  placeholder="e.g. Hypertension follow-up"
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Notes</label>
                <textarea
                  placeholder="Clinical notes or special instructions"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button className="btn-primary">
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .view-container {
          padding: 2rem;
        }
        .centered-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .view-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        @media (min-width: 768px) {
          .view-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
        
        .controls-container {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        
        .search-container {
          position: relative;
        }
        
        .search-container input {
          padding-left: 2.25rem;
          width: 100%;
          min-width: 200px;
        }
        
        .search-container svg {
          position: absolute;
          left: 0.75rem;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .tab-buttons {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .tab-buttons button {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 500;
          cursor: pointer;
        }
        
        .tab-buttons button.active {
          background: ${colors.primary};
          color: white;
        }
        
        .tab-buttons button:not(.active) {
          background: ${colors.gray100};
          color: ${colors.gray700};
        }
        
        .schedule-view {
          display: flex;
          gap: 1.5rem;
        }
        
        .time-slots {
          width: 7.5rem;
          flex-shrink: 0;
        }
        
        .time-slot {
          height: 3.75rem;
          display: flex;
          align-items: center;
          color: ${colors.gray500};
          font-size: 0.75rem;
          border-bottom: 1px solid ${colors.gray200};
        }
        
        .appointments-list {
          flex: 1;
        }
        
        .appointment-wrapper {
          margin-bottom: 1rem;
        }
        
        .appointment-card {
          background: white;
          border: 1px solid ${colors.gray200};
          border-left: 4px solid ${colors.primary};
          border-radius: 0.75rem;
          padding: 1rem;
          transition: all 0.2s;
        }
        
        .appointment-card.high-priority {
          border-left-color: ${colors.warning};
        }
        
        .appointment-card.critical-priority {
          border-left-color: ${colors.danger};
        }
        
        .appointment-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }
        
        .appointment-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: ${colors.gray800};
          margin: 0;
        }
        
        .appointment-header p {
          font-size: 0.75rem;
          color: ${colors.gray500};
          margin: 0.125rem 0 0 0;
        }
        
        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 0.5rem;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: capitalize;
        }
        
        .status-badge.confirmed {
          background: ${colors.blue50};
          color: ${colors.primary};
        }
        
        .status-badge.urgent {
          background: ${colors.red50};
          color: ${colors.danger};
        }
        
        .status-badge.completed {
          background: ${colors.green50};
          color: ${colors.success};
        }
        
        .appointment-details p {
          font-size: 0.875rem;
          font-weight: 500;
          color: ${colors.gray700};
          margin: 0;
        }
        
        .vitals-container {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
          font-size: 0.75rem;
          color: ${colors.gray600};
        }
        
        .vital-item {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .vital-label {
          font-weight: 500;
        }
        
        .notes-container {
          background: ${colors.gray50};
          border-radius: 0.5rem;
          padding: 0.75rem;
          margin-top: 0.75rem;
          font-size: 0.8125rem;
          color: ${colors.gray700};
        }
        
        .notes-label {
          font-weight: 600;
          margin-bottom: 0.25rem;
        }
        
        .action-buttons {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          flex-wrap: wrap;
        }
        
        .btn-primary {
          padding: 0.375rem 0.75rem;
          border-radius: 0.5rem;
          border: none;
          background: ${colors.primary};
          color: white;
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .btn-secondary {
          padding: 0.375rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid ${colors.gray300};
          background: transparent;
          color: ${colors.gray700};
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .btn-emergency {
          padding: 0.375rem 0.75rem;
          border-radius: 0.5rem;
          border: none;
          background: ${colors.danger};
          color: white;
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem;
          background: ${colors.gray50};
          border-radius: 0.75rem;
          border: 1px dashed ${colors.gray300};
          text-align: center;
        }
        
        .empty-state h3 {
          font-size: 1rem;
          font-weight: 500;
          color: ${colors.gray600};
          margin: 1rem 0 0.5rem 0;
        }
        
        .grid-view {
          margin-top: 1rem;
        }
        
        .appointments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
        }
        
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }
        
        .modal-container {
          background: white;
          border-radius: 0.75rem;
          width: 100%;
          max-width: 600px;
          padding: 1.5rem;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .modal-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: ${colors.gray800};
          margin: 0;
        }
        
        .modal-header button {
          background: transparent;
          border: none;
          cursor: pointer;
          color: ${colors.gray500};
          padding: 0.25rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .form-grid > div {
          margin-bottom: 0;
        }
        
        .form-grid label {
          display: block;
          font-size: 0.75rem;
          color: ${colors.gray500};
          margin-bottom: 0.25rem;
        }
        
        .form-grid input,
        .form-grid select,
        .form-grid textarea {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid ${colors.gray300};
          font-size: 0.875rem;
        }
        
        .form-grid textarea {
          min-height: 5rem;
        }
        
        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default AppointmentsView;