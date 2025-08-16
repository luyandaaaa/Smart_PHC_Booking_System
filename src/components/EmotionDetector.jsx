// Color helper for emotion labels
function getEmotionColor(label) {
  switch ((label || '').toLowerCase()) {
    case 'anger':
    case 'angry':
      return '#ef4444'; // red
    case 'disgust':
      return '#a3e635'; // lime
    case 'fear':
      return '#f59e42'; // orange
    case 'happy':
    case 'joy':
    case 'love':
    case 'positive':
      return '#10b981'; // green
    case 'neutral':
      return '#6b7280'; // gray
    case 'sad':
    case 'sadness':
    case 'negative':
      return '#3b82f6'; // blue
    case 'surprise':
      return '#fbbf24'; // yellow
    default:
      return '#6366f1'; // indigo
  }
}
// Emoji helper for emotion labels
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
import React, { useRef, useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Progress } from './ui/Progress';
import { Video } from 'lucide-react';
import { useEmotionDetection } from '../hooks/useEmotionDetection';

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

const EmotionDetector = ({ onEmotionDetected }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState(null);

  const {
    initializeModels,
    detectEmotionFromFrame,
    isModelLoaded,
    isLoading,
    isAnalyzing
  } = useEmotionDetection();

  useEffect(() => {
    initializeModels();
  }, [initializeModels]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user',
          frameRate: { ideal: 30 }
        }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      alert('Camera access is required for emotion detection. Please allow camera permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  const analyzeCurrentFrame = async () => {
    if (!videoRef.current || !canvasRef.current || !isModelLoaded) {
      return;
    }
    const emotion = await detectEmotionFromFrame(videoRef.current, canvasRef.current);
    if (emotion) {
      setCurrentEmotion(emotion);
      if (onEmotionDetected) {
        onEmotionDetected(emotion);
      }
    }
  };

  return (
    <Card style={{
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
      border: `1px solid ${colors.gray200}`,
      padding: 24
    }}>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, color: colors.gray800 }}>CNN Emotion Detection</h2>
      </div>


      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          aspectRatio: '16/9',
          background: 'linear-gradient(90deg, #f0fdfa 0%, #bae6fd 100%)',
          border: `2px solid ${colors.primary}`,
          boxShadow: '0 2px 8px 0 rgba(56,189,248,0.10)'
        }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {!isStreaming && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: colors.gray100
            }}>
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{
                  width: 64,
                  height: 64,
                  margin: '0 auto',
                  background: `${colors.primary}10`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Video size={32} color={colors.primary} />
                </div>
                <p style={{ color: colors.gray600 }}>CNN-powered emotion detection</p>
                <p style={{ fontSize: 14, color: colors.gray500 }}>Click Start to begin facial analysis</p>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div style={{
              position: 'absolute',
              top: 16,
              right: 16,
              background: colors.primary,
              color: 'white',
              padding: '4px 12px',
              borderRadius: 9999,
              fontSize: 14,
              animation: 'pulse 2s infinite'
            }}>
              CNN Processing...
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
          {!isStreaming ? (
            <Button onClick={startCamera} style={{ flex: 1 }}>
              <Video size={16} style={{ marginRight: 8 }} />
              Start Camera
            </Button>
          ) : (
            <Button onClick={stopCamera} variant="destructive" style={{ flex: 1 }}>
              Stop Camera
            </Button>
          )}

          <Button
            onClick={analyzeCurrentFrame}
            disabled={!isStreaming || isAnalyzing || !isModelLoaded}
            variant="outline"
            style={{ flex: 1 }}
          >
            Analyze Now
          </Button>
        </div>

        {currentEmotion && (
          <Card style={{
            background: '#fff',
            borderRadius: 12,
            boxShadow: '0 1px 2px 0 rgba(59,130,246,0.05)',
            padding: 16,
            marginTop: 16
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>CNN Detection Result</span>
              <span style={{ fontSize: '1.5rem' }}>{getEmotionEmoji(currentEmotion.label)}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Badge style={{
                  background: getEmotionColor(currentEmotion.label),
                  color: 'white'
                }}>
                  {currentEmotion.label.charAt(0).toUpperCase() + currentEmotion.label.slice(1)}
                </Badge>
                <span style={{ fontSize: 14, color: colors.gray600 }}>
                  {Math.round(currentEmotion.score * 100)}% confidence
                </span>
              </div>
              <Progress value={currentEmotion.score * 100} style={{ height: 8 }} />
              <p style={{ fontSize: 12, color: colors.gray500 }}>
                Powered by advanced CNN and sentiment analysis
              </p>
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
};

export default EmotionDetector;