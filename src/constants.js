// constants.js
// Add your constants here
export const APP_NAME = 'ChatGPT4Health';

export const languages = {
  en: 'English',
  zu: 'isiZulu',
  xh: 'isiXhosa',
  af: 'Afrikaans',
  st: 'Sesotho'
};

export const medicalTerms = {
  en: {
    'hypertension': 'High blood pressure',
    'diabetes': 'Diabetes',
    'asthma': 'Asthma',
    'arthritis': 'Joint pain',
    'migraine': 'Severe headache'
  },
  zu: {
    'hypertension': 'Ukuphakama kwegazi',
    'diabetes': 'Isifo sikashukela',
    'asthma': 'Umkhuhlane wephaphu',
    'arthritis': 'Ubuhlungu bamalunga',
    'migraine': 'Ikhanda elibuhlungu'
  },
  xh: {
    'hypertension': 'Ukuphakama komfutho wegazi',
    'diabetes': 'Isifo seswekile',
    'asthma': 'Umkhuhlane wamaphaphu',
    'arthritis': 'Ubuhlungu beentambo',
    'migraine': 'Intloko ebuhlungu'
  },
  af: {
    'hypertension': 'Hoë bloeddruk',
    'diabetes': 'Diabetes',
    'asthma': 'Asma',
    'arthritis': 'Gewrigspyn',
    'migraine': 'Ernstige hoofpyn'
  },
  st: {
    'hypertension': 'Madi a hodimo',
    'diabetes': 'Lefshoa',
    'asthma': 'Ho hema habohloko',
    'arthritis': 'Lerato la marapo',
    'migraine': 'Hlooho e bohoko'
  }
};

export const translations = {
  en: {
    title: 'HealthGPT SA',
    tagline: 'Healthcare that speaks your language—anytime, anywhere.',
    dashboard: 'Dashboard',
    assistant: 'AI Assistant',
    appointments: 'Appointments',
    emergency: 'Emergency',
    mentalHealth: 'Mental Health',
    community: 'Health Circles',
    library: 'Health Library',
    rewards: 'Rewards',
    welcomeBack: 'Welcome back',
    healthStatus: 'Your Health Status',
    nextAppointment: 'Next Appointment',
    dailyTip: 'Daily Health Tip',
    xpProgress: 'Health XP Progress',
    speakNow: 'Speak now...',
    bookAppointment: 'Book Appointment',
    findClinic: 'Find Nearest Clinic',
    scanMedicine: 'Scan Medicine',
    emergencyHelp: 'Emergency Help',
    moodTracker: 'Mood Tracker',
    joinCircle: 'Join Health Circle',
    earnedBadges: 'Earned Badges',
    healthHero: 'Health Hero',
    level: 'Level',
    playGames: 'Play Games',
    earnRewards: 'Earn Rewards',
    yourBadges: 'Your Badges',
    totalXP: 'Total XP',
    gamesPlayed: 'Games Played',
    rewardsEarned: 'Rewards Earned',
    playNow: 'Play Now',
    difficulty: 'Difficulty',
    timeLimit: 'Time Limit',
    xpReward: 'XP Reward',
    unlocked: 'Unlocked',
    locked: 'Locked',
    progress: 'Progress',
    translatePage: 'Translate Page',
    audioSummary: 'Audio Summary',
    translateMedical: 'Translate Medical Terms',
    listen: 'Listen',
    stop: 'Stop',
    translate: 'Translate'
  },
  zu: {
    title: 'HealthGPT SA',
    tagline: 'Ukunakekelwa kwezempilo okukhuluma ulimi lwakho—nganoma nini, nganoma kuphi.',
    dashboard: 'Ibhodi',
    assistant: 'Umsizi we-AI',
    appointments: 'Ama-appointment',
    emergency: 'Isimo esiphuthumayo',
    mentalHealth: 'Impilo Yengqondo',
    community: 'Amaqembu Ezempilo',
    library: 'Umtapo Wezempilo',
    rewards: 'Imiklomelo',
    welcomeBack: 'Sawubona futhi',
    healthStatus: 'Isimo Sakho Sezempilo',
    nextAppointment: 'I-Appointment Elandelayo',
    dailyTip: 'Iseluleko Sansuku Zonke',
    xpProgress: 'Inqubekelaphambili ye-Health XP',
    speakNow: 'Khuluma manje...',
    bookAppointment: 'Bhuka i-Appointment',
    findClinic: 'Thola Ikliniki Eseduze',
    scanMedicine: 'Skena Umuthi',
    emergencyHelp: 'Usizo Lwesimo Esiphuthumayo',
    moodTracker: 'Ulandeleli Lomzwelo',
    joinCircle: 'Joyina Iqembu Lezempilo',
    earnedBadges: 'Ama-badge Atholiwe',
    healthHero: 'Iqhawe Lezempilo',
    level: 'Izinga',
    playGames: 'Dlala Imidlalo',
    earnRewards: 'Thola Imiklomelo',
    yourBadges: 'Ama-badge Akho',
    totalXP: 'Isamba Se-XP',
    gamesPlayed: 'Imidlalo Edlaliwe',
    rewardsEarned: 'Imiklomelo Etholiwe',
    playNow: 'Dlala Manje',
    difficulty: 'Ubunzima',
    timeLimit: 'Isikhathi',
    xpReward: 'Umklomelo We-XP',
    unlocked: 'Kuvuliwe',
    locked: 'Kuvalwe',
    progress: 'Inqubekelaphambili',
    translatePage: 'Humusha Ikhasimende',
    audioSummary: 'Isifinyezo Somsindo',
    translateMedical: 'Humusha Amagama Ezempilo',
    listen: 'Lalela',
    stop: 'Yeka',
    translate: 'Humusha'
  }
};

export const games = [
  {
    id: 'health-quiz',
    title: 'Health Knowledge Quiz',
    description: 'Test your health knowledge and earn XP',
    icon: '🧠',
    difficulty: 'Easy',
    xpReward: 100,
    timeLimit: 60,
    category: 'Knowledge'
  },
  {
    id: 'medicine-match',
    title: 'Medicine Matching',
    description: 'Match medicines with their purposes',
    icon: '💊',
    difficulty: 'Medium', 
    xpReward: 150,
    timeLimit: 90,
    category: 'Learning'
  },
  {
    id: 'symptom-checker',
    title: 'Symptom Detective',
    description: 'Identify symptoms and their causes',
    icon: '🔍',
    difficulty: 'Hard',
    xpReward: 200,
    timeLimit: 120,
    category: 'Diagnosis'
  }
];

export const unlockedBadges = [
  { id: 1, name: 'Health Explorer', icon: '🏆', description: 'Complete 5 health quizzes', unlocked: true },
  { id: 2, name: 'Medicine Master', icon: '💊', description: 'Identify 10 medicines correctly', unlocked: true },
  { id: 3, name: 'Appointment Keeper', icon: '📅', description: 'Never miss an appointment for 30 days', unlocked: true },
  { id: 4, name: 'Community Helper', icon: '🤝', description: 'Help 5 community members', unlocked: false },
  { id: 5, name: 'Fitness Champion', icon: '💪', description: 'Complete 20 fitness challenges', unlocked: false },
  { id: 6, name: 'Mental Wellness', icon: '🧠', description: 'Complete mental health activities for 14 days', unlocked: false }
];

export const navigationItems = [
  { id: 'dashboard', icon: 'Home', label: 'dashboard' },
  { id: 'assistant', icon: 'MessageCircle', label: 'assistant' },
  { id: 'appointments', icon: 'Calendar', label: 'appointments' },
  { id: 'emergency', icon: 'AlertTriangle', label: 'emergency' },
  { id: 'mental-health', icon: 'Brain', label: 'mentalHealth' },
  { id: 'community', icon: 'Users', label: 'community' },
  { id: 'library', icon: 'BookOpen', label: 'library' },
  { id: 'rewards', icon: 'Award', label: 'rewards' }
];
