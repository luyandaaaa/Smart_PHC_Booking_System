import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { MessageCircle, Camera, Heart, Users, Star } from 'lucide-react';

const HealthLibraryView = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('articles');
  const [selectedLang, setSelectedLang] = useState('en');
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'The Complete Guide to Heart-Healthy Nutrition',
      author: 'Dr. Emily Parker',
      category: 'Cardiology',
      time: '15 min read',
      rating: 4.8,
      saved: false,
      trending: true
    },
    {
      id: 2,
      title: 'Understanding and Managing Chronic Stress',
      author: 'Dr. Michael Chen',
      category: 'Mental Health',
      time: '12 min read',
      rating: 4.6,
      saved: true
    },
    {
      id: 3,
      title: 'Exercise Routines for Different Age Groups',
      author: 'Sarah Johnson',
      category: 'Fitness',
      time: '20 min read',
      rating: 4.9,
      saved: false
    }
  ]);

  const [videos] = useState([
    {
      id: 1,
      title: 'Yoga for Beginners: Full Body Routine',
      author: 'Wellness Channel',
      category: 'Fitness',
      duration: '15:32',
      views: '125k',
      rating: 4.7,
      trending: true,
      url: 'https://youtu.be/iGZim9_ku-Q?si=6DfFPxjsWMXu_lrc'
    },
    {
      id: 2,
      title: 'Meal Prep for Healthy Eating',
      author: 'Nutrition Experts',
      category: 'Nutrition',
      duration: '22:15',
      views: '89k',
      rating: 4.8,
      url: 'https://youtu.be/7MmQbcaOcSY?si=TCrg3hLihABCd68b'
    },
    {
      id: 3,
      title: 'Meditation Techniques for Stress Relief',
      author: 'Mindfulness Center',
      category: 'Mental Health',
      duration: '18:45',
      views: '76k',
      rating: 4.9,
      url: 'https://youtu.be/75PUjUsGsQQ?si=weyta4wcZqmReDgF'
    }
  ]);

  const [conditions] = useState([
    {
      id: 1,
      name: 'Type 2 Diabetes',
      category: 'Endocrinology',
      overview: 'A chronic condition that affects the way your body metabolizes sugar.',
      severity: 'High',
      trending: true,
      url: 'https://www.who.int/en/news-room/fact-sheets/detail/diabetes'
    },
    {
      id: 2,
      name: 'Hypertension',
      category: 'Cardiology',
      overview: 'A condition in which the force of the blood against the artery walls is too high.',
      severity: 'High',
      url: 'https://www.who.int/news-room/fact-sheets/detail/hypertension'
    },
    {
      id: 3,
      name: 'Anxiety Disorders',
      category: 'Mental Health',
      overview: 'Characterized by excessive fear or anxiety that affects daily functioning.',
      severity: 'Medium',
      url: 'https://www.who.int/news-room/fact-sheets/detail/anxiety-disorders'
    }
  ]);

  const tabs = [
    { id: 'articles', label: 'Articles', icon: MessageCircle },
    { id: 'videos', label: 'Videos', icon: Camera },
    { id: 'conditions', label: 'Conditions', icon: Heart }
  ];

  const [showSaved, setShowSaved] = useState(false);

  const handleSaveArticle = (id) => {
    setArticles(articles => articles.map(article =>
      article.id === id ? { ...article, saved: !article.saved } : article
    ));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#f9fafb' }}>
      <Sidebar currentPage="library" setCurrentPage={setCurrentPage} />
      <div style={{ flex: 1, padding: '2rem 2.5vw', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 24,
          padding: '2rem',
          marginBottom: '2rem',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>
            Health Library
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0, marginBottom: '1.5rem' }}>
            Trusted medical information at your fingertips
          </p>
          
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Users size={20} />
              <span>Doctor-Reviewed Content</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Star size={20} />
              <span>4.9 Average Rating</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: '0.5rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          display: 'flex',
          gap: '0.5rem'
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  background: activeTab === tab.id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#64748b',
                  border: 'none',
                  borderRadius: 12,
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontWeight: activeTab === tab.id ? 600 : 500
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        {activeTab === 'articles' && (
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 2 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
                Health Articles
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                {articles.filter(article => !article.saved).map(article => (
                  <div key={article.id} style={{
                    background: 'white',
                    borderRadius: 16,
                    padding: '1.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    border: article.trending ? '2px solid #fbbf24' : 'none'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: 20,
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {article.category}
                      </div>
                      {article.trending && <div style={{
                        background: '#fbbf24',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: 20,
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        TRENDING
                      </div>}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827' }}>
                      {article.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                      By {article.author} • {article.time}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Star size={16} style={{ color: '#fbbf24' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{article.rating}</span>
                      </div>
                      <button onClick={() => handleSaveArticle(article.id)} style={{
                        background: article.saved ? '#10b981' : 'transparent',
                        color: article.saved ? 'white' : '#6b7280',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.875rem'
                      }}>
                        {article.saved ? 'Saved' : 'Save for Later'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Saved Articles Sidebar */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', color: '#111827' }}>Saved Articles</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {articles.filter(article => article.saved).length === 0 && (
                  <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>No saved articles yet.</div>
                )}
                {articles.filter(article => article.saved).map(article => (
                  <div key={article.id} style={{
                    background: '#f3f4f6',
                    borderRadius: 12,
                    padding: '1rem',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    border: '1px solid #e5e7eb',
                    fontSize: '0.97rem',
                    fontFamily: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    <div style={{ fontWeight: 600 }}>{article.title}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>By {article.author}</div>
                    <button onClick={() => handleSaveArticle(article.id)} style={{
                      background: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: 8,
                      padding: '6px 12px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      alignSelf: 'flex-end'
                    }}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
              Educational Videos
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {videos.map(video => (
                <div key={video.id} 
                  style={{
                    background: 'white',
                    borderRadius: 16,
                    padding: '1.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                    border: video.trending ? '2px solid #fbbf24' : 'none'
                  }}
                  onClick={() => window.open(video.url, '_blank', 'noopener,noreferrer')}
                >
                  <div style={{
                    background: '#e5e7eb',
                    height: 180,
                    borderRadius: 12,
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}>
                    ▶️
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: 20,
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {video.category}
                    </div>
                    {video.trending && <div style={{
                      background: '#fbbf24',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: 20,
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      TRENDING
                    </div>}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827' }}>
                    {video.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                    By {video.author} • {video.duration} • {video.views} views
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={16} style={{ color: '#fbbf24' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{video.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'conditions' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
              Health Conditions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {conditions.map(condition => (
                <div key={condition.id} style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  border: condition.trending ? '2px solid #fbbf24' : 'none'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: 20,
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {condition.category}
                    </div>
                    <div style={{
                      background: condition.severity === 'High' ? '#ef4444' : condition.severity === 'Medium' ? '#fbbf24' : '#10b981',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: 20,
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {condition.severity} SEVERITY
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#111827' }}>
                    {condition.name}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#6b7280', marginBottom: '1.5rem' }}>
                    {condition.overview}
                  </p>
                  <button 
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 12,
                      padding: '12px',
                      cursor: 'pointer',
                      width: '100%',
                      fontWeight: 600
                    }}
                    onClick={() => window.open(condition.url, '_blank', 'noopener,noreferrer')}
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthLibraryView;