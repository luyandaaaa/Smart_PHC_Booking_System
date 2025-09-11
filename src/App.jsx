// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { iconComponents, translations, languages, navigationItems, medicalTerms, games, unlockedBadges } from './constants';

import DashboardView from './views/DashboardView';
import AssistantView from './views/AssistantView';
import AppointmentsView from './views/AppointmentsView';
import EmergencyView from './views/EmergencyView';
import MentalHealthView from './views/MentalHealthView';
import RewardsView from './views/RewardsView';
import CommunityView from './views/CommunityView';
import HealthLibraryView from './views/HealthLibraryView';
import Home from './views/Home';
import ScanView from './views/ScanView';
import ProfileView from './views/ProfileView';
import AnalyticsView from './views/AnalyticsView';
import GameModal from './components/GameModal';
import LandingPage from './views/LandingPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userXP, setUserXP] = useState(1250);
  const [currentLevel, setCurrentLevel] = useState(3);
  const [currentGame, setCurrentGame] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [totalRewards, setTotalRewards] = useState(2850);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioQueue, setAudioQueue] = useState([]);
  const [translationMode, setTranslationMode] = useState(false);
  const [medicalTermTranslation, setMedicalTermTranslation] = useState({});
  const [showLanding, setShowLanding] = useState(true);

  const t = translations[currentLanguage];

  // Text-to-speech function
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.lang = currentLanguage;
      utterance.onend = () => {
        setIsPlayingAudio(false);
        if (audioQueue.length > 0) {
          const nextText = audioQueue[0];
          setAudioQueue(audioQueue.slice(1));
          speakText(nextText);
        }
      };
      setIsPlayingAudio(true);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in your browser');
    }
  };

  const toggleAudioSummary = () => {
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setAudioQueue([]);
    } else {
      let summaryText = '';
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span:not([aria-hidden="true"])');
      elements.forEach(el => {
        if (el.textContent && !el.closest('button') && !el.closest('nav')) {
          summaryText += el.textContent + '. ';
        }
      });
      speakText(summaryText);
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    if (!isListening) {
      if ('webkitSpeechRecognition' in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = currentLanguage;
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          handleVoiceCommand(transcript);
        };
        recognition.start();
      } else {
        alert('Voice recognition is not supported in your browser');
      }
    }
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    if (lowerCommand.includes('dashboard')) {
      setCurrentPage('dashboard');
    } else if (lowerCommand.includes('assistant') || lowerCommand.includes('help')) {
      setCurrentPage('assistant');
    } else if (lowerCommand.includes('appointment')) {
      setCurrentPage('appointments');
    } else if (lowerCommand.includes('emergency')) {
      setCurrentPage('emergency');
    } else if (lowerCommand.includes('mental health')) {
      setCurrentPage('mentalHealth');
    } else if (lowerCommand.includes('reward')) {
      setCurrentPage('rewards');
    }
    // Language commands
    else if (lowerCommand.includes('english')) {
      setCurrentLanguage('en');
    } else if (lowerCommand.includes('zulu') || lowerCommand.includes('isizulu')) {
      setCurrentLanguage('zu');
    } else if (lowerCommand.includes('xhosa') || lowerCommand.includes('isixhosa')) {
      setCurrentLanguage('xh');
    } else if (lowerCommand.includes('afrikaans')) {
      setCurrentLanguage('af');
    } else if (lowerCommand.includes('sotho') || lowerCommand.includes('sesotho')) {
      setCurrentLanguage('st');
    }
    // Other commands
    else if (lowerCommand.includes('translate')) {
      setTranslationMode(!translationMode);
    } else if (lowerCommand.includes('read') || lowerCommand.includes('audio')) {
      toggleAudioSummary();
    }
  };

  const translateMedicalTerm = (term) => {
    if (medicalTermTranslation[term]) {
      return medicalTermTranslation[term];
    }
    if (medicalTerms[currentLanguage] && medicalTerms[currentLanguage][term]) {
      return medicalTerms[currentLanguage][term];
    }
    return term;
  };

  const toggleTranslationMode = () => {
    setTranslationMode(!translationMode);
    if (!translationMode) {
      const terms = Object.keys(medicalTerms.en);
      const translatedTerms = {};
      terms.forEach(term => {
        translatedTerms[term] = medicalTerms[currentLanguage]?.[term] || term;
      });
      setMedicalTermTranslation(translatedTerms);
    }
  };

  const translateMedicalTerms = (text) => {
    if (!translationMode) return text;
    const words = text.split(/(\s+|\W+)/);
    return words.map(word => {
      const lowerWord = word.toLowerCase();
      if (medicalTermTranslation[lowerWord]) {
        return medicalTermTranslation[lowerWord];
      }
      return word;
    }).join('');
  };

  const mockAppointments = [
    {
      clinic: 'General Checkup',
      type: 'Routine',
      date: '2023-06-15',
      time: '10:00 AM',
      status: 'Confirmed',
      doctor: 'Dr. Smith'
    }
  ];

  const mockClinics = [
    {
      name: 'City Health Clinic',
      distance: '1.2 km',
      waitTime: '15 min',
      services: ['General Practice', 'Pediatrics'],
      address: '123 Main St',
      phone: '555-1234'
    }
  ];

  const mockEmergencies = [
    {
      type: 'Emergency Services',
      phone: '10177',
      description: 'National emergency number'
    }
  ];

  const mockSupports = [
    {
      name: 'Crisis Hotline',
      phone: '0800 567 567',
      description: '24/7 mental health support'
    }
  ];

  const leaderboard = [
    { rank: 1, name: 'Thabo', xp: 3500, avatar: '🥇', isCurrentUser: false },
    { rank: 2, name: 'Lerato', xp: 3200, avatar: '🥈', isCurrentUser: false },
    { rank: 3, name: 'You', xp: 2850, avatar: '👤', isCurrentUser: true }
  ];

  const renderCurrentView = () => {
    const commonProps = {
      currentLanguage,
      t,
      isPlayingAudio,
      toggleAudioSummary,
      translationMode,
      translateMedicalTerms,
      toggleTranslationMode,
      isListening,
      toggleVoice,
      setCurrentPage,
      setCurrentLanguage
    };
    
    switch (currentPage) {
      case 'dashboard':
        return <DashboardView {...commonProps} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
      case 'assistant':
        return <AssistantView {...commonProps} setCurrentPage={setCurrentPage} />;
      case 'appointments':
        return <AppointmentsView 
          {...commonProps} 
          appointments={mockAppointments}
          clinics={mockClinics}
          setCurrentPage={setCurrentPage}
        />;
      case 'emergency':
        return <EmergencyView 
          {...commonProps} 
          emergencies={mockEmergencies}
          setCurrentPage={setCurrentPage}
        />;
      case 'mentalHealth':
      case 'mental-health':
        return <MentalHealthView 
          {...commonProps} 
          supports={mockSupports}
          setCurrentPage={setCurrentPage}
        />;
      case 'rewards':
        return <RewardsView 
          {...commonProps} 
          totalRewards={totalRewards} 
          unlockedBadges={unlockedBadges}
          games={games}
          setCurrentGame={setCurrentGame}
          leaderboard={leaderboard}
          setCurrentPage={setCurrentPage}
        />;
      case 'community':
        return <CommunityView {...commonProps} setCurrentPage={setCurrentPage} />;
      case 'healthLibrary':
      case 'library':
        return <HealthLibraryView {...commonProps} setCurrentPage={setCurrentPage} />;
      case 'scan':
        return <ScanView {...commonProps} setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <ProfileView {...commonProps} setCurrentPage={setCurrentPage} />;
      case 'analytics':
        return <AnalyticsView {...commonProps} setCurrentPage={setCurrentPage} />;
      default:
        return <DashboardView {...commonProps} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
    }
  };

  const handleGameComplete = (earnedXP) => {
    setUserXP(userXP + earnedXP);
    setTotalRewards(totalRewards + earnedXP);
    setCurrentGame(null);
  };

  if (showLanding) {
    return <LandingPage onPatientRegister={() => {
      setShowLanding(false);
      setCurrentPage('dashboard');
    }} />;
  }

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'white',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          borderBottom: '1px solid #e5e7eb',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1rem',
            height: '4rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  display: 'none',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  color: '#4b5563',
                  backgroundColor: isMobileMenuOpen ? '#f3f4f6' : 'transparent'
                }}
              >
                {isMobileMenuOpen ? 
                  <iconComponents.X size={24} /> : 
                  <iconComponents.Menu size={24} />
                }
              </button>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}>
                <iconComponents.Heart size={32} color="#ef4444" style={{ marginRight: '0.5rem' }} />
                <div>
                  <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>{t.title}</h1>
                  <p style={{ fontSize: '0.75rem', color: '#6b7280', display: 'none' }}>{t.tagline}</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                onClick={toggleTranslationMode}
                style={{
                  padding: '0.5rem',
                  borderRadius: '9999px',
                  color: translationMode ? '#3b82f6' : '#4b5563',
                  backgroundColor: translationMode ? '#dbeafe' : 'transparent'
                }}
              >
                <iconComponents.Languages size={20} />
              </button>
              <button style={{
                padding: '0.5rem',
                borderRadius: '9999px',
                color: '#4b5563',
                backgroundColor: 'transparent'
              }}>
                <iconComponents.Bell size={20} />
              </button>
              <button style={{
                padding: '0.5rem',
                borderRadius: '9999px',
                color: '#4b5563',
                backgroundColor: 'transparent'
              }}>
                <iconComponents.Settings size={20} />
              </button>
              <div style={{
                width: '2rem',
                height: '2rem',
                backgroundColor: '#3b82f6',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <iconComponents.User size={16} color="white" />
              </div>
            </div>
          </div>
        </header>

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 1rem',
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
            {/* Sidebar Navigation */}
            <nav style={{
              display: isMobileMenuOpen ? 'block' : 'none',
              width: '100%',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              padding: '1rem'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navigationItems.map((item) => {
                  const IconComponent = iconComponents[item.icon];
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '0.5rem',
                        textAlign: 'left',
                        color: currentPage === item.id ? '#1d4ed8' : '#374151',
                        backgroundColor: currentPage === item.id ? '#eff6ff' : 'transparent',
                        border: currentPage === item.id ? '1px solid #bfdbfe' : '1px solid transparent'
                      }}
                    >
                      <IconComponent size={20} />
                      <span style={{ fontWeight: '500' }}>
                        {translationMode ? translateMedicalTerms(t[item.label]) : t[item.label]}
                      </span>
                      {currentPage === item.id && <iconComponents.ChevronRight size={16} style={{ marginLeft: 'auto' }} />}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Main Content */}
            <main style={{ flex: 1 }}>
              {renderCurrentView()}
            </main>
          </div>
        </div>

        {/* Game Modal */}
        {currentGame && (
          <GameModal 
            game={currentGame} 
            onClose={() => setCurrentGame(null)}
            onComplete={handleGameComplete}
          />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;