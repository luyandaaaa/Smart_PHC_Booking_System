import React, { useState, useEffect } from 'react';
import { Mail, User, Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState('signup'); // 'signup', 'verification-sent', 'verified'
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [emailjsLoaded, setEmailjsLoaded] = useState(false);

  // Load EmailJS script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize EmailJS with your public key
      window.emailjs.init('RmeYh7XSiL4SzMwRO'); // Replace with your actual EmailJS public key
      setEmailjsLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateVerificationCode = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const sendVerificationEmail = async (email, code, firstName) => {
    try {
      if (!emailjsLoaded || !window.emailjs) {
        throw new Error('EmailJS not loaded');
      }

      const templateParams = {
        email: email,
        to_name: firstName,
        passcode: code, // <-- matches {{passcode}} in template
        time: new Date(Date.now() + 15 * 60000).toLocaleTimeString(), // expiry time for {{time}}
        from_name: 'MzansiCare',
        from_email: 'lloyiso092003@gmail.com',
        message: `Your verification code is: ${code}. This code will expire in 15 minutes.`
      };

      const result = await window.emailjs.send(
        'service_jk3w5c8', // Your working EmailJS service ID
        'template_yes9iql', // Updated EmailJS template ID
        templateParams
      );
      
      console.log('Email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Detailed error sending email:', error);
      
      // Provide more specific error messages
      if (error.text) {
        if (error.text.includes('authentication') || error.text.includes('scope')) {
          throw new Error('Email service authentication error. Please contact support.');
        } else if (error.text.includes('template')) {
          throw new Error('Email template error. Please try again.');
        }
      }
      
      throw new Error('Failed to send verification email. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Generate verification code
      const code = generateVerificationCode();
      setGeneratedCode(code);
      
      // Send verification email
      await sendVerificationEmail(formData.email, code, formData.firstName);
      setStep('verification-sent');
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to send verification email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = (e) => {
    e.preventDefault();
    
    if (verificationCode.toUpperCase() === generatedCode) {
      setStep('verified');
      // Here you would typically save the user data or redirect
      console.log('User verified successfully!', formData);
    } else {
      setErrors({ verification: 'Invalid verification code. Please try again.' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  useEffect(() => {
    if (step === 'verified') {
      // Force redirect to dashboard after verification
      window.location.replace('/#dashboard');
    }
  }, [step]);

  if (step === 'verified') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Account Verified!</h2>
            <p className="text-gray-600">
              Welcome, {formData.firstName}! Your account has been successfully created and verified.
            </p>
          </div>
          {/* Button removed, redirect happens automatically */}
        </div>
      </div>
    );
  }

  if (step === 'verification-sent') {
    return (
      <div>
        <div>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Mail style={{ width: 56, height: 56, color: '#3b82f6', margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#333', marginBottom: 8 }}>Check Your Email</h2>
            <p style={{ color: '#6b7280', fontSize: 15 }}>
              We've sent a verification code to <span style={{ fontWeight: 600 }}>{formData.email}</span>
            </p>
          </div>
          <form onSubmit={handleVerification} autoComplete="off">
            <div className="form-group">
              <label className="form-label" htmlFor="verificationCode">Verification Code</label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={(e) => {
                  setVerificationCode(e.target.value.toUpperCase());
                  if (errors.verification) {
                    setErrors(prev => ({ ...prev, verification: '' }));
                  }
                }}
                className="form-control"
                placeholder="ENTER CODE"
                maxLength={6}
                style={{ textAlign: 'center', fontFamily: 'monospace', fontSize: 18, letterSpacing: 2, fontWeight: 600 }}
              />
              {errors.verification && (
                <p className="text-sm" style={{ color: '#ef4444', marginTop: 2 }}>{errors.verification}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!verificationCode}
              className="btn btn-primary w-full"
              style={{ marginTop: 12, fontSize: 17 }}
            >
              Verify Account
            </button>
            <button
              type="button"
              onClick={() => {
                const newCode = generateVerificationCode();
                setGeneratedCode(newCode);
                sendVerificationEmail(formData.email, newCode, formData.firstName);
              }}
              className="btn w-full"
              style={{ marginTop: 10, color: '#3b82f6', background: 'none', border: 'none', fontWeight: 600, fontSize: 15 }}
            >
              Resend Code
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#333', marginBottom: 8 }}>Create Account</h1>
          <p style={{ color: '#6b7280', fontSize: 16 }}>Join us today and get started</p>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group" style={{ display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label className="form-label" htmlFor="firstName">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="form-control"
                placeholder="John"
                autoComplete="given-name"
                style={errors.firstName ? { borderColor: '#ef4444' } : {}}
              />
              {errors.firstName && (
                <p className="text-sm" style={{ color: '#ef4444', marginTop: 2 }}>{errors.firstName}</p>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <label className="form-label" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Doe"
                autoComplete="family-name"
                style={errors.lastName ? { borderColor: '#ef4444' } : {}}
              />
              {errors.lastName && (
                <p className="text-sm" style={{ color: '#ef4444', marginTop: 2 }}>{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
              placeholder="john@example.com"
              autoComplete="email"
              style={errors.email ? { borderColor: '#ef4444' } : {}}
            />
            {errors.email && (
              <p className="text-sm" style={{ color: '#ef4444', marginTop: 2 }}>{errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Enter your password"
                autoComplete="new-password"
                style={errors.password ? { borderColor: '#ef4444' } : {}}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm" style={{ color: '#ef4444', marginTop: 2 }}>{errors.password}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Confirm your password"
                autoComplete="new-password"
                style={errors.confirmPassword ? { borderColor: '#ef4444' } : {}}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: 12, top: 10, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm" style={{ color: '#ef4444', marginTop: 2 }}>{errors.confirmPassword}</p>
            )}
          </div>
          {errors.submit && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 12, marginBottom: 8 }}>
              <p className="text-sm" style={{ color: '#ef4444', margin: 0 }}>{errors.submit}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
            style={{ marginTop: 12, fontSize: 18 }}
          >
            {isLoading ? (
              <div style={{ width: 24, height: 24, border: '2px solid #fff', borderTop: '2px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }}></div>
            ) : (
              'Create Account'
            )}
          </button>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <p style={{ color: '#6b7280', fontSize: 15 }}>
              Already have an account?{' '}
              <a href="#" style={{ color: '#3b82f6', fontWeight: 600, textDecoration: 'underline' }}>Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;