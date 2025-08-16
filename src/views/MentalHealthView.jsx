import Sidebar from '../components/Sidebar';
import EmotionDetector from '../components/EmotionDetector';
import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Alert, AlertDescription } from '../components/ui/Alert';
import { Lightbulb, AlertTriangle, Heart, Award, Clock, Navigation2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

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

const MentalHealthSuite = ({ currentPage = 'mentalHealth', setCurrentPage }) => {
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [coachingMessage, setCoachingMessage] = useState('');
  const [currentSuggestions, setCurrentSuggestions] = useState([]);
  const [crisisStatus, setCrisisStatus] = useState(null);

  const handleEmotionDetected = (emotion) => {
    console.log('Received emotion from CNN detector:', emotion);
    const suggestions = generateCoachingSuggestions(emotion.label);
    setCurrentSuggestions(suggestions);
    setCoachingMessage(generateCoachingMessage(emotion.label, emotion.score));
    
    const newEntry = {
      timestamp: new Date(),
      emotion: emotion.label,
      confidence: emotion.score,
      suggestions
    };
    setEmotionHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    checkCrisisPatterns([newEntry, ...emotionHistory]);
  };


  // Generate AI coaching suggestions based on emotion
  // Generate a coaching message based on emotion and confidence score
  // Check for crisis patterns in emotion history and set crisisStatus if needed
  function checkCrisisPatterns(history) {
    // Example: If 3+ consecutive negative/sad/angry emotions, flag as high risk
    const crisisEmotions = ['sad', 'sadness', 'negative', 'anger', 'angry', 'fear'];
    const lastThree = history.slice(0, 3);
    if (lastThree.length === 3 && lastThree.every(e => crisisEmotions.includes((e.emotion || '').toLowerCase()))) {
      setCrisisStatus({
        severity: 'high',
        indicators: lastThree.map(e => `${e.emotion} (${Math.round(e.confidence * 100)}%)`),
        recommendation: 'Please consider reaching out to a mental health professional or support line.'
      });
    } else if (lastThree.length > 0 && lastThree.some(e => crisisEmotions.includes((e.emotion || '').toLowerCase()))) {
      setCrisisStatus({
        severity: 'low',
        indicators: lastThree.filter(e => crisisEmotions.includes((e.emotion || '').toLowerCase())).map(e => `${e.emotion} (${Math.round(e.confidence * 100)}%)`),
        recommendation: 'AI noticed some emotional stress. Take care and consider self-care activities.'
      });
    } else {
      setCrisisStatus(null);
    }
  }

  // Get an emoji for an emotion label (for history display)
  function getEmotionEmoji(label) {
    switch ((label || '').toLowerCase()) {
      case 'anger':
      case 'angry':
        return '😠';
      case 'disgust':
        return '🤢';
      case 'fear':
        return '😨';
      case 'happy':
      case 'joy':
      case 'love':
      case 'positive':
        return '😊';
      case 'neutral':
        return '😐';
      case 'sad':
      case 'sadness':
      case 'negative':
        return '😢';
      case 'surprise':
        return '😲';
      default:
        return '🙂';
    }
  }
  function generateCoachingMessage(emotionLabel, score) {
    const percent = Math.round(score * 100);
    switch ((emotionLabel || '').toLowerCase()) {
      case 'happy':
      case 'joy':
      case 'love':
      case 'positive':
        return `You seem to be in a great mood! (${percent}% confidence) Keep spreading positivity.`;
      case 'sad':
      case 'sadness':
      case 'negative':
        return `It's okay to feel sad sometimes. (${percent}% confidence) Remember, brighter days are ahead.`;
      case 'anger':
      case 'angry':
        return `You might be feeling angry. (${percent}% confidence) Try to pause and breathe before reacting.`;
      case 'fear':
        return `Feeling fearful is natural. (${percent}% confidence) Consider talking to someone you trust.`;
      case 'disgust':
        return `You may be experiencing disgust. (${percent}% confidence) Try to focus on something pleasant.`;
      case 'surprise':
        return `Surprises can be exciting or unsettling. (${percent}% confidence) Embrace the unexpected!`;
      case 'neutral':
        return `You're feeling neutral. (${percent}% confidence) Take a moment to check in with yourself.`;
      default:
        return `Your mood is unique. (${percent}% confidence) Take care of yourself today!`;
    }
  }
  function generateCoachingSuggestions(emotionLabel) {
    switch ((emotionLabel || '').toLowerCase()) {
      case 'happy':
      case 'joy':
      case 'love':
      case 'positive':
        return [
          'Keep up the positive mindset!',
          'Share your happiness with someone today.',
          'Reflect on what made you feel good.'
        ];
      case 'sad':
      case 'sadness':
      case 'negative':
        return [
          'Take a moment to acknowledge your feelings.',
          'Reach out to a friend or loved one.',
          'Try a relaxing activity you enjoy.'
        ];
      case 'anger':
      case 'angry':
        return [
          'Take deep breaths and pause before reacting.',
          'Channel your energy into something productive.',
          'Consider writing down your thoughts.'
        ];
      case 'fear':
        return [
          'Remind yourself that it’s okay to feel afraid.',
          'Talk to someone you trust about your worries.',
          'Practice grounding techniques.'
        ];
      case 'disgust':
        return [
          'Reflect on what triggered this feeling.',
          'Engage in a pleasant activity to shift your mood.',
          'Talk it out with someone you trust.'
        ];
      case 'surprise':
        return [
          'Embrace the unexpected!',
          'Share your surprise with a friend.',
          'Reflect on how surprises make you feel.'
        ];
      case 'neutral':
        return [
          'Take a moment to check in with yourself.',
          'Consider setting a small goal for today.',
          'Practice mindfulness for a few minutes.'
        ];
      default:
        return [
          'Remember to take care of yourself.',
          'Reach out if you need support.',
          'Practice gratitude for something today.'
        ];
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: colors.gray50 }}>
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
        <div className="text-center space-y-2" style={{ marginBottom: 32 }}>
          <h1 className="text-4xl font-bold" style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 8
          }}>
            Mental Health Suite
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto" style={{ fontSize: '1.1rem', color: colors.gray600 }}>
            CNN-powered emotion detection with advanced sentiment analysis
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <EmotionDetector onEmotionDetected={handleEmotionDetected} mode="manual" />
            
            <Card style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
              border: `1px solid ${colors.gray200}`,
              padding: 24
            }}>
              <div style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.gray800 }}>AI Mood Coach</h2>
              </div>
              {coachingMessage ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{
                    background: colors.blue50,
                    border: `1px solid ${colors.primary}20`,
                    borderRadius: 12,
                    padding: 16
                  }}>
                    <p style={{ fontSize: 14, lineHeight: 1.6 }}>{coachingMessage}</p>
                  </div>
                  {currentSuggestions.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <h3 style={{ fontSize: 16, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Lightbulb size={18} color={colors.primary} />
                        AI-Generated Suggestions
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {currentSuggestions.map((suggestion, index) => (
                          <div key={index} style={{
                            background: '#fff',
                            border: `1px solid ${colors.blue100}`,
                            borderRadius: 12,
                            padding: 12,
                            fontSize: 14,
                            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                            color: colors.primary
                          }}>
                            {suggestion}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 0', color: colors.gray500 }}>
                  <p>Start CNN emotion detection to receive personalized AI coaching</p>
                </div>
              )}
            </Card>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {crisisStatus && (
              <Alert style={{
                borderRadius: 16,
                background: crisisStatus.severity === 'high' ? colors.red50 : colors.yellow50,
                border: `2px solid ${crisisStatus.severity === 'high' ? colors.danger : colors.warning}`,
                padding: 16
              }}>
                <AlertTriangle size={18} color={crisisStatus.severity === 'high' ? colors.danger : colors.warning} />
                <AlertDescription style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontWeight: 500 }}>
                    {crisisStatus.severity === 'high' ? 'High Risk Detected by AI' : 'Emotional Stress Noticed'}
                  </div>
                  <ul style={{ fontSize: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {crisisStatus.indicators.map((indicator, index) => (
                      <li key={index}>• {indicator}</li>
                    ))}
                  </ul>
                  <p style={{ fontSize: 14, fontWeight: 500, marginTop: 8 }}>{crisisStatus.recommendation}</p>
                </AlertDescription>
              </Alert>
            )}

            <Card style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
              border: `1px solid ${colors.gray200}`,
              padding: 16
            }}>
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>CNN Emotion History</h3>
              </div>
              {emotionHistory.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {emotionHistory.map((entry, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#fff',
                      border: `1px solid ${colors.gray200}`,
                      borderRadius: 12,
                      padding: 12,
                      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
                    }}>
                      <span style={{ fontSize: '1.5rem' }}>{getEmotionEmoji(entry.emotion)}</span>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 14, fontWeight: 500, color: colors.primary, textTransform: 'capitalize' }}>
                          {entry.emotion}
                        </span>
                        <span style={{ fontSize: 12, color: colors.gray500 }}>
                          {Math.round(entry.confidence * 100)}% confidence
                        </span>
                      </div>
                      <span style={{ fontSize: 12, color: colors.gray500 }}>
                        {entry.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '24px 0', color: colors.gray500 }}>
                  No emotion history yet. Start emotion detection to see your mood timeline.
                </div>
              )}
            </Card>

            <Card style={{
              background: '#fff',
              borderRadius: 16,
              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
              border: `1px solid ${colors.gray200}`,
              padding: 16
            }}>
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.gray800 }}>AI Wellness Score</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, color: colors.success }}>85</div>
                  <p style={{ fontSize: 14, color: colors.gray500 }}>CNN-Analyzed Wellness</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span>Emotional Balance</span>
                    <span>Good</span>
                  </div>
                  <Progress value={75} style={{ height: 8 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span>Stress Level</span>
                    <span>Low</span>
                  </div>
                  <Progress value={25} style={{ height: 8 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                    <span>Support Network</span>
                    <span>Strong</span>
                  </div>
                  <Progress value={90} style={{ height: 8 }} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthSuite;