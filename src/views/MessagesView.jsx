import React, { useState } from 'react';
import { 
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Send,
  Paperclip,
  Smile,
  Clock,
  Check,
  CheckCheck,
  ArrowLeft,
  Video,
  Phone,
  User,
  Mail,
  AlertCircle,
  Star,
  Archive,
  Trash2
} from 'lucide-react';

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

const MessagesView = () => {
  const [activeTab, setActiveTab] = useState('inbox');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for messages
  const messageCategories = [
    { id: 'inbox', label: 'Inbox', count: 12 },
    { id: 'unread', label: 'Unread', count: 3 },
    { id: 'important', label: 'Important', count: 5 },
    { id: 'archived', label: 'Archived', count: 27 },
  ];

  const messages = [
    {
      id: 1,
      sender: 'Thabo Molefe',
      subject: 'Follow-up appointment request',
      preview: 'Hello Doctor, I wanted to follow up about my last visit...',
      time: '10:30 AM',
      date: 'Today',
      unread: true,
      important: true,
      patientId: 1023,
      condition: 'Diabetes management'
    },
    {
      id: 2,
      sender: 'Sarah van der Merwe',
      subject: 'Test results question',
      preview: 'I received my blood test results but I have some questions...',
      time: 'Yesterday',
      date: 'Jun 12',
      unread: false,
      important: false,
      patientId: 1045,
      condition: 'Hypertension'
    },
    {
      id: 3,
      sender: 'Nomsa Mthembu',
      subject: 'Medication side effects',
      preview: 'The new medication you prescribed is causing some...',
      time: 'Jun 11',
      date: 'Jun 11',
      unread: true,
      important: true,
      patientId: 1012,
      condition: 'Type 2 Diabetes'
    },
    {
      id: 4,
      sender: 'Dr. James Wilson',
      subject: 'Patient referral',
      preview: 'I\'m referring a patient to you for a second opinion...',
      time: 'Jun 10',
      date: 'Jun 10',
      unread: false,
      important: false,
      patientId: null,
      condition: null
    },
    {
      id: 5,
      sender: 'Discovery Health',
      subject: 'Authorization approved',
      preview: 'Your prior authorization request has been approved...',
      time: 'Jun 9',
      date: 'Jun 9',
      unread: false,
      important: true,
      patientId: null,
      condition: null
    },
  ];

  const filteredMessages = messages.filter(message => {
    // Filter by active tab
    if (activeTab === 'unread' && !message.unread) return false;
    if (activeTab === 'important' && !message.important) return false;
    if (activeTab === 'archived') return false; // In a real app, would filter archived messages
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        message.sender.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.preview.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, would send the message
      setNewMessage('');
    }
  };

  const MessageList = () => (
    <div style={{
      background: colors.white,
      borderRadius: 12,
      border: `1px solid ${colors.gray200}`,
      overflow: 'hidden'
    }}>
      {/* Message List Header */}
      <div style={{
        padding: 16,
        borderBottom: `1px solid ${colors.gray200}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Search size={18} color={colors.gray500} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 14,
              width: 200,
              color: colors.gray800
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{
            padding: '6px 12px',
            borderRadius: 8,
            border: `1px solid ${colors.gray300}`,
            background: colors.white,
            color: colors.gray700,
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Filter size={14} />
            Filter
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Message Items */}
      <div style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        {filteredMessages.length > 0 ? (
          filteredMessages.map(message => (
            <div
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              style={{
                padding: 16,
                borderBottom: `1px solid ${colors.gray200}`,
                background: message.unread ? colors.blue50 : colors.white,
                cursor: 'pointer',
                transition: 'all 0.2s',
                ':hover': {
                  background: colors.gray50
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: colors.blue50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.primary,
                    fontWeight: 600
                  }}>
                    {message.sender.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: 14, 
                      fontWeight: 600, 
                      color: message.unread ? colors.gray800 : colors.gray700 
                    }}>
                      {message.sender}
                    </div>
                    {message.patientId && (
                      <div style={{ fontSize: 12, color: colors.gray500 }}>
                        Patient #{message.patientId} • {message.condition}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 12, color: colors.gray500 }}>{message.time}</div>
                  <div style={{ fontSize: 11, color: colors.gray400 }}>{message.date}</div>
                </div>
              </div>
              <div style={{ marginLeft: 48 }}>
                <div style={{ 
                  fontSize: 14, 
                  fontWeight: 500, 
                  color: message.unread ? colors.gray800 : colors.gray700,
                  marginBottom: 4
                }}>
                  {message.subject}
                </div>
                <div style={{ 
                  fontSize: 13, 
                  color: colors.gray600,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {message.preview}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ 
            padding: 40, 
            textAlign: 'center',
            color: colors.gray500
          }}>
            No messages found
          </div>
        )}
      </div>
    </div>
  );

  const MessageDetail = () => (
    <div style={{
      background: colors.white,
      borderRadius: 12,
      border: `1px solid ${colors.gray200}`,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {/* Message Header */}
      <div style={{
        padding: 16,
        borderBottom: `1px solid ${colors.gray200}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button 
          onClick={() => setSelectedMessage(null)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: colors.gray600
          }}
        >
          <ArrowLeft size={18} />
          <span style={{ fontSize: 14 }}>Back</span>
        </button>
        <div style={{ display: 'flex', gap: 12 }}>
          {selectedMessage.patientId && (
            <>
              <button style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: `1px solid ${colors.primary}`,
                background: colors.white,
                color: colors.primary,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <Video size={14} />
                Video Call
              </button>
              <button style={{
                padding: '6px 12px',
                borderRadius: 8,
                border: `1px solid ${colors.success}`,
                background: colors.white,
                color: colors.success,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <Phone size={14} />
                Call
              </button>
            </>
          )}
          <button style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: colors.gray500
          }}>
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Message Content */}
      <div style={{ 
        padding: 24,
        flex: 1,
        overflowY: 'auto'
      }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: colors.gray800 }}>
              {selectedMessage.subject}
            </h2>
            <div style={{ fontSize: 14, color: colors.gray500 }}>
              {selectedMessage.date} • {selectedMessage.time}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: colors.blue50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.primary,
              fontWeight: 600,
              fontSize: 16
            }}>
              {selectedMessage.sender.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>
                {selectedMessage.sender}
              </div>
              {selectedMessage.patientId && (
                <div style={{ fontSize: 14, color: colors.gray500 }}>
                  Patient #{selectedMessage.patientId} • {selectedMessage.condition}
                </div>
              )}
            </div>
          </div>

          <div style={{ 
            fontSize: 15,
            lineHeight: 1.6,
            color: colors.gray700,
            marginLeft: 60
          }}>
            <p>Dear Dr. Khumalo,</p>
            <p>{selectedMessage.preview}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
            <p>Best regards,<br />{selectedMessage.sender}</p>
          </div>
        </div>
      </div>

      {/* Reply Box */}
      <div style={{
        padding: 16,
        borderTop: `1px solid ${colors.gray200}`
      }}>
        <div style={{ 
          border: `1px solid ${colors.gray300}`,
          borderRadius: 8,
          overflow: 'hidden'
        }}>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your reply..."
            style={{
              width: '100%',
              minHeight: 100,
              padding: 12,
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: 14,
              fontFamily: 'inherit'
            }}
          />
          <div style={{
            padding: '8px 12px',
            background: colors.gray50,
            borderTop: `1px solid ${colors.gray200}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: colors.gray500
              }}>
                <Paperclip size={18} />
              </button>
              <button style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: colors.gray500
              }}>
                <Smile size={18} />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: 'none',
                background: colors.primary,
                color: colors.white,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ 
      padding: 24,
      background: colors.gray50,
      minHeight: '100vh'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24
      }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: colors.gray800 }}>Messages</h1>
        <button style={{
          padding: '10px 16px',
          borderRadius: 8,
          border: 'none',
          background: colors.primary,
          color: colors.white,
          fontSize: 14,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8
        }}>
          <Mail size={16} />
          New Message
        </button>
      </div>

      {/* Message Categories */}
      <div style={{ 
        display: 'flex',
        gap: 8,
        marginBottom: 16,
        overflowX: 'auto',
        paddingBottom: 8
      }}>
        {messageCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: 'none',
              background: activeTab === category.id ? colors.primary : colors.white,
              color: activeTab === category.id ? colors.white : colors.gray700,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              boxShadow: activeTab === category.id ? `0 2px 4px rgba(59, 130, 246, 0.2)` : `0 1px 2px rgba(0,0,0,0.05)`
            }}
          >
            {category.label}
            {category.count > 0 && (
              <span style={{
                background: activeTab === category.id ? 'rgba(255,255,255,0.2)' : colors.gray100,
                color: activeTab === category.id ? colors.white : colors.gray700,
                borderRadius: 20,
                padding: '2px 8px',
                fontSize: 12,
                fontWeight: 600
              }}>
                {category.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: selectedMessage ? '1fr 2fr' : '1fr',
        gap: 24
      }}>
        <MessageList />
        {selectedMessage && <MessageDetail />}
      </div>
    </div>
  );
};

export default MessagesView;