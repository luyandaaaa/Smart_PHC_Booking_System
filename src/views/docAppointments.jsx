import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Video, 
  Phone, 
  MessageCircle, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  MoreVertical,
  FileText,
  User,
  CalendarDays,

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

const DocAppointmentView = () => {
  const [currentView, setCurrentView] = useState('calendar'); // calendar, list, add
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewAppointment, setShowNewAppointment] = useState(false);

  // Mock appointment data
  const appointments = [
    {
      id: 1,
      patient: {
        name: 'Nomsa Mthembu',
        id: 'P001',
        phone: '+27 82 123 4567',
        email: 'nomsa.m@email.com',
        age: 45,
        language: 'isiZulu'
      },
      date: '2025-06-30',
      time: '09:30',
      duration: 30,
      type: 'Follow-up',
      status: 'confirmed',
      condition: 'Hypertension follow-up',
      location: 'Room 102',
      priority: 'normal',
      notes: 'Patient reports headaches, check BP medication effectiveness',
      lastVisit: '2025-06-15'
    },
    {
      id: 2,
      patient: {
        name: 'Thabo Molefe',
        id: 'P002',
        phone: '+27 83 987 6543',
        email: 'thabo.molefe@email.com',
        age: 52,
        language: 'English'
      },
      date: '2025-06-30',
      time: '10:00',
      duration: 45,
      type: 'Initial Consultation',
      status: 'pending',
      condition: 'Diabetes screening',
      location: 'Room 105',
      priority: 'normal',
      notes: 'Family history of diabetes, routine screening',
      lastVisit: null
    },
    {
      id: 3,
      patient: {
        name: 'Sarah van der Merwe',
        id: 'P003',
        phone: '+27 84 555 1234',
        email: 'sarah.vdm@email.com',
        age: 38,
        language: 'Afrikaans'
      },
      date: '2025-06-30',
      time: '10:30',
      duration: 60,
      type: 'Emergency',
      status: 'urgent',
      condition: 'Chest pain evaluation',
      location: 'Emergency Room',
      priority: 'high',
      notes: 'Patient experiencing intermittent chest pain since morning',
      lastVisit: '2025-06-20'
    },
    {
      id: 4,
      patient: {
        name: 'Lebohang Sithole',
        id: 'P004',
        phone: '+27 85 777 8888',
        email: 'lebohang.s@email.com',
        age: 29,
        language: 'Sesotho'
      },
      date: '2025-06-30',
      time: '11:00',
      duration: 30,
      type: 'Check-up',
      status: 'confirmed',
      condition: 'Annual physical examination',
      location: 'Room 103',
      priority: 'normal',
      notes: 'Routine annual check-up, no specific concerns',
      lastVisit: '2024-06-15'
    },
    {
      id: 5,
      patient: {
        name: 'Fatima Hassan',
        id: 'P005',
        phone: '+27 86 333 2222',
        email: 'fatima.hassan@email.com',
        age: 34,
        language: 'English'
      },
      date: '2025-07-01',
      time: '14:00',
      duration: 30,
      type: 'Prenatal',
      status: 'confirmed',
      condition: 'Pregnancy check-up - 28 weeks',
      location: 'Room 106',
      priority: 'normal',
      notes: '28-week prenatal visit, glucose tolerance test due',
      lastVisit: '2025-06-16'
    }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} color={colors.success} />;
      case 'pending': return <Clock size={16} color={colors.warning} />;
      case 'urgent': return <AlertTriangle size={16} color={colors.danger} />;
      case 'cancelled': return <XCircle size={16} color={colors.gray400} />;
      default: return <Clock size={16} color={colors.gray400} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return colors.success;
      case 'pending': return colors.warning;
      case 'urgent': return colors.danger;
      case 'cancelled': return colors.gray400;
      default: return colors.gray400;
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const todaysAppointments = filteredAppointments.filter(apt => apt.date === '2025-06-30');

  const Header = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 32,
      flexWrap: 'wrap',
      gap: 16
    }}>
      <div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.gray800, margin: 0 }}>
          Appointments
        </h1>
        <p style={{ fontSize: 14, color: colors.gray600, margin: '4px 0 0 0' }}>
          Manage your patient appointments and schedule
        </p>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ display: 'flex', borderRadius: 8, border: `1px solid ${colors.gray300}`, overflow: 'hidden' }}>
          {['calendar', 'list'].map(view => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: currentView === view ? colors.primary : 'white',
                color: currentView === view ? 'white' : colors.gray600,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {view === 'calendar' ? <Calendar size={16} /> : <Users size={16} />}
              <span style={{ marginLeft: 8 }}>{view}</span>
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowNewAppointment(true)}
          style={{
            padding: '12px 20px',
            borderRadius: 8,
            border: 'none',
            background: colors.primary,
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.target.style.background = colors.primaryHover}
          onMouseLeave={e => e.target.style.background = colors.primary}
        >
          <Plus size={16} />
          New Appointment
        </button>
      </div>
    </div>
  );

  const SearchAndFilter = () => (
    <div style={{
      display: 'flex',
      gap: 16,
      marginBottom: 24,
      flexWrap: 'wrap'
    }}>
      <div style={{ position: 'relative', flex: 1, minWidth: 300 }}>
        <Search size={20} color={colors.gray400} style={{
          position: 'absolute',
          left: 12,
          top: '50%',
          transform: 'translateY(-50%)'
        }} />
        <input
          type="text"
          placeholder="Search patients or conditions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 12px 12px 44px',
            border: `1px solid ${colors.gray300}`,
            borderRadius: 8,
            fontSize: 14,
            outline: 'none'
          }}
        />
      </div>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{
          padding: '12px 16px',
          border: `1px solid ${colors.gray300}`,
          borderRadius: 8,
          fontSize: 14,
          minWidth: 150,
          cursor: 'pointer'
        }}
      >
        <option value="all">All Status</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending">Pending</option>
        <option value="urgent">Urgent</option>
        <option value="cancelled">Cancelled</option>
      </select>
    </div>
  );

  const AppointmentCard = ({ appointment }) => (
    <div style={{
      background: 'white',
      borderRadius: 12,
      border: `1px solid ${colors.gray200}`,
      borderLeft: `4px solid ${getStatusColor(appointment.status)}`,
      padding: 20,
      marginBottom: 16,
      transition: 'all 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = '0 8px 25px -8px rgba(0,0,0,0.1)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'none';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray800, margin: 0 }}>
              {appointment.patient.name}
            </h3>
            {getStatusIcon(appointment.status)}
            <span style={{
              fontSize: 12,
              padding: '2px 8px',
              borderRadius: 12,
              background: appointment.priority === 'high' ? colors.red50 : colors.blue50,
              color: appointment.priority === 'high' ? colors.danger : colors.primary,
              fontWeight: 600,
              textTransform: 'uppercase'
            }}>
              {appointment.priority} priority
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock size={14} color={colors.gray500} />
              <span style={{ fontSize: 14, color: colors.gray600 }}>
                {appointment.time} ({appointment.duration} min)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MapPin size={14} color={colors.gray500} />
              <span style={{ fontSize: 14, color: colors.gray600 }}>{appointment.location}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <User size={14} color={colors.gray500} />
              <span style={{ fontSize: 14, color: colors.gray600 }}>
                Age {appointment.patient.age} • {appointment.patient.language}
              </span>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 14, color: colors.gray700, fontWeight: 500, margin: 0 }}>
              {appointment.type}: {appointment.condition}
            </p>
            {appointment.notes && (
              <p style={{ fontSize: 13, color: colors.gray600, margin: '4px 0 0 0' }}>
                Notes: {appointment.notes}
              </p>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button style={{
            padding: '6px 8px',
            borderRadius: 6,
            border: 'none',
            background: colors.gray100,
            cursor: 'pointer'
          }}>
            <MoreVertical size={16} color={colors.gray600} />
          </button>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: `1px solid ${colors.primary}`,
            background: colors.primary,
            color: 'white',
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Video size={12} />
            Start Call
          </button>
          <button style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: `1px solid ${colors.gray300}`,
            background: 'white',
            color: colors.gray600,
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <FileText size={12} />
            View Records
          </button>
          <button style={{
            padding: '8px 12px',
            borderRadius: 6,
            border: `1px solid ${colors.gray300}`,
            background: 'white',
            color: colors.gray600,
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Edit size={12} />
            Reschedule
          </button>
        </div>
        <div style={{ fontSize: 12, color: colors.gray500 }}>
          {appointment.lastVisit ? `Last visit: ${appointment.lastVisit}` : 'New patient'}
        </div>
      </div>
    </div>
  );

  const CalendarView = () => {
    const currentDate = new Date();
    const today = currentDate.toISOString().split('T')[0];
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24 }}>
        <div>
          <div style={{
            background: 'white',
            borderRadius: 12,
            border: `1px solid ${colors.gray200}`,
            padding: 20
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.gray800, margin: 0 }}>
                Today's Schedule - June 30, 2025
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button style={{
                  padding: '8px',
                  borderRadius: 6,
                  border: `1px solid ${colors.gray300}`,
                  background: 'white',
                  cursor: 'pointer'
                }}>
                  <ChevronLeft size={16} color={colors.gray600} />
                </button>
                <span style={{ fontSize: 14, fontWeight: 500, color: colors.gray700 }}>Today</span>
                <button style={{
                  padding: '8px',
                  borderRadius: 6,
                  border: `1px solid ${colors.gray300}`,
                  background: 'white',
                  cursor: 'pointer'
                }}>
                  <ChevronRight size={16} color={colors.gray600} />
                </button>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16 }}>
              {timeSlots.map(time => {
                const appointmentAtTime = todaysAppointments.find(apt => apt.time === time);
                return (
                  <React.Fragment key={time}>
                    <div style={{
                      fontSize: 12,
                      color: colors.gray500,
                      fontWeight: 500,
                      paddingTop: 8
                    }}>
                      {time}
                    </div>
                    <div style={{
                      minHeight: 60,
                      borderBottom: `1px solid ${colors.gray100}`,
                      paddingBottom: 8
                    }}>
                      {appointmentAtTime && (
                        <div style={{
                          background: appointmentAtTime.priority === 'high' ? colors.red50 : colors.blue50,
                          border: `1px solid ${appointmentAtTime.priority === 'high' ? colors.danger : colors.primary}`,
                          borderRadius: 8,
                          padding: 12,
                          cursor: 'pointer'
                        }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                            {appointmentAtTime.patient.name}
                          </div>
                          <div style={{ fontSize: 12, color: colors.gray600 }}>
                            {appointmentAtTime.type} • {appointmentAtTime.duration} min
                          </div>
                          <div style={{ fontSize: 11, color: colors.gray500, marginTop: 4 }}>
                            {appointmentAtTime.location}
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
        
        <div>
          <div style={{
            background: 'white',
            borderRadius: 12,
            border: `1px solid ${colors.gray200}`,
            padding: 20,
            marginBottom: 20
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
              Today's Summary
            </h3>
            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, color: colors.gray600 }}>Total Appointments</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>
                  {todaysAppointments.length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, color: colors.gray600 }}>Confirmed</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: colors.success }}>
                  {todaysAppointments.filter(apt => apt.status === 'confirmed').length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, color: colors.gray600 }}>Pending</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: colors.warning }}>
                  {todaysAppointments.filter(apt => apt.status === 'pending').length}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 14, color: colors.gray600 }}>Urgent</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: colors.danger }}>
                  {todaysAppointments.filter(apt => apt.status === 'urgent').length}
                </span>
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: 12,
            border: `1px solid ${colors.gray200}`,
            padding: 20
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800, marginBottom: 16 }}>
              Quick Actions
            </h3>
            <div style={{ display: 'grid', gap: 8 }}>
              <button style={{
                padding: '12px',
                borderRadius: 8,
                border: `1px solid ${colors.primary}`,
                background: colors.blue50,
                color: colors.primary,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'left'
              }}>
                + Add Emergency Slot
              </button>
              <button style={{
                padding: '12px',
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                background: 'white',
                color: colors.gray700,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'left'
              }}>
                📋 View Week Schedule
              </button>
              <button style={{
                padding: '12px',
                borderRadius: 8,
                border: `1px solid ${colors.gray300}`,
                background: 'white',
                color: colors.gray700,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'left'
              }}>
                📊 Export Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ListView = () => (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.gray800, marginBottom: 4 }}>
          All Appointments
        </h2>
        <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>
          {filteredAppointments.length} appointments found
        </p>
      </div>
      {filteredAppointments.map(appointment => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
      {filteredAppointments.length === 0 && (
        <div style={{
          background: 'white',
          borderRadius: 12,
          border: `1px solid ${colors.gray200}`,
          padding: 40,
          textAlign: 'center'
        }}>
          <Calendar size={48} color={colors.gray400} style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: 18, fontWeight: 600, color: colors.gray600, marginBottom: 8 }}>
            No appointments found
          </h3>
          <p style={{ fontSize: 14, color: colors.gray500, margin: 0 }}>
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ padding: 24, background: colors.gray50, minHeight: '100vh' }}>
      <Header />
      <SearchAndFilter />
      {currentView === 'calendar' ? <CalendarView /> : <ListView />}
    </div>
  );
};

export default DocAppointmentView;