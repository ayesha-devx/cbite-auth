import React, { useState, useRef, useEffect } from 'react';
import { Mail, ArrowLeft, Loader2, Sparkles, Shield, ArrowRight, LogOut, CheckCircle } from 'lucide-react';

export default function AuthSection() {
  const [step, setStep] = useState('email'); // 'email' | 'otp'
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'info' | 'error', text: string }

  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const otpRefs = useRef([]);

  // Check auth session status on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/me', { credentials: 'include' })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser(data.user || data.data?.user);
          setIsAuthenticated(true);
        }
      })
      .catch((err) => {
        console.error('Session sync error:', err);
      })
      .finally(() => {
        setIsInitialLoading(false);
      });
  }, []);

  // Clear messages when step changes
  useEffect(() => {
    setStatusMessage(null);
  }, [step]);

  // Basic email regex validation
  const validateEmail = (val) => {
    if (!val) {
      return 'Email address is required';
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(val)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setStatusMessage(null);

    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });
      const data = await res.json();

      if (res.ok) {
        setStep('otp');
      } else {
        setStatusMessage({
          type: 'error',
          text: data.message || 'Failed to send verification code.'
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Network connection failed. Please ensure the backend server is running.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider) => {
    if (provider === 'google') {
      window.location.href = 'http://localhost:5000/api/auth/google';
      return;
    }
    if (provider === 'github') {
      window.location.href = 'http://localhost:5000/api/auth/github';
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);
    
    // Simulate integration message for PART 1
    setTimeout(() => {
      setIsLoading(false);
      setStatusMessage({
        type: 'info',
        text: `Social auth triggered. Later, this will redirect to POST /api/auth/${provider}.`
      });
    }, 800);
  };

  // OTP Inputs Management
  const handleOtpChange = (val, index) => {
    const cleaned = val.replace(/[^0-9]/g, '');
    if (!cleaned) return;

    const newOtp = [...otp];
    newOtp[index] = cleaned.substring(cleaned.length - 1); // Get last typed character
    setOtp(newOtp);

    // Auto-focus next input
    if (index < 5 && cleaned) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (otp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    const cleanedData = pastedData.replace(/[^0-9]/g, '').slice(0, 6);
    
    if (cleanedData) {
      const newOtp = [...otp];
      for (let i = 0; i < 6; i++) {
        newOtp[i] = cleanedData[i] || '';
      }
      setOtp(newOtp);
      
      const targetIndex = cleanedData.length === 6 ? 5 : cleanedData.length;
      otpRefs.current[targetIndex]?.focus();
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setStatusMessage(null);
    
    const code = otp.join('');
    if (code.length < 6) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter the complete 6-digit code.'
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code }),
        credentials: 'include'
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.data?.user || data.user);
        setIsAuthenticated(true);
        setStatusMessage({
          type: 'info',
          text: 'Signed in successfully!'
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: data.message || 'Invalid or expired verification code.'
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Network connection failed. Please ensure the backend server is running.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const res = await fetch('http://localhost:5000/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      });
      const data = await res.json();

      if (res.ok) {
        setStatusMessage({
          type: 'info',
          text: 'A new 6-digit verification code has been sent to your inbox.'
        });
        setOtp(['', '', '', '', '', '']);
        otpRefs.current[0]?.focus();
      } else {
        setStatusMessage({
          type: 'error',
          text: data.message || 'Failed to resend verification code.'
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Network connection failed. Please ensure the backend server is running.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        setUser(null);
        setIsAuthenticated(false);
        setStep('email');
        setEmail('');
        setOtp(['', '', '', '', '', '']);
        setStatusMessage({
          type: 'info',
          text: 'Logged out successfully.'
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: 'Failed to terminate user session.'
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
      setStatusMessage({
        type: 'error',
        text: 'Network connection failed during logout.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeEmail = () => {
    setStep('email');
    setOtp(['', '', '', '', '', '']);
  };

  return (
    <section id="auth" className="py-20 md:py-28 bg-white border-b border-slate-100 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand & Security Information */}
          <div className="lg:col-span-6 text-left space-y-6 lg:pr-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue-500">
              Identity & Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue-950 tracking-tight leading-tight">
              Simple and Secure Access
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Choose your preferred sign-in method to securely access your CBite account.
            </p>

            <div className="pt-4 border-t border-slate-100 space-y-4">
              <h4 className="text-sm font-bold text-brand-blue-950 uppercase tracking-wider">
                Multiple ways to sign in
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Continue with Google or GitHub, or use your email address to receive a one-time verification code.
              </p>
            </div>

            <ul className="space-y-4 pt-2">
              <li className="flex items-start space-x-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-blue-50 flex items-center justify-center text-brand-blue-500 shrink-0">
                  <Shield className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-blue-950 font-sans">Email OTP</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Authentication option to receive a 6-digit one-time verification code sent directly to your inbox.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-0.5 w-5 h-5 rounded-full bg-brand-blue-50 flex items-center justify-center text-brand-blue-500 shrink-0">
                  <Sparkles className="w-3 h-3" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-brand-blue-950 font-sans">Google & GitHub Sign-In</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Authentication options to sign in using your existing Google or GitHub account credentials.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Auth Card */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl shadow-lg p-8 relative overflow-hidden">
              
              {/* CBite branding top bar */}
              <div className="flex items-center space-x-2.5 mb-6">
                <div className="h-7 w-7 overflow-hidden flex items-center justify-center rounded-md bg-white border border-slate-150 shadow-3xs shrink-0">
                  <img 
                    src="/assets/logo.png" 
                    alt="CBite logo mark" 
                    className="h-11 w-11 max-w-none object-contain -translate-y-[4.5px]" 
                  />
                </div>
                <span className="text-sm font-bold text-brand-blue-950">CBite</span>
              </div>

              {/* Status Notifications Panel */}
              {statusMessage && (
                <div className={`mb-6 p-4 rounded-xl text-xs font-medium text-left border ${
                  statusMessage.type === 'error'
                    ? 'bg-red-50 text-red-700 border-red-100'
                    : 'bg-brand-blue-50 text-brand-blue-700 border-brand-blue-100'
                }`}>
                  <p className="leading-normal">{statusMessage.text}</p>
                </div>
              )}

              {isInitialLoading ? (
                <div className="h-[300px] flex flex-col items-center justify-center space-y-3">
                  <Loader2 className="w-8 h-8 animate-spin text-brand-blue-500" />
                  <span className="text-xs font-semibold text-slate-500">Syncing session state...</span>
                </div>
              ) : (
                <>
                  {/* STEP 1: Enter Email UI */}
                  {step === 'email' && !isAuthenticated && (
                    <div className="space-y-6">
                      <div className="text-left">
                        <h3 className="text-2xl font-bold text-brand-blue-950">Welcome to CBite</h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">Sign in or create your account to continue.</p>
                      </div>

                      {/* Social Buttons */}
                      <div className="grid grid-cols-1 gap-3">
                        {/* Google OAuth Button */}
                        <button
                          onClick={() => handleSocialAuth('google')}
                          disabled={isLoading}
                          className="w-full flex items-center justify-center space-x-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-slate-350 disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-99 cursor-pointer"
                        >
                          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          <span>Continue with Google</span>
                        </button>

                        {/* GitHub OAuth Button */}
                        <button
                          onClick={() => handleSocialAuth('github')}
                          disabled={isLoading}
                          className="w-full flex items-center justify-center space-x-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm font-semibold hover:bg-slate-50 hover:border-slate-350 disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-99 cursor-pointer"
                        >
                          <svg className="w-4 h-4 fill-slate-800 shrink-0" viewBox="0 0 24 24">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                          </svg>
                          <span>Continue with GitHub</span>
                        </button>
                      </div>

                      {/* Or Divider */}
                      <div className="relative flex py-1.5 items-center">
                        <div className="flex-grow border-t border-slate-200"></div>
                        <span className="flex-shrink mx-4 text-slate-400 text-xs font-semibold uppercase tracking-wider">or</span>
                        <div className="flex-grow border-t border-slate-200"></div>
                      </div>

                      {/* Email Sign In Form */}
                      <form onSubmit={handleEmailSubmit} className="space-y-4 text-left">
                        <div>
                          <label htmlFor="email" className="block text-xs font-bold text-brand-blue-950 uppercase tracking-wider mb-1.5">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                            <input
                              id="email"
                              type="text"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (emailError) setEmailError('');
                              }}
                              placeholder="name@example.com"
                              disabled={isLoading}
                              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-lg text-sm transition-all focus:bg-white focus:ring-1 focus:ring-brand-blue-500 focus:border-brand-blue-500 ${
                                emailError 
                                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                                  : 'border-slate-200'
                              }`}
                            />
                          </div>
                          {emailError && (
                            <p className="text-xs text-red-500 mt-1.5 flex items-center font-medium">
                              {emailError}
                            </p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full flex items-center justify-center px-4 py-3 bg-brand-blue-500 hover:bg-brand-blue-600 text-white rounded-lg text-sm font-semibold shadow-xs disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-99 cursor-pointer"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending Code...
                            </>
                          ) : (
                            <>
                              Continue with Email
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                          )}
                        </button>
                      </form>

                      {/* Disclaimer Bottom Text */}
                      <div className="space-y-3">
                        <p className="text-xs text-slate-450 leading-relaxed">
                          We'll send a one-time verification code to your email.
                        </p>
                        <p className="text-[10px] text-slate-400 border-t border-slate-100 pt-4 leading-normal">
                          By continuing, you agree to our <a href="#auth" className="underline hover:text-slate-600">Terms of Service</a> and <a href="#auth" className="underline hover:text-slate-600">Privacy Policy</a>.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Enter 6-digit OTP UI */}
                  {step === 'otp' && !isAuthenticated && (
                    <div className="space-y-6">
                      {/* Back button */}
                      <button
                        onClick={handleChangeEmail}
                        className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-brand-blue-500 transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Back to email
                      </button>

                      <div className="text-left">
                        <h3 className="text-2xl font-bold text-brand-blue-950">Check your email</h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-normal">
                          Enter the 6-digit verification code sent to <br />
                          <strong className="text-brand-blue-950 font-bold select-all">{email}</strong>
                        </p>
                      </div>

                      {/* OTP Inputs Form */}
                      <form onSubmit={handleOtpVerify} className="space-y-6">
                        <div 
                          className="flex justify-between items-center gap-2"
                          onPaste={handleOtpPaste}
                        >
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => (otpRefs.current[index] = el)}
                              type="text"
                              maxLength={1}
                              pattern="[0-9]*"
                              inputMode="numeric"
                              value={digit}
                              onChange={(e) => handleOtpChange(e.target.value, index)}
                              onKeyDown={(e) => handleOtpKeyDown(e, index)}
                              disabled={isLoading}
                              aria-label={`Digit ${index + 1}`}
                              className="w-12 h-12 text-center text-xl font-bold bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-brand-blue-500 focus:border-brand-blue-500 transition-all select-none"
                            />
                          ))}
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full flex items-center justify-center px-4 py-3 bg-brand-blue-500 hover:bg-brand-blue-600 text-white rounded-lg text-sm font-semibold shadow-xs disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-99 cursor-pointer"
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Verifying...
                            </>
                          ) : (
                            <span>Verify Code</span>
                          )}
                        </button>
                      </form>

                      {/* Foot Actions */}
                      <div className="flex flex-col items-center space-y-3 pt-3 border-t border-slate-100 text-xs">
                        <button
                          onClick={handleResendCode}
                          disabled={isLoading}
                          className="text-brand-blue-500 font-semibold hover:text-brand-blue-600 disabled:opacity-50 transition-colors cursor-pointer"
                        >
                          Resend Code
                        </button>
                        
                        <button
                          onClick={handleChangeEmail}
                          disabled={isLoading}
                          className="text-slate-500 hover:text-slate-700 disabled:opacity-50 transition-colors cursor-pointer"
                        >
                          Change Email
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Authenticated Dashboard UI */}
                  {isAuthenticated && user && (
                    <div className="space-y-6 text-left">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-extrabold text-brand-blue-950 font-sans">
                            Signed in successfully
                          </h3>
                          <p className="text-xs text-slate-500">Welcome back to your CBite workspace</p>
                        </div>
                      </div>

                      <div className="bg-slate-50/70 border border-slate-200/80 rounded-xl p-5 space-y-4">
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Profile Identity
                          </span>
                          <span className="text-sm font-semibold text-brand-blue-950 block mt-1 select-all">
                            {user.name || 'CBite User'}
                          </span>
                        </div>

                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            Registered Email
                          </span>
                          <span className="text-sm font-semibold text-brand-blue-950 block mt-1 select-all">
                            {user.email}
                          </span>
                        </div>

                        <div className="flex gap-4">
                          <div className="flex-grow">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Provider
                            </span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {user.authProviders?.map((p) => (
                                <span key={p} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-brand-blue-50 text-brand-blue-600 border border-brand-blue-100 uppercase">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex-grow">
                            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              Verified
                            </span>
                            <div>
                              <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase">
                                {user.isVerified ? 'Verified' : 'Unverified'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleLogout}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-lg text-sm font-semibold transition-all active:scale-99 cursor-pointer"
                      >
                        {isLoading ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <>
                            <LogOut className="w-4 h-4 mr-2" />
                            Log Out Session
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
