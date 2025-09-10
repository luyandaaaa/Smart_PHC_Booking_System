import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, MapPin, User, Phone, Star, Filter, Search, Plus, CheckCircle, AlertCircle, Users, Stethoscope, CreditCard } from 'lucide-react';
import Sidebar from '../components/Sidebar';

// Mock components (you can replace these with your actual components)
const ClinicCard = ({ clinic, t, onBookAppointment }) => (
  <div style={{ 
    background: 'white', 
    borderRadius: 12, 
    padding: 16, 
    border: '1px solid #e5e7eb',
    transition: 'all 0.2s',
    cursor: 'pointer'
  }}
  onMouseEnter={e => {
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    e.currentTarget.style.transform = 'translateY(-2px)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'none';
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
      <div>
        <h4 style={{ fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>{clinic.name}</h4>
        <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: 14, marginBottom: 2 }}>
          <MapPin size={14} style={{ marginRight: 4 }} />
          {clinic.address} • {clinic.distance}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: 14 }}>
          <Phone size={14} style={{ marginRight: 4 }} />
          {clinic.phone}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <Star size={14} style={{ color: '#fbbf24', marginRight: 2 }} />
          <span style={{ fontSize: 14, fontWeight: 500 }}>{clinic.rating}</span>
        </div>
        <div style={{ 
          background: clinic.waitTime === 'Available' ? '#dcfce7' : '#fef3c7', 
          color: clinic.waitTime === 'Available' ? '#166534' : '#92400e',
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 500
        }}>
          {clinic.waitTime}
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
      {clinic.services.map(service => (
        <span key={service} style={{
          background: '#eff6ff',
          color: '#2563eb',
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 500
        }}>
          {service}
        </span>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      <button style={{
        flex: 1,
        background: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        padding: '8px 16px',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'background 0.2s'
      }}
      onMouseEnter={e => e.target.style.background = '#2563eb'}
      onMouseLeave={e => e.target.style.background = '#3b82f6'}
      onClick={() => onBookAppointment(clinic)}
      >
        Book Appointment
      </button>
      <button style={{
        background: 'white',
                background: '#bae6fd', // light blue
        border: '1px solid #3b82f6',
        borderRadius: 8,
        padding: '8px 16px',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer'
      }}>
        {t.contactClinic}
      </button>
    </div>
  </div>
);

const AppointmentCard = ({ appointment, t }) => (
  <div style={{
    background: 'white',
    borderRadius: 12,
    padding: 16,
    border: '1px solid #e5e7eb',
    transition: 'all 0.2s'
  }}
  onMouseEnter={e => {
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    e.currentTarget.style.transform = 'translateY(-1px)';
  }}
  onMouseLeave={e => {
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.transform = 'none';
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <div style={{
            background: appointment.type === 'Video Consultation' ? '#eff6ff' : '#f0fdf4',
            color: appointment.type === 'Video Consultation' ? '#2563eb' : '#166534',
            padding: '4px 8px',
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 500,
            marginRight: 8
          }}>
            {appointment.type === 'Video Consultation' ? <Video size={12} /> : <MapPin size={12} />}
          </div>
          <span style={{ fontSize: 12, fontWeight: 500, color: '#6b7280' }}>
            {appointment.type}
          </span>
        </div>
        <h4 style={{ fontWeight: 600, color: '#1e293b', marginBottom: 4 }}>{appointment.clinic}</h4>
        <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: 14, marginBottom: 2 }}>
          <User size={14} style={{ marginRight: 4 }} />
          {appointment.doctor} • {appointment.specialty}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', color: '#6b7280', fontSize: 14 }}>
          <Calendar size={14} style={{ marginRight: 4 }} />
          {appointment.date} at {appointment.time}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{
          background: appointment.status === 'confirmed' ? '#dcfce7' : '#fef3c7',
          color: appointment.status === 'confirmed' ? '#166534' : '#92400e',
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 500,
          marginBottom: 8
        }}>
          {appointment.status === 'confirmed' ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
          <span style={{ marginLeft: 4 }}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </span>
        </div>
        <button style={{
          background: 'white',
          color: '#3b82f6',
          border: '1px solid #3b82f6',
          borderRadius: 6,
          padding: '4px 12px',
          fontSize: 12,
          cursor: 'pointer'
        }}>
          {t.viewDetails}
        </button>
      </div>
    </div>
  </div>
);

// Price configuration based on specialty
const PRICE_CONFIG = {
  'General Practice': 250,
  'Cardiology': 450,
  'Dermatology': 350,
  'Endocrinology': 400,
  'Gastroenterology': 400,
  'Neurology': 500,
  'Oncology': 500,
  'Orthopedics': 450,
  'Pediatrics': 300,
  'Psychiatry': 400,
  'Pulmonology': 400,
  'Urology': 450,
  'default': 300
};

// MoMo Payment Modal Component
const MomoPaymentModal = ({ isOpen, onClose, appointmentData, onPaymentSuccess }) => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsProcessing(true);
    const pay = async () => {
      try {
        const response = await initiateMomoPayment();
        if (response.success) {
          setPaymentStatus('success');
          setTimeout(() => {
            onPaymentSuccess();
            onClose();
          }, 2000);
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        setPaymentStatus('failed');
      } finally {
        setIsProcessing(false);
      }
    };
    pay();
  }, [isOpen, onClose, onPaymentSuccess]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: 20
    }}>
      <div style={{
        background: 'white',
        borderRadius: 16,
        maxWidth: 400,
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
      }}>
        <div style={{ padding: 32, textAlign: 'center' }}>
          {isProcessing && (
            <>
              <CreditCard size={48} style={{ color: '#8a2be2', marginBottom: 16 }} />
              <h3 style={{ color: '#8a2be2', marginBottom: 8 }}>Processing Payment...</h3>
              <p>Please wait while we process your MoMo payment.</p>
            </>
          )}
          {paymentStatus === 'success' && (
            <>
              <CheckCircle size={48} style={{ color: '#22c55e', marginBottom: 16 }} />
              <h3 style={{ color: '#22c55e', marginBottom: 8 }}>Payment Successful!</h3>
              <p>Your appointment has been confirmed.</p>
            </>
          )}
          {paymentStatus === 'failed' && (
            <>
              <AlertCircle size={48} style={{ color: '#ef4444', marginBottom: 16 }} />
              <h3 style={{ color: '#ef4444', marginBottom: 8 }}>Payment Failed or Cancelled</h3>
              <p>Payment was not completed. Please try again or use another payment method.</p>
              <button
                onClick={onClose}
                style={{
                  background: '#8a2be2',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 24px',
                  marginTop: 16,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const BookingModal = ({ isOpen, onClose, clinic, onSubmit }) => {
  const [formData, setFormData] = useState({
    specialty: '',
    date: '',
    time: '',
    consultationType: 'in-person',
    urgency: 'normal',
    symptoms: '',
    insuranceNumber: '',
    preferredLanguage: 'English',
    notes: ''
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const specialties = [
    'General Practice', 'Cardiology', 'Dermatology', 'Endocrinology',
    'Gastroenterology', 'Neurology', 'Oncology', 'Orthopedics',
    'Pediatrics', 'Psychiatry', 'Pulmonology', 'Urology'
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const urgencyLevels = [
    { value: 'emergency', label: 'Emergency', color: '#dc2626' },
    { value: 'urgent', label: 'Urgent (within 24h)', color: '#ea580c' },
    { value: 'normal', label: 'Normal (within week)', color: '#059669' },
    { value: 'routine', label: 'Routine checkup', color: '#2563eb' }
  ];

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Exclude weekends
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show payment modal instead of directly submitting
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    // Payment was successful, now submit the booking
    onSubmit({ ...formData, clinic: clinic.name });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 20
      }}>
        <div style={{
          background: 'white',
          borderRadius: 16,
          maxWidth: 800,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
        }}>
          <div style={{
            background: '#bae6fd', // light blue
            color: '#111827', // blackish
            padding: 24,
            borderRadius: '16px 16px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8, color: '#111827' }}>Book Appointment</h2>
              <p style={{ opacity: 0.9, color: '#111827', fontWeight: 500 }}>{clinic?.name}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '8px 16px',
                fontWeight: 500,
                fontSize: 16,
                cursor: 'pointer',
                marginLeft: 16
              }}
            >
              Back
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              {/* Specialty Selection */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                  <Stethoscope size={16} style={{ display: 'inline', marginRight: 6 }} />
                  Medical Specialty *
                </label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '2px solid #e5e7eb',
                    borderRadius: 8,
                    fontSize: 14,
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                >
                  <option value="">Select specialty...</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              {/* Consultation Type */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                  Consultation Type *
                </label>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[
                    { value: 'in-person', label: 'In-Person', icon: MapPin },
                    { value: 'video', label: 'Video Call', icon: Video }
                  ].map(type => (
                    <label key={type.value} style={{
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      padding: 12,
                      border: `2px solid ${formData.consultationType === type.value ? '#3b82f6' : '#e5e7eb'}`,
                      borderRadius: 8,
                      cursor: 'pointer',
                      background: formData.consultationType === type.value ? '#eff6ff' : 'white',
                      transition: 'all 0.2s'
                    }}>
                      <input
                        type="radio"
                        name="consultationType"
                        value={type.value}
                        checked={formData.consultationType === type.value}
                        onChange={(e) => setFormData({...formData, consultationType: e.target.value})}
                        style={{ display: 'none' }}
                      />
                      <type.icon size={16} style={{ marginRight: 8, color: '#3b82f6' }} />
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                  <Calendar size={16} style={{ display: 'inline', marginRight: 6 }} />
                  Preferred Date *
                </label>
                <select
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '2px solid #e5e7eb',
                    borderRadius: 8,
                    fontSize: 14
                  }}
                >
                  <option value="">Select date...</option>
                  {getAvailableDates().map(date => {
                    const dateObj = new Date(date);
                    const formatted = dateObj.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    });
                    return (
                      <option key={date} value={date}>{formatted}</option>
                    );
                  })}
                </select>
              </div>

              {/* Time Selection */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                  <Clock size={16} style={{ display: 'inline', marginRight: 6 }} />
                  Preferred Time *
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '2px solid #e5e7eb',
                    borderRadius: 8,
                    fontSize: 14
                  }}
                >
                  <option value="">Select time...</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Price Preview */}
            {formData.specialty && (
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 8,
                padding: 16,
                marginBottom: 20
              }}>
                <h4 style={{ marginBottom: 8, color: '#166534' }}>Payment Information</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Consultation Fee:</span>
                  <span style={{ fontWeight: 'bold' }}>
                    R {(PRICE_CONFIG[formData.specialty] || PRICE_CONFIG.default).toFixed(2)}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: '#6b7280', marginTop: 8 }}>
                  Payment is required to confirm your appointment. You'll be redirected to MoMo to complete payment.
                </p>
              </div>
            )}

            {/* Urgency Level */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 12, color: '#374151' }}>
                <AlertCircle size={16} style={{ display: 'inline', marginRight: 6 }} />
                Urgency Level
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {urgencyLevels.map(level => (
                  <label key={level.value} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 12,
                    border: `2px solid ${formData.urgency === level.value ? level.color : '#e5e7eb'}`,
                    borderRadius: 8,
                    cursor: 'pointer',
                    background: formData.urgency === level.value ? `${level.color}10` : 'white',
                    transition: 'all 0.2s'
                  }}>
                    <input
                      type="radio"
                      name="urgency"
                      value={level.value}
                      checked={formData.urgency === level.value}
                      onChange={(e) => setFormData({...formData, urgency: e.target.value})}
                      style={{ display: 'none' }}
                    />
                    <div style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: level.color,
                      marginRight: 8
                    }} />
                    <span style={{ fontSize: 14, fontWeight: 500 }}>{level.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="booking-additional-info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                  Insurance Number
                </label>
                <input
                  type="text"
                  value={formData.insuranceNumber}
                  onChange={(e) => setFormData({...formData, insuranceNumber: e.target.value})}
                  placeholder="Enter insurance number"
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '2px solid #e5e7eb',
                    borderRadius: 8,
                    fontSize: 14
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                  Preferred Language
                </label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => setFormData({...formData, preferredLanguage: e.target.value})}
                  style={{
                    width: '100%',
                    padding: 12,
                    border: '2px solid #e5e7eb',
                    borderRadius: 8,
                    fontSize: 14
                  }}
                >
                  <option value="English">English</option>
                  <option value="Zulu">Zulu</option>
                  <option value="Afrikaans">Afrikaans</option>
                  <option value="Xhosa">Xhosa</option>
                </select>
              </div>
            </div>

            {/* Symptoms and Notes */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
                Brief Description of Symptoms/Reason for Visit
              </label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                placeholder="Please describe your symptoms or reason for the appointment..."
                rows={3}
                style={{
                  width: '100%',
                  padding: 12,
                  border: '2px solid #e5e7eb',
                  borderRadius: 8,
                  fontSize: 14,
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '12px 24px',
                  border: '2px solid #e5e7eb',
                  borderRadius: 8,
                  background: 'white',
                  color: '#374151',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formData.specialty}
                style={{
                  padding: '12px 24px',
                  border: 'none',
                  borderRadius: 8,
                  background: formData.specialty ? 'linear-gradient(135deg, #8a2be2, #6a0dad)' : '#cbd5e1',
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: formData.specialty ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8
                }}
              >
                <CreditCard size={16} />
                Pay with MoMo
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Payment Modal */}
      <MomoPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        appointmentData={formData}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

// Mock function to simulate MoMo payment initiation
const initiateMomoPayment = async (paymentDetails) => {
  const BACKEND_URL = 'http://localhost:5000/api/requesttopay'; // If you change backend port, update here
  const SUBSCRIPTION_KEY = '01c62724f8424c02a198881a580fb635';
  const AUTH_TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6ImM2YWE5NzM4LTdlNmItNGRlNS1hZDhjLTk0N2ZiZGVlMDMyZiIsImV4cGlyZXMiOiIyMDI1LTA5LTEwVDIwOjQ2OjA5LjU0NCIsInNlc3Npb25JZCI6IjQ5ZmY1MDdjLTQzZTktNDhiZC1hYzdjLWIzMzk2YTVlZmU3OSJ9.dzn_aG-n4K0DHw_DOrn9hdfu5TJODSK3c_1ggC3g9Mk8hcu8kwpHKZ2w4vmwPeOwgbAs509GSs2PNp25y53NZnOMpBklDsdNGb2FyacniUEb5mWsyXKc1Eez1PkjqHoxsAuCPwnoliZhKThRaA4Lfo2647d1aZ2MzZV9Q0P3LPfT23tiAhHmFoHEyZdqy6Gxu7CQkXfpdkzi2dRyifn6zyKB0-TU-7pgYslVWny-9lM3XRps4Rr9jlJp7oa3eBSsdhl95gcH_Dg7wO_hIdR0N_nlCBnInvGAwHUgX2msGbs6fAMTE7oDfJq-ZkKYe_GnTg6PUqI-RB95OaY9CGJEUQ';
  const X_REFERENCE_ID = '6b27b8fe-f8d1-496b-93cb-4abfac41316c';
  const X_TARGET_ENV = 'mtnsouthafrica';

  const payload = {
    amount: "1.00",
    currency: "ZAR",
    externalId: "test",
    payer: {
      partyIdType: "MSISDN",
      partyId: "27605011274"
    },
    payerMessage: "test",
    payeeNote: "test"
  };

  try {
    const response = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      return { success: true, transactionId: 'MOMO' + Date.now() };
    } else {
      return { success: false };
    }
  } catch (error) {
    return { success: false };
  }
};

const defaultT = {
  appointments: 'Appointments',
  contactClinic: 'Contact Clinic',
  viewDetails: 'View Details',
};

const AppointmentsView = ({ t = defaultT, setCurrentPage, currentPage = 'appointments' }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [filterType, setFilterType] = useState('');
  const [appointments, setAppointments] = useState([
    {
      clinic: 'Hillbrow Community Health Centre',
      type: 'Video Consultation',
      date: 'Tomorrow',
      time: '10:00 AM',
      status: 'confirmed',
      doctor: 'Dr. Mokoena',
      specialty: 'General Practice',
    },
    {
      clinic: 'Charlotte Maxeke Johannesburg Academic Hospital',
      type: 'In-Person',
      date: 'Mon, 25 Aug',
      time: '2:30 PM',
      status: 'pending',
      doctor: 'Dr. Nkosi',
      specialty: 'Cardiology',
    },
  ]);

  const [clinics] = useState([
    {
      name: 'Hillbrow Community Health Centre',
      address: '32 Klein St, Hillbrow, Johannesburg',
      phone: '011 488 3000',
      distance: '1.2 km',
      waitTime: 'Available',
      services: ['General', 'TB', 'Maternity'],
      rating: 4.8,
    },
    {
      name: 'Charlotte Maxeke Johannesburg Academic Hospital',
      address: '17 Jubilee Rd, Parktown, Johannesburg',
      phone: '011 488 4911',
      distance: '3.5 km',
      waitTime: '15 mins',
      services: ['General', 'HIV', 'Mental Health'],
      rating: 4.6,
    },
    {
      name: 'South Rand Hospital',
      address: '1 Friars Hill Rd, Rosettenville, Johannesburg',
      phone: '011 681 2000',
      distance: '6.0 km',
      waitTime: '25 mins',
      services: ['General', 'Dental', 'X-Ray'],
      rating: 4.4,
    },
  ]);

  const handleBookAppointment = (clinic) => {
    setSelectedClinic(clinic);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (bookingData) => {
    const newAppointment = {
      clinic: bookingData.clinic,
      type: bookingData.consultationType === 'video' ? 'Video Consultation' : 'In-Person',
      date: new Date(bookingData.date).toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: bookingData.time,
      status: 'confirmed', // Now confirmed after payment
      doctor: 'Dr. TBD',
      specialty: bookingData.specialty,
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = filterSpecialty === '' || clinic.services.some(service => 
      service.toLowerCase().includes(filterSpecialty.toLowerCase())
    );
    return matchesSearch && matchesService;
  });

  return (
    <>
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
          {/* Header - styled like HealthLibraryView */}
          <div style={{
            background: '#e0f2fe',
            borderRadius: 32,
            padding: '2rem',
            marginBottom: '2rem',
            color: '#1e293b',
            position: 'relative',
            overflow: 'visible',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
            border: '1.5px solid #d1d5db'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>
                  <Calendar size={32} style={{ marginRight: 12, color: '#2563eb', verticalAlign: 'middle' }} />
                  {t.appointments}
                </h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0, marginBottom: '1.5rem' }}>
                  Manage and book your healthcare appointments easily
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions - styled like HealthLibraryView's tab bar */}
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: '0.5rem',
            marginBottom: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center'
          }}>
            <button
              onClick={() => setShowBookingModal(true)}
              style={{
                flex: 1,
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                borderRadius: 12,
                padding: '1rem',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 2px 8px rgba(59,130,246,0.08)'
              }}
              onMouseEnter={e => e.target.style.filter = 'brightness(1.08)'}
              onMouseLeave={e => e.target.style.filter = 'none'}
            >
              <Plus size={18} style={{ marginRight: 8 }} />
              Quick Book
            </button>
            <div style={{ flex: 2, minWidth: 220, maxWidth: 400 }}>
              <div style={{ position: 'relative' }}>
                <Search size={16} style={{ 
                  position: 'absolute', 
                  left: 12, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#6b7280' 
                }} />
                <input
                  type="text"
                  placeholder="Search clinics or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '2px solid #e5e7eb',
                    borderRadius: 8,
                    fontSize: 14,
                    boxSizing: 'border-box',
                    background: '#f9fafb'
                  }}
                />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 180, maxWidth: 220 }}>
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: 8,
                  fontSize: 14,
                  minWidth: 150,
                  boxSizing: 'border-box',
                  background: '#f9fafb'
                }}
              >
                <option value="">All Services</option>
                <option value="General">General</option>
                <option value="TB">TB Treatment</option>
                <option value="HIV">HIV Care</option>
                <option value="Mental">Mental Health</option>
                <option value="Maternity">Maternity</option>
                <option value="Dental">Dental</option>
              </select>
            </div>
          </div>

          {/* Upcoming Appointments - styled like HealthLibraryView's cards */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
              Upcoming Appointments
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {appointments.length > 0 ? (
                appointments.map((appointment, index) => (
                  <div key={index} style={{
                    background: 'white',
                    borderRadius: 16,
                    padding: '1.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s',
                    border: appointment.status === 'confirmed' ? '2px solid #10b981' : appointment.status === 'pending' ? '2px solid #fbbf24' : 'none',
                    position: 'relative'
                  }}>
                    <AppointmentCard appointment={appointment} t={t} />
                  </div>
                ))
              ) : (
                <div style={{ 
                  background: 'white', 
                  borderRadius: 16, 
                  padding: '2rem', 
                  border: '1px dashed #e5e7eb',
                  textAlign: 'center',
                  color: '#6b7280',
                  fontSize: '1.1rem'
                }}>
                  No upcoming appointments. Book one now!
                </div>
              )}
            </div>
          </div>

          {/* Nearby Clinics - styled like HealthLibraryView's cards */}
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
              Nearby Clinics
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
              {filteredClinics.length > 0 ? (
                filteredClinics.map((clinic, index) => (
                  <div key={index} style={{
                    background: 'white',
                    borderRadius: 16,
                    padding: '1.5rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s',
                    border: '1.5px solid #bae6fd',
                    position: 'relative'
                  }}>
                    <ClinicCard 
                      clinic={clinic} 
                      t={t} 
                      onBookAppointment={handleBookAppointment} 
                    />
                  </div>
                ))
              ) : (
                <div style={{ 
                  background: 'white', 
                  borderRadius: 16, 
                  padding: '2rem', 
                  border: '1px dashed #e5e7eb',
                  textAlign: 'center',
                  color: '#6b7280',
                  fontSize: '1.1rem'
                }}>
                  No clinics match your search criteria
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        clinic={selectedClinic || clinics[0]}
        onSubmit={handleBookingSubmit}
      />
    </>
  );
};

export default AppointmentsView;