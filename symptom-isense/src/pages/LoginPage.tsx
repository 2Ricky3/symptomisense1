import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../services/firebase';
import { extractAuthCode } from '../utils/errorUtils';
import { firebaseErrorMessages as errorMessages } from '../utils/constants';
import { FaGoogle } from 'react-icons/fa';
import type { UserCredential } from 'firebase/auth';
import Button from '../components/ui/Button';
import BackButton from '../components/ui/BackButton';
import FormInput from '../components/forms/FormInput';
import FormLabel from '../components/forms/FormLabel';
import { createUserProfile } from '../services/userProfileService';

type ErrorLike = { code?: unknown; message?: unknown } & Record<string, unknown>;

const LoginPage: React.FC<{ onClose?: () => void; onSuccess?: (isNewSignUp?: boolean) => void }> = ({ onClose, onSuccess }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (showSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        try {
          await createUserProfile(userCredential.user.uid, email);
        } catch {
          setError('Account created but profile setup failed. Please disable your ad blocker and try logging in again.');
        }
        
        if (onSuccess) onSuccess(true);
        else if (onClose) onClose();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        
        if (onSuccess) onSuccess(false);
        else if (onClose) onClose();
      }
    } catch (err: unknown) {
      const code = extractAuthCode(err);
      if (code && errorMessages[code]) {
        setError(errorMessages[code]);
      } else if (code) {
        if (/password|wrong/i.test(code)) {
          setError('Incorrect password. Please try again.');
        } else if (/user|not-found/i.test(code)) {
          setError('No account found with this email.');
        } else {
          setError('Authentication failed. Please check your email and password and try again.');
        }
      } else if (err && typeof err === 'object' && 'message' in err && typeof (err as ErrorLike).message === 'string') {
        setError((err as ErrorLike).message as string);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }

    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (err: unknown) {
      const code = extractAuthCode(err);
      if (code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (code && errorMessages[code]) {
        setError(errorMessages[code]);
      } else if (code) {
        if (/user|not-found/i.test(code)) {
          setError('No account found with this email.');
        } else {
          setError('Failed to send reset email. Please check the address and try again.');
        }
      } else if (err && typeof err === 'object' && 'message' in err && typeof (err as ErrorLike).message === 'string') {
        setError((err as ErrorLike).message as string);
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const authProvider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, authProvider);

      const isNewUser = (result as UserCredential & { additionalUserInfo?: { isNewUser: boolean } }).additionalUserInfo?.isNewUser;
      if (isNewUser) {
        try {
          await createUserProfile(result.user.uid, result.user.email || '');
          setMessage('Account created successfully!');
        } catch {
          setError('Account created but profile setup failed. Please disable your ad blocker and try logging in again.');
        }
        
        if (onSuccess) onSuccess(true);
        else if (onClose) onClose();
      } else {
        setMessage('Logged in successfully!');
        
        if (onSuccess) onSuccess(false);
        else if (onClose) onClose();
      }
    } catch (err: unknown) {
      const code = extractAuthCode(err);
      if (code && errorMessages[code]) {
        setError(errorMessages[code]);
      } else {
        setError('Failed to log in or sign up with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const smallButtonClasses =
    "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer";

  return (
    <div className="fixed inset-0 bg-[#152026] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#152026] via-[#293540] to-[#455059]"></div>
      
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="medical-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect x="28" y="24" width="4" height="12" fill="white" />
              <rect x="24" y="28" width="12" height="4" fill="white" />
              <circle cx="10" cy="10" r="1.5" fill="white" opacity="0.6" />
              <circle cx="50" cy="50" r="1.5" fill="white" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#medical-pattern)" />
        </svg>
      </div>
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-gray-700/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-600/15 rounded-full blur-3xl"></div>
      
      <BackButton
        onClick={onClose || (() => {})}
        className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200"
        data-aos="fade-right"
      />

      <div className="relative z-10 w-full max-w-md px-4 py-6 sm:py-0">
        <div className="text-center mb-4 sm:mb-6" data-aos="fade-down">
          <div className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-3 sm:mb-4 shadow-lg">
            <p className="text-xs sm:text-sm font-semibold text-white/90 tracking-wider uppercase">AI Health Assistant</p>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent drop-shadow-lg">
              Symptom-iSense
            </span>
          </h1>
          <p className="text-white/70 font-light text-sm sm:text-base md:text-lg px-2">Intelligent symptom analysis at your fingertips</p>
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 text-white/60 text-xs sm:text-sm" data-aos="fade-up" data-aos-delay="200">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="hidden xs:inline">HIPAA Compliant</span>
              <span className="xs:hidden">Secure</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Encrypted</span>
            </div>
          </div>
        </div>

        <form className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-7 md:p-9 space-y-4 sm:space-y-5 border border-gray-200/50 relative overflow-hidden" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="100">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#293540] via-[#455059] to-[#293540]"></div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#152026] mb-1.5 sm:mb-2 text-center" data-aos="fade-down" data-aos-delay="200">
              {showSignUp
                ? 'Create Account'
                : showResetPassword
                ? 'Reset Password'
                : 'Welcome Back'}
            </h2>
            
            <p className="text-[#5C6A73] text-xs sm:text-sm text-center mb-4 sm:mb-5 px-2" data-aos="fade-down" data-aos-delay="250">
              {showSignUp
                ? 'Join thousands of users managing their health'
                : showResetPassword
                ? 'Enter your email to receive reset instructions'
                : 'Sign in to access your health dashboard'}
            </p>

            {showSignUp && (
              <div data-aos="fade-up" data-aos-delay="300">
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                />
              </div>
            )}

            <div data-aos="fade-up" data-aos-delay={showSignUp ? "350" : "300"}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            {!showResetPassword && (
              <div data-aos="fade-up" data-aos-delay={showSignUp ? "400" : "350"}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormInput
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required={!showResetPassword}
                />
              </div>
            )}

            {error && <p className="text-red-500 text-xs sm:text-sm px-2" data-aos="shake">{error}</p>}
            {message && <p className="text-green-500 text-xs sm:text-sm px-2" data-aos="fade-in">{message}</p>}

            {!showResetPassword && (
              <div className="mt-4 sm:mt-5" data-aos="fade-up" data-aos-delay="450">
            <Button
              type="button"
              variant="social"
              onClick={handleSocialLogin}
            >
              <FaGoogle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">Continue with Google</span>
            </Button>
          </div>
        )}

        {showResetPassword && (
          <Button 
            type="button" 
            disabled={loading} 
            onClick={handlePasswordReset}
            loading={loading}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span className="text-sm sm:text-base">Send Reset Email</span>
          </Button>
        )}

        {!showResetPassword && (
          <Button 
            type="submit" 
            disabled={loading}
            loading={loading}
            className="mt-4 sm:mt-5"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <span className="text-sm sm:text-base">{showSignUp ? 'Sign Up' : 'Log in'}</span>
          </Button>
        )}

        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-muted flex flex-col gap-1.5 sm:gap-2 items-center" data-aos="fade-up" data-aos-delay="550">
          {!showSignUp && !showResetPassword && (
            <button
              type="button"
              className={smallButtonClasses}
              onClick={() => {
                setShowResetPassword(true);
                setError(null);
                setMessage(null);
              }}
            >
              Forgot password?
            </button>
          )}

          {showResetPassword && (
            <button
              type="button"
              className={smallButtonClasses}
              onClick={() => {
                setShowResetPassword(false);
                setError(null);
                setMessage(null);
              }}
            >
              Back to login
            </button>
          )}

          {!showResetPassword && (
            <div className="mt-1 sm:mt-2">
              {showSignUp ? (
                <span className="text-xs sm:text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    className={smallButtonClasses}
                    onClick={() => setShowSignUp(false)}
                  >
                    Log in
                  </button>
                </span>
              ) : (
                <span className="text-xs sm:text-sm">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className={smallButtonClasses}
                    onClick={() => setShowSignUp(true)}
                  >
                    Sign up
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
        </form>
        
        <div className="mt-4 sm:mt-6 text-center text-white/50 text-[10px] sm:text-xs px-4" data-aos="fade-up" data-aos-delay="600">
          <p className="mb-1.5 sm:mb-2">
            By continuing, you agree to our{' '}
            <button type="button" className="underline hover:text-white/70 transition-colors">Terms of Service</button>
            {' '}and{' '}
            <button type="button" className="underline hover:text-white/70 transition-colors">Privacy Policy</button>
          </p>
          <p className="text-white/40">
            © 2025 Symptom-iSense. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
