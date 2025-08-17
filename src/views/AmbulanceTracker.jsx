// Enhanced AmbulanceTracker.jsx
import '../ambulance.css';
import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Ambulance, 
  AlertCircle, 
  Clock, 
  Navigation, 
  Route, 
  Activity, 
  Zap, 
  User, 
  Phone, 
  Mail, 
  HeartPulse,
  ChevronDown,
  ChevronUp,
  X,
  Shield,
  CheckCircle2,
  Radio,
  Target
} from 'lucide-react';

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Button = ({
  variant = 'default',
  size = 'default',
  className,
  children,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/20 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";
  const variants = {
    default: "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl",
    emergency: "bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white hover:from-red-600 hover:via-red-700 hover:to-red-800 hover:shadow-2xl hover:scale-[1.02] shadow-2xl border-2 border-red-400/30 relative overflow-hidden",
    medical: "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 shadow-md hover:shadow-lg",
    destructive: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl",
    outline: "border-2 border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-gray-50 hover:text-gray-900 shadow-md hover:shadow-lg",
    ghost: "hover:bg-white/80 hover:backdrop-blur-sm hover:shadow-md hover:text-gray-900",
    link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700"
  };
  const sizes = {
    default: "h-12 px-6 py-3",
    sm: "h-10 rounded-lg px-4",
    lg: "h-16 rounded-2xl px-12 text-lg font-bold",
    icon: "h-12 w-12"
  };
  return (
    <button
      className={cn('ambulance-btn', variant === 'secondary' && 'secondary', className)}
      {...props}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className }) => (
  <div className={cn('ambulance-container', className)}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={cn('ambulance-header', className)}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={cn('ambulance-title', className)}>{children}</h3>
);

const CardContent = ({ children, className }) => (
  <div className={cn('ambulance-section', className)}>{children}</div>
);

const Badge = ({ children, className }) => (
  <div className={cn('ambulance-info-box', className)}>{children}</div>
);

const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="ambulance-section">
      <button className="ambulance-btn secondary" type="button" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      {isOpen && (
        <div style={{ marginTop: 12 }}>{children}</div>
      )}
    </div>
  );
};

const FloatingAlert = ({ message, type = 'error', onClose }) => {
  const bgColors = {
    error: 'from-red-500 to-red-600',
    success: 'from-emerald-500 to-green-600',
    warning: 'from-amber-500 to-orange-600',
    info: 'from-blue-500 to-blue-600'
  };
  
  return (
    <div className={`fixed bottom-8 right-8 bg-gradient-to-r ${bgColors[type]} text-white px-8 py-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-right-full duration-500 backdrop-blur-xl border border-white/20 z-50`}>
      <div className="p-2 bg-white/20 rounded-full">
        <AlertCircle className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <p className="font-bold text-lg">System Alert</p>
        <p className="text-sm opacity-90">{message}</p>
      </div>
      <button 
        onClick={onClose} 
        className="p-2 rounded-full hover:bg-white/20 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

const StatusIndicator = ({ status, data }) => {
  const statusConfig = {
    dispatched: { 
      color: 'from-amber-400 to-orange-500', 
      icon: AlertCircle, 
      text: 'Dispatched',
      bgGlow: 'shadow-amber-500/30'
    },
    enroute: { 
      color: 'from-blue-500 to-indigo-600', 
      icon: Navigation, 
      text: 'En Route',
      bgGlow: 'shadow-blue-500/30'
    },
    arriving: { 
      color: 'from-orange-500 to-red-500', 
      icon: Clock, 
      text: 'Arriving Soon',
      bgGlow: 'shadow-orange-500/30'
    },
    arrived: { 
      color: 'from-emerald-500 to-green-600', 
      icon: CheckCircle2, 
      text: 'Arrived',
      bgGlow: 'shadow-emerald-500/30'
    }
  };
  
  const config = statusConfig[status] || statusConfig.dispatched;
  const Icon = config.icon;
  
  return (
    <div className={`bg-gradient-to-r ${config.color} text-white px-6 py-4 rounded-2xl shadow-2xl ${config.bgGlow} flex items-center gap-4 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 animate-pulse" />
      <div className="relative z-10 flex items-center gap-4">
        <div className="p-2 bg-white/20 rounded-xl">
          <Icon className="h-6 w-6 animate-pulse" />
        </div>
        <div>
          <h4 className="font-bold text-lg">{config.text}</h4>
          <div className="flex items-center gap-4 text-sm opacity-90">
            <span>ETA: {data.estimatedArrival}min</span>
            <span>•</span>
            <span>{data.distance?.toFixed(2)}km away</span>
            {data.progress && (
              <>
                <span>•</span>
                <span>{data.progress}% complete</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const LocationCard = ({ location, isLoading, onRefresh }) => null;

const ProgressBar = ({ progress = 0, status }) => {
  const gradients = {
    dispatched: 'from-amber-400 to-orange-500',
    enroute: 'from-blue-500 to-indigo-600',
    arriving: 'from-orange-500 to-red-500',
    arrived: 'from-emerald-500 to-green-600'
  };
  
  return (
    <div className="w-full bg-gray-200/50 rounded-full h-4 shadow-inner backdrop-blur-sm">
      <div 
        className={`bg-gradient-to-r ${gradients[status] || gradients.dispatched} h-4 rounded-full shadow-lg transition-all duration-1000 ease-out relative overflow-hidden`}
        style={{ width: `${Math.min(progress, 100)}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-shimmer" />
      </div>
    </div>
  );
};

// Add mock driver details
const mockDriver = {
  name: 'Sipho Dlamini',
  phone: '+27 82 123 4567',
  ambulanceId: 'AMB-101',
  photo: 'https://randomuser.me/api/portraits/men/75.jpg',
  experience: '7 years',
  vehicle: 'Toyota Quantum Ambulance',
  license: 'GP-AMB-2025',
};

const AmbulanceTracker = ({ onClose }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [ambulanceData, setAmbulanceData] = useState(null);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const [isAmbulanceDispatched, setIsAmbulanceDispatched] = useState(false);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 51.505, lng: -0.09 });
  const [routeData, setRouteData] = useState(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  const [showAmbulanceForm, setShowAmbulanceForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    medicalConditions: '',
    medications: '',
    allergies: ''
  });
  
  const ambulanceIntervalRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeProgressRef = useRef(0);
  
  const ORS_API_KEY = '5b3ce3597851110001cf6248b1a1d6b8c9b248f5b6e2c7e4a7b8c9d0';
  
  const requestUserLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }
    setIsRequestingLocation(true);
    setError(null);
    const options = { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserLocation(location);
        setMapCenter(location);
        setIsRequestingLocation(false);
      },
      (error) => {
        setIsRequestingLocation(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('Location access denied. Please enable location permissions.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out.');
            break;
          default:
            setError('An unknown error occurred while retrieving location.');
        }
      },
      options
    );
  };
  
  const calculateRoute = async (start, end) => {
    try {
      setIsCalculatingRoute(true);
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`
      );
      if (!response.ok) throw new Error('Failed to calculate route');
      const data = await response.json();
      const route = data.features[0];
      if (route && route.geometry && route.properties) {
        return {
          coordinates: route.geometry.coordinates,
          distance: route.properties.segments[0].distance / 1000,
          duration: route.properties.segments[0].duration / 60
        };
      }
      return null;
    } catch (error) {
      setError('Failed to calculate route. Using direct path.');
      return null;
    } finally {
      setIsCalculatingRoute(false);
    }
  };
  
  const generateInitialAmbulanceLocation = (userLoc) => {
    const distance = 0.02 + Math.random() * 0.03;
    const angle = Math.random() * 2 * Math.PI;
    return {
      lat: userLoc.lat + distance * Math.cos(angle),
      lng: userLoc.lng + distance * Math.sin(angle)
    };
  };
  
  const calculateDistance = (loc1, loc2) => {
    const R = 6371;
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLng = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) * 
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };
  
  const calculateEstimatedArrival = (distance, speed = 40) => {
    return Math.round((distance / speed) * 60);
  };
  
  const interpolatePosition = (start, end, progress) => {
    return {
      lat: start.lat + (end.lat - start.lat) * progress,
      lng: start.lng + (end.lng - start.lng) * progress
    };
  };
  
  const dispatchAmbulance = async () => {
    if (!userLocation) {
      setError('Please enable location access first.');
      return;
    }
    const initialAmbulanceLocation = generateInitialAmbulanceLocation(userLocation);
    const route = await calculateRoute(initialAmbulanceLocation, userLocation);
    const distance = route ? route.distance : calculateDistance(initialAmbulanceLocation, userLocation);
    const estimatedArrival = route ? Math.round(route.duration) : calculateEstimatedArrival(distance);
    const newAmbulanceData = {
      id: 'AMB-' + Date.now().toString().slice(-6),
      location: initialAmbulanceLocation,
      speed: 45,
      estimatedArrival,
      status: 'dispatched',
      distance,
      startTime: Date.now(),
      contactInfo: { ...formData },
      driver: mockDriver // Attach driver details
    };
    setAmbulanceData(newAmbulanceData);
    setIsAmbulanceDispatched(true);
    setRouteData(route);
    routeProgressRef.current = 0;
    startAmbulanceMovement(newAmbulanceData, route);
  };
  
  const startAmbulanceMovement = (initialAmbulanceData, route) => {
    if (ambulanceIntervalRef.current) clearInterval(ambulanceIntervalRef.current);
    
    const routeCoords = route ? route.coordinates.map(coord => ({ lat: coord[1], lng: coord[0] })) : [];
    const totalDistance = route ? route.distance : calculateDistance(initialAmbulanceData.location, userLocation);
    const totalDuration = route ? route.duration : calculateEstimatedArrival(totalDistance, 45) / 60;
    const stepInterval = 1500;
    const totalSteps = Math.floor((totalDuration * 60 * 1000) / stepInterval);
    
    let currentStep = 0;
    
    ambulanceIntervalRef.current = setInterval(() => {
      setAmbulanceData(prevData => {
        if (!prevData || !userLocation) return prevData;
        
        currentStep++;
        const progress = Math.min(currentStep / totalSteps, 1);
        
        let newLocation;
        let currentDistance;
        
        if (routeCoords.length > 0) {
          const routeIndex = Math.floor(progress * (routeCoords.length - 1));
          const nextIndex = Math.min(routeIndex + 1, routeCoords.length - 1);
          const localProgress = (progress * (routeCoords.length - 1)) - routeIndex;
          
          if (routeIndex < routeCoords.length - 1) {
            newLocation = interpolatePosition(routeCoords[routeIndex], routeCoords[nextIndex], localProgress);
          } else {
            newLocation = routeCoords[routeCoords.length - 1];
          }
        } else {
          newLocation = interpolatePosition(initialAmbulanceData.location, userLocation, progress);
        }
        
        currentDistance = calculateDistance(newLocation, userLocation);
        
        let newStatus = 'dispatched';
        if (progress >= 0.95 || currentDistance < 0.05) {
          clearInterval(ambulanceIntervalRef.current);
          newStatus = 'arrived';
          currentDistance = 0;
        } else if (progress >= 0.8 || currentDistance < 0.3) {
          newStatus = 'arriving';
        } else if (progress >= 0.2) {
          newStatus = 'enroute';
        }
        
        const remainingTime = Math.max(0, Math.round(totalDuration * (1 - progress)));
        
        return {
          ...prevData,
          location: newLocation,
          estimatedArrival: remainingTime,
          status: newStatus,
          distance: currentDistance,
          progress: Math.round(progress * 100)
        };
      });
    }, stepInterval);
  };
  
  const handleDispatchAmbulance = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber) {
      setError('Please fill in at least your name and phone number');
      return;
    }
    setShowAmbulanceForm(false);
    dispatchAmbulance();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const OpenStreetMap = ({ center, userLocation, ambulanceData, routeData, onMapReady }) => {
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markersRef = useRef([]);
    const routeLayerRef = useRef(null);
    
    useEffect(() => {
      if (!mapRef.current) return;
      // Remove any previous map instance on this container
      if (mapRef.current._leaflet_id) {
        try {
          mapRef.current.innerHTML = '';
        } catch (e) {}
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      const loadLeaflet = async () => {
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
          document.head.appendChild(link);
        }
        if (!window.L) {
          await new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
            script.onload = resolve;
            document.head.appendChild(script);
          });
        }
        const L = window.L;
        const map = L.map(mapRef.current).setView([center.lat, center.lng], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);
        mapInstanceRef.current = map;
        onMapReady(map);
      };
      loadLeaflet();
      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }, []);
    
    useEffect(() => {
      if (!mapInstanceRef.current || !window.L) return;
      const L = window.L;
      const map = mapInstanceRef.current;
      markersRef.current.forEach(marker => map.removeLayer(marker));
      markersRef.current = [];
      if (routeLayerRef.current) {
        map.removeLayer(routeLayerRef.current);
        routeLayerRef.current = null;
      }
      
      const userIcon = L.divIcon({
        className: 'custom-user-marker',
        html: `<div style="position: relative; display: flex; align-items: center; justify-content: center; width: 50px; height: 50px;">
          <div style="position: absolute; width: 50px; height: 50px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); border-radius: 50%; border: 4px solid white; box-shadow: 0 8px 32px rgba(59,130,246,0.5); z-index: 2;"></div>
          <div style="position: absolute; width: 20px; height: 20px; background: white; border-radius: 50%; z-index: 3;"></div>
          <div style="position: absolute; width: 70px; height: 70px; border: 3px solid #3b82f6; border-radius: 50%; animation: userPulse 2s infinite; opacity: 0.6;"></div>
        </div>`,
        iconSize: [50, 50],
        iconAnchor: [25, 25]
      });
      
      const ambulanceIcon = L.divIcon({
        className: 'custom-ambulance-marker',
        html: `<div style="position: relative; display: flex; align-items: center; justify-content: center; width: 56px; height: 56px;">
          <div style="position: absolute; width: 56px; height: 56px; background: linear-gradient(135deg, #ef4444, #dc2626); border-radius: 16px; border: 4px solid white; box-shadow: 0 12px 36px rgba(239,68,68,0.6); z-index: 2; transform: rotate(45deg);"></div>
          <div style="position: absolute; width: 24px; height: 24px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; z-index: 3;">
            <div style="width: 12px; height: 12px; background: #ef4444; border-radius: 50%;"></div>
          </div>
          <div style="position: absolute; width: 76px; height: 76px; border: 3px solid #ef4444; border-radius: 16px; animation: ambulancePulse 1.5s infinite; opacity: 0.7; transform: rotate(45deg);"></div>
        </div>`,
        iconSize: [56, 56],
        iconAnchor: [28, 28]
      });
      
      if (userLocation) {
        const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
          .bindPopup(`<div style="text-align: center; font-family: system-ui; padding: 12px; min-width: 200px;">
            <h3 style="margin: 0 0 12px 0; font-weight: 700; color: #1f2937; font-size: 18px;">📍 Your Location</h3>
            <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Emergency services will arrive here</p>
            <div style="margin: 12px 0; padding: 8px 12px; background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; border-radius: 12px; font-size: 12px; font-weight: 600;">
              🌍 Coordinates: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}
            </div>
            <div style="margin-top: 8px; padding: 6px 10px; background: #10b981; color: white; border-radius: 8px; font-size: 11px; font-weight: 500;">
              ✅ High Precision GPS Active
            </div>
          </div>`)
          .addTo(map);
        markersRef.current.push(userMarker);
      }
      
      if (ambulanceData) {
        const statusConfig = {
          dispatched: 'Dispatched',
          enroute: 'En Route',
          arriving: 'Arriving Soon',
          arrived: 'Arrived'
        };
        const ambulanceMarker = L.marker([ambulanceData.location.lat, ambulanceData.location.lng], { icon: ambulanceIcon })
          .bindPopup(`<div style="text-align: center; font-family: system-ui; padding: 16px; min-width: 250px;">
            <h3 style="margin: 0 0 12px 0; font-weight: 700; color: #1f2937; font-size: 18px;">🚑 Ambulance ${ambulanceData.id}</h3>
            <div style="margin: 12px 0; padding: 8px 16px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; border-radius: 12px; font-size: 14px; font-weight: 600;">${statusConfig[ambulanceData.status] || 'Unknown'}</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; color: #4b5563; margin-top: 12px;">
              <div style="padding: 6px 10px; background: #f3f4f6; border-radius: 8px;">
                <div style="font-weight: 600; color: #374151;">⏱️ ETA</div>
                <div style="font-weight: 700; color: #ef4444;">${ambulanceData.estimatedArrival} min</div>
              </div>
              <div style="padding: 6px 10px; background: #f3f4f6; border-radius: 8px;">
                <div style="font-weight: 600; color: #374151;">📏 Distance</div>
                <div style="font-weight: 700; color: #059669;">${ambulanceData.distance.toFixed(2)} km</div>
              </div>
              <div style="padding: 6px 10px; background: #f3f4f6; border-radius: 8px;">
                <div style="font-weight: 600; color: #374151;">🚀 Speed</div>
                <div style="font-weight: 700; color: #3b82f6;">${ambulanceData.speed} km/h</div>
              </div>
              ${ambulanceData.progress ? `<div style="padding: 6px 10px; background: #f3f4f6; border-radius: 8px;">
                <div style="font-weight: 600; color: #374151;">📊 Progress</div>
                <div style="font-weight: 700; color: #7c3aed;">${ambulanceData.progress}%</div>
              </div>` : ''}
            </div>
          </div>`)
          .addTo(map);
        markersRef.current.push(ambulanceMarker);
      }
      
      if (routeData && routeData.coordinates.length > 0) {
        const routeCoords = routeData.coordinates.map(coord => [coord[1], coord[0]]);
        routeLayerRef.current = L.polyline(routeCoords, {
          color: '#ef4444',
          weight: 6,
          opacity: 0.9,
          dashArray: '15, 10',
          lineCap: 'round',
          lineJoin: 'round',
          className: 'pulsing-route'
        }).addTo(map);
      }
      
      if (userLocation && ambulanceData) {
        const group = L.featureGroup(markersRef.current);
        if (routeLayerRef.current) {
          group.addLayer(routeLayerRef.current);
        }
        map.fitBounds(group.getBounds().pad(0.15));
      }
    }, [userLocation, ambulanceData, routeData]);
    
    useEffect(() => {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes userPulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 0.3; }
        }
        @keyframes ambulancePulse {
          0%, 100% { transform: rotate(45deg) scale(1); opacity: 0.7; }
          50% { transform: rotate(45deg) scale(1.2); opacity: 0.4; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 16px !important;
          box-shadow: 0 20px 64px rgba(0,0,0,0.15) !important;
          border: 2px solid rgba(255,255,255,0.2) !important;
        }
        .leaflet-popup-tip {
          box-shadow: 0 4px 16px rgba(0,0,0,0.1) !important;
        }
        .pulsing-route {
          filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.6));
        }
      `;
      document.head.appendChild(style);
      return () => document.head.removeChild(style);
    }, []);
    
    return (
      <div ref={mapRef} className="w-full h-full rounded-2xl border-4 border-white/30 shadow-2xl" style={{ minHeight: '700px' }} />
    );
  };
  
  const handleMapReady = (map) => {
    mapInstanceRef.current = map;
  };


  useEffect(() => {
    return () => {
      if (ambulanceIntervalRef.current) clearInterval(ambulanceIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    requestUserLocation();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white via-blue-50 to-indigo-100 p-6 relative overflow-hidden" style={{ zIndex: 1001 }}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-red-200/20 to-red-300/10 rounded-full -ml-48 -mt-48" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-200/20 to-indigo-300/10 rounded-full -mr-40 -mb-40" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full" />

      {/* Main content only, no modal or form */}
      {
        <div className="max-w-8xl mx-auto space-y-10 relative z-10">
          <Card className="border-red-200/50 shadow-2xl bg-gradient-to-br from-white/95 via-red-50/50 to-white/95 backdrop-blur-xl">
            <CardHeader className="ambulance-header-custom">
              <div className="ambulance-header-bg" />
              <div className="ambulance-header-content">
                <div className="ambulance-header-icon">
                  <Ambulance className="ambulance-header-ambulance-icon" />
                </div>
                <div className="ambulance-header-title-group">
                  <h1 className="ambulance-header-title">Emergency Ambulance Tracker</h1>
                  <p className="ambulance-header-subtitle">Real-time emergency response system</p>
                </div>
                <button 
                  onClick={onClose}
                  className="ambulance-header-close"
                  aria-label="Close"
                >
                  <X className="ambulance-header-close-icon" />
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-10">
              {ambulanceData && (
                <div className="space-y-6">
                  <StatusIndicator status={ambulanceData.status} data={ambulanceData} />
                  <div className="bg-gradient-to-r from-gray-50/80 to-slate-50/80 rounded-2xl p-8 border-2 border-gray-200/50 shadow-xl backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-xl font-bold text-gray-900">Ambulance Progress</h4>
                      <span className="text-2xl font-black text-blue-600">{ambulanceData.progress || 0}%</span>
                    </div>
                    <ProgressBar progress={ambulanceData.progress} status={ambulanceData.status} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                      <div className="bg-white/80 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-200/50">
                        <div className="text-sm font-medium text-gray-600">Ambulance ID</div>
                        <div className="text-lg font-black text-blue-600">{ambulanceData.id}</div>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-200/50">
                        <div className="text-sm font-medium text-gray-600">Speed</div>
                        <div className="text-lg font-black text-green-600">{ambulanceData.speed} km/h</div>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-200/50">
                        <div className="text-sm font-medium text-gray-600">Distance</div>
                        <div className="text-lg font-black text-purple-600">{ambulanceData.distance.toFixed(2)} km</div>
                      </div>
                      <div className="bg-white/80 rounded-xl p-4 shadow-lg backdrop-blur-sm border border-gray-200/50">
                        <div className="text-sm font-medium text-gray-600">ETA</div>
                        <div className="text-lg font-black text-red-600">{ambulanceData.estimatedArrival} min</div>
                      </div>
                    </div>
                    <div className="flex justify-end mt-6">
                      <Button 
                        variant="destructive" 
                        size="lg"
                        className="shadow-xl"
                        onClick={() => {
                          setIsAmbulanceDispatched(false);
                          setAmbulanceData(null);
                          if (ambulanceIntervalRef.current) {
                            clearInterval(ambulanceIntervalRef.current);
                          }
                        }}
                      >
                        <X className="h-5 w-5 mr-2" />
                        Cancel Emergency
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <div className="rounded-2xl overflow-hidden border-4 border-white/40 shadow-2xl">
                <OpenStreetMap 
                  center={mapCenter} 
                  userLocation={userLocation} 
                  ambulanceData={ambulanceData}
                  routeData={routeData}
                  onMapReady={handleMapReady}
                />
              </div>
              <div className="flex flex-col gap-6">
                {/* Request Emergency Ambulance Button */}
                {!isAmbulanceDispatched && (
                  <div className="relative">
                    <Button
                      variant="emergency"
                      size="lg"
                      onClick={() => {
                        if (!userLocation) {
                          setError('Please enable location access first to request emergency services');
                          return;
                        }
                        dispatchAmbulance();
                      }}
                      disabled={!userLocation}
                      className="w-full py-8 text-2xl font-black tracking-wide relative overflow-hidden"
                    >
                      <div className="flex items-center justify-center gap-4 relative z-10">
                        <div className="p-2 bg-white/20 rounded-full">
                          <AlertCircle className="h-10 w-10 animate-pulse" />
                        </div>
                        <span>REQUEST EMERGENCY AMBULANCE</span>
                        <div className="p-2 bg-white/20 rounded-full">
                          <Ambulance className="h-10 w-10 animate-pulse" />
                        </div>
                      </div>
                    </Button>
                    {!userLocation && (
                      <p className="text-center text-gray-600 mt-4 text-sm bg-amber-50 border border-amber-200 rounded-lg py-2 px-4">
                        ⚠️ Please enable location access first to request emergency services
                      </p>
                    )}
                  </div>
                )}
              </div>
              {isAmbulanceDispatched && (
                <div style={{
                  background: 'linear-gradient(120deg, #fee2e2 60%, #fca5a5 100%)',
                  borderRadius: 24,
                  padding: 36,
                  margin: '32px 0',
                  border: '2.5px solid #fecaca',
                  boxShadow: '0 8px 32px 0 rgba(239,68,68,0.10)',
                  maxWidth: 1100,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 32
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
                    <div style={{ padding: 16, background: 'linear-gradient(90deg,#ef4444,#fca5a5)', borderRadius: 16, boxShadow: '0 2px 8px #fecaca80' }}>
                      <Shield className="h-8 w-8" style={{ color: '#fff' }} />
                    </div>
                    <h3 style={{ fontSize: 30, fontWeight: 900, color: '#b91c1c', letterSpacing: '-0.02em', margin: 0 }}>Emergency Safety Instructions</h3>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28, width: '100%' }}>
                    <div style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 2px 8px #fecaca40', borderLeft: '5px solid #3b82f6', minHeight: 180 }}>
                      <h4 style={{ fontWeight: 800, color: '#1e293b', marginBottom: 10, fontSize: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ background: '#dbeafe', borderRadius: 8, padding: 6 }}><Navigation className="h-6 w-6" style={{ color: '#2563eb' }} /></span>
                        Stay in Place
                      </h4>
                      <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.6 }}>
                        Remain at your current location unless it's unsafe. Moving may delay the ambulance's arrival and make it difficult for responders to find you.
                      </p>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 2px 8px #fecaca40', borderLeft: '5px solid #10b981', minHeight: 180 }}>
                      <h4 style={{ fontWeight: 800, color: '#1e293b', marginBottom: 10, fontSize: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ background: '#d1fae5', borderRadius: 8, padding: 6 }}><Activity className="h-6 w-6" style={{ color: '#10b981' }} /></span>
                        Prepare Information
                      </h4>
                      <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.6 }}>
                        Have your ID, medical information, insurance cards, and any current medications ready for the paramedics when they arrive.
                      </p>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 2px 8px #fecaca40', borderLeft: '5px solid #ef4444', minHeight: 180 }}>
                      <h4 style={{ fontWeight: 800, color: '#1e293b', marginBottom: 10, fontSize: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ background: '#fee2e2', borderRadius: 8, padding: 6 }}><Zap className="h-6 w-6" style={{ color: '#ef4444' }} /></span>
                        Clear Pathways
                      </h4>
                      <p style={{ color: '#374151', fontSize: 15, lineHeight: 1.6 }}>
                        If possible, clear a path to your location, unlock doors, turn on lights, and have someone guide the paramedics if available.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {ambulanceData && ambulanceData.status === 'arrived' ? null : null}
            </CardContent>
          </Card>
          {error && (
            <FloatingAlert 
              message={error}
              type="error"
              onClose={() => setError(null)}
              style={{ background: 'linear-gradient(90deg, #fee2e2 0%, #fca5a5 100%)' }}
            />
          )}
        </div>
      }
    </div>
  );
};

export default AmbulanceTracker;