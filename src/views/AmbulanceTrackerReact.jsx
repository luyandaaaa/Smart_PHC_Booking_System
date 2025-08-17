import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../components/Sidebar';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const navIdToRoute = {
  dashboard: '/dashboard',
  appointments: '/appointments',
  rewards: '/rewards',
  mentalHealth: '/mental-health',
  emergency: '/ambulance-tracker',
  assistant: '/assistant',
  scan: '/scan',
  community: '/community',
  healthLibrary: '/health-library',
};

const AmbulanceTracker = () => {
  // State variables
  const [currentPage, setCurrentPage] = useState('emergency');
  // Handle sidebar navigation
  const handleSidebarNav = (id) => {
    setCurrentPage(id);
    const route = navIdToRoute[id];
    if (route && window.location.pathname !== route) {
      window.location.href = route;
    }
  };
  const [userLocation, setUserLocation] = useState({
    lat: -25.731340, // Default Johannesburg coordinates
    lng: 28.218370
  });
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  const [locationStatus, setLocationStatus] = useState(
    "Location access is required for accurate ambulance dispatch"
  );
  const [showRequestPage, setShowRequestPage] = useState(true);
  const [eta, setEta] = useState(10);
  
  // Refs for map and markers
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const ambulanceMarkerRef = useRef(null);
  const ambulanceIntervalRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Check location permission on component mount
  useEffect(() => {
    checkLocationPermission();
    return () => {
      if (ambulanceIntervalRef.current) {
        clearInterval(ambulanceIntervalRef.current);
      }
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  // Re-initialize map when userLocation changes and map is visible
  useEffect(() => {
    if (!showRequestPage) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setView([userLocation.lat, userLocation.lng], 15);
        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
        }
      } else {
        initMap();
      }
    }
    // eslint-disable-next-line
  }, [userLocation, showRequestPage]);

  const checkLocationPermission = () => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted') {
          getUserLocation();
        } else if (result.state === 'prompt') {
          setLocationStatus("Please enable location access for accurate ambulance dispatch");
        } else {
          setLocationStatus("Location access is blocked. Please enable it in your browser settings.");
        }
      });
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      setLocationStatus("Accessing your location...");
      
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermissionGranted(true);
          setLocationStatus("Location access granted");
        },
        error => {
          let errorMessage = "Could not access your location. Using approximate Johannesburg location.";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access was denied. Using approximate Johannesburg location.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information unavailable. Using approximate Johannesburg location.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get location timed out. Using approximate Johannesburg location.";
              break;
          }
          setLocationStatus(errorMessage);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationStatus("Geolocation is not supported by your browser. Using approximate Johannesburg location.");
    }
  };

  const initMap = () => {
    // Initialize map if not already created
    if (!mapInstanceRef.current && mapRef.current) {
      const map = L.map(mapRef.current).setView([userLocation.lat, userLocation.lng], 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Create custom icons
      const userIcon = L.divIcon({
        className: 'user-icon',
        html: '<div style="width: 20px; height: 20px; background-color: #d32f2f; border-radius: 50%; border: 3px solid white;"></div>',
        iconSize: [26, 26],
        iconAnchor: [13, 13]
      });
      
      const ambulanceIcon = L.divIcon({
        className: 'pulse-icon',
        html: `
          <div style="position: relative; width: 40px; height: 40px;">
            <svg viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 18.5C18 19.3 17.3 20 16.5 20S15 19.3 15 18.5 15.7 17 16.5 17 18 17.7 18 18.5M19 10V14H21V10H19M6 18.5C6 19.3 5.3 20 4.5 20S3 19.3 3 18.5 3.7 17 4.5 17 6 17.7 6 18.5M7.5 9H4V15H7.5V18H15V9H7.5M14 10V11H12.5V10H14M12.5 12V13H14V12H12.5M20 8L17 3H7L4 8V15H7.5V9H15V15H20V8Z"/>
            </svg>
            <div class="pulse-effect"></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      // Add user marker
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup(locationPermissionGranted ? "Your location" : "Approximate location")
        .openPopup();

      mapInstanceRef.current = map;
      
      // Add ETA display
      const etaElement = L.control({ position: 'topright' });
      etaElement.onAdd = () => {
        const div = L.DomUtil.create('div', 'eta-display');
        div.innerHTML = `ETA: <span id="eta">10</span> min`;
        return div;
      };
      etaElement.addTo(map);
      
      // Start ambulance simulation
      startAmbulanceMovement(map);
    }
  };


  // Haversine formula to calculate distance between two lat/lng points in meters
  function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000; // meters
    const toRad = x => x * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Calculate a point a certain distance and bearing from a start point
  function destinationPoint(lat, lng, distance, bearing) {
    const R = 6371000; // meters
    const δ = distance / R; // angular distance in radians
    const θ = bearing * Math.PI / 180;
    const φ1 = lat * Math.PI / 180;
    const λ1 = lng * Math.PI / 180;
    const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
    const λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
    return [φ2 * 180 / Math.PI, λ2 * 180 / Math.PI];
  }

  // Calculate initial bearing from point A to B
  function getBearing(lat1, lng1, lat2, lng2) {
    const toRad = x => x * Math.PI / 180;
    const toDeg = x => x * 180 / Math.PI;
    const dLng = toRad(lng2 - lng1);
    const y = Math.sin(dLng) * Math.cos(toRad(lat2));
    const x = Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
      Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLng);
    return (toDeg(Math.atan2(y, x)) + 360) % 360;
  }

  // Calculate a point 2km away from user location at a fixed bearing (e.g., 45 deg NE)
  const calculateOffset = (lat, lng, distance) => destinationPoint(lat, lng, distance, 45);

  const startAmbulanceMovement = (map) => {
    if (ambulanceIntervalRef.current) {
      clearInterval(ambulanceIntervalRef.current);
    }

    const ambulanceIcon = L.divIcon({
      className: 'pulse-icon',
      html: `
        <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 2.1rem;">🚑</span>
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background: rgba(244, 67, 54, 0.4); animation: pulse 2s infinite; z-index: -1;"></div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22]
    });

    // Start 2km away at 45 deg NE
    let [currentLat, currentLng] = calculateOffset(userLocation.lat, userLocation.lng, 2000);
    // Add ambulance marker with custom icon and popup
    if (ambulanceMarkerRef.current) {
      map.removeLayer(ambulanceMarkerRef.current);
    }
    ambulanceMarkerRef.current = L.marker([currentLat, currentLng], { icon: ambulanceIcon })
      .addTo(map)
      .bindPopup("🚑 EMS Ambulance").openPopup();

    // Animation loop
    const speed = 20; // meters per second (realistic urban speed ~72km/h)
    let eta = Math.ceil(getDistance(currentLat, currentLng, userLocation.lat, userLocation.lng) / speed / 60); // in minutes
    setEta(eta);

    ambulanceIntervalRef.current = setInterval(() => {
      const dist = getDistance(currentLat, currentLng, userLocation.lat, userLocation.lng);
      if (dist < 10) {
        ambulanceMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
        setEta(0);
        document.getElementById('eta').textContent = "Arrived";
        clearInterval(ambulanceIntervalRef.current);
        return;
      }
      // Move towards user location
      const bearing = getBearing(currentLat, currentLng, userLocation.lat, userLocation.lng);
      const stepDist = Math.min(speed, dist); // don't overshoot
      [currentLat, currentLng] = destinationPoint(currentLat, currentLng, stepDist, bearing);
      ambulanceMarkerRef.current.setLatLng([currentLat, currentLng]);
      // Update ETA
      eta = Math.ceil(getDistance(currentLat, currentLng, userLocation.lat, userLocation.lng) / speed / 60);
      setEta(eta);
      document.getElementById('eta').textContent = eta > 0 ? eta : 'Arrived';
    }, 1000);
  };

  const handleRequestAmbulance = () => {
    setShowRequestPage(false);
    initMap();
  };

  const handleBackClick = () => {
    // Try to use setCurrentPage if passed as prop (SPA navigation), else fallback to window.location
    if (typeof props?.setCurrentPage === 'function') {
      props.setCurrentPage('emergency');
    } else {
      window.location.href = '/emergency';
    }
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Sidebar currentPage={currentPage} setCurrentPage={handleSidebarNav} />
      <div style={{ flex: 1 }}>
        <style>{`
        .pulse-icon {
          animation: pulse 2s infinite;
        }
        .location-error {
          color: #d32f2f;
          font-size: 14px;
          margin-top: 10px;
          text-align: center;
        }
        .enable-location-btn {
          display: block;
          width: 100%;
          padding: 12px;
          background-color: #d32f2f;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          margin: 15px 0;
          text-align: center;
        }
        .eta-display {
          background-color: rgba(0,0,0,0.7);
          color: white;
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 12px;
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .pulse-effect {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(244, 67, 54, 0.4);
          animation: pulse 2s infinite;
          z-index: -1;
        }
      `}</style>

      {/* Request Ambulance Page */}
      {showRequestPage && (
        <div style={{ display: 'block', width: '100%', padding: '20px 12px 20px 12px', boxSizing: 'border-box' }}>
          <h1 style={{ color: '#d32f2f', textAlign: 'left', marginLeft: 0 }}>Emergency Service</h1>
          <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '16px', color: '#333', marginBottom: '20px' }}>
              In case of emergency, please enable location access and request an ambulance. 
              Your location will be shared with the nearest available EMS team.
            </p>
            <button 
              onClick={getUserLocation}
              className="enable-location-btn"
              style={{ display: locationPermissionGranted ? 'none' : 'block' }}
            >
              ENABLE LOCATION ACCESS
            </button>
            <div className="location-error">{locationStatus}</div>
            <button 
              onClick={handleRequestAmbulance}
              style={{ 
                display: locationPermissionGranted ? 'block' : 'none', 
                width: '100%', 
                padding: '15px', 
                backgroundColor: '#d32f2f', 
                color: 'white', 
                border: 'none', 
                borderRadius: '5px', 
                fontSize: '18px', 
                cursor: 'pointer', 
                marginBottom: '20px' 
              }}
            >
              REQUEST AMBULANCE
            </button>
            <div style={{ textAlign: 'left', color: '#666', fontSize: '14px' }}>
              <p>Average response time in your area: 10-15 minutes</p>
              <p>Emergency contact: 10177 (Nationwide EMS)</p>
            </div>
          </div>
        </div>
      )}

      {/* Ambulance Tracking Page */}
      {!showRequestPage && (
        <div style={{ width: '100%', padding: '0 12px', boxSizing: 'border-box' }}>
          <div style={{ backgroundColor: '#d32f2f', color: 'white', padding: '15px', display: 'flex', alignItems: 'center' }}>
            <button 
              onClick={handleBackClick}
              style={{ background: 'none', border: 'none', color: 'white', fontSize: '16px', marginRight: '15px', cursor: 'pointer' }}
            >
              ← Back
            </button>
            <h2 style={{ margin: 0 }}>EMS Team En Route</h2>
          </div>
          {/* Map Container */}
          <div ref={mapRef} style={{ height: '300px' }}></div>
          {/* Estimated Arrival Time */}
          <div style={{ textAlign: 'left', margin: '12px 0 0 0', fontWeight: 600, fontSize: 18, color: '#d32f2f' }}>
            Estimated Arrival Time: {eta === 0 ? 'Arrived' : `${eta} min`}
          </div>
          {/* Driver Information */}
          <div style={{ backgroundColor: 'white', padding: '15px', marginTop: '10px', borderRadius: '5px' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Paramedic Information</h3>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ width: '50px', height: '50px', backgroundColor: '#ddd', borderRadius: '50%', marginRight: '15px', overflow: 'hidden' }}>
                <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Paramedic" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>Sr. Nomsa Khumalo</p>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>7 years experience</p>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#666' }}>HPCSA Registration:</span>
              <span style={{ fontWeight: 'bold' }}>EMT-2023-SA</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>Contact:</span>
              <span style={{ fontWeight: 'bold' }}>071 234 5678</span>
            </div>
          </div>
          {/* Vehicle Information */}
          <div style={{ backgroundColor: 'white', padding: '15px', marginTop: '10px', borderRadius: '5px' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Ambulance Details</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#666' }}>Ambulance ID:</span>
              <span style={{ fontWeight: 'bold' }}>Gauteng EMS-9271</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#666' }}>Type:</span>
              <span style={{ fontWeight: 'bold' }}>Advanced Life Support</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>Registration:</span>
              <span style={{ fontWeight: 'bold' }}>CA 123 456</span>
            </div>
          </div>
          {/* Next of Kin */}
          <div style={{ backgroundColor: 'white', padding: '15px', marginTop: '10px', borderRadius: '5px', marginBottom: '20px' }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Emergency Contact</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#666' }}>Name:</span>
              <span style={{ fontWeight: 'bold' }}> Thembi Zwane</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#666' }}>Relationship:</span>
              <span style={{ fontWeight: 'bold' }}>Sister</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>Contact:</span>
              <span style={{ fontWeight: 'bold' }}>082 765 4321</span>
            </div>
          </div>
          {/* Emergency Contact Button */}
          <button style={{ display: 'block', width: '100%', padding: '15px', backgroundColor: '#d32f2f', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', cursor: 'pointer' }}>
            CALL EMERGENCY CONTACT
          </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default AmbulanceTracker;