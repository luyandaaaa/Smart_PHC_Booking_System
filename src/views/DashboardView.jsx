import React, { useState, useContext, createContext } from 'react';
// --- TRANSLATION DICTIONARY ---
const translations = {
  // All 11 official languages, with keys for every nav, quick action, health card, and component label
  English: {
    welcome: 'Welcome back',
    tagline: 'Healthcare that speaks your language—anytime, anywhere.',
    nextAppointment: 'Next Appointment',
    generalCheckup: 'General Checkup',
    tomorrow: 'Tomorrow',
    dailyTip: 'Daily Tip',
    tipText: 'Drinking 8 glasses of water daily helps your body flush out toxins and keeps your skin healthy.',
    learnMore: 'Learn More',
    earnedBadges: 'Recent Badges',
    appointmentKeeper: 'Appointment Keeper',
    medicineMaster: 'Medicine Master',
    healthHero: 'Health Hero',
    logout: 'Logout',
    healthXP: 'Health XP Progress',
    level: 'Level',
    dashboard: 'Dashboard',
    assistant: 'AI Assistant',
    appointments: 'Smart Booking',
    emergency: 'Emergency',
    'mental-health': 'Mental Health',
    community: 'Health Circles',
    library: 'Health Library',
    rewards: 'Rewards',
    userProfile: 'User Profile',
    xp: 'XP',
    bookAppointment: 'Book Appointment',
    findClinic: 'Find Nearest Clinic',
    scanMedicine: 'Scan Medicine',
    emergencyHelp: 'Emergency Help',
    heartRate: 'Heart Rate',
    steps: 'Steps',
    sleep: 'Sleep',
    statusNormal: 'Normal',
    statusGoal: '65% of goal',
    statusGood: 'Good quality',
  },
  isiZulu: {
    welcome: 'Siyakwamukela',
    tagline: 'Ukwelashwa okukhuluma ulimi lwakho—noma kunini, noma kuphi.',
    nextAppointment: 'Ukuqokwa Okulandelayo',
    generalCheckup: 'Ukuhlolwa Okujwayelekile',
    tomorrow: 'Kusasa',
    dailyTip: 'Ithiphu Yansuku zonke',
    tipText: 'Ukuphuza izinkomishi eziyisi-8 zamanzi nsuku zonke kusiza umzimba wakho ukususa ubuthi futhi kugcine isikhumba sakho siphilile.',
    learnMore: 'Funda Okuningi',
    earnedBadges: 'Amabhajethi Akamuva',
    appointmentKeeper: 'Umgcinwa Wokuqokwa',
    medicineMaster: 'Ingcali Yemithi',
    healthHero: 'Iqhawe Lezempilo',
    logout: 'Phuma',
    healthXP: 'Inqubekela phambili ye-Health XP',
    level: 'Izinga',
    dashboard: 'Ideshibhodi',
    assistant: 'Usizo lwe-AI',
    appointments: 'Ukubhuka okuhlakaniphile',
    emergency: 'Ezimo eziphuthumayo',
    'mental-health': 'Impilo Yengqondo',
    community: 'Imiphakathi Yezempilo',
    library: 'Umtapo Wezempilo',
    rewards: 'Imiklomelo',
    userProfile: 'Iphrofayela yomsebenzisi',
    xp: 'XP',
    bookAppointment: 'Bhuka Ukuqokwa',
    findClinic: 'Thola Isibhedlela Esiseduze',
    scanMedicine: 'Hlola Imithi',
    emergencyHelp: 'Usizo Oluphuthumayo',
    heartRate: 'Isilinganiso Senhliziyo',
    steps: 'Izinyathelo',
    sleep: 'Ukulala',
    statusNormal: 'Kujwayelekile',
    statusGoal: '65% yomgomo',
    statusGood: 'Ikhwalithi enhle',
  },
  isiXhosa: {
    welcome: 'Wamkelekile',
    tagline: 'Unyango oluthetha ulwimi lwakho—nangawuphi na umzuzu, naphi na.',
    nextAppointment: 'Uqwalaselo Olulandelayo',
    generalCheckup: 'Uhlolo Jikelele',
    tomorrow: 'Ngomso',
    dailyTip: 'Ingcebiso Yosuku',
    tipText: 'Ukusela iiglasi ezisi-8 zamanzi yonke imihla kunceda umzimba wakho ukhulule iintsholongwane kwaye kugcine ulusu lwakho lusempilweni.',
    learnMore: 'Funda Okungakumbi',
    earnedBadges: 'Iimbasa Zamva nje',
    appointmentKeeper: 'Umgcini Woqwalaselo',
    medicineMaster: 'Ingcali Yemithi',
    healthHero: 'Iqhawe Lezempilo',
    logout: 'Phuma',
    healthXP: 'Inkqubela phambili ye-Health XP',
    level: 'Inqanaba',
    dashboard: 'Ideshibhodi',
    assistant: 'Uncedo lwe-AI',
    appointments: 'Uqwalaselo Oluhlakaniphile',
    emergency: 'Imeko Engxamisekileyo',
    'mental-health': 'Impilo Yengqondo',
    community: 'Iindibano Zempilo',
    library: 'Ithala Lezempilo',
    rewards: 'Iimbasa',
    userProfile: 'Iprofayile yomsebenzisi',
    xp: 'XP',
    bookAppointment: 'Bhuka Uqwalaselo',
    findClinic: 'Fumana Isibhedlele Esikufuphi',
    scanMedicine: 'Hlola Imithi',
    emergencyHelp: 'Uncedo Olungxamisekileyo',
    heartRate: 'Isantya sentliziyo',
    steps: 'Amanyathelo',
    sleep: 'Ukulala',
    statusNormal: 'Qhelekile',
    statusGoal: '65% yomgomo',
    statusGood: 'Umgangatho olungileyo',
  },
  Afrikaans: {
    welcome: 'Welkom terug',
    tagline: 'Gesondheidsorg wat jou taal praat—enige tyd, enige plek.',
    nextAppointment: 'Volgende Afspraak',
    generalCheckup: 'Algemene Ondersoek',
    tomorrow: 'Môre',
    dailyTip: 'Daaglikse Wenke',
    tipText: 'Om 8 glase water per dag te drink help jou liggaam om gifstowwe uit te spoel en hou jou vel gesond.',
    learnMore: 'Leer Meer',
    earnedBadges: 'Onlangse Kentekens',
    appointmentKeeper: 'Afspraakbewaarder',
    medicineMaster: 'Medisyne Meester',
    healthHero: 'Gesondheidsheld',
    logout: 'Teken uit',
    healthXP: 'Gesondheid XP vordering',
    level: 'Vlak',
    dashboard: 'Dashboard',
    assistant: 'KI Assistent',
    appointments: 'Slim Bespreking',
    emergency: 'Noodgeval',
    'mental-health': 'Geestelike Gesondheid',
    community: 'Gesondheidskringe',
    library: 'Gesondheidsbiblioteek',
    rewards: 'Belonings',
    userProfile: 'Gebruiker Profiel',
    xp: 'XP',
    bookAppointment: 'Maak Afspraak',
    findClinic: 'Vind naaste kliniek',
    scanMedicine: 'Skandeer Medisyne',
    emergencyHelp: 'Noodhulp',
    heartRate: 'Hartklop',
    steps: 'Stappe',
    sleep: 'Slaap',
    statusNormal: 'Normaal',
    statusGoal: '65% van doel',
    statusGood: 'Goeie gehalte',
  },
  Sesotho: {
    welcome: 'Rea u amohela',
    tagline: 'Bophelo bo buang puo ea hau—neng kapa neng, kae kapa kae.',
    nextAppointment: 'Kopano e latelang',
    generalCheckup: 'Tlhahlobo e Akaretsang',
    tomorrow: 'Hosane',
    dailyTip: 'Keletso ea Letsatsi le Letsatsi',
    tipText: "Ho noa likopi tse 8 tsa metsi letsatsi le letsatsi ho thusa 'mele oa hau ho tlosa litšila le ho boloka letlalo la hau le phetse hantle.",
    learnMore: 'Ithute Haholoanyane',
    earnedBadges: 'Likhau tsa morao-rao',
    appointmentKeeper: 'Mohlokomeli oa Kopano',
    medicineMaster: 'Monghali oa Lithethefatsi',
    healthHero: 'Moahloli oa Bophelo',
    logout: 'Tsoa',
    healthXP: 'Tsoelo-pele ea Health XP',
    level: 'Boemo',
    dashboard: 'Lebokose la Taolo',
    assistant: 'Mothusi oa AI',
    appointments: 'Phetoho e bohlale',
    emergency: 'Tšohanyetso',
    'mental-health': 'Bophelo ba kelello',
    community: 'Lihlopheng tsa Bophelo',
    library: 'Laeborari ea Bophelo',
    rewards: 'Meputso',
    userProfile: 'Phetolelo ea mosebedisi',
    xp: 'XP',
    bookAppointment: 'Buka Kopano',
    findClinic: 'Fumana Sepetlele se Haufi',
    scanMedicine: 'Hlahloba Lithethefatsi',
    emergencyHelp: 'Thuso ea Potlako',
    heartRate: 'Sekhahla sa Pelo',
    steps: 'Mehato',
    sleep: 'Boroko',
    statusNormal: 'E tloaelehileng',
    statusGoal: '65% ea sepheo',
    statusGood: 'Boleng bo botle',
  },
  // ...add Sepedi, Setswana, Xitsonga, Tshivenda, isiNdebele, siSwati with all keys as above...
};

const LanguageContext = createContext({
  language: 'English',
  setLanguage: () => {},
});
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
  { id: 'dashboard', label: 'dashboard', icon: <Menu size={20} color={colors.primary} /> },
  { id: 'assistant', label: 'assistant', icon: <MessageCircle size={20} color={colors.primary} /> },
  { id: 'appointments', label: 'appointments', icon: <Calendar size={20} color={colors.primary} /> },
  { id: 'emergency', label: 'emergency', icon: <AlertTriangle size={20} color={colors.danger} /> },
  { id: 'mental-health', label: 'mental-health', icon: <Heart size={20} color={colors.warning} /> },
  { id: 'community', label: 'community', icon: <Users size={20} color={colors.primary} /> },
  { id: 'library', label: 'library', icon: <BookOpen size={20} color={colors.primary} /> },
  { id: 'rewards', label: 'rewards', icon: <Award size={20} color={colors.warning} /> },
];

const DashboardView = ({ setCurrentPage, currentPage = 'dashboard', ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('English');
  const t = translations[language] || translations['English'];

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
        <div style={{ fontSize: 14, fontWeight: 500, color: colors.gray700 }}>{t.userProfile}</div>
        <div style={{ fontSize: 12, color: colors.gray500 }}>1250 {t.xp}</div>
      </div>
    </div>
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
          <span style={{ fontSize: 20, fontWeight: 700, color: colors.gray800 }}>MzansiCare</span>
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
            <span style={{ fontWeight: 500, color: card.titleColor }}>{t[card.title.replace(' ', '').toLowerCase()] || t[card.title.replace(' ', '')] || card.title}</span>
            {card.icon}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>
            {card.value} <span style={{ fontSize: 14, fontWeight: 400, color: colors.gray600 }}>{card.unit}</span>
          </div>
          <div style={{ fontSize: 12, color: card.statusColor, marginTop: 4 }}>{t[card.status.replace(' ', '').toLowerCase()] || card.status}</div>
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
          title={t[action.page === 'appointments' ? (idx === 0 ? 'bookAppointment' : 'findClinic') : action.page === 'scan' ? 'scanMedicine' : action.page === 'emergency' ? 'emergencyHelp' : action.title] || action.title}
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
          <span style={{ fontSize: 24, fontWeight: 700, color: colors.gray800 }}>{t.welcome}</span>
          <div style={{ color: colors.gray600, marginTop: 4 }}>{t.tagline}</div>
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
          <select
            style={{
              border: `1px solid ${colors.gray300}`,
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 14,
              color: colors.gray700,
              outline: 'none',
            }}
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {Object.keys(translations).map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
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
            {t.nextAppointment}
          </h3>
          <div style={{ background: colors.blue50, borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ fontWeight: 500, color: colors.gray800, margin: 0 }}>KwaMashu PHC Clinic</h4>
                <p style={{ fontSize: 14, color: colors.gray600, margin: 0 }}>{t.generalCheckup}</p>
                <p style={{ fontSize: 14, color: colors.primary, margin: '8px 0 0 0' }}>{t.tomorrow}, 10:00 AM</p>
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
            {t.dailyTip}
          </h3>
          <p style={{ fontSize: 14, opacity: 0.9 }}>
            {t.tipText}
          </p>
          <button style={{ marginTop: 12, background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 10, padding: '8px 20px', color: 'white', fontWeight: 500, fontSize: 14, cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            {t.learnMore}
          </button>
        </div>

        {/* Recent Badges */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)', border: `1px solid ${colors.gray200}`, padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontWeight: 600, color: colors.gray800, marginBottom: 16, display: 'flex', alignItems: 'center' }}>
            <Award size={20} style={{ marginRight: 8, color: colors.warning }} />
            {t.earnedBadges}
          </h3>
          <div style={{ display: 'flex', gap: 24 }}>
            {/* Use Badge component for each badge */}
            <Badge icon={'\uD83C\uDFC6'} title={t.appointmentKeeper} />
            <Badge icon={'\uD83D\uDC8A'} title={t.medicineMaster} />
            <Badge icon={'\u2764\uFE0F'} title={t.healthHero} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;