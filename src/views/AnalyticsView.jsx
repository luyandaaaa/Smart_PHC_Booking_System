import React from 'react';
import Sidebar from '../components/Sidebar';

const AnalyticsView = ({ setCurrentPage, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#fff' }}>
      <Sidebar currentPage="analytics" setCurrentPage={setCurrentPage} />
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
        <button
          onClick={() => setCurrentPage && setCurrentPage('dashboard')}
          style={{
            alignSelf: 'flex-start',
            marginBottom: '1rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            padding: '8px 16px',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: 15,
            transition: 'background 0.2s',
          }}
        >
          {'\u2190 Back to Dashboard'}
        </button>
        {/* ...existing code for AnalyticsView content... */}
      </div>
    </div>
  );
};

export default AnalyticsView;