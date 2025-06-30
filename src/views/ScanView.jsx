import React, { useRef, useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';

const ScanView = ({ setCurrentPage, currentPage = 'scan' }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const scanIntervalRef = useRef(null);
  
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [scanHistory, setScanHistory] = useState([]);

  // Mock barcode patterns for simulation
  const mockBarcodes = [
    {
      code: '1234567890123',
      name: 'Paracetamol 500mg',
      activeIngredient: 'Paracetamol',
      dosage: '1 tablet every 6 hours',
      manufacturer: 'Generic Pharma',
      warnings: 'Do not exceed 8 tablets in 24 hours'
    },
    {
      code: '9876543210987',
      name: 'Ibuprofen 200mg',
      activeIngredient: 'Ibuprofen',
      dosage: '1-2 tablets every 4-6 hours',
      manufacturer: 'Pain Relief Co.',
      warnings: 'Take with food to avoid stomach irritation'
    },
    {
      code: '5555555555555',
      name: 'Aspirin 100mg',
      activeIngredient: 'Acetylsalicylic Acid',
      dosage: '1 tablet daily',
      manufacturer: 'Cardio Health Ltd.',
      warnings: 'Consult doctor if on blood thinners'
    }
  ];

  // Cleanup function
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

  // Auto-start camera on mount
  useEffect(() => {
    let isMounted = true;
    
    const checkPermissionAndStart = async () => {
      setLoading(true);
      setError('');
      setResult(null);
      
      try {
        // Check if camera permission is already granted
        if (navigator.permissions) {
          const permissionStatus = await navigator.permissions.query({ name: 'camera' });
          if (permissionStatus.state === 'granted' && isMounted) {
            await startCamera();
          } else {
            setShowPlayOverlay(true);
          }
        } else {
          // Fallback for browsers that don't support permissions API
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
  }, [cleanup]);

  const startCamera = async () => {
    setError('');
    setResult(null);
    setLoading(true);
    
    try {
      // Stop any existing stream first
      cleanup();
      
      const constraints = {
        video: {
          facingMode: 'environment', // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await new Promise((resolve, reject) => {
          videoRef.current.onloadedmetadata = resolve;
          videoRef.current.onerror = reject;
          setTimeout(reject, 5000); // 5 second timeout
        });
        await videoRef.current.play();
      }
      
      setScanning(true);
      setShowPlayOverlay(false);
      
      // Start auto-scanning if enabled
      if (autoScan) {
        startAutoScan();
      }
      
    } catch (err) {
      console.error('Camera error:', err);
      setError('Camera access denied or not available. Please check your browser settings and ensure no other app is using the camera.');
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
      if (scanning && !loading) {
        performScan();
      }
    }, 2000); // Scan every 2 seconds
  };

  const stopAutoScan = () => {
    setAutoScan(false);
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  // Enhanced scan function with better simulation
  const performScan = async () => {
    if (!scanning) {
      setError('Start the camera first.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Simulate scanning process with canvas capture
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const video = videoRef.current;
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        // Randomly select a mock barcode result
        const randomIndex = Math.floor(Math.random() * mockBarcodes.length);
        const scannedItem = mockBarcodes[randomIndex];
        
        const scanResult = {
          ...scannedItem,
          timestamp: new Date().toLocaleString(),
          confidence: (85 + Math.random() * 15).toFixed(1) + '%'
        };
        
        setResult(scanResult);
        
        // Add to scan history
        setScanHistory(prev => [scanResult, ...prev.slice(0, 9)]); // Keep last 10 scans
        
        // Stop auto-scan after successful scan
        if (autoScan) {
          stopAutoScan();
        }
      }
    } catch (err) {
      setError('Failed to process scan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualScan = () => {
    performScan();
  };

  const toggleAutoScan = () => {
    if (autoScan) {
      stopAutoScan();
    } else {
      setAutoScan(true);
      if (scanning) {
        startAutoScan();
      }
    }
  };

  const clearResults = () => {
    setResult(null);
    setError('');
  };

  const retryCamera = () => {
    setError('');
    startCamera();
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
          height: 2px;
          background: linear-gradient(90deg, transparent, #10b981, transparent);
          animation: scanLine 2s linear infinite;
        }
        .corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid #10b981;
        }
        .corner.top-left {
          top: 10%;
          left: 10%;
          border-right: none;
          border-bottom: none;
        }
        .corner.top-right {
          top: 10%;
          right: 10%;
          border-left: none;
          border-bottom: none;
        }
        .corner.bottom-left {
          bottom: 10%;
          left: 10%;
          border-right: none;
          border-top: none;
        }
        .corner.bottom-right {
          bottom: 10%;
          right: 10%;
          border-left: none;
          border-top: none;
        }
      `}</style>
      <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', background: '#f9fafb' }}>
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div style={{ flex: 1, padding: '2rem 2.5vw', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
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
              <h2 style={{ fontSize: 24, fontWeight: 'bold', margin: 0 }}>🔬 AR Pill/Barcode Scanner</h2>
              <p style={{ opacity: 0.9, margin: 0 }}>Scan medications or barcodes and get instant information</p>
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
                maxWidth: 600,
                margin: '0 auto',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                background: '#f3f4f6',
                minHeight: 400
              }}>
                {/* Scan overlay with animation */}
                {scanning && !loading && (
                  <div className="scan-overlay">
                    <div className="scan-line"></div>
                    <div className="corner top-left"></div>
                    <div className="corner top-right"></div>
                    <div className="corner bottom-left"></div>
                    <div className="corner bottom-right"></div>
                  </div>
                )}
                {/* Play overlay */}
                {showPlayOverlay && !loading && !scanning && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(59,130,246,0.10)',
                      zIndex: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      borderRadius: 20,
                    }}
                    tabIndex={0}
                    aria-label="Click to allow camera access"
                    onClick={startCamera}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') startCamera(); }}
                  >
                    <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="35" cy="35" r="35" fill="#e0e7ff" fillOpacity="0.9" />
                      <polygon points="28,22 52,35 28,48" fill="#3b82f6" />
                    </svg>
                    <div style={{ color: '#1e293b', fontSize: 20, marginTop: 18, fontWeight: 600, textAlign: 'center' }}>
                      Click or tap to allow camera access
                    </div>
                  </div>
                )}
                {/* Loading overlay */}
                {loading && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(255,255,255,0.85)',
                    zIndex: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    borderRadius: 20
                  }}>
                    <div style={{ 
                      border: '4px solid #e0e7ff', 
                      borderRadius: '50%', 
                      borderTop: '4px solid #3b82f6', 
                      width: 36, 
                      height: 36, 
                      animation: 'spin 1s linear infinite' 
                    }} />
                    <div style={{ marginTop: 10, color: '#1e293b' }}>Processing scan...</div>
                  </div>
                )}
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  aria-label="Live camera feed"
                  style={{ 
                    width: '100%', 
                    height: 400, 
                    objectFit: 'cover', 
                    background: '#e5e7eb', 
                    borderRadius: 16 
                  }}
                />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
              </div>
              {/* Control Buttons */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', margin: '12px 0' }}>
                <button
                  onClick={scanning ? retryCamera : startCamera}
                  disabled={loading}
                  style={{
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                    boxShadow: '0 2px 8px rgba(59,130,246,0.10)'
                  }}
                >
                  📷 {scanning ? 'Restart Camera' : 'Start Camera'}
                </button>
                <button
                  onClick={handleManualScan}
                  disabled={!scanning || loading}
                  style={{
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: !scanning || loading ? 'not-allowed' : 'pointer',
                    opacity: !scanning || loading ? 0.6 : 1,
                    boxShadow: '0 2px 8px rgba(16,185,129,0.10)'
                  }}
                >
                  🔍 Scan Now
                </button>
                <button
                  onClick={toggleAutoScan}
                  disabled={!scanning || loading}
                  style={{
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: 8,
                    background: autoScan 
                      ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                      : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: !scanning || loading ? 'not-allowed' : 'pointer',
                    opacity: !scanning || loading ? 0.6 : 1,
                    boxShadow: '0 2px 8px rgba(139,92,246,0.10)',
                    animation: autoScan ? 'pulse 2s infinite' : 'none'
                  }}
                >
                  {autoScan ? '⏸ Stop Auto-Scan' : '🔄 Auto-Scan'}
                </button>
                <button
                  onClick={stopCamera}
                  disabled={!scanning}
                  style={{
                    padding: '12px 20px',
                    border: 'none',
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: !scanning ? 'not-allowed' : 'pointer',
                    opacity: !scanning ? 0.6 : 1,
                    boxShadow: '0 2px 8px rgba(239,68,68,0.10)'
                  }}
                >
                  ⏹ Stop
                </button>
                {result && (
                  <button
                    onClick={clearResults}
                    style={{
                      padding: '12px 20px',
                      border: 'none',
                      borderRadius: 8,
                      background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(107,114,128,0.10)'
                    }}
                  >
                    🗑 Clear Results
                  </button>
                )}
              </div>
              {/* Error Display */}
              {error && (
                <div
                  style={{
                    background: '#fee2e2',
                    color: '#b91c1c',
                    borderRadius: 8,
                    padding: '16px 20px',
                    fontWeight: 600,
                    margin: '8px 0',
                    textAlign: 'center',
                    border: '1px solid #fecaca',
                    width: '100%',
                    maxWidth: 500
                  }}
                  role="alert"
                  aria-live="assertive"
                >
                  ⚠️ {error}
                </div>
              )}
              {/* Scan Results */}
              {result && (
                <div style={{
                  background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                  border: '2px solid #0ea5e9',
                  borderRadius: 12,
                  padding: 24,
                  margin: '12px 0',
                  width: '100%',
                  maxWidth: 600,
                  boxShadow: '0 4px 12px rgba(14,165,233,0.15)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <h3 style={{ color: '#0369a1', fontWeight: 700, margin: 0, fontSize: 20 }}>
                      📊 Scan Results
                    </h3>
                    <span style={{
                      background: '#dcfce7',
                      color: '#166534',
                      padding: '4px 8px',
                      borderRadius: 12,
                      fontSize: 12,
                      fontWeight: 600
                    }}>
                      {result.confidence} confidence
                    </span>
                  </div>
                  <div style={{ display: 'grid', gap: 12 }}>
                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0f2fe' }}>
                      <strong style={{ color: '#0369a1', display: 'block', marginBottom: 8 }}>Medication:</strong>
                      <span style={{ fontSize: 18, fontWeight: 600, color: '#1e293b' }}>{result.name}</span>
                    </div>
                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0f2fe' }}>
                      <strong style={{ color: '#0369a1', display: 'block', marginBottom: 8 }}>Barcode:</strong>
                      <span style={{ fontFamily: 'monospace', fontSize: 16, color: '#1e293b' }}>{result.code}</span>
                    </div>
                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0f2fe' }}>
                      <strong style={{ color: '#0369a1', display: 'block', marginBottom: 8 }}>Active Ingredient:</strong>
                      <span style={{ color: '#1e293b' }}>{result.activeIngredient}</span>
                    </div>
                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0f2fe' }}>
                      <strong style={{ color: '#0369a1', display: 'block', marginBottom: 8 }}>Dosage:</strong>
                      <span style={{ color: '#1e293b' }}>{result.dosage}</span>
                    </div>
                    <div style={{ background: 'white', padding: 16, borderRadius: 8, border: '1px solid #e0f2fe' }}>
                      <strong style={{ color: '#0369a1', display: 'block', marginBottom: 8 }}>Manufacturer:</strong>
                      <span style={{ color: '#1e293b' }}>{result.manufacturer}</span>
                    </div>
                    <div style={{ background: '#fef3c7', padding: 16, borderRadius: 8, border: '1px solid #fbbf24' }}>
                      <strong style={{ color: '#92400e', display: 'block', marginBottom: 8 }}>⚠️ Warnings:</strong>
                      <span style={{ color: '#92400e' }}>{result.warnings}</span>
                    </div>
                    <div style={{ background: '#f3f4f6', padding: 12, borderRadius: 8, fontSize: 12, color: '#6b7280' }}>
                      Scanned: {result.timestamp}
                    </div>
                  </div>
                </div>
              )}
              {/* Scan History */}
              {scanHistory.length > 0 && (
                <div style={{
                  width: '100%',
                  maxWidth: 600,
                  background: '#f8fafc',
                  borderRadius: 12,
                  padding: 20,
                  border: '1px solid #e2e8f0'
                }}>
                  <h4 style={{ margin: '0 0 16px 0', color: '#475569', fontSize: 16 }}>📋 Recent Scans</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {scanHistory.slice(0, 3).map((scan, index) => (
                      <div key={index} style={{
                        background: 'white',
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid #e2e8f0',
                        fontSize: 14
                      }}>
                        <div style={{ fontWeight: 600, color: '#1e293b' }}>{scan.name}</div>
                        <div style={{ color: '#64748b', fontSize: 12 }}>{scan.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScanView;