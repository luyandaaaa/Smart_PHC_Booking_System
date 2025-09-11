import React, { useState } from 'react';
import { Users, MessageCircle, Heart, Share2, Calendar, MapPin, Star, Search, Filter, Plus, TrendingUp, Award, Camera, Wallet, Coins, Users2, Gift, BarChart3 } from 'lucide-react';
import Sidebar from '../components/Sidebar';

// CommunityView Component
const CommunityView = ({ setCurrentPage, currentPage = 'community' }) => {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedLang, setSelectedLang] = useState('en');
  const [showCreateStokvel, setShowCreateStokvel] = useState(false);
  const [newStokvel, setNewStokvel] = useState({ name: '', goal: '', contribution: '' });
  const [joinedStokvel, setJoinedStokvel] = useState(null);
  const [stokvelMembers, setStokvelMembers] = useState([]);
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah Johnson',
      avatar: '👩‍⚕️',
      time: '2 hours ago',
      content: 'Just completed my first 5K run after 6 months of training! The community support here has been incredible. Thank you all for the motivation! 🏃‍♀️',
      likes: 24,
      comments: 8,
      category: 'Fitness',
      trending: true,
      images: ['🏃‍♀️']
    },
    {
      id: 2,
      author: 'Dr. Michael Chen',
      avatar: '👨‍⚕️',
      time: '4 hours ago',
      content: 'Reminder: Mental health is just as important as physical health. Don\'t hesitate to reach out for support when you need it. Our community is here for you! 💙',
      likes: 45,
      comments: 12,
      category: 'Mental Health',
      verified: true
    },
    {
      id: 3,
      author: 'Fitness Group',
      avatar: '💪',
      time: '6 hours ago',
      content: 'Weekly challenge: Try to get 10,000 steps every day this week! Who\'s in? Let\'s support each other and share our progress. #StepsChallenge',
      likes: 67,
      comments: 23,
      category: 'Challenge',
      challengeParticipants: 156
    }
  ]);

  const [events] = useState([
    {
      id: 1,
      title: 'Morning Yoga Session',
      date: 'June 24, 2025',
      time: '7:00 AM',
      location: 'Central Park',
      attendees: 24,
      category: 'Fitness'
    },
    {
      id: 2,
      title: 'Nutrition Workshop',
      date: 'June 26, 2025',
      time: '2:00 PM',
      location: 'Community Center',
      attendees: 45,
      category: 'Nutrition'
    },
    {
      id: 3,
      title: 'Mental Health Support Group',
      date: 'June 28, 2025',
      time: '6:00 PM',
      location: 'Online',
      attendees: 32,
      category: 'Mental Health'
    }
  ]);

  const [groups] = useState([
    { id: 1, name: 'Running Enthusiasts', members: 1240, category: 'Fitness', active: true },
    { id: 2, name: 'Healthy Cooking', members: 890, category: 'Nutrition', active: true },
    { id: 3, name: 'Mindfulness & Meditation', members: 760, category: 'Mental Health', active: false },
    { id: 4, name: 'Weight Loss Journey', members: 1150, category: 'Fitness', active: true }
  ]);

  const [stokvels] = useState([
    { 
      id: 1, 
      name: 'Diabetes Support Fund', 
      members: 12, 
      totalFunds: 24000, 
      target: 50000, 
      category: 'Chronic Condition',
      nextPayout: 'June 30, 2025'
    },
    { 
      id: 2, 
      name: 'Maternal Health Group', 
      members: 8, 
      totalFunds: 18000, 
      target: 30000, 
      category: 'Women\'s Health',
      nextPayout: 'July 15, 2025'
    },
    { 
      id: 3, 
      name: 'Emergency Medical Fund', 
      members: 15, 
      totalFunds: 45000, 
      target: 75000, 
      category: 'Emergency',
      nextPayout: 'Ongoing'
    }
  ]);

  const [communityChallenges] = useState([
    {
      id: 1,
      title: '10K Steps Daily',
      participants: 345,
      progress: 68,
      duration: '7 days',
      reward: 'Fitness Badge'
    },
    {
      id: 2,
      title: '5 Fruit & Veggies Daily',
      participants: 289,
      progress: 52,
      duration: '30 days',
      reward: 'Nutrition Badge'
    },
    {
      id: 3,
      title: '7 Hours Sleep Challenge',
      participants: 412,
      progress: 75,
      duration: '21 days',
      reward: 'Wellness Badge'
    }
  ]);

  const [joinMessage, setJoinMessage] = useState('');
  const [groupMessage, setGroupMessage] = useState('');
  const [stokvelMessage, setStokvelMessage] = useState('');

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleNewPost = () => {
    if (newPostContent.trim()) {
      const newPost = {
        id: posts.length + 1,
        author: 'You',
        avatar: '😊',
        time: 'Just now',
        content: newPostContent,
        likes: 0,
        comments: 0,
        category: 'General'
      };
      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setShowNewPost(false);
    }
  };

  const handleJoinEvent = (eventTitle) => {
    setJoinMessage(`You have successfully joined the event: ${eventTitle}`);
    setTimeout(() => setJoinMessage(''), 2500);
  };

  const handleGroupAction = (group, isActive) => {
    if (isActive) {
      setGroupMessage(`You are viewing the group: ${group.name}`);
    } else {
      setGroupMessage(`You have successfully joined the group: ${group.name}`);
    }
    setTimeout(() => setGroupMessage(''), 2500);
  };

  const handleStokvelJoin = (stokvel) => {
    setStokvelMessage(`You have joined the health stokvel: ${stokvel.name}`);
    setJoinedStokvel(stokvel);
    // Simulate fetching members
    setStokvelMembers([
      { name: 'Sarah Johnson', avatar: '👩‍⚕️' },
      { name: 'Dr. Michael Chen', avatar: '👨‍⚕️' },
      { name: 'Fitness Group', avatar: '💪' },
      { name: 'You', avatar: '😊' },
      // ...add more as needed
    ]);
    setTimeout(() => setStokvelMessage(''), 2500);
  };

  const handleCreateStokvel = () => {
    if (newStokvel.name && newStokvel.goal && newStokvel.contribution) {
      setStokvelMessage(`Health Stokvel "${newStokvel.name}" created successfully!`);
      setNewStokvel({ name: '', goal: '', contribution: '' });
      setShowCreateStokvel(false);
      setTimeout(() => setStokvelMessage(''), 2500);
    }
  };

  const tabs = [
    { id: 'feed', label: 'Community Feed', icon: MessageCircle },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'stokvels', label: 'Health Stokvels', icon: Wallet },
    { id: 'challenges', label: 'Challenges', icon: Award }
  ];

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          border: '1.5px solid #d1d5db', // subtle black/gray
          fontFamily: 'inherit'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem', color: '#1e293b', fontFamily: 'inherit' }}>
                Community Hub
              </h1>
              <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0, marginBottom: '1.5rem', color: '#1e293b', fontFamily: 'inherit' }}>
                Connect, share, and grow together on your health journey
              </p>
            </div>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '1rem', fontFamily: 'inherit', marginTop: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Users size={20} />
                <span style={{ fontWeight: 600 }}>2,450 Active Members</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} />
                <span style={{ fontWeight: 600 }}>89% Engagement Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          background: '#f3f4f6',
          borderRadius: 16,
          padding: '0.5rem',
          marginBottom: 32,
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          gap: '0.5rem',
          fontFamily: 'inherit',
          overflowX: 'auto'
        }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: '0 0 auto',
                  background: activeTab === tab.id ? '#e0f2fe' : 'transparent', // light blue
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
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  fontFamily: 'inherit',
                  fontSize: '0.95rem',
                  letterSpacing: '-0.5px',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        {activeTab === 'feed' && (
          <div style={{ display: 'flex', gap: '2rem', fontFamily: 'inherit' }}>
            {/* Main Feed */}
            <div style={{ flex: 2 }}>
              {/* Search and New Post */}
              <div style={{
                background: '#f3f4f6',
                borderRadius: 16,
                padding: '1.5rem',
                marginBottom: '1.5rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                border: '1px solid #e5e7eb',
                fontFamily: 'inherit'
              }}>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1rem',
                  alignItems: 'center'
                }}>
                  <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
                    <Search size={20} style={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af'
                    }} />
                    <input
                      type="text"
                      placeholder="Search posts, people, topics..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 16px 12px 44px',
                        border: '2px solid #e5e7eb',
                        borderRadius: 12,
                        fontSize: '0.95rem',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        minWidth: 180,
                        boxSizing: 'border-box',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <button
                      onClick={() => setShowNewPost(!showNewPost)}
                      style={{
                        background: '#e0f2fe', // light blue
                        color: '#111827',
                        border: 'none',
                        borderRadius: 12,
                        padding: '12px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                        fontFamily: 'inherit'
                      }}
                    >
                      <Plus size={18} />
                      New Post
                    </button>
                  </div>
                </div>

                {showNewPost && (
                  <div
                    style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      background: '#fff',
                      borderRadius: 12,
                      fontFamily: 'inherit',
                      position: 'relative',
                      zIndex: 10,
                      boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
                      border: '1.5px solid #d1d5db',
                      minWidth: 280,
                      maxWidth: 600,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    <textarea
                      placeholder="Share your health journey, tips, or ask questions..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: 120,
                        padding: '1rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: 12,
                        fontSize: '0.95rem',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        background: '#f9fafb',
                        boxSizing: 'border-box',
                        marginBottom: '0.5rem',
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                      <button
                        onClick={() => setShowNewPost(false)}
                        style={{
                          background: '#e5e7eb',
                          color: '#374151',
                          border: 'none',
                          borderRadius: 8,
                          padding: '8px 16px',
                          cursor: 'pointer',
                          fontFamily: 'inherit'
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleNewPost}
                        style={{
                          background: '#667eea',
                          color: 'white',
                          border: 'none',
                          borderRadius: 8,
                          padding: '8px 20px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontFamily: 'inherit'
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Posts */}
              {filteredPosts.map(post => (
                <div key={post.id} style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  border: '1px solid ',
                  borderLeft: post.trending ? '6px solid #fbbf24' : 'none',
                  fontFamily: 'inherit'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      marginRight: '1rem',
                      fontFamily: 'inherit'
                    }}>
                      {post.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontWeight: 600, fontSize: '1rem' }}>{post.author}</span>
                        {post.verified && <span style={{ color: '#3b82f6', fontSize: '1.2rem' }}>✓</span>}
                        {post.trending && <span style={{
                          background: '#fbbf24',
                          color: 'white',
                          fontSize: '0.75rem',
                          padding: '2px 8px',
                          borderRadius: 12,
                          fontWeight: 600
                        }}>TRENDING</span>}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {post.time} • {post.category}
                      </div>
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '1rem', lineHeight: 1.6, marginBottom: '1rem', color: '#374151', fontFamily: 'inherit' }}>
                    {post.content}
                  </p>

                  {post.images && (
                    <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>
                      {post.images.join(' ')}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                    <button
                      onClick={() => handleLike(post.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#6b7280',
                        fontSize: '0.875rem',
                        transition: 'color 0.2s',
                        fontFamily: 'inherit'
                      }}
                    >
                      <Heart size={18} />
                      {post.likes}
                    </button>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit'
                    }}>
                      <MessageCircle size={18} />
                      {post.comments}
                    </button>
                    <button style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#6b7280',
                      fontSize: '0.875rem',
                      fontFamily: 'inherit'
                    }}>
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div style={{ flex: 1 }}>
              {/* Trending Topics */}
              <div style={{
                background: '#f3f4f6',
                borderRadius: 16,
                padding: '1.5rem',
                marginBottom: '1.5rem',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                border: '1px solid #e5e7eb',
                fontFamily: 'inherit'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#111827', fontFamily: 'inherit' }}>
                  🔥 Trending Topics
                </h3>
                {['#FitnessMotivation', '#HealthyEating', '#MentalHealthAwareness', '#WellnessJourney'].map(tag => (
                  <div key={tag} style={{
                    padding: '0.75rem',
                    borderRadius: 8,
                    marginBottom: '0.5rem',
                    background: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit'
                  }}>
                    <div style={{ fontWeight: 600, color: '#3b82f6', fontSize: '0.95rem' }}>{tag}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>
                      {Math.floor(Math.random() * 500) + 100} posts
                    </div>
                  </div>
                ))}
              </div>

              {/* Community Stats */}
              <div style={{
                background: '#d1fae5', // light green
                borderRadius: 16,
                padding: '1.5rem',
                color: '#065f46',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                fontFamily: 'inherit'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'inherit' }}>
                  Community Impact
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>2,450+</div>
                    <div style={{ opacity: 0.9 }}>Active Members</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>15k+</div>
                    <div style={{ opacity: 0.9 }}>Health Goals Achieved</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>98%</div>
                    <div style={{ opacity: 0.9 }}>Satisfaction Rate</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                background: '#fef3c7', // light amber
                borderRadius: 16,
                padding: '1.5rem',
                marginBottom: '1.5rem',
                color: '#92400e',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                fontFamily: 'inherit'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', fontFamily: 'inherit' }}>
                  Quick Actions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button 
                    onClick={() => setActiveTab('stokvels')}
                    style={{
                      background: 'rgba(255,255,255,0.7)',
                      color: '#92400e',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 600,
                      fontFamily: 'inherit'
                    }}
                  >
                    <Wallet size={18} />
                    Create Health Stokvel
                  </button>
                  <button 
                    onClick={() => setActiveTab('challenges')}
                    style={{
                      background: 'rgba(255,255,255,0.7)',
                      color: '#92400e',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 600,
                      fontFamily: 'inherit'
                    }}
                  >
                    <Award size={18} />
                    Join a Challenge
                  </button>
                  <button 
                    onClick={() => setActiveTab('events')}
                    style={{
                      background: 'rgba(255,255,255,0.7)',
                      color: '#92400e',
                      border: 'none',
                      borderRadius: 8,
                      padding: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 600,
                      fontFamily: 'inherit'
                    }}
                  >
                    <Calendar size={18} />
                    Browse Events
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <>
            {joinMessage && (
              <div style={{
                position: 'fixed',
                top: 32,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 2px 12px 0 rgba(16,185,129,0.12)',
                zIndex: 1000,
                transition: 'opacity 0.3s',
                opacity: joinMessage ? 1 : 0
              }}>
                {joinMessage}
              </div>
            )}
            <div style={{
              background: '#f3f4f6',
              borderRadius: 16,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              border: '1px solid #e5e7eb',
              padding: 24,
              display: 'flex',
              flexDirection: 'row',
              gap: '1.5rem',
              overflowX: 'auto',
              fontFamily: 'inherit',
              fontSize: '0.97rem',
              minHeight: 260,
              alignItems: 'flex-start',
              maxWidth: '100%',
              flexWrap: 'nowrap',
            }}>
              {events.map(event => (
                <div key={event.id} style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '1.5rem',
                  minWidth: 320,
                  maxWidth: 340,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '0.97rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: '0 0 320px',
                  marginRight: '1rem',
                  boxSizing: 'border-box',
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    padding: '0.4rem 0.9rem',
                    borderRadius: 20,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    marginBottom: '0.8rem'
                  }}>
                    {event.category}
                  </div>
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 700, marginBottom: '0.7rem', color: '#111827', fontFamily: 'inherit' }}>
                    {event.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem', color: '#6b7280', fontSize: '0.93rem' }}>
                    <Calendar size={15} />
                    <span>{event.date} at {event.time}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.8rem', color: '#6b7280', fontSize: '0.93rem' }}>
                    <MapPin size={15} />
                    <span>{event.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6b7280', fontSize: '0.93rem' }}>
                      <Users size={15} />
                      <span>{event.attendees} attending</span>
                    </div>
                    <button onClick={() => handleJoinEvent(event.title)} style={{
                      background: '#059669', // solid green
                      color: 'white',
                      border: 'none',
                      borderRadius: 12,
                      padding: '7px 14px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.93rem',
                      fontFamily: 'inherit'
                    }}>
                      Join Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'groups' && (
          <>
            {groupMessage && (
              <div style={{
                position: 'fixed',
                top: 32,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 2px 12px 0 rgba(102,126,234,0.12)',
                zIndex: 1000,
                transition: 'opacity 0.3s',
                opacity: groupMessage ? 1 : 0
              }}>
                {groupMessage}
              </div>
            )}
            <div style={{ background: '#f3f4f6', borderRadius: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #e5e7eb', padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', fontFamily: 'inherit' }}>
              {groups.map(group => (
                <div key={group.id} style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '1.5rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  borderLeft: group.active ? '6px solid #10b981' : 'none',
                  fontFamily: 'inherit'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{
                      display: 'inline-block',
                      background: group.active ? '#10b981' : '#6b7280',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 12,
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {group.active ? 'ACTIVE' : 'INACTIVE'}
                    </div>
                    <div style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: 20,
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {group.category}
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827', fontFamily: 'inherit' }}>
                    {group.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#6b7280' }}>
                    <Users size={16} />
                    <span>{group.members.toLocaleString()} members</span>
                  </div>
                  <button onClick={() => handleGroupAction(group, group.active)} style={{
                background: group.active ? '#10b981' : '#667eea', // solid green or purple
                color: 'white',
                    border: 'none',
                    borderRadius: 12,
                    padding: '10px',
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: 600,
                    fontFamily: 'inherit'
                  }}>
                    {group.active ? 'View Group' : 'Join Group'}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'stokvels' && (
          <div>
            {stokvelMessage && (
              <div style={{
                position: 'fixed',
                top: 32,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: 12,
                fontWeight: 600,
                fontSize: '1.1rem',
                boxShadow: '0 2px 12px 0 rgba(245,158,11,0.12)',
                zIndex: 1000,
                transition: 'opacity 0.3s',
                opacity: stokvelMessage ? 1 : 0
              }}>
                {stokvelMessage}
              </div>
            )}
            {joinedStokvel ? (
              <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #e5e7eb', fontFamily: 'inherit' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b', marginBottom: 8 }}>{joinedStokvel.name}</h2>
                <div style={{ color: '#6b7280', marginBottom: 12 }}>{joinedStokvel.category}</div>
                <div style={{ marginBottom: 12 }}><b>Target:</b> ZAR {joinedStokvel.target.toLocaleString()} | <b>Funds:</b> ZAR {joinedStokvel.totalFunds.toLocaleString()}</div>
                <div style={{ marginBottom: 12 }}><b>Next payout:</b> {joinedStokvel.nextPayout}</div>
                <div style={{ marginBottom: 18 }}><b>Members:</b></div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
                  {stokvelMembers.map((member, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: 8, padding: '8px 14px', marginBottom: 6 }}>
                      <span style={{ fontSize: '1.3rem', marginRight: 8 }}>{member.avatar}</span>
                      <span style={{ fontWeight: 600 }}>{member.name}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setJoinedStokvel(null)} style={{ background: '#f59e0b', color: 'white', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}>
                  Leave Stokvel
                </button>
              </div>
            ) : (
              <>
                <div style={{
                  background: '#f3f4f6',
                  borderRadius: 16,
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  border: '1px solid #e5e7eb',
                  fontFamily: 'inherit'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', fontFamily: 'inherit' }}>
                      Health Stokvels
                    </h2>
                    <button
                      onClick={() => setShowCreateStokvel(!showCreateStokvel)}
                      style={{
                        background: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: 12,
                        padding: '10px 20px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 600,
                        fontFamily: 'inherit'
                      }}
                    >
                      <Plus size={18} />
                      Create Stokvel
                    </button>
                  </div>

                  {showCreateStokvel && (
                    <div style={{
                      background: '#fffbeb',
                      borderRadius: 12,
                      padding: '1.5rem',
                      marginBottom: '1.5rem',
                      border: '2px solid #2fd5e4ff',
                      fontFamily: 'inherit'
                    }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#78350f', fontFamily: 'inherit' }}>
                        Create a Health Stokvel
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                          type="text"
                          placeholder="Stokvel Name"
                          value={newStokvel.name}
                          onChange={(e) => setNewStokvel({...newStokvel, name: e.target.value})}
                          style={{ padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit' }}
                        />
                        <input
                          type="text"
                          placeholder="Savings Goal (ZAR)"
                          value={newStokvel.goal}
                          onChange={(e) => setNewStokvel({...newStokvel, goal: e.target.value})}
                          style={{ padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit' }}
                        />
                        <input
                          type="text"
                          placeholder="Monthly Contribution (ZAR)"
                          value={newStokvel.contribution}
                          onChange={(e) => setNewStokvel({...newStokvel, contribution: e.target.value})}
                          style={{ padding: '0.75rem', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit' }}
                        />
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => setShowCreateStokvel(false)}
                            style={{ background: '#e5e7eb', color: '#374151', border: 'none', borderRadius: 8, padding: '8px 16px', cursor: 'pointer', fontFamily: 'inherit' }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleCreateStokvel}
                            style={{ background: '#2fd5e4ff', color: 'white', border: 'none', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit' }}
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontFamily: 'inherit' }}>
                    Join or create health stokvels to collectively save for medical expenses. Funds are securely stored in dedicated MoMo Wallets.
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', fontFamily: 'inherit' }}>
                  {stokvels.map(stokvel => (
                    <div key={stokvel.id} style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', border: '1px solid #e5e7eb', transition: 'all 0.2s', fontFamily: 'inherit', borderLeft: '6px solid #2fd5e4ff' }}>
                      <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #2fd5e4ff 0%, #2fd5e4ff 100%)', color: 'white', padding: '0.4rem 0.9rem', borderRadius: 20, fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.8rem' }}>
                        {stokvel.category}
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827', fontFamily: 'inherit' }}>
                        {stokvel.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6b7280' }}>
                        <Users2 size={16} />
                        <span>{stokvel.members} members</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6b7280' }}>
                        <Coins size={16} />
                        <span>ZAR {stokvel.totalFunds.toLocaleString()} collected</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#6b7280' }}>
                        <Gift size={16} />
                        <span>Target: ZAR {stokvel.target.toLocaleString()}</span>
                      </div>
                      <div style={{ background: '#f3f4f6', borderRadius: 8, height: 8, marginBottom: '0.5rem', overflow: 'hidden' }}>
                        <div style={{ background: 'linear-gradient(90deg, #f59e0b 0%, #2fd5e4ff 100%)', height: '100%', width: `${(stokvel.totalFunds / stokvel.target) * 100}%` }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                        <span>{Math.round((stokvel.totalFunds / stokvel.target) * 100)}% funded</span>
                        <span>Next payout: {stokvel.nextPayout}</span>
                      </div>
                      <button onClick={() => handleStokvelJoin(stokvel)} style={{ background: 'linear-gradient(90deg, #2fd5e4ff 0%, #2fd5e4ff 100%)', color: 'white', border: 'none', borderRadius: 12, padding: '10px', cursor: 'pointer', width: '100%', fontWeight: 600, fontFamily: 'inherit' }}>
                        Join Stokvel
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div style={{ fontFamily: 'inherit' }}>
            <div style={{
              background: '#f3f4f6',
              borderRadius: 16,
              padding: '1.5rem',
              marginBottom: '1.5rem',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              border: '1px solid #e5e7eb',
              fontFamily: 'inherit'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#111827', fontFamily: 'inherit' }}>
                Community Challenges
              </h2>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontFamily: 'inherit' }}>
                Join community challenges to stay motivated and earn rewards for achieving your health goals.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', fontFamily: 'inherit' }}>
              {communityChallenges.map(challenge => (
                <div key={challenge.id} style={{
                  background: '#fff',
                  borderRadius: 16,
                  padding: '1.5rem',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                  borderLeft: '6px solid #10b981'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#111827', fontFamily: 'inherit' }}>
                    {challenge.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6b7280' }}>
                    <Users size={16} />
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#6b7280' }}>
                    <BarChart3 size={16} />
                    <span>{challenge.progress}% completion rate</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#6b7280' }}>
                    <Calendar size={16} />
                    <span>{challenge.duration} challenge</span>
                  </div>
                  <div style={{ 
                    background: '#f3f4f6', 
                    borderRadius: 8, 
                    height: 8, 
                    marginBottom: '1rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', 
                      height: '100%', 
                      width: `${challenge.progress}%` 
                    }} />
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    padding: '0.75rem',
                    background: '#ecfdf5',
                    borderRadius: 8
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Award size={16} style={{ color: '#059669' }} />
                      <span style={{ color: '#065f46', fontWeight: 600 }}>Reward: {challenge.reward}</span>
                    </div>
                  </div>
                  <button style={{
                    background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 12,
                    padding: '10px',
                    cursor: 'pointer',
                    width: '100%',
                    fontWeight: 600,
                    fontFamily: 'inherit'
                  }}>
                    Join Challenge
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

export default CommunityView;