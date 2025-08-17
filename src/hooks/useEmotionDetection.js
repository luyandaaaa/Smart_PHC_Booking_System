
import { useState, useCallback } from 'react';
import { pipeline } from '@huggingface/transformers';

// Enhanced emotion mapping for CNN results
const EMOTION_LABELS = {
  'angry': 'anger',
  'anger': 'anger',
  'disgust': 'disgust',
  'fear': 'fear',
  'happy': 'joy',
  'joy': 'joy',
  'neutral': 'neutral',
  'sad': 'sadness',
  'sadness': 'sadness',
  'surprise': 'surprise',
  'positive': 'joy',
  'negative': 'sadness',
  'LABEL_0': 'sadness',
  'LABEL_1': 'joy',
  'LABEL_2': 'love',
  'LABEL_3': 'anger',
  'LABEL_4': 'fear',
  'LABEL_5': 'surprise'
};

export const useEmotionDetection = () => {
  const [emotionModel, setEmotionModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize CNN-based emotion detection and sentiment analysis models
  const initializeModels = useCallback(async () => {
    if (emotionModel || isLoading) {
      // Models already loading or loaded, skipping...
      return;
    }
    setIsLoading(true);
    try {
      // Use HuggingFace pipeline for real model
      // Suppress dtype warning by setting dtype if supported, or filter console.warn
      const originalWarn = console.warn;
      console.warn = function(msg, ...args) {
        if (typeof msg === 'string' && msg.includes('dtype not specified for "model"')) return;
        return originalWarn.apply(console, [msg, ...args]);
      };
      const classifier = await pipeline(
        'image-classification',
        'Xenova/facial_emotions_image_detection'
      );
      console.warn = originalWarn;
      setEmotionModel({ classifier, sentimentAnalyzer: null });
    } catch (error) {
      // Failed to load emotion model
      setEmotionModel({ classifier: null, sentimentAnalyzer: null });
    } finally {
      setIsLoading(false);
    }
  }, [emotionModel, isLoading]);

  // Advanced CNN-based emotion detection from video frame
  const detectEmotionFromFrame = useCallback(async (
    videoElement,
    canvasElement
  ) => {
    if (!emotionModel?.classifier || isAnalyzing || !videoElement || !canvasElement) {
      return null;
    }
    setIsAnalyzing(true);
    try {
      const ctx = canvasElement.getContext('2d');
      if (!ctx) throw new Error('Canvas context unavailable');
      // Set optimal canvas size for CNN processing
      const targetWidth = 224;
      const targetHeight = 224;
      canvasElement.width = targetWidth;
      canvasElement.height = targetHeight;
      ctx.drawImage(videoElement, 0, 0, targetWidth, targetHeight);
      // Apply preprocessing filters for better CNN performance
      const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        // Convert to grayscale and enhance contrast
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        const enhanced = Math.min(255, Math.max(0, (gray - 128) * 1.5 + 128));
        data[i] = enhanced;
        data[i + 1] = enhanced;
        data[i + 2] = enhanced;
        // Alpha remains unchanged
      }
      ctx.putImageData(imageData, 0, 0);
      // Convert to blob for CNN processing
      const blob = await new Promise((resolve, reject) => {
        canvasElement.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error('Failed to create blob'));
        }, 'image/jpeg', 0.9);
      });
      const results = await emotionModel.classifier(blob);
      if (results && results.length > 0) {
        const topResult = results[0];
        const normalizedLabel = topResult.label.toLowerCase().trim();
        const mappedEmotion = EMOTION_LABELS[normalizedLabel] || 'neutral';
        return {
          label: mappedEmotion,
          score: topResult.score
        };
      }
      return null;
    } catch (error) {
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, [emotionModel, isAnalyzing]);

  // Sentiment analysis from text (for additional context)
  const analyzeSentiment = useCallback(async (text) => {
    if (!emotionModel?.sentimentAnalyzer || !text.trim()) return null;
    try {
      const result = await emotionModel.sentimentAnalyzer(text);
      if (result && result.length > 0) {
        const topResult = result[0];
        return {
          label: topResult.label.toLowerCase(),
          score: topResult.score
        };
      }
      return null;
    } catch (error) {
      return null;
    }
  }, [emotionModel]);

  return {
    initializeModels,
    detectEmotionFromFrame,
    analyzeSentiment,
    isModelLoaded: !!emotionModel,
    isLoading,
    isAnalyzing
  };
};
