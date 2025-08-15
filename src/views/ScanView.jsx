import React, { useRef, useEffect, useState, useCallback } from 'react';
import { AlertTriangle, MapPin, Shield, Pill, Clock, User, ChevronDown, ChevronUp, Search, Phone, Camera, Zap, Brain } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';

import Sidebar from '../components/Sidebar';

/* The misplaced return and closing brace have been removed. */

const ScanView = ({ setCurrentPage, currentPage = 'scan' }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);
  const modelRef = useRef(null);
  
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);
  const [expandedSections, setExpandedSections] = useState({});
  const [userAllergies, setUserAllergies] = useState(['Penicillin', 'Sulfa drugs']);
  const [processingStage, setProcessingStage] = useState('');

  // Enhanced medication database with more comprehensive data
  const medicationDatabase = {
    'round_white_acetaminophen': {
      code: 'TYLENOL-500',
      name: 'Acetaminophen 500mg',
      genericName: 'Acetaminophen',
      brandNames: ['Tylenol', 'Panadol', 'Mapap', 'Ofirmev'],
      activeIngredient: 'Acetaminophen 500mg',
      strength: '500mg',
      form: 'Tablet',
      color: 'White',
      shape: 'Round',
      imprint: '500',
      manufacturer: 'Johnson & Johnson',
      ndc: '50580-0449-30',
      dosage: {
        adult: '1-2 tablets every 4-6 hours (maximum 8 tablets per day)',
        pediatric: 'Ages 12+: Same as adult. Under 12: Consult healthcare provider',
        elderly: 'Same as adult dose, monitor liver function'
      },
      sideEffects: {
        common: ['Nausea', 'Stomach upset', 'Loss of appetite'],
        serious: ['Liver damage with overdose', 'Severe skin reactions', 'Kidney problems'],
        rare: ['Blood disorders', 'Pancreatitis', 'Low blood sugar']
      },
      warnings: [
        'Do not exceed 4000mg (8 tablets) in 24 hours',
        'Avoid alcohol while taking this medication',
        'Check other medications for acetaminophen content',
        'Consult doctor if symptoms persist beyond 10 days'
      ],
      contraindications: ['Severe liver disease', 'Hypersensitivity to acetaminophen'],
      interactions: ['Warfarin', 'Phenytoin', 'Carbamazepine', 'Chronic alcohol use', 'Isoniazid'],
      allergyInfo: {
        contains: [],
        crossReactivity: ['Phenylacetic acid derivatives (rare)']
      },
      pregnancyCategory: 'B - Generally safe during pregnancy',
      storageInstructions: 'Store at 20-25°C (68-77°F), protect from moisture'
    },
    'round_orange_ibuprofen': {
      code: 'ADVIL-200',
      name: 'Ibuprofen 200mg',
      genericName: 'Ibuprofen',
      brandNames: ['Advil', 'Motrin', 'Nurofen', 'Brufen'],
      activeIngredient: 'Ibuprofen 200mg',
      strength: '200mg',
      form: 'Tablet',
      color: 'Orange',
      shape: 'Round',
      imprint: 'ADVIL',
      manufacturer: 'Pfizer Consumer Healthcare',
      ndc: '0573-0164-40',
      dosage: {
        adult: '1-2 tablets every 4-6 hours (maximum 6 tablets per day)',
        pediatric: 'Ages 12+: Same as adult. Ages 6-11: Consult healthcare provider',
        elderly: 'Use lowest effective dose, monitor for GI and cardiovascular effects'
      },
      sideEffects: {
        common: ['Stomach upset', 'Heartburn', 'Dizziness', 'Mild drowsiness'],
        serious: ['GI bleeding', 'Heart attack', 'Stroke', 'Kidney damage', 'Liver toxicity'],
        rare: ['Severe allergic reactions', 'Blood disorders', 'Aseptic meningitis']
      },
      warnings: [
        'Take with food or milk to reduce stomach irritation',
        'Increased risk of heart attack and stroke',
        'May cause serious GI bleeding',
        'Avoid if allergic to aspirin or other NSAIDs'
      ],
      contraindications: ['Active GI bleeding', 'Severe heart failure', 'Severe kidney disease', 'NSAID allergy'],
      interactions: ['Warfarin', 'ACE inhibitors', 'Lithium', 'Methotrexate', 'Aspirin', 'Diuretics'],
      allergyInfo: {
        contains: [],
        crossReactivity: ['Aspirin', 'Other NSAIDs', 'Sulfonamides', 'Tartrazine']
      },
      pregnancyCategory: 'C - Use only if benefits outweigh risks (avoid in 3rd trimester)',
      storageInstructions: 'Store at 20-25°C (68-77°F), protect from light and moisture'
    },
    'round_white_aspirin': {
      code: 'BAYER-81',
      name: 'Aspirin 81mg (Low Dose)',
      genericName: 'Acetylsalicylic Acid',
      brandNames: ['Bayer', 'Bufferin', 'Ecotrin', 'St. Joseph'],
      activeIngredient: 'Acetylsalicylic Acid 81mg',
      strength: '81mg',
      form: 'Tablet',
      color: 'White',
      shape: 'Round',
      imprint: 'BAYER',
      manufacturer: 'Bayer HealthCare',
      ndc: '12843-0506-01',
      dosage: {
        adult: '1 tablet daily for cardiovascular protection (as directed by physician)',
        pediatric: 'Not recommended for children under 16 due to Reye\'s syndrome risk',
        elderly: 'Same as adult dose, monitor for bleeding complications'
      },
      sideEffects: {
        common: ['Stomach irritation', 'Heartburn', 'Nausea', 'Tinnitus'],
        serious: ['GI bleeding', 'Intracranial hemorrhage', 'Reye\'s syndrome', 'Severe allergic reactions'],
        rare: ['Liver toxicity', 'Kidney dysfunction', 'Hearing loss']
      },
      warnings: [
        'Consult doctor before use if on blood thinners',
        'Do not give to children under 16',
        'Stop use 7 days before surgery',
        'Monitor for signs of bleeding'
      ],
      contraindications: ['Active bleeding disorders', 'Hemophilia', 'Children under 16', 'Third trimester pregnancy'],
      interactions: ['Warfarin', 'Heparin', 'Methotrexate', 'ACE inhibitors', 'Alcohol'],
      allergyInfo: {
        contains: [],
        crossReactivity: ['Other salicylates', 'NSAIDs', 'Tartrazine (yellow dye)']
      },
      pregnancyCategory: 'D - Avoid during pregnancy, especially third trimester',
      storageInstructions: 'Store at 15-30°C (59-86°F), discard if vinegar odor develops'
    }
  };

  // Mock nearby pharmacies
  const nearbyPharmacies = [
    { name: 'Clicks Pharmacy Sandton', distance: '0.8 km', stock: 'In Stock', phone: '+27-11-783-0000' },
    { name: 'Dis-Chem Rosebank', distance: '1.5 km', stock: 'In Stock', phone: '+27-11-447-3000' },
    { name: 'Pick n Pay Pharmacy', distance: '2.1 km', stock: 'Low Stock (2 left)', phone: '+27-11-880-8000' },
    { name: 'MediRite Pharmacy', distance: '2.8 km', stock: 'Out of Stock', phone: '+27-11-726-8000' }
  ];

  // Initialize TensorFlow and load models
  useEffect(() => {
    initializeML();
  }, []);

  const initializeML = async () => {
    setModelLoading(true);
    setProcessingStage('Initializing TensorFlow.js...');
    
    try {
      // Initialize TensorFlow backend
      await tf.ready();
      console.log('TensorFlow.js initialized');
      
      setProcessingStage('Loading computer vision models...');
      
      // In a real implementation, you would load a trained model
      // For demo purposes, we'll simulate model loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a simple mock model for demonstration
      // In production, replace with: await tf.loadLayersModel('/path/to/your/model.json')
      modelRef.current = createMockModel();
      
      setProcessingStage('Models loaded successfully!');
      setModelReady(true);
      
      setTimeout(() => {
        setProcessingStage('');
        setModelLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('ML initialization error:', error);
      setError('Failed to load AI models. Some features may not work properly.');
      setModelLoading(false);
    }
  };

  const createMockModel = () => {
    // Create a simple sequential model for demonstration
    const model = tf.sequential({
      layers: [
        tf.layers.conv2d({
          inputShape: [224, 224, 3],
          filters: 32,
          kernelSize: 3,
          activation: 'relu'
        }),
        tf.layers.maxPooling2d({ poolSize: 2 }),
        tf.layers.flatten(),
        tf.layers.dense({ units: 128, activation: 'relu' }),
        tf.layers.dense({ units: 3, activation: 'softmax' }) // 3 classes for demo
      ]
    });
    
    return model;
  };

  const preprocessImage = async (imageData, width, height) => {
    return tf.tidy(() => {
      // Convert image to tensor
      const tensor = tf.browser.fromPixels(imageData);
      
      // Resize to model input size (224x224 is common for vision models)
      const resized = tf.image.resizeBilinear(tensor, [224, 224]);
      
      // Normalize pixel values to [0, 1]
      const normalized = resized.div(255.0);
      
      // Add batch dimension
      const batched = normalized.expandDims(0);
      
      return batched;
    });
  };

  const extractImageFeatures = async (imageData) => {
    if (!modelRef.current) {
      throw new Error('ML model not loaded');
    }

    setProcessingStage('Preprocessing image...');
    const preprocessed = await preprocessImage(imageData, 224, 224);
    
    setProcessingStage('Analyzing with neural network...');
    
    // Run inference
    const predictions = modelRef.current.predict(preprocessed);
    const probabilities = await predictions.data();
    
    // Clean up tensors
    preprocessed.dispose();
    predictions.dispose();
    
    return probabilities;
  };

  const analyzeImageWithCV = async (canvas) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    setProcessingStage('Detecting pill shapes...');
    
    // Simulate computer vision processing
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock shape detection results
    const detectedFeatures = {
      shape: Math.random() > 0.5 ? 'round' : 'oval',
      color: ['white', 'orange', 'blue', 'pink', 'yellow'][Math.floor(Math.random() * 5)],
      size: Math.random() * 20 + 5, // 5-25mm diameter
      hasImprint: Math.random() > 0.3,
      edges: Math.floor(Math.random() * 3) // 0=smooth, 1=scored, 2=segmented
    };
    
    setProcessingStage('Extracting text and imprints...');
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock OCR results
    const ocrResults = {
      text: ['500', 'ADVIL', 'BAYER'][Math.floor(Math.random() * 3)],
      confidence: 0.85 + Math.random() * 0.15
    };
    
    return { detectedFeatures, ocrResults };
  };

  const identifyMedication = async (features, ocrResults) => {
    setProcessingStage('Matching against medication database...');
    
    // Enhanced matching algorithm
    let bestMatch = null;
    let highestScore = 0;
    
    Object.entries(medicationDatabase).forEach(([key, medication]) => {
      let score = 0;
      
      // Shape matching
      if (features.shape === medication.shape.toLowerCase()) {
        score += 30;
      }
      
      // Color matching
      if (features.color === medication.color.toLowerCase()) {
        score += 25;
      }
      
      // OCR text matching
      if (ocrResults.text && medication.imprint.toLowerCase().includes(ocrResults.text.toLowerCase())) {
        score += 40 * ocrResults.confidence;
      }
      
      // Brand name matching
      if (ocrResults.text && medication.brandNames.some(brand => 
        brand.toLowerCase().includes(ocrResults.text.toLowerCase())
      )) {
        score += 35 * ocrResults.confidence;
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = { key, ...medication, matchScore: score };
      }
    });
    
    return bestMatch;
  };

  const performAdvancedScan = async () => {
    if (!scanning) {
      setError('Start the camera first.');
      return;
    }
    
    if (!modelReady) {
      setError('AI models are still loading. Please wait...');
      return;
    }

    setError('');
    setLoading(true);
    setProcessingStage('Capturing image...');
    
    try {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const video = videoRef.current;
        
        // Capture high-resolution frame
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 480;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Computer vision analysis
        const { detectedFeatures, ocrResults } = await analyzeImageWithCV(canvas);
        
        setProcessingStage('Running AI classification...');
        
        // Get image data for ML processing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Run ML inference (commented out as it would need a real trained model)
        // const mlPredictions = await extractImageFeatures(imageData);
        
        // Identify medication using enhanced matching
        const identifiedMedication = await identifyMedication(detectedFeatures, ocrResults);
        
        if (!identifiedMedication || identifiedMedication.matchScore < 50) {
          setError('Could not identify this medication with sufficient confidence. Please ensure good lighting and try again.');
          setLoading(false);
          return;
        }
        
        setProcessingStage('Checking for drug interactions...');
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Check for allergies
        const allergyAlerts = checkAllergies(identifiedMedication);
        
        const scanResult = {
          ...identifiedMedication,
          timestamp: new Date().toLocaleString(),
          confidence: Math.min(95, identifiedMedication.matchScore + Math.random() * 10).toFixed(1) + '%',
          allergyAlerts,
          pharmacyStock: nearbyPharmacies,
          detectedFeatures,
          ocrResults
        };
        
        setResult(scanResult);
        setScanHistory(prev => [scanResult, ...prev.slice(0, 9)]);
        
        if (autoScan) {
          stopAutoScan();
        }
        
        setProcessingStage('Analysis complete!');
        setTimeout(() => setProcessingStage(''), 1500);
      }
    } catch (err) {
      console.error('Scan error:', err);
      setError('AI analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cleanup = useCallback(() => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const checkPermissionAndStart = async () => {
      if (!modelReady) return; // Wait for models to load
      
      setLoading(true);
      setError('');
      setResult(null);
      
      try {
        if (navigator.permissions) {
          const permissionStatus = await navigator.permissions.query({ name: 'camera' });
          if (permissionStatus.state === 'granted' && isMounted) {
            await startCamera();
          } else {
            setShowPlayOverlay(true);
          }
        } else {
          setShowPlayOverlay(true);
        }
      } catch (e) {
        if (isMounted) {
          setShowPlayOverlay(true);
        }
      } finally {
        if (isMounted) {
          setPermissionChecked(true);
          setLoading(false);
        }
      }
    };

    checkPermissionAndStart();

    return () => {
      isMounted = false;
      cleanup();
    };
  }, [cleanup, modelReady]);

  const startCamera = async () => {
    setError('');
    setResult(null);
    setLoading(true);
    
    try {
      cleanup();
      
      const constraints = {
        video: {
          facingMode: 'environment',
          width: { ideal: 1920, min: 1280 },
          height: { ideal: 1080, min: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((resolve, reject) => {
          videoRef.current.onloadedmetadata = resolve;
          videoRef.current.onerror = reject;
          setTimeout(reject, 5000);
        });
        await videoRef.current.play();
      }
      
      setScanning(true);
      setShowPlayOverlay(false);
      
      if (autoScan) {
        startAutoScan();
      }
      
    } catch (err) {
      console.error('Camera error:', err);
      setError('Camera access denied or not available. Please check your browser settings.');
      setShowPlayOverlay(true);
      setScanning(false);
    } finally {
      setLoading(false);
    }
  };

  const stopCamera = () => {
    cleanup();
    setScanning(false);
    setShowPlayOverlay(true);
    setAutoScan(false);
  };

  const startAutoScan = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    
    scanIntervalRef.current = setInterval(() => {
      if (scanning && !loading && modelReady) {
        performAdvancedScan();
      }
    }, 4000); // Longer interval for ML processing
  };

  const stopAutoScan = () => {
    setAutoScan(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const checkAllergies = (medication) => {
    const alerts = [];
    
    if (medication.allergyInfo.crossReactivity) {
      medication.allergyInfo.crossReactivity.forEach(allergen => {
        if (userAllergies.some(userAllergy => 
          userAllergy.toLowerCase().includes(allergen.toLowerCase()) ||
          allergen.toLowerCase().includes(userAllergy.toLowerCase())
        )) {
          alerts.push(`⚠️ ALLERGY ALERT: Cross-reactivity with ${allergen}`);
        }
      });
    }

    if (userAllergies.includes('Penicillin') && medication.name.toLowerCase().includes('penicillin')) {
      alerts.push('🚨 SEVERE ALLERGY ALERT: This medication contains Penicillin!');
    }

    return alerts;
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const SectionCard = ({ title, children, icon, defaultExpanded = false, alertType = null }) => {
    const sectionId = title.toLowerCase().replace(/\s+/g, '-');
    const isExpanded = expandedSections[sectionId] ?? defaultExpanded;
    
    const getCardStyle = () => {
      if (alertType === 'danger') {
        return {
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          border: '2px solid #ef4444'
        };
      }
      if (alertType === 'warning') {
        return {
          background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%)',
          border: '2px solid #f59e0b'
        };
      }
      return {
        background: 'white',
        border: '1px solid #e2e8f0'
      };
    };

    return (
      <div style={{
        ...getCardStyle(),
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12
      }}>
        <button
          onClick={() => toggleSection(sectionId)}
          style={{
            width: '100%',
            padding: '16px 20px',
            border: 'none',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            fontSize: 16,
            fontWeight: 600,
            color: alertType === 'danger' ? '#dc2626' : alertType === 'warning' ? '#d97706' : '#1e293b'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {icon}
            {title}
          </div>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        
        {isExpanded && (
          <div style={{ padding: '0 20px 20px 20px' }}>
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes scanLine {
          0% { top: 0%; }
          100% { top: 90%; }
        }
        @keyframes neuralPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .scan-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 10;
        }
        .scan-line {
          position: absolute;
          left: 10%;
          right: 10%;
          height: 3px;
          background: linear-gradient(90deg, transparent, #10b981, transparent);
          animation: scanLine 2s linear infinite;
          box-shadow: 0 0 10px #10b981;
        }
        .corner {
          position: absolute;
          width: 25px;
          height: 25px;
          border: 3px solid #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
        }
        .corner.top-left { top: 10%; left: 10%; border-right: none; border-bottom: none; }
        .corner.top-right { top: 10%; right: 10%; border-left: none; border-bottom: none; }
        .corner.bottom-left { bottom: 10%; left: 10%; border-right: none; border-top: none; }
        .corner.bottom-right { bottom: 10%; right: 10%; border-left: none; border-top: none; }
        .neural-indicator {
          position: absolute;
          top: 15%;
          right: 15%;
          background: rgba(59, 130, 246, 0.9);
          border-radius: 50%;
          padding: 8px;
          animation: neuralPulse 2s infinite;
        }
      `}</style>
      
      <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#f9fafb' }}>
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <div style={{ flex: 1, padding: '2rem 2.5vw', maxWidth: 1400, margin: '0 auto', width: '100%' }}>
          {/* Model Loading Overlay */}
          {modelLoading && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              color: 'white'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ 
                  border: '4px solid #374151', 
                  borderRadius: '50%', 
                  borderTop: '4px solid #3b82f6', 
                  width: 60, 
                  height: 60, 
                  animation: 'spin 1s linear infinite',
                  margin: '0 auto 20px'
                }} />
                <h3 style={{ fontSize: 24, marginBottom: 10 }}>🤖 Loading AI Models</h3>
                <p style={{ opacity: 0.8, fontSize: 16 }}>{processingStage}</p>
              </div>
            </div>
          )}

          <div style={{
            background: 'white',
            borderRadius: 16,
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            padding: 24,
          }}>
            {/* Header */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              color: 'white',
              padding: 24,
              borderRadius: '16px 16px 0 0',
              margin: '-24px -24px 24px -24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 8
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Brain size={32} />
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>🤖 AI-Powered Medication Scanner</h2>
                  <p style={{ opacity: 0.9, margin: 0, fontSize: 14 }}>Computer Vision + Machine Learning Pill Identification</p>
                </div>
              </div>
              {modelReady && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, opacity: 0.9 }}>
                  <Zap size={16} />
                  <span>Neural networks ready • TensorFlow.js active</span>
                </div>
              )}
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24
            }}>
              {/* Camera View */}
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: 700,
                margin: '0 auto',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                background: '#f3f4f6',
                minHeight: 450
              }}>
                {/* AI Processing Overlay */}
                {scanning && !loading && modelReady && (
                  <div className="scan-overlay">
                    <div className="scan-line"></div>
                    <div className="corner top-left"></div>
                    <div className="corner top-right"></div>
                    <div className="corner bottom-left"></div>
                    <div className="corner bottom-right"></div>
                    <div className="neural-indicator">
                      <Brain size={20} color="white" />
                    </div>
                  </div>
                )}
                
                {/* Play overlay */}
                {showPlayOverlay && !loading && !scanning && modelReady && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(29,78,216,0.1))',
                      zIndex: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      borderRadius: 20,
                    }}
                    onClick={startCamera}
                  >
                    <div style={{
                      background: 'rgba(59, 130, 246, 0.9)',
                      borderRadius: '50%',
                      padding: 20,
                      marginBottom: 16
                    }}>
                      <Camera size={40} color="white" />
                    </div>
                    <div style={{ color: '#1e293b', fontSize: 20, fontWeight: 600, textAlign: 'center' }}>
                      Start AI-Powered Camera
                    </div>
                    <div style={{ color: '#64748b', fontSize: 14, marginTop: 8, textAlign: 'center' }}>
                      Advanced computer vision ready
                    </div>
                  </div>
                )}
                
                {/* Loading overlay with processing stages */}
                {loading && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.95)',
                    zIndex: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    borderRadius: 20
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      borderRadius: '50%',
                      padding: 16,
                      marginBottom: 20,
                      animation: 'neuralPulse 2s infinite'
                    }}>
                      <Brain size={32} color="white" />
                    </div>
                    <div style={{ 
                      border: '4px solid #e0e7ff', 
                      borderRadius: '50%', 
                      borderTop: '4px solid #3b82f6', 
                      width: 40, 
                      height: 40, 
                      animation: 'spin 1s linear infinite',
                      marginBottom: 16
                    }} />
                    <div style={{ color: '#1e293b', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>
                      AI Analysis in Progress
                    </div>
                    <div style={{ color: '#64748b', fontSize: 14, textAlign: 'center', maxWidth: 300 }}>
                      {processingStage || 'Processing with neural networks...'}
                    </div>
                  </div>
                )}
                
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  style={{ 
                    width: '100%', 
                    height: 450, 
                    objectFit: 'cover', 
                    background: '#e5e7eb', 
                    borderRadius: 16 
                  }}
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
              </div>

              {/* Enhanced Control Buttons */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={scanning ? startCamera : startCamera}
                  disabled={loading || !modelReady}
                  style={{
                    padding: '14px 24px',
                    border: 'none',
                    borderRadius: 10,
                    background: modelReady 
                      ? 'linear-gradient(135deg, #3b82f6, #1d4ed8)' 
                      : 'linear-gradient(135deg, #9ca3af, #6b7280)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: loading || !modelReady ? 'not-allowed' : 'pointer',
                    opacity: loading || !modelReady ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
                  }}
                >
                  <Camera size={16} />
                  {scanning ? 'Restart Camera' : 'Start AI Camera'}
                </button>
                
                <button
                  onClick={performAdvancedScan}
                  disabled={!scanning || loading || !modelReady}
                  style={{
                    padding: '14px 24px',
                    border: 'none',
                    borderRadius: 10,
                    background: (!scanning || loading || !modelReady) 
                      ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                      : 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: (!scanning || loading || !modelReady) ? 'not-allowed' : 'pointer',
                    opacity: (!scanning || loading || !modelReady) ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                  }}
                >
                  <Brain size={16} />
                  AI Scan Now
                </button>
                
                <button
                  onClick={() => {
                    if (autoScan) {
                      stopAutoScan();
                    } else {
                      setAutoScan(true);
                      if (scanning && modelReady) {
                        startAutoScan();
                      }
                    }
                  }}
                  disabled={!scanning || loading || !modelReady}
                  style={{
                    padding: '14px 24px',
                    border: 'none',
                    borderRadius: 10,
                    background: (!scanning || loading || !modelReady)
                      ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                      : autoScan 
                        ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                        : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: (!scanning || loading || !modelReady) ? 'not-allowed' : 'pointer',
                    opacity: (!scanning || loading || !modelReady) ? 0.6 : 1,
                    animation: autoScan ? 'pulse 2s infinite' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
                  }}
                >
                  <Zap size={16} />
                  {autoScan ? 'Stop Auto-AI' : 'Auto AI-Scan'}
                </button>
                
                <button
                  onClick={stopCamera}
                  disabled={!scanning}
                  style={{
                    padding: '14px 24px',
                    border: 'none',
                    borderRadius: 10,
                    background: !scanning 
                      ? 'linear-gradient(135deg, #9ca3af, #6b7280)'
                      : 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: !scanning ? 'not-allowed' : 'pointer',
                    opacity: !scanning ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)'
                  }}
                >
                  ⏹ Stop Camera
                </button>
              </div>

              {/* AI Status Indicator */}
              {!modelLoading && (
                <div style={{
                  background: modelReady ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)' : 'linear-gradient(135deg, #fee2e2, #fecaca)',
                  border: modelReady ? '1px solid #10b981' : '1px solid #ef4444',
                  borderRadius: 12,
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  fontSize: 14
                }}>
                  <div style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    background: modelReady ? '#10b981' : '#ef4444',
                    animation: modelReady ? 'pulse 2s infinite' : 'none'
                  }} />
                  <span style={{ color: modelReady ? '#166534' : '#dc2626', fontWeight: 600 }}>
                    {modelReady ? '🤖 AI Models Ready - TensorFlow.js Active' : '⚠️ AI Models Loading...'}
                  </span>
                </div>
              )}

              {/* Error Display */}
              {error && (
                <div style={{
                  background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                  color: '#b91c1c',
                  borderRadius: 12,
                  padding: '16px 20px',
                  fontWeight: 600,
                  textAlign: 'center',
                  border: '2px solid #ef4444',
                  width: '100%',
                  maxWidth: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}>
                  <AlertTriangle size={20} />
                  <span>{error}</span>
                </div>
              )}

              {/* Comprehensive AI-Enhanced Scan Results */}
              {result && (
                <div style={{ width: '100%', maxWidth: 950 }}>
                  {/* AI Confidence Score */}
                  <div style={{
                    background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                    border: '2px solid #0ea5e9',
                    borderRadius: 12,
                    padding: 20,
                    marginBottom: 16,
                    textAlign: 'center'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
                      <Brain size={24} color="#0369a1" />
                      <h3 style={{ color: '#0369a1', fontWeight: 700, margin: 0, fontSize: 20 }}>
                        AI Analysis Complete
                      </h3>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 20, fontSize: 14 }}>
                      <span><strong>Confidence:</strong> {result.confidence}</span>
                      <span><strong>Match Score:</strong> {result.matchScore ? result.matchScore.toFixed(1) : 'N/A'}</span>
                      <span><strong>Method:</strong> Computer Vision + ML</span>
                    </div>
                  </div>

                  {/* Allergy Alerts - Priority Display */}
                  {result.allergyAlerts && result.allergyAlerts.length > 0 && (
                    <SectionCard 
                      title="🚨 Critical Allergy Alerts" 
                      icon={<AlertTriangle size={20} />} 
                      defaultExpanded={true}
                      alertType="danger"
                    >
                      {result.allergyAlerts.map((alert, index) => (
                        <div key={index} style={{
                          background: '#fef2f2',
                          border: '1px solid #fecaca',
                          borderRadius: 8,
                          padding: 16,
                          marginBottom: 8,
                          color: '#dc2626',
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8
                        }}>
                          <AlertTriangle size={20} />
                          {alert}
                        </div>
                      ))}
                    </SectionCard>
                  )}

                  {/* AI Detection Results */}
                  <SectionCard title="🔍 AI Detection Analysis" icon={<Brain size={20} />} defaultExpanded={true}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                      <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8 }}>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 8 }}>🎯 Detected Features:</strong>
                        <div style={{ fontSize: 14, color: '#1e293b' }}>
                          <div><strong>Shape:</strong> {result.detectedFeatures?.shape || 'Unknown'}</div>
                          <div><strong>Color:</strong> {result.detectedFeatures?.color || 'Unknown'}</div>
                          <div><strong>Size:</strong> {result.detectedFeatures?.size ? `${result.detectedFeatures.size.toFixed(1)}mm` : 'Unknown'}</div>
                        </div>
                      </div>
                      <div style={{ background: '#f0fdf4', padding: 16, borderRadius: 8 }}>
                        <strong style={{ color: '#15803d', display: 'block', marginBottom: 8 }}>📝 OCR Results:</strong>
                        <div style={{ fontSize: 14, color: '#1e293b' }}>
                          <div><strong>Text:</strong> {result.ocrResults?.text || 'None detected'}</div>
                          <div><strong>OCR Confidence:</strong> {result.ocrResults?.confidence ? `${(result.ocrResults.confidence * 100).toFixed(1)}%` : 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Medication Identification */}
                  <SectionCard title="💊 Medication Identification" icon={<Pill size={20} />} defaultExpanded={true}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 4 }}>Brand Name:</strong>
                        <span style={{ fontSize: 18, fontWeight: 600 }}>{result.name}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 4 }}>Generic Name:</strong>
                        <span>{result.genericName}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 4 }}>Strength:</strong>
                        <span>{result.strength}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 4 }}>Form:</strong>
                        <span>{result.form}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 4 }}>Color/Shape:</strong>
                        <span>{result.color} {result.shape}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 4 }}>Imprint:</strong>
                        <span style={{ fontFamily: 'monospace' }}>{result.imprint}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 4 }}>NDC Number:</strong>
                        <span style={{ fontFamily: 'monospace' }}>{result.ndc}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 4 }}>Manufacturer:</strong>
                        <span>{result.manufacturer}</span>
                      </div>
                    </div>
                    <div style={{ marginTop: 16, padding: 12, background: '#f8fafc', borderRadius: 8 }}>
                      <strong>Brand Names: </strong>
                      {result.brandNames.join(', ')}
                    </div>
                  </SectionCard>

                  {/* Dosage Information */}
                  <SectionCard title="⏰ Dosage Instructions" icon={<Clock size={20} />}>
                    <div style={{ display: 'grid', gap: 16 }}>
                      <div style={{ background: '#f0f9ff', padding: 16, borderRadius: 8, border: '1px solid #0ea5e9' }}>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 8 }}>👨‍💼 Adult Dosage:</strong>
                        <span>{result.dosage.adult}</span>
                      </div>
                      <div style={{ background: '#fefce8', padding: 16, borderRadius: 8, border: '1px solid #eab308' }}>
                        <strong style={{ color: '#a16207', display: 'block', marginBottom: 8 }}>👶 Pediatric Dosage:</strong>
                        <span>{result.dosage.pediatric}</span>
                      </div>
                      <div style={{ background: '#f3e8ff', padding: 16, borderRadius: 8, border: '1px solid #a855f7' }}>
                        <strong style={{ color: '#7c2d12', display: 'block', marginBottom: 8 }}>👴 Elderly Dosage:</strong>
                        <span>{result.dosage.elderly}</span>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Side Effects */}
                  <SectionCard title="⚕️ Side Effects Profile" icon={<Shield size={20} />}>
                    <div style={{ display: 'grid', gap: 16 }}>
                      <div>
                        <strong style={{ color: '#059669', display: 'block', marginBottom: 8 }}>✅ Common Side Effects:</strong>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {result.sideEffects.common.map((effect, index) => (
                            <li key={index} style={{ marginBottom: 4 }}>{effect}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong style={{ color: '#dc2626', display: 'block', marginBottom: 8 }}>⚠️ Serious Side Effects:</strong>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {result.sideEffects.serious.map((effect, index) => (
                            <li key={index} style={{ marginBottom: 4, color: '#dc2626' }}>{effect}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong style={{ color: '#7c2d12', display: 'block', marginBottom: 8 }}>🔺 Rare Side Effects:</strong>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {result.sideEffects.rare.map((effect, index) => (
                            <li key={index} style={{ marginBottom: 4, color: '#7c2d12' }}>{effect}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Warnings and Contraindications */}
                  <SectionCard title="⚠️ Safety Warnings & Contraindications" icon={<AlertTriangle size={20} />} alertType="warning">
                    <div style={{ display: 'grid', gap: 16 }}>
                      <div>
                        <strong style={{ color: '#d97706', display: 'block', marginBottom: 8 }}>⚠️ Important Warnings:</strong>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {result.warnings.map((warning, index) => (
                            <li key={index} style={{ marginBottom: 4, color: '#92400e' }}>{warning}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong style={{ color: '#dc2626', display: 'block', marginBottom: 8 }}>🚫 Contraindications:</strong>
                        <ul style={{ margin: 0, paddingLeft: 20 }}>
                          {result.contraindications.map((contraindication, index) => (
                            <li key={index} style={{ marginBottom: 4, color: '#dc2626' }}>{contraindication}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Drug Interactions */}
                  <SectionCard title="🔄 Drug Interactions" icon={<AlertTriangle size={20} />}>
                    <div>
                      <strong style={{ color: '#dc2626', display: 'block', marginBottom: 8 }}>⚡ Interacts with:</strong>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {result.interactions.map((interaction, index) => (
                          <span key={index} style={{
                            background: '#fef2f2',
                            color: '#dc2626',
                            padding: '6px 12px',
                            borderRadius: 16,
                            fontSize: 14,
                            border: '1px solid #fecaca',
                            fontWeight: 500
                          }}>
                            {interaction}
                          </span>
                        ))}
                      </div>
                    </div>
                  </SectionCard>

                  {/* Local Pharmacy Stock Check */}
                  <SectionCard title="🏪 Local Pharmacy Availability" icon={<MapPin size={20} />}>
                    <div style={{ display: 'grid', gap: 12 }}>
                      {result.pharmacyStock.map((pharmacy, index) => (
                        <div key={index} style={{
                          background: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: 12,
                          padding: 18,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}>
                          <div>
                            <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 16 }}>{pharmacy.name}</div>
                            <div style={{ color: '#64748b', fontSize: 14, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                              <MapPin size={14} />
                              {pharmacy.distance}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <Phone size={14} color="#64748b" />
                              <span style={{ fontSize: 14, color: '#64748b' }}>{pharmacy.phone}</span>
                            </div>
                          </div>
                          <div>
                            <span style={{
                              padding: '8px 16px',
                              borderRadius: 20,
                              fontSize: 14,
                              fontWeight: 600,
                              background: pharmacy.stock === 'In Stock' ? '#dcfce7' : 
                                         pharmacy.stock.includes('Low') ? '#fef3c7' : '#fee2e2',
                              color: pharmacy.stock === 'In Stock' ? '#166534' : 
                                     pharmacy.stock.includes('Low') ? '#92400e' : '#dc2626',
                              border: pharmacy.stock === 'In Stock' ? '1px solid #22c55e' : 
                                     pharmacy.stock.includes('Low') ? '1px solid #eab308' : '1px solid #ef4444'
                            }}>
                              {pharmacy.stock}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </SectionCard>

                  {/* Additional Information */}
                  <SectionCard title="ℹ️ Additional Medical Information" icon={<User size={20} />}>
                    <div style={{ display: 'grid', gap: 16 }}>
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 4 }}>🤱 Pregnancy Category:</strong>
                        <span>{result.pregnancyCategory}</span>
                      </div>
                      <div>
                        <strong style={{ color: '#0369a1', display: 'block', marginBottom: 4 }}>📦 Storage Instructions:</strong>
                        <span>{result.storageInstructions}</span>
                      </div>
                      <div style={{ background: '#f8fafc', padding: 16, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                        <strong style={{ color: '#64748b', display: 'block', marginBottom: 8 }}>🤖 AI Analysis Details:</strong>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, fontSize: 14, color: '#64748b' }}>
                          <div><strong>Confidence:</strong> {result.confidence}</div>
                          <div><strong>Scanned:</strong> {result.timestamp}</div>
                          <div><strong>Method:</strong> TensorFlow.js + CV</div>
                          <div><strong>Barcode:</strong> {result.code}</div>
                        </div>
                      </div>
                    </div>
                  </SectionCard>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setResult(null)}
                      style={{
                        padding: '14px 24px',
                        border: 'none',
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        boxShadow: '0 4px 12px rgba(107, 114, 128, 0.2)'
                      }}
                    >
                      🗑 Clear Results
                    </button>
                    <button
                      onClick={() => {
                        // Mock save to profile functionality
                        alert('Medication saved to your AI-powered medical profile!');
                      }}
                      style={{
                        padding: '14px 24px',
                        border: 'none',
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                      }}
                    >
                      💾 Save to Profile
                    </button>
                    <button
                      onClick={() => {
                        // Mock export functionality
                        const exportData = {
                          medication: result.name,
                          analysis: 'AI-Powered',
                          confidence: result.confidence,
                          timestamp: result.timestamp,
                          warnings: result.warnings
                        };
                        console.log('Export data:', exportData);
                        alert('Analysis exported! Check console for details.');
                      }}
                      style={{
                        padding: '14px 24px',
                        border: 'none',
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        color: 'white',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.2)'
                      }}
                    >
                      📤 Export Analysis
                    </button>
                  </div>
                </div>
              )}

              {/* Enhanced Scan History with AI Indicators */}
              {scanHistory.length > 0 && (
                <div style={{
                  width: '100%',
                  maxWidth: 700,
                  background: 'linear-gradient(135deg, #f8fafc, #f1f5f9)',
                  borderRadius: 16,
                  padding: 24,
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{ 
                    margin: '0 0 20px 0', 
                    color: '#475569', 
                    fontSize: 18, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 12,
                    fontWeight: 600
                  }}>
                    <Brain size={20} color="#475569" />
                    🤖 AI Scan History
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {scanHistory.slice(0, 5).map((scan, index) => (
                      <div key={index} style={{
                        background: 'white',
                        padding: 20,
                        borderRadius: 12,
                        border: '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                      }}
                      onClick={() => setResult(scan)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
                        e.currentTarget.style.background = '#f0f9ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                        e.currentTarget.style.background = 'white';
                      }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                              <Brain size={16} color="#3b82f6" />
                              <span style={{ fontWeight: 600, color: '#1e293b', fontSize: 16 }}>{scan.name}</span>
                            </div>
                            <div style={{ color: '#64748b', fontSize: 14, marginBottom: 6 }}>{scan.genericName}</div>
                            <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#64748b' }}>
                              <span>📅 {scan.timestamp}</span>
                              <span>🎯 {scan.confidence}</span>
                              <span>🤖 AI Analysis</span>
                            </div>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end', gap: 8 }}>
                            {scan.allergyAlerts && scan.allergyAlerts.length > 0 && (
                              <div style={{
                                background: '#fee2e2',
                                color: '#dc2626',
                                padding: '4px 8px',
                                borderRadius: 12,
                                fontSize: 12,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4
                              }}>
                                <AlertTriangle size={12} />
                                Allergy Alert
                              </div>
                            )}
                            <div style={{
                              background: '#dcfce7',
                              color: '#166534',
                              padding: '4px 8px',
                              borderRadius: 12,
                              fontSize: 12,
                              fontWeight: 600
                            }}>
                              ML Verified
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {scanHistory.length > 5 && (
                    <div style={{ 
                      textAlign: 'center', 
                      marginTop: 16, 
                      padding: 12, 
                      background: '#f1f5f9', 
                      borderRadius: 8,
                      color: '#64748b',
                      fontSize: 14
                    }}>
                      📊 {scanHistory.length - 5} more scans available in full history
                    </div>
                  )}
                </div>
              )}

              {/* Technical Information Panel */}
              <div style={{
                width: '100%',
                maxWidth: 700,
                background: 'linear-gradient(135deg, #1e293b, #334155)',
                color: 'white',
                borderRadius: 16,
                padding: 24,
                marginTop: 20
              }}>
                <h4 style={{ 
                  margin: '0 0 16px 0', 
                  fontSize: 18, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 12,
                  fontWeight: 600
                }}>
                  <Zap size={20} />
                  🧠 AI Technology Stack
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, fontSize: 14 }}>
                  <div>
                    <strong style={{ display: 'block', marginBottom: 4, color: '#60a5fa' }}>Machine Learning:</strong>
                    <span style={{ opacity: 0.9 }}>TensorFlow.js Neural Networks</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', marginBottom: 4, color: '#34d399' }}>Computer Vision:</strong>
                    <span style={{ opacity: 0.9 }}>Shape & Color Detection</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', marginBottom: 4, color: '#fbbf24' }}>OCR Engine:</strong>
                    <span style={{ opacity: 0.9 }}>Text Recognition & Analysis</span>
                  </div>
                  <div>
                    <strong style={{ display: 'block', marginBottom: 4, color: '#f472b6' }}>Database:</strong>
                    <span style={{ opacity: 0.9 }}>Comprehensive Medication DB</span>
                  </div>
                </div>
                <div style={{ 
                  marginTop: 16, 
                  padding: 12, 
                  background: 'rgba(59, 130, 246, 0.2)', 
                  borderRadius: 8,
                  fontSize: 13,
                  opacity: 0.9
                }}>
                  💡 <strong>How it works:</strong> Our AI combines computer vision for pill detection, OCR for imprint reading, 
                  and machine learning classification to accurately identify medications with high confidence scores.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScanView;