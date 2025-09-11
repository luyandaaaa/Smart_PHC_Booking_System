import React, { useState } from 'react';
import { 
  Menu, 
  Mail, 
  Eye, 
  EyeOff, 
  Plus, 
  Minus, 
  Smartphone, 
  Send, 
  CreditCard, 
  Banknote, 
  Home, 
  TrendingUp, 
  QrCode, 
  Gift, 
  Wallet,
  ArrowUpRight,
  Zap,
  Heart
} from 'lucide-react';
import './LandingPage.css';
import HomePage from './Home';

const ServiceCard = ({ title, logo, onClick }) => (
  <div className="service-card" onClick={onClick}>
    <div className="service-logo">{logo}</div>
    <span className="service-title">{title}</span>
  </div>
);

const QuickAction = ({ icon, label, onClick }) => (
  <div className="quick-action" onClick={onClick}>
    <div className="quick-action-circle">{icon}</div>
    <span className="quick-action-label">{label}</span>
  </div>
);

const BottomNavItem = ({ icon, label, isActive, isCenter, onClick }) => (
  <div 
    className={`bottom-nav-item${isCenter ? ' center' : ''}`} 
    onClick={onClick}
  >
    <div className={`bottom-nav-icon-container${isCenter ? ' center' : ''}`}>
      <span className={`bottom-nav-icon${isCenter ? ' center' : ''} ${isActive ? 'active' : 'inactive'}`}>{icon}</span>
    </div>
    <span className={`bottom-nav-label${isCenter ? ' center' : ''} ${isActive ? 'active' : 'inactive'}`}>{label}</span>
  </div>
);

const LandingPage = ({ onPatientRegister }) => {
  const [showBalance, setShowBalance] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showHome, setShowHome] = useState(false);

  const handleServiceClick = (serviceName) => {
    if (serviceName === 'MoMo Health') {
      setShowHome(true);
    } else {
      alert(`${serviceName} service clicked!`);
    }
  };

  const handleQuickActionClick = (actionName) => {
    alert(`${actionName} action clicked!`);
  };

  const handleNavClick = (navItem) => {
    setActiveTab(navItem);
    alert(`${navItem} navigation clicked!`);
  };

  const handleTransactionHistory = () => {
    alert('Transaction history clicked!');
  };

  const handleCashIn = () => {
    alert('Cash-in clicked!');
  };

  const handleCashOut = () => {
    alert('Cash-out clicked!');
  };

  if (showHome) {
    return <HomePage onPatientRegister={onPatientRegister} />;
  }

  return (
    <div className="landing-outer-border">
      <div className="mobile-banking-app">
        {/* Header */}
        <div className="app-header">
          <Menu className="header-icon" />
          <h1 className="header-greeting">y'ello, Luyanda</h1>
          <Mail className="header-icon" />
        </div>

        {/* Balance Section */}
        <div className="balance-section">
          <div className="balance-display">
            <div className="balance-amount-container">
              <span className="balance-amount">
                R {showBalance ? '2,450.75' : '***'}
              </span>
              <button className="balance-toggle" onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? (
                  <EyeOff className="balance-toggle-icon" />
                ) : (
                  <Eye className="balance-toggle-icon" />
                )}
              </button>
            </div>
            <button 
              className="transaction-history-btn"
              onClick={handleTransactionHistory}
            >
              VIEW TRANSACTION HISTORY
            </button>
          </div>
          {/* Cash In/Out Buttons */}
          <div className="cash-buttons">
            <button className="cash-button" onClick={handleCashIn}>
              <Plus className="cash-button-icon" />
              <span>CASH-IN</span>
            </button>
            <button className="cash-button" onClick={handleCashOut}>
              <Minus className="cash-button-icon" />
              <span>CASH-OUT</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <QuickAction 
            icon={<Send className="quick-action-icon" />} 
            label="SEND" 
            onClick={() => handleQuickActionClick('Send Money')} 
          />
          <QuickAction 
            icon={<Smartphone className="quick-action-icon" />} 
            label="RECHARGE" 
            onClick={() => handleQuickActionClick('Recharge')} 
          />
          <QuickAction 
            icon={<CreditCard className="quick-action-icon" />} 
            label="PAY & BUY" 
            onClick={() => handleQuickActionClick('Pay & Buy')} 
          />
          <QuickAction 
            icon={<Banknote className="quick-action-icon" />} 
            label="LOANS" 
            onClick={() => handleQuickActionClick('Loans')} 
          />
        </div>

        {/* Services Section */}
        <div className="services-section">
          <h2 className="services-title">Services picked for you</h2>
          <div className="services-grid">
            {/* Row 1 */}
            <ServiceCard
              title="Send money ACROSS AFRICA"
              logo={
                <div className="logo-send-money">
                  <ArrowUpRight className="logo-send-money-icon" />
                </div>
              }
              onClick={() => handleServiceClick('Send Money Across Africa')}
            />
            <ServiceCard
              title="1Voucher"
              logo={
                <div className="logo-voucher">1</div>
              }
              onClick={() => handleServiceClick('1Voucher')}
            />
            <ServiceCard
              title="HOLLYWOOD BETS"
              logo={
                <div className="logo-hollywood">★</div>
              }
              onClick={() => handleServiceClick('Hollywood Bets')}
            />
            {/* Row 2 */}
            <ServiceCard
              title="MTN"
              logo={
                <div className="logo-mtn">
                  <span className="logo-mtn-text">MTN</span>
                </div>
              }
              onClick={() => handleServiceClick('MTN')}
            />
            <ServiceCard
              title="Eskom"
              logo={
                <div className="logo-eskom">
                  <Zap className="logo-eskom-icon" />
                </div>
              }
              onClick={() => handleServiceClick('Eskom')}
            />
            <ServiceCard
              title="MoMo Health"
              logo={
                <div className="logo-momo-health">
                  <Heart className="logo-momo-health-icon" />
                </div>
              }
              onClick={() => handleServiceClick('MoMo Health')}
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bottom-navigation">
          <div className="bottom-nav-container">
            <BottomNavItem
              icon={<Home />}
              label="Home"
              isActive={activeTab === 'home'}
              onClick={() => handleNavClick('home')}
            />
            <BottomNavItem
              icon={<TrendingUp />}
              label="Make money"
              isActive={activeTab === 'money'}
              onClick={() => handleNavClick('money')}
            />
            <BottomNavItem
              icon={<QrCode />}
              label="MoMo pay"
              isCenter={true}
              onClick={() => handleNavClick('momoPay')}
            />
            <BottomNavItem
              icon={<Gift />}
              label="Rewards"
              isActive={activeTab === 'rewards'}
              onClick={() => handleNavClick('rewards')}
            />
            <BottomNavItem
              icon={<Wallet />}
              label="Wallet"
              isActive={activeTab === 'wallet'}
              onClick={() => handleNavClick('wallet')}
            />
          </div>
          <div className="home-indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;