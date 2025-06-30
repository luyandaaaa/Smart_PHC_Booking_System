import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  FileText, 
  Stethoscope, 
  AlertTriangle, 
  Clock, 
  Activity, 
  Pill, 
  Heart, 
  TrendingUp, 
  MessageCircle, 
  Search,
  Bell,
  Settings,
  ChevronRight,
  Phone,
  Video,
  Plus,
  Filter,
  Download,
  Eye,
  Edit,
  Menu,
  X
} from 'lucide-react';
import PatientRecords from './PatientRecords';
import DocAppointmentView from './docAppointments';
import ConsultationView from './ConsultationsView'
import AnalyticsView from './AnalyticsView';
import MessagesView from './MessagesView';

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

const DoctorDashboard = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mock data
  const todayStats = [
    {
      title: 'Today\'s Patients',
      value: '24',
      change: '+3 from yesterday',
      icon: <Users size={24} color={colors.primary} />,
      bg: colors.blue50,
      changeColor: colors.success
    },
    {
      title: 'Pending Reviews',
      value: '8',
      change: '2 urgent',
      icon: <FileText size={24} color={colors.warning} />,
      bg: colors.yellow50,
      changeColor: colors.danger
    },
    {
      title: 'Completed Consultations',
      value: '18',
      change: '75% completion rate',
      icon: <Stethoscope size={24} color={colors.success} />,
      bg: colors.green50,
      changeColor: colors.success
    },
    {
      title: 'Emergency Cases',
      value: '2',
      change: '1 in progress',
      icon: <AlertTriangle size={24} color={colors.danger} />,
      bg: colors.red50,
      changeColor: colors.warning
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'Nomsa Mthembu',
      time: '09:30',
      type: 'Follow-up',
      status: 'confirmed',
      condition: 'Hypertension',
      language: 'isiZulu',
      priority: 'normal'
    },
    {
      id: 2,
      patient: 'Thabo Molefe',
      time: '10:00',
      type: 'Initial Consultation',
      status: 'pending',
      condition: 'Diabetes screening',
      language: 'English',
      priority: 'normal'
    },
    {
      id: 3,
      patient: 'Sarah van der Merwe',
      time: '10:30',
      type: 'Emergency',
      status: 'urgent',
      condition: 'Chest pain',
      language: 'Afrikaans',
      priority: 'high'
    },
    {
      id: 4,
      patient: 'Lebohang Sithole',
      time: '11:00',
      type: 'Check-up',
      status: 'confirmed',
      condition: 'Routine physical',
      language: 'Sesotho',
      priority: 'normal'
    }
  ];

  const recentPatients = [
    {
      id: 1,
      name: 'Zanele Dlamini',
      age: 45,
      lastVisit: '2 days ago',
      condition: 'Type 2 Diabetes',
      riskLevel: 'medium',
      vitals: { bp: '140/90', glucose: '8.2 mmol/L', bmi: '28.5' }
    },
    {
      id: 2,
      name: 'Pieter Johnson',
      age: 62,
      lastVisit: '1 week ago',
      condition: 'Hypertension',
      riskLevel: 'high',
      vitals: { bp: '160/100', glucose: '6.1 mmol/L', bmi: '31.2' }
    },
    {
      id: 3,
      name: 'Fatima Hassan',
      age: 34,
      lastVisit: '3 days ago',
      condition: 'Pregnancy - 28 weeks',
      riskLevel: 'low',
      vitals: { bp: '115/75', glucose: '5.4 mmol/L', bmi: '26.8' }
    }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <Activity size={20} /> },
    { id: 'patients', label: 'Patient Records', icon: <Users size={20} /> },
    { id: 'appointments', label: 'Appointments', icon: <Calendar size={20} /> },
    { id: 'consultations', label: 'Consultations', icon: <Stethoscope size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageCircle size={20} /> },
    { id: 'emergency', label: 'Emergency', icon: <AlertTriangle size={20} /> },
  ];

  const isMobile = window.innerWidth < 768;

  const Sidebar = () => (
    <div style={{
      width: 280,
      background: '#fff',
      borderRight: `1px solid ${colors.gray200}`,
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 20,
    }}>
      {/* Logo */}
      <div style={{
        padding: '1.5rem',
        borderBottom: `1px solid ${colors.gray200}`,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Stethoscope size={24} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.gray800 }}>HealthGPT SA</div>
            <div style={{ fontSize: 12, color: colors.gray500 }}>Doctor Portal</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '1rem 0', flex: 1 }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '0.875rem 1.5rem',
              fontSize: 14,
              fontWeight: 500,
              border: 'none',
              background: item.id === currentPage ? colors.blue50 : 'transparent',
              color: item.id === currentPage ? colors.primary : colors.gray600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              borderRight: item.id === currentPage ? `3px solid ${colors.primary}` : 'none',
            }}
            onMouseEnter={e => {
              if (item.id !== currentPage) {
                e.target.style.backgroundColor = colors.gray50;
              }
            }}
            onMouseLeave={e => {
              if (item.id !== currentPage) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            <span style={{ marginRight: 12, color: item.id === currentPage ? colors.primary : colors.gray500 }}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Doctor Profile */}
      <div style={{
        padding: '1.5rem',
        borderTop: `1px solid ${colors.gray200}`,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.primary} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 600,
          fontSize: 18,
        }}>
          Dr
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>Dr. Nomsa Khumalo</div>
          <div style={{ fontSize: 12, color: colors.gray500 }}>General Practitioner</div>
          <div style={{ fontSize: 11, color: colors.success }}>● Online</div>
        </div>
      </div>
    </div>
  );

  const MobileHeader = () => (
    <div style={{
      display: isMobile ? 'flex' : 'none',
      background: '#fff',
      boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 30,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      height: 64,
    }}>
      <button
        onClick={() => setIsMenuOpen(true)}
        style={{
          background: 'none',
          border: 'none',
          padding: 8,
          borderRadius: 6,
          cursor: 'pointer',
        }}
      >
        <Menu size={24} color={colors.gray600} />
      </button>
      
      <div style={{ fontSize: 18, fontWeight: 700, color: colors.gray800 }}>
        HealthGPT SA
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Bell size={20} color={colors.gray600} />
      </div>
    </div>
  );

  const StatCard = ({ stat }) => (
    <div style={{
      background: stat.bg,
      borderRadius: 16,
      padding: 24,
      border: `1px solid ${colors.gray200}`,
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 25px -8px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: colors.gray600 }}>{stat.title}</span>
        {stat.icon}
      </div>
      <div style={{ fontSize: 32, fontWeight: 700, color: colors.gray800, marginBottom: 8 }}>
        {stat.value}
      </div>
      <div style={{ fontSize: 12, color: stat.changeColor, fontWeight: 500 }}>
        {stat.change}
      </div>
    </div>
  );

  const AppointmentCard = ({ appointment }) => (
    <div style={{
      background: '#fff',
      border: `1px solid ${colors.gray200}`,
      borderLeft: `4px solid ${appointment.priority === 'high' ? colors.danger : colors.primary}`,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      transition: 'all 0.2s',
      cursor: 'pointer',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = '0 4px 12px -4px rgba(0,0,0,0.1)';
      e.currentTarget.style.transform = 'translateX(4px)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'none';
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>{appointment.patient}</div>
          <div style={{ fontSize: 12, color: colors.gray500, marginTop: 2 }}>
            {appointment.language} • {appointment.condition}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.primary }}>{appointment.time}</div>
          <div style={{
            fontSize: 10,
            padding: '2px 8px',
            borderRadius: 12,
            background: appointment.status === 'urgent' ? colors.red50 : 
                        appointment.status === 'confirmed' ? colors.green50 : colors.yellow50,
            color: appointment.status === 'urgent' ? colors.danger : 
                   appointment.status === 'confirmed' ? colors.success : colors.warning,
            marginTop: 4,
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            {appointment.status}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
        <span style={{ fontSize: 12, color: colors.gray600 }}>{appointment.type}</span>
        <div style={{ display: 'flex', gap: 8, marginLeft: 'auto' }}>
          <button style={{
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
          }}>
            <Video size={12} />
            Video Call
          </button>
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
            Call
          </button>
        </div>
      </div>
    </div>
  );

  const PatientCard = ({ patient }) => (
    <div style={{
      background: '#fff',
      border: `1px solid ${colors.gray200}`,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      transition: 'all 0.2s',
      cursor: 'pointer',
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
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>{patient.name}</div>
          <div style={{ fontSize: 14, color: colors.gray600, marginTop: 2 }}>Age {patient.age} • {patient.condition}</div>
          <div style={{ fontSize: 12, color: colors.gray500, marginTop: 4 }}>Last visit: {patient.lastVisit}</div>
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
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <div style={{ textAlign: 'center', padding: 8, background: colors.gray50, borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: colors.gray500 }}>Blood Pressure</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{patient.vitals.bp}</div>
        </div>
        <div style={{ textAlign: 'center', padding: 8, background: colors.gray50, borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: colors.gray500 }}>Glucose</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{patient.vitals.glucose}</div>
        </div>
        <div style={{ textAlign: 'center', padding: 8, background: colors.gray50, borderRadius: 8 }}>
          <div style={{ fontSize: 12, color: colors.gray500 }}>BMI</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: colors.gray800 }}>{patient.vitals.bmi}</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            padding: '6px 12px',
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
            View Records
          </button>
          <button style={{
            padding: '6px 12px',
            borderRadius: 8,
            border: `1px solid ${colors.gray300}`,
            background: 'transparent',
            color: colors.gray600,
            fontSize: 12,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}>
            <Edit size={12} />
            Update
          </button>
        </div>
        <ChevronRight size={16} color={colors.gray400} />
      </div>
    </div>
  );

  let mainContent = null;
  if (currentPage === 'patients') {
    mainContent = <PatientRecords />;
  } else if (currentPage === 'appointments') {
    mainContent = <DocAppointmentView />;
  } else if (currentPage === 'consultations') {
    mainContent = <ConsultationView />;
  } else if (currentPage === 'analytics') {
    mainContent = <AnalyticsView />;
  } else if (currentPage === 'messages') {
    mainContent = <MessagesView />;
  } else {
    mainContent = (
      <div style={{ padding: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>Doctor Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, margin: '32px 0' }}>
          {todayStats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
          <div style={{ flex: 2, minWidth: 320 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.gray700, marginBottom: 16 }}>Upcoming Appointments</h2>
            {upcomingAppointments.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} />
            ))}
          </div>
          <div style={{ flex: 1, minWidth: 280 }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.gray700, marginBottom: 16 }}>Recent Patients</h2>
            {recentPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.gray50 }}>
      <Sidebar />
      <MobileHeader />
      <div style={{ flex: 1, marginLeft: isMobile ? 0 : 280, marginTop: isMobile ? 64 : 0, padding: isMobile ? '1rem' : '2rem', maxWidth: 1400 }}>
        {mainContent}
      </div>
    </div>
  );
};

export default DoctorDashboard;