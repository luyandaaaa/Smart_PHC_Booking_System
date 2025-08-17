import React, { useState } from 'react';

const AmbulanceRequestForm = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    medicalConditions: '',
    medications: '',
    allergies: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phoneNumber) {
      setError('Full Name and Phone Number are required.');
      return;
    }
    setError('');
    onSubmit(form);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: '#fff', borderRadius: 18, padding: 32, minWidth: 340, maxWidth: 420, width: '90%', boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18, color: '#dc2626' }}>Emergency Contact Information</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label>
            Full Name*<br />
            <input name="fullName" value={form.fullName} onChange={handleChange} required style={inputStyle} />
          </label>
          <label>
            Phone Number*<br />
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required style={inputStyle} />
          </label>
          <label>
            Email<br />
            <input name="email" value={form.email} onChange={handleChange} style={inputStyle} />
          </label>
          <label>
            Next of Kin Name<br />
            <input name="nextOfKinName" value={form.nextOfKinName} onChange={handleChange} style={inputStyle} />
          </label>
          <label>
            Next of Kin Phone<br />
            <input name="nextOfKinPhone" value={form.nextOfKinPhone} onChange={handleChange} style={inputStyle} />
          </label>
          <label>
            Medical Conditions<br />
            <input name="medicalConditions" value={form.medicalConditions} onChange={handleChange} style={inputStyle} />
          </label>
          <label>
            Medications<br />
            <input name="medications" value={form.medications} onChange={handleChange} style={inputStyle} />
          </label>
          <label>
            Allergies<br />
            <input name="allergies" value={form.allergies} onChange={handleChange} style={inputStyle} />
          </label>
        </div>
        {error && <div style={{ color: '#dc2626', marginTop: 10, fontWeight: 500 }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
          <button type="button" onClick={onCancel} style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: '#f3f4f6', color: '#991b1b', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
          <button type="submit" style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: 'linear-gradient(90deg,#ef4444,#fca5a5)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Confirm Request</button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 8,
  border: '1.5px solid #e5e7eb',
  marginTop: 4,
  marginBottom: 2,
  fontSize: 15
};

export default AmbulanceRequestForm;
