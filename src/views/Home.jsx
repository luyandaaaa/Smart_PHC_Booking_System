import React, { useState } from "react";
import DoctorDashboard from "./DoctorDashboard";

const styles = `
  :root {
    --primary: #1976d2;
    --primary-dark: #004ba0;
    --text-secondary: #666;
  }
  .home-bg {
    min-height: 100vh;
    min-width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    background-image:
      linear-gradient(120deg, rgba(18,32,54,0.92) 80%, rgba(25,118,210,0.18) 100%),
      url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1500&q=80');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 1;
    pointer-events: none;
    filter: grayscale(0.12) contrast(1.18) brightness(0.7) saturate(1.1);
  }
  .login-outer {
    min-height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    background: transparent;
  }
  .login-container {
    max-width: 800px;
    width: 100%;
    padding: 40px;
    box-sizing: border-box;
    background: rgba(255,255,255,0.96);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
  .login-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 32px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
  .login-option {
    background: white;
    border-radius: 12px;
    padding: 20px 12px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative;
    z-index: 2;
    overflow: hidden;
    min-width: 0;
    border: none;
    outline: none;
  }
  .login-option:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 32px rgba(25,118,210,0.15);
    background: linear-gradient(120deg, #e3f2fd 60%, #f5f5f5 100%);
  }
  .login-option:hover .material-icons {
    color: white;
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
    transform: scale(1.1);
  }
  .login-option .material-icons {
    font-size: 36px;
    margin-bottom: 10px;
    color: var(--primary);
    background: rgba(25,118,210,0.1);
    width: 56px;
    height: 56px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.3s;
  }
  .login-option h3 {
    margin-bottom: 8px;
    color: #333;
  }
  .login-option p {
    color: var(--text-secondary);
    font-size: 14px;
  }
  .text-muted {
    color: var(--text-secondary);
  }
  @media (max-width: 900px) {
    .login-options {
      grid-template-columns: 1fr 1fr;
      max-width: 600px;
    }
  }
  @media (max-width: 600px) {
    .login-options {
      grid-template-columns: 1fr;
      max-width: 100%;
    }
  }
  .form-group {
    margin-bottom: 18px;
    text-align: left;
  }
  .form-label {
    display: block;
    margin-bottom: 6px;
    color: #333;
    font-weight: 500;
  }
  .form-control {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    box-sizing: border-box;
    margin-bottom: 4px;
  }
  .btn {
    padding: 10px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }
  .btn-primary {
    background: var(--primary);
    color: white;
  }
  .btn-outlined {
    background: white;
    color: var(--primary);
    border: 1.5px solid var(--primary);
  }
`;

const ussdMenus = {
  main: {
    text: `Welcome to HealthGPT SA\n1. Book Clinic\n2. Med Reminders\n3. Health Tips\n4. Emergency\n0. Exit`,
    options: {
      '1': (session) => { session.currentMenu = 'clinics'; return ussdMenus.clinics.text; },
      '2': (session) => { session.currentMenu = 'medication_name'; return 'Enter med name:'; },
      '3': (session) => { session.currentMenu = 'health_tips'; return ussdMenus.health_tips.text; },
      '4': (session) => { session.currentMenu = 'emergency'; return ussdMenus.emergency.text; },
      '0': () => 'Thank you!\nGoodbye!'
    }
  },
  clinics: {
    text: `Select clinic:\n1. Soweto TB Clinic\n2. Joburg Central\n3. Maternity\n4. Katlong Clinic\n5. Back`,
    options: {
      '1': (session) => { session.appointment.clinic = 'Soweto TB Clinic'; session.currentMenu = 'appointment_date'; return 'Enter date (DDMMYYYY):'; },
      '2': (session) => { session.appointment.clinic = 'Joburg Central'; session.currentMenu = 'appointment_date'; return 'Enter date (DDMMYYYY):'; },
      '3': (session) => { session.appointment.clinic = 'Maternity'; session.currentMenu = 'appointment_date'; return 'Enter date (DDMMYYYY):'; },
      '4': (session) => { session.appointment.clinic = 'Katlong Clinic'; session.currentMenu = 'appointment_date'; return 'Enter date (DDMMYYYY):'; },
      '5': (session) => { session.currentMenu = 'main'; return ussdMenus.main.text; }
    }
  },
  appointment_date: {
    handler: (input, session) => {
      if (/^\d{8}$/.test(input)) {
        session.appointment.date = input;
        session.currentMenu = 'appointment_time';
        return 'Enter time (HHMM):';
      } else {
        return 'Invalid format!\nUse DDMMYYYY';
      }
    }
  },
  appointment_time: {
    handler: (input, session) => {
      if (/^\d{4}$/.test(input)) {
        session.appointment.time = input;
        session.currentMenu = 'appointment_confirm';
        return `Confirm:\n${session.appointment.clinic}\nDate: ${session.appointment.date}\nTime: ${session.appointment.time}\n1. Confirm\n2. Cancel`;
      } else {
        return 'Invalid format!\nUse HHMM';
      }
    }
  },
  appointment_confirm: {
    options: {
      '1': (session) => {
        const response = `Confirmed!\n${session.appointment.clinic}\n${session.appointment.date} ${session.appointment.time}`;
        resetSession(session);
        return response;
      },
      '2': (session) => {
        resetSession(session);
        return ussdMenus.main.text;
      }
    }
  },
  medication_name: {
    handler: (input, session) => {
      session.medication.name = input;
      session.currentMenu = 'medication_dosage';
      return 'Enter dosage:';
    }
  },
  medication_dosage: {
    handler: (input, session) => {
      session.medication.dosage = input;
      session.currentMenu = 'medication_time';
      return 'Enter time (HHMM):';
    }
  },
  medication_time: {
    handler: (input, session) => {
      if (/^\d{4}$/.test(input)) {
        session.medication.time = input;
        const response = `Reminder set:\n${session.medication.name}\n${session.medication.dosage} at ${session.medication.time}`;
        resetSession(session);
        return response;
      } else {
        return 'Invalid format!\nUse HHMM';
      }
    }
  },
  health_tips: {
    text: `Health Tips:\n1. TB Treatment\n2. HIV Care\n3. Maternal\n4. Back`,
    options: {
      '1': () => 'TB Treatment:\nTake meds daily\nfor 6 months',
      '2': () => 'HIV Care:\nTake ARVs daily\nRegular tests',
      '3': () => 'Maternal:\nPrenatal visits\nTake supplements',
      '4': (session) => { session.currentMenu = 'main'; return ussdMenus.main.text; }
    }
  },
  emergency: {
    text: 'Emergency:\nAmbulance:10177\nPolice:10111\nAIDS:0800012322'
  }
};

function resetSession(session) {
  session.currentMenu = 'main';
  session.inputBuffer = '';
  session.appointment = {};
  session.medication = {};
}

const initialSession = () => ({
  currentMenu: 'main',
  inputBuffer: '',
  appointment: {},
  medication: {}
});

const ussdStyles = `
.ussd-section { background: #f4f6fa; border-radius: 16px; padding: 32px; margin-bottom: 32px; }
.ussd-code { font-size: 1.5rem; font-weight: bold; color: #1976d2; background: #e3f2fd; padding: 8px 18px; border-radius: 8px; display: inline-block; margin: 12px 0; }
.phone-simulator {
  background: #222;
  border-radius: 36px;
  width: 320px;
  min-width: 220px;
  margin: 0;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  padding: 0 0 18px 0;
  position: relative;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.phone-top {
  width: 60px;
  height: 10px;
  background: #444;
  border-radius: 8px;
  margin: 18px auto 8px auto;
}
.screen-container {
  background: #111;
  border-radius: 18px;
  padding: 12px;
  min-height: 120px;
  margin: 0 18px 12px 18px;
  width: 260px;
  box-shadow: 0 2px 8px #0002;
  display: flex;
  align-items: center;
  justify-content: center;
}
.screen {
  color: #e3f2fd;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.1rem;
  min-height: 80px;
  width: 100%;
  text-align: left;
}
.keypad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin: 0 18px 8px 18px;
  width: 260px;
}
.key {
  background: #333;
  color: #e3f2fd;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  padding: 16px 0;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.key span {
  font-size: 0.7rem;
  color: #90caf9;
  margin-top: 2px;
}
.key:active { background: #1976d2; color: #fff; }
.key.call { background: #43a047; color: #fff; grid-column: 1 / span 2; }
.key.clear { background: #e53935; color: #fff; grid-column: 3 / span 1; }
.nokia-brand {
  color: #90caf9;
  text-align: center;
  font-size: 1rem;
  margin-bottom: 8px;
  letter-spacing: 2px;
  margin-top: 4px;
}
@media (max-width: 900px) {
  .phone-simulator, .screen-container, .keypad { width: 98vw !important; min-width: 0 !important; }
}
`;

const InteractiveDiv = ({ onClick, children, className = '', style = {} }) => (
  <div
    role="button"
    tabIndex={0}
    className={className}
    style={{ cursor: 'pointer', ...style }}
    onClick={onClick}
    onKeyDown={e => e.key === 'Enter' && onClick?.()}
  >
    {children}
  </div>
);

const USSD = ({ onExit }) => {
  const [session, setSession] = useState(initialSession());
  const [screenText, setScreenText] = useState(ussdMenus.main.text);

  const updateScreen = (newSession) => {
    const currentMenu = ussdMenus[newSession.currentMenu];
    if (newSession.inputBuffer) {
      setScreenText(currentMenu.text + '\n>' + newSession.inputBuffer);
    } else {
      setScreenText(currentMenu.text);
    }
  };

  const pressKey = (key) => {
    setSession(prev => {
      const newSession = { ...prev };
      if (newSession.currentMenu === 'main' && newSession.inputBuffer === '') {
        newSession.inputBuffer = key;
      } else {
        newSession.inputBuffer += key;
      }
      updateScreen(newSession);
      return newSession;
    });
  };

  const clearInput = () => {
    setSession(prev => {
      const newSession = initialSession();
      updateScreen(newSession);
      return newSession;
    });
  };

  const dialUssd = () => {
    setSession(prev => {
      const newSession = { ...prev };
      if (newSession.inputBuffer === '*384*12345#') {
        resetSession(newSession);
        setScreenText(ussdMenus.main.text);
        return newSession;
      } else {
        processInput(newSession);
        return newSession;
      }
    });
  };

  const processInput = (newSession) => {
    const input = newSession.inputBuffer;
    newSession.inputBuffer = '';
    let response = '';
    const currentMenu = ussdMenus[newSession.currentMenu];
    if (currentMenu.options && currentMenu.options[input]) {
      response = currentMenu.options[input](newSession);
    } else if (currentMenu.handler) {
      response = currentMenu.handler(input, newSession);
    } else {
      response = 'Invalid option!\nTry again';
    }
    setScreenText(response);
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', gap: 32, minWidth: 320, minHeight: 320, background: '#f4f6fa', borderRadius: 18, boxShadow: '0 4px 24px rgba(25,118,210,0.08)', padding: 32, maxWidth: 900, margin: '0 auto', position: 'relative'
    }}>
      <style>{ussdStyles}</style>
      <div style={{ flex: 1, minWidth: 260 }}>
        <h2 style={{ marginTop: 0 }}>Offline Mode (USSD)</h2>
        <p>Access healthcare services from any phone, no internet required.</p>
        <div className="ussd-code">*384*12345#</div>
        <div className="ussd-steps">
          <h3>How to use:</h3>
          <ol>
            <li>Dial <strong>*384*12345</strong> from your mobile phone</li>
            <li>Follow the menu instructions</li>
            <li>Access healthcare services for free</li>
          </ol>
        </div>
        <div className="features" style={{ display: 'flex', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
          <div className="feature-card" style={{ flex: 1, minWidth: 120 }}>
            <h3>Book Clinics</h3>
            <p>Schedule appointments at nearby healthcare facilities</p>
          </div>
          <div className="feature-card" style={{ flex: 1, minWidth: 120 }}>
            <h3>Medication Reminders</h3>
            <p>Get alerts for your medication schedule</p>
          </div>
          <div className="feature-card" style={{ flex: 1, minWidth: 120 }}>
            <h3>Health Tips</h3>
            <p>Receive daily health education messages</p>
          </div>
        </div>
        <button
          className="btn btn-outlined"
          style={{ marginTop: 32, fontSize: 16, padding: '10px 28px', borderRadius: 8 }}
          onClick={onExit}
        >
          Exit Offline Mode
        </button>
      </div>
      <div className="phone-simulator">
        <div className="phone-top"></div>
        <div className="screen-container">
          <div className="screen" style={{ whiteSpace: 'pre-line' }}>{screenText}</div>
        </div>
        <div className="keypad">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <InteractiveDiv
              key={n}
              className="key"
              onClick={() => pressKey(String(n))}
            >
              {n}
              <span>{['','ABC','DEF','GHI','JKL','MNO','PQRS','TUV','WXYZ'][n-1]}</span>
            </InteractiveDiv>
          ))}
          <InteractiveDiv className="key func" onClick={() => pressKey('')}><span></span></InteractiveDiv>
          <InteractiveDiv className="key" onClick={() => pressKey('0')}>
            0<span>+</span>
          </InteractiveDiv>
          <InteractiveDiv className="key func" onClick={() => pressKey('#')}>#<span></span></InteractiveDiv>
          <InteractiveDiv className="key call" onClick={dialUssd}>CALL</InteractiveDiv>
          <InteractiveDiv className="key clear" onClick={clearInput}>CLEAR</InteractiveDiv>
        </div>
        <div className="nokia-brand">NOKIA</div>
      </div>
    </div>
  );
};

const Home = ({ onPatientRegister }) => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userRole, setUserRole] = useState('patient');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showUSSD, setShowUSSD] = useState(false);
  const [doctorLoggedIn, setDoctorLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAuth(false);
    setUsername('');
    setPassword('');
    if (userRole === 'doctor') {
      setDoctorLoggedIn(true);
    } else {
      onPatientRegister();
    }
  };

  if (doctorLoggedIn) {
    return <DoctorDashboard />;
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <style>{styles}</style>
      <div className="home-bg" />
      <div className="login-outer">
        <div className="login-container">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h1 style={{ color: "var(--primary)", marginBottom: 8 }}>Healthcare ARM System</h1>
            <p className="text-muted">Secure, AI-powered healthcare management</p>
          </div>
          <div className="login-options">
            <InteractiveDiv
              className="login-option"
              onClick={() => { setUserRole('patient'); setAuthMode('register'); setShowAuth(true); }}
            >
              <span className="material-icons">person</span>
              <h3>Patient Portal</h3>
              <p>Book appointments, view medical records, and message your doctor</p>
            </InteractiveDiv>
            <InteractiveDiv
              className="login-option"
              onClick={() => { setUserRole('doctor'); setAuthMode('register'); setShowAuth(true); }}
            >
              <span className="material-icons">local_hospital</span>
              <h3>Doctor Portal</h3>
              <p>Manage appointments, view patient records, and conduct consultations</p>
            </InteractiveDiv>
            <InteractiveDiv
              className="login-option"
              onClick={() => { setUserRole('admin'); setAuthMode('register'); setShowAuth(true); }}
            >
              <span className="material-icons">admin_panel_settings</span>
              <h3>Admin Portal</h3>
              <p>Manage users, view analytics, and configure system settings</p>
            </InteractiveDiv>
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button
              className="btn btn-primary"
              style={{ fontSize: 18, padding: '12px 32px', marginTop: 8, borderRadius: 10, boxShadow: '0 2px 8px rgba(25,118,210,0.08)' }}
              onClick={() => setShowUSSD(true)}
            >
              <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: 8 }}>signal_cellular_alt</span>
              Offline Mode (USSD)
            </button>
          </div>
        </div>
      </div>
      {showAuth && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: 16, padding: 32, minWidth: 320, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
            <h2 style={{ marginBottom: 18 }}>{authMode === 'register' ? 'Register' : 'Login'} as {userRole.charAt(0).toUpperCase() + userRole.slice(1)}</h2>
            <div className="form-group">
              <label className="form-label" htmlFor="username">Username</label>
              <input className="form-control" id="username" name="username" type="text" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <input className="form-control" id="password" name="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 18 }}>
              <button type="button" className="btn btn-outlined" onClick={() => setShowAuth(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">{authMode === 'register' ? 'Register' : 'Login'}</button>
            </div>
          </form>
        </div>
      )}
      {showUSSD && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto'
        }}>
          <div style={{ background: 'white', borderRadius: 18, padding: 0, maxWidth: 900, width: '100%', boxShadow: '0 8px 32px rgba(0,0,0,0.18)', position: 'relative' }}>
            <button
              onClick={() => setShowUSSD(false)}
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 28, color: '#1976d2', cursor: 'pointer', zIndex: 10 }}
              aria-label="Close USSD"
            >
              ×
            </button>
            <div style={{ padding: 32, paddingTop: 48 }}>
              <USSD onExit={() => setShowUSSD(false)} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;