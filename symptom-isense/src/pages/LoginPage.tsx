import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../services/firebase';

const firebaseErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'This email is already registered. Try logging in.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/user-not-found': 'No account found with this email.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
};

const LoginPage: React.FC<{ onHomeClick?: () => void }> = ({ onHomeClick }) => {
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
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      if (onHomeClick) onHomeClick();
    } catch (err: unknown) {
      if (err instanceof FirebaseError) {
        const code = (err as FirebaseError).code;
        setError(firebaseErrorMessages[code] || 'Something went wrong. Please try again.');
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
      if (err instanceof FirebaseError) {
        const code = (err as FirebaseError).code;
        switch (code) {
          case 'auth/user-not-found':
            setError('No account found with this email.');
            break;
          case 'auth/invalid-email':
            setError('Please enter a valid email address.');
            break;
          default:
            setError('Failed to send reset email. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-bg via-bg to-muted flex items-center justify-center">
      <button
        type="button"
        className="absolute top-6 left-6 text-sm text-muted hover:text-accent hover:underline transition bg-transparent border-none cursor-pointer z-50"
        onClick={onHomeClick}
      >
        ← Back to Home
      </button>

      <form className="space-y-5 max-w-md w-full text-center" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-dark mb-6">
          {showSignUp
            ? 'Sign up for Symptom-iSense'
            : showResetPassword
            ? 'Reset Password'
            : 'Log in to Symptom-iSense'}
        </h2>

        {showSignUp && (
          <div>
            <label className="block text-sm font-medium text-dark mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-muted px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-accent bg-bg/80 backdrop-blur"
              placeholder="Your name"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-dark mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-muted px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-accent bg-bg/80 backdrop-blur"
            placeholder="you@example.com"
            required
          />
        </div>

        {!showResetPassword && (
          <div>
            <label className="block text-sm font-medium text-dark mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-muted px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-accent bg-bg/80 backdrop-blur"
              placeholder="••••••••"
              required={!showResetPassword}
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}

        {!showResetPassword && (
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md px-5 py-3 text-base font-semibold text-dark shadow-lg transition
            bg-bg/60 backdrop-blur-lg border border-muted/30 hover:bg-accent/30 hover:text-primary disabled:opacity-50"
            style={{ boxShadow: '0 8px 32px 0 rgba(21, 32, 38, 0.15)' }}
          >
            {loading ? 'Please wait...' : showSignUp ? 'Sign Up' : 'Log in'}
          </button>
        )}

        {showResetPassword && (
          <button
            type="button"
            disabled={loading}
            onClick={handlePasswordReset}
            className="w-full rounded-md px-5 py-3 text-base font-semibold text-dark shadow-lg transition
            bg-bg/60 backdrop-blur-lg border border-muted/30 hover:bg-accent/30 hover:text-primary disabled:opacity-50"
            style={{ boxShadow: '0 8px 32px 0 rgba(21, 32, 38, 0.15)' }}
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        )}

        <div className="mt-4 text-sm text-muted">
          {!showSignUp && !showResetPassword && (
            <button
              type="button"
              className="text-accent hover:underline transition bg-transparent border-none cursor-pointer"
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
              className="text-accent hover:underline transition bg-transparent border-none cursor-pointer"
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
            <div className="mt-2">
              {showSignUp ? (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="text-accent hover:underline transition bg-transparent border-none cursor-pointer"
                    onClick={() => setShowSignUp(false)}
                  >
                    Log in
                  </button>
                </span>
              ) : (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="text-accent hover:underline transition bg-transparent border-none cursor-pointer"
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
    </div>
  );
};

export default LoginPage;
