import React from 'react';
import { Home, Calendar, Award, HeartPulse, Stethoscope, Users, BookOpen, BarChart2, Shield } from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={20} /> },
  { id: 'appointments', label: 'Appointments', icon: <Calendar size={20} /> },
  { id: 'rewards', label: 'Rewards', icon: <Award size={20} /> },
  { id: 'mentalHealth', label: 'Mental Health', icon: <HeartPulse size={20} /> },
  { id: 'emergency', label: 'Emergency', icon: <Shield size={20} /> },
  { id: 'assistant', label: 'Assistant', icon: <Stethoscope size={20} /> },
  { id: 'scan', label: 'Scan', icon: <BarChart2 size={20} /> },
  { id: 'community', label: 'Community', icon: <Users size={20} /> },
  { id: 'healthLibrary', label: 'Health Library', icon: <BookOpen size={20} /> },
];

const Sidebar = ({ currentPage, setCurrentPage }) => {
  // Helper for routing
  const handleNav = (id) => {
    // Only use setCurrentPage for all navigation (no hard reload)
    if (setCurrentPage) {
      setCurrentPage(id);
    }
  };
  return (
    <nav style={{
      width: 220,
      background: '#f9fafb',
      borderRight: '1px solid #e5e7eb',
      minHeight: '100vh',
      padding: '2rem 0.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      position: 'sticky',
      top: 0,
      left: 0,
      zIndex: 10
    }}>
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => handleNav(item.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            width: '100%',
            background: currentPage === item.id ? 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
            color: currentPage === item.id ? 'white' : '#1f2937',
            border: 'none',
            borderRadius: 8,
            padding: '10px 16px',
            fontWeight: 600,
            fontSize: 16,
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
            marginBottom: 2,
            boxShadow: currentPage === item.id ? '0 2px 8px rgba(59,130,246,0.10)' : 'none',
            outline: currentPage === item.id ? '2px solid #2563eb' : 'none',
            outlineOffset: currentPage === item.id ? 1 : 0
          }}
          onMouseEnter={e => {
            if (currentPage !== item.id) {
              e.currentTarget.style.background = '#e0e7ff';
              e.currentTarget.style.color = '#2563eb';
            }
          }}
          onMouseLeave={e => {
            if (currentPage !== item.id) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#1f2937';
            }
          }}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default Sidebar;
