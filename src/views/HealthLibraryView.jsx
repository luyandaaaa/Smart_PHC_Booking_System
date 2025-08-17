import React, { useState, useEffect } from 'react';
import { MessageCircle, Camera, Heart, Users, Star, Loader, RefreshCw, ExternalLink } from 'lucide-react';


import Sidebar from '../components/Sidebar';

const HealthLibraryView = ({ setCurrentPage = () => {}, currentPage = 'healthLibrary' }) => {
  const [activeTab, setActiveTab] = useState('articles');
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch health articles from News API
  const fetchHealthArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=health+medicine+wellness&language=en&sortBy=publishedAt&pageSize=20&apiKey=e9de140844174739815fe913063dee93`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      
      const data = await response.json();
      const formattedArticles = data.articles?.map((article, index) => ({
        id: index + 1,
        title: article.title,
        author: article.author || 'Health News',
        category: getCategoryFromContent(article.title + ' ' + article.description),
        time: `${Math.floor(Math.random() * 20) + 5} min read`,
        rating: (4.0 + Math.random() * 1).toFixed(1),
        saved: false,
        trending: Math.random() > 0.7,
        description: article.description,
        url: article.url,
        publishedAt: article.publishedAt,
        urlToImage: article.urlToImage
      })) || [];
      
      setArticles(formattedArticles);
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Failed to load articles. Using demo data.');
      // Fallback to demo data
      setArticles([
        {
          id: 1,
          title: 'The Complete Guide to Heart-Healthy Nutrition',
          author: 'Dr. Emily Parker',
          category: 'Cardiology',
          time: '15 min read',
          rating: 4.8,
          saved: false,
          trending: true,
          description: 'Learn about the best foods for heart health and cardiovascular wellness.',
          url: '#'
        },
        {
          id: 2,
          title: 'Understanding and Managing Chronic Stress',
          author: 'Dr. Michael Chen',
          category: 'Mental Health',
          time: '12 min read',
          rating: 4.6,
          saved: false,
          description: 'Comprehensive guide to stress management techniques and mental wellness.',
          url: '#'
        },
        {
          id: 3,
          title: 'Exercise Routines for Different Age Groups',
          author: 'Sarah Johnson',
          category: 'Fitness',
          time: '18 min read',
          rating: 4.9,
          saved: false,
          trending: false,
          description: 'Discover age-appropriate fitness routines for optimal health at every stage of life.',
          url: '#'
        },
        {
          id: 4,
          title: 'Mental Health in the Digital Age',
          author: 'Dr. Lisa Wong',
          category: 'Mental Health',
          time: '10 min read',
          rating: 4.7,
          saved: false,
          trending: true,
          description: 'How technology affects our mental health and strategies for digital wellness.',
          url: '#'
        },
        {
          id: 5,
          title: 'Nutrition Myths Debunked by Science',
          author: 'Prof. James Miller',
          category: 'Nutrition',
          time: '14 min read',
          rating: 4.8,
          saved: false,
          trending: false,
          description: 'Evidence-based insights that challenge common nutrition misconceptions.',
          url: '#'
        },
        {
          id: 6,
          title: 'Sleep Quality and Immune System Health',
          author: 'Dr. Maria Rodriguez',
          category: 'General Health',
          time: '16 min read',
          rating: 4.6,
          saved: false,
          trending: false,
          description: 'The critical connection between quality sleep and your immune system.',
          url: '#'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch health videos from YouTube API
  const fetchHealthVideos = async () => {
    // Using static demo data for videos since no API will be used
    setVideos([
      {
        id: 1,
        title: 'Yoga for Beginners: Full Body Routine',
        author: 'Wellness Channel',
        category: 'Fitness',
        duration: '15:32',
        views: '125k',
        rating: 4.7,
        trending: true,
        url: 'https://youtu.be/iGZim9_ku-Q',
        thumbnail: null,
        description: 'A complete beginner-friendly yoga routine targeting all major muscle groups.'
      },
      {
        id: 2,
        title: 'Meal Prep for Healthy Eating',
        author: 'Nutrition Experts',
        category: 'Nutrition',
        duration: '22:15',
        views: '89k',
        rating: 4.8,
        url: 'https://youtu.be/7MmQbcaOcSY',
        thumbnail: null,
        description: 'Learn efficient meal preparation strategies for maintaining a healthy diet.'
      },
      {
        id: 3,
        title: 'Meditation Techniques for Stress Relief',
        author: 'Mindfulness Center',
        category: 'Mental Health',
        duration: '18:45',
        views: '76k',
        rating: 4.9,
        url: 'https://youtu.be/75PUjUsGsQQ',
        thumbnail: null,
        description: 'Effective meditation practices to reduce stress and improve mental clarity.'
      },
      {
        id: 4,
        title: 'Heart-Healthy Cardio Workouts',
        author: 'Fitness Pro',
        category: 'Cardiology',
        duration: '25:10',
        views: '156k',
        rating: 4.6,
        trending: true,
        url: 'https://youtu.be/example4',
        thumbnail: null,
        description: 'Low-impact cardiovascular exercises designed to strengthen your heart.'
      },
      {
        id: 5,
        title: 'Understanding Mental Health Warning Signs',
        author: 'Mental Health Alliance',
        category: 'Mental Health',
        duration: '12:30',
        views: '203k',
        rating: 4.8,
        trending: false,
        url: 'https://youtu.be/example5',
        thumbnail: null,
        description: 'Recognizing early signs of mental health issues and when to seek help.'
      },
      {
        id: 6,
        title: 'Healthy Sleep Habits for Better Rest',
        author: 'Sleep Foundation',
        category: 'General Health',
        duration: '16:45',
        views: '94k',
        rating: 4.7,
        trending: false,
        url: 'https://youtu.be/example6',
        thumbnail: null,
        description: 'Science-backed strategies for improving sleep quality and duration.'
      }
    ]);
  };

  // Helper function to categorize content
  const getCategoryFromContent = (text) => {
    const categories = {
      'heart|cardio|blood pressure': 'Cardiology',
      'mental|anxiety|depression|stress': 'Mental Health',
      'fitness|exercise|workout|yoga': 'Fitness',
      'nutrition|diet|food|meal': 'Nutrition',
      'diabetes|sugar|insulin': 'Endocrinology',
      'skin|dermat': 'Dermatology'
    };
    
    const lowerText = text.toLowerCase();
    for (const [keywords, category] of Object.entries(categories)) {
      if (new RegExp(keywords).test(lowerText)) {
        return category;
      }
    }
    return 'General Health';
  };

  useEffect(() => {
    if (activeTab === 'articles') {
      fetchHealthArticles();
    } else if (activeTab === 'videos') {
      fetchHealthVideos();
    }
  }, [activeTab]);

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

  const handleSaveArticle = (id) => {
    const article = articles.find(a => a.id === id);
    if (article.saved) {
      setSavedArticles(prev => prev.filter(a => a.id !== id));
      setArticles(prev => prev.map(a => 
        a.id === id ? { ...a, saved: false } : a
      ));
    } else {
      setSavedArticles(prev => [...prev, { ...article, saved: true }]);
      setArticles(prev => prev.map(a => 
        a.id === id ? { ...a, saved: true } : a
      ));
    }
  };

  const handleRefresh = () => {
    if (activeTab === 'articles') {
      fetchHealthArticles();
    } else if (activeTab === 'videos') {
      fetchHealthVideos();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#f9fafb' }}>
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
        {/* Header */}
        <div style={{
          background: '#e0f2fe', // light blue
          borderRadius: 32,
          padding: '2rem',
          marginBottom: '2rem',
          color: '#1e293b',
          position: 'relative',
          overflow: 'visible',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
          border: '1.5px solid #d1d5db' // subtle black/gray
        }}>
          {/* Removed the absolutely positioned white circle to make border radius visible */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>
                Health Library
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0, marginBottom: '1.5rem' }}>
                Real-time trusted medical information at your fingertips
              </p>
              
              {/* Removed Live Content Updates and 4.9 Average Rating */}
            </div>
            <button
              onClick={handleRefresh}
              disabled={loading}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                borderRadius: '50%',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {loading ? <Loader size={20} className="animate-spin" /> : <RefreshCw size={20} />}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fef3cd',
            border: '1px solid #fbbf24',
            color: '#92400e',
            padding: '1rem',
            borderRadius: 12,
            marginBottom: '2rem'
          }}>
            {error}
          </div>
        )}

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
                  background: activeTab === tab.id ? '#bae6fd' : 'transparent',
                  color: activeTab === tab.id ? '#111827' : '#64748b',
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
                {loading && activeTab === tab.id && <Loader size={14} className="animate-spin" />}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 200,
            color: '#6b7280'
          }}>
            <Loader size={24} className="animate-spin" style={{ marginRight: '0.5rem' }} />
            Loading {activeTab}...
          </div>
        )}

        {/* Content Area */}
        {!loading && activeTab === 'articles' && (
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 2 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
                Latest Health Articles
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
                    border: article.trending ? '2px solid #fbbf24' : 'none',
                    position: 'relative'
                  }}>
                    {article.urlToImage && (
                      <div style={{
                        width: '100%',
                        height: 120,
                        backgroundImage: `url(${article.urlToImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 12,
                        marginBottom: '1rem'
                      }} />
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <div style={{
                        background: '#bae6fd',
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
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                      By {article.author} • {article.time}
                    </p>
                    {article.description && (
                      <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem', lineHeight: 1.5 }}>
                        {article.description.length > 100 ? article.description.substring(0, 100) + '...' : article.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Star size={16} style={{ color: '#fbbf24' }} />
                          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{article.rating}</span>
                        </div>
                        {article.url !== '#' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(article.url, '_blank', 'noopener,noreferrer');
                            }}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#667eea',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              fontSize: '0.875rem'
                            }}
                          >
                            <ExternalLink size={14} />
                            Read Full
                          </button>
                        )}
                      </div>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleSaveArticle(article.id);
                      }} style={{
                        background: article.saved ? '#10b981' : 'transparent',
                        color: article.saved ? 'white' : '#6b7280',
                        border: '1px solid ' + (article.saved ? '#10b981' : '#d1d5db'),
                        borderRadius: 8,
                        padding: '8px 16px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.875rem'
                      }}>
                        {article.saved ? 'Saved' : 'Save'}
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
                {savedArticles.length === 0 && (
                  <div style={{ color: '#6b7280', fontSize: '0.95rem' }}>No saved articles yet.</div>
                )}
                {savedArticles.map(article => (
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
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {article.url !== '#' && (
                        <button
                          onClick={() => window.open(article.url, '_blank', 'noopener,noreferrer')}
                          style={{
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: 8,
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            flex: 1
                          }}
                        >
                          Read
                        </button>
                      )}
                      <button onClick={() => handleSaveArticle(article.id)} style={{
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: 8,
                        padding: '6px 12px',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: '0.85rem'
                      }}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!loading && activeTab === 'videos' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
              Latest Educational Videos
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
                    background: video.thumbnail ? `url(${video.thumbnail})` : '#e5e7eb',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: 180,
                    borderRadius: 12,
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    color: video.thumbnail ? 'rgba(255,255,255,0.9)' : '#6b7280',
                    position: 'relative'
                  }}>
                    {!video.thumbnail && '▶️'}
                    {video.thumbnail && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: 12,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        ▶️
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{
                      background: '#bae6fd',
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
                  {video.description && (
                    <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem', lineHeight: 1.5 }}>
                      {video.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Star size={16} style={{ color: '#fbbf24' }} />
                    <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{video.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && activeTab === 'conditions' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>
              Health Conditions Reference
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
                      background: '#bae6fd',
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
                      background: '#bae6fd',
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