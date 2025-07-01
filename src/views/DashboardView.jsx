import React, { useState } from 'react';
import { Calendar, MapPin, Camera, AlertTriangle, Heart, Award, Zap, Volume2, MessageCircle, Users, BookOpen, Menu, X, Navigation2, Clock, Pill } from 'lucide-react';
import QuickActionCard from '../components/QuickActionCard'; // Import QuickActionCard component
import Badge from '../components/Badge';
import Sidebar from '../components/Sidebar';

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

const healthCards = [
  {
    title: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    status: 'Normal',
    statusColor: colors.success,
    bg: colors.blue50,
    icon: <Heart size={20} color={colors.danger} />,
    titleColor: '#1e40af',
  },
  {
    title: 'Steps',
    value: '4,892',
    unit: 'steps',
    status: '65% of goal',
    statusColor: colors.primary,
    bg: colors.green50,
    icon: <Navigation2 size={20} color={colors.success} />,
    titleColor: colors.success,
  },
  {
    title: 'Sleep',
    value: '7.2',
    unit: 'hours',
    status: 'Good quality',
    statusColor: colors.warning,
    bg: colors.purple50,
    icon: <Clock size={20} color={'#8b5cf6'} />,
    titleColor: '#8b5cf6',
  },
];

const quickActions = [
  { icon: Calendar, title: 'Book Appointment', color: colors.primary, page: 'appointments' },
  { icon: MapPin, title: 'Find Nearest Clinic', color: colors.success, page: 'appointments' },
  { icon: Pill, title: 'Scan Medicine', color: '#8b5cf6', page: 'scan' },
  { icon: AlertTriangle, title: 'Emergency Help', color: colors.danger, page: 'emergency' },
];

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Menu size={20} color={colors.primary} /> },
  { id: 'assistant', label: 'AI Assistant', icon: <MessageCircle size={20} color={colors.primary} /> },
  { id: 'appointments', label: 'Smart Booking', icon: <Calendar size={20} color={colors.primary} /> },
  { id: 'emergency', label: 'Emergency', icon: <AlertTriangle size={20} color={colors.danger} /> },
  { id: 'mental-health', label: 'Mental Health', icon: <Heart size={20} color={colors.warning} /> },
  { id: 'community', label: 'Health Circles', icon: <Users size={20} color={colors.primary} /> },
  { id: 'library', label: 'Health Library', icon: <BookOpen size={20} color={colors.primary} /> },
  { id: 'rewards', label: 'Rewards', icon: <Award size={20} color={colors.warning} /> },
];

const DashboardView = ({ setCurrentPage, currentPage = 'dashboard', ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Responsive check
  const isMobile = window.innerWidth < 768;

  // Sidebar/nav styles
  const sidebarStyle = {
    width: 256,
    background: '#fff',
    borderRight: `1px solid ${colors.gray200}`,
    display: isMobile ? 'none' : 'flex',
    flexDirection: 'column',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 20,
  };

  const mobileHeaderStyle = {
    display: isMobile ? 'flex' : 'none',
    background: '#fff',
    boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
    borderBottom: `1px solid ${colors.gray200}`,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
  };

  const mainContentStyle = {
    marginLeft: isMobile ? 0 : 256,
    marginTop: isMobile ? 64 : 0,
    padding: isMobile ? '1rem' : '2rem',
    background: colors.gray50,
    minHeight: '100vh',
    flex: 1,
  };

  // --- ENHANCEMENTS STATE ---
  const [mood, setMood] = useState('😊');
  const [water, setWater] = useState(5); // cups
  const [medReminders, setMedReminders] = useState([
    { name: 'Aspirin', time: '08:00', taken: false },
    { name: 'Metformin', time: '20:00', taken: false }
  ]);
  const [bp, setBp] = useState('');
  const [glucose, setGlucose] = useState('');
  const [sleep, setSleep] = useState(7);
  const [goal, setGoal] = useState('Walk 6000 steps');
  const [goalProgress, setGoalProgress] = useState(65);
  const [challengeDone, setChallengeDone] = useState(false);
  const [showBadge, setShowBadge] = useState(false);

  // Sidebar user info
  const userInfo = (
    <div style={{
      padding: '1rem',
      borderTop: `1px solid ${colors.gray200}`,
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    }}>
      <div style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: colors.gray200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Users size={24} color={colors.gray600} />
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: colors.gray700 }}>User Profile</div>
        <div style={{ fontSize: 12, color: colors.gray500 }}>1250 XP</div>
      </div>
    </div>
  );

  // Sidebar nav
  const nav = (
    <nav style={{ padding: '1.5rem 0.5rem', flex: 1 }}>
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentPage(item.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: 15,
            fontWeight: 500,
            border: 'none',
            background: 'none',
            borderRadius: 8,
            color: colors.gray600,
            marginBottom: 6,
            cursor: 'pointer',
            backgroundColor: item.id === currentPage ? colors.blue50 : 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.target.style.backgroundColor = colors.gray100}
          onMouseLeave={e => e.target.style.backgroundColor = item.id === currentPage ? colors.blue50 : 'none'}
        >
          <span style={{ marginRight: 12 }}>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );

  // Mobile menu
  const mobileMenu = isMenuOpen && (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 40,
      background: 'rgba(55,65,81,0.5)',
      display: 'flex',
    }}>
      <div style={{
        width: '80vw',
        maxWidth: 320,
        background: '#fff',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          padding: '0 1rem',
          borderBottom: `1px solid ${colors.gray200}`,
        }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: colors.gray800 }}>HealthGPT SA</span>
          <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', padding: 8, borderRadius: 6 }}>
            <X size={24} color={colors.gray600} />
          </button>
        </div>
        {nav}
        {userInfo}
      </div>
      <div style={{ flex: 1 }} onClick={() => setIsMenuOpen(false)} />
    </div>
  );

  // Health status cards
  const healthStatusCards = (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: 16,
      marginBottom: 24,
    }}>
      {healthCards.map((card, idx) => (
        <div key={idx} style={{
          background: card.bg,
          borderRadius: 12,
          padding: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontWeight: 500, color: card.titleColor }}>{card.title}</span>
            {card.icon}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
            {card.value} <span style={{ fontSize: 14, fontWeight: 400, color: colors.gray600 }}>{card.unit}</span>
          </div>
          <div style={{ fontSize: 12, color: card.statusColor, marginTop: 4 }}>{card.status}</div>
        </div>
      ))}
    </div>
  );

  // Quick actions
  const quickActionsGrid = (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
      gap: 12,
      marginBottom: 24,
    }}>
      {quickActions.map((action, idx) => (
        <QuickActionCard
          key={idx}
          icon={action.icon}
          title={action.title}
          color={action.color}
          onClick={() => setCurrentPage(action.page)}
          translationMode={props.translationMode}
          translateMedicalTerms={props.translateMedicalTerms}
        />
      ))}
    </div>
  );

  // XP Progress
  const xpProgress = (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
      border: `1px solid ${colors.gray200}`,
      padding: 24,
      marginBottom: 24,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: colors.gray800 }}>Health XP Progress</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Award size={20} color={colors.warning} style={{ marginRight: 8 }} />
          <span style={{ fontWeight: 500 }}>{'Level 3'}</span>
        </div>
      </div>
      <div style={{ width: '100%', background: colors.gray200, borderRadius: 9999, height: 10 }}>
        <div style={{
          background: colors.primaryHover,
          height: 10,
          borderRadius: 9999,
          width: '50%',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 14, color: colors.gray600 }}>
        <span>1250 XP</span>
        <span>1500 XP</span>
      </div>
    </div>
  );

  // --- LOGOUT BUTTON ---
  const handleLogout = () => {
    window.location.href = '/';
  };

  const logoutButton = (
    <button
      onClick={handleLogout}
      style={{
        background: colors.primary,
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '10px 22px',
        fontWeight: 600,
        fontSize: 15,
        cursor: 'pointer',
        boxShadow: '0 1px 2px 0 rgba(59,130,246,0.10)',
        transition: 'background 0.2s',
        marginLeft: 16,
      }}
      onMouseOver={e => e.currentTarget.style.background = colors.primaryHover}
      onMouseOut={e => e.currentTarget.style.background = colors.primary}
    >
      Logout
    </button>
  );

  // Welcome header
  const welcomeHeader = (
    <div style={{
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
      border: `1px solid ${colors.gray200}`,
      padding: 24,
      marginBottom: 24,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <span style={{ fontSize: 24, fontWeight: 700, color: colors.gray800 }}>Welcome back</span>
          <div style={{ color: colors.gray600, marginTop: 4 }}>Healthcare that speaks your language—anytime, anywhere.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={props.toggleAudioSummary}
            style={{
              padding: 10,
              borderRadius: '50%',
              background: colors.gray100,
              border: 'none',
              cursor: 'pointer',
              marginRight: 8,
            }}
          >
            <Volume2 size={20} color={colors.gray600} />
          </button>
          {/* Language selector placeholder */}
          <select style={{
            border: `1px solid ${colors.gray300}`,
            borderRadius: 8,
            padding: '6px 12px',
            fontSize: 14,
            color: colors.gray700,
            outline: 'none',
          }}>
            <option>English</option>
            <option>isiZulu</option>
            <option>isiXhosa</option>
            <option>Afrikaans</option>
            <option>Sesotho</option>
          </select>
          {logoutButton}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#fff' }}>
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div
        style={{
          flex: 1,
          padding: '2rem 2.5vw',
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          background: '#fff',
          borderRadius: 18,
          boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
          transition: 'box-shadow 0.2s, transform 0.2s',
          position: 'relative',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(59,130,246,0.12)';
          e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0,0,0,0.05)';
          e.currentTarget.style.transform = 'none';
        }}
      >
        {welcomeHeader}
        {healthStatusCards}
        {quickActionsGrid}
        {xpProgress}

        {/* Next Appointment */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', border: `1px solid ${colors.gray200}`, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontWeight: 600, color: colors.gray800, marginBottom: 16, display: 'flex', alignItems: 'center' }}>
            <Calendar size={20} style={{ marginRight: 8, color: colors.primary }} />
            {props.t.nextAppointment || 'Next Appointment'}
          </h3>
          <div style={{ background: colors.blue50, borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ fontWeight: 500, color: colors.gray800, margin: 0 }}>KwaMashu PHC Clinic</h4>
                <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>General Checkup</p>
                <p style={{ fontSize: 14, color: colors.primary, margin: '8px 0 0 0' }}>Tomorrow, 10:00 AM</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: colors.gray500 }}>Wait time</div>
                <div style={{ fontWeight: 600, color: colors.success, fontSize: 16 }}>8 mins</div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Tip */}
        <div style={{ background: 'linear-gradient(90deg, #4ade80 0%, #3b82f6 100%)', color: 'white', padding: 24, borderRadius: 16, marginBottom: 24 }}>
          <h3 style={{ fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center' }}>
            <Heart size={20} style={{ marginRight: 8 }} />
            {props.t.dailyTip || 'Daily Tip'}
          </h3>
          <p style={{ fontSize: 14, opacity: 0.9 }}>
            Drinking 8 glasses of water daily helps your body flush out toxins and keeps your skin healthy.
          </p>
          <button style={{ marginTop: 12, background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, padding: '8px 20px', color: 'white', fontWeight: 500, fontSize: 14, cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            Learn More
          </button>
        </div>

        {/* Recent Badges */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', border: `1px solid ${colors.gray200}`, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontWeight: 600, color: colors.gray800, marginBottom: 16, display: 'flex', alignItems: 'center' }}>
            <Award size={20} style={{ marginRight: 8, color: colors.warning }} />
            {props.t.earnedBadges || 'Recent Badges'}
          </h3>
          <div style={{ display: 'flex', gap: 24 }}>
            {/* Use Badge component for each badge */}
            <Badge icon={'\uD83C\uDFC6'} title="Appointment Keeper" />
            <Badge icon={'\uD83D\uDC8A'} title="Medicine Master" />
            <Badge icon={'\u2764\uFE0F'} title={props.t.healthHero || 'Health Hero'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;