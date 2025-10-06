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

  const buttonClasses =
    "w-full rounded-md px-5 py-3 text-base font-semibold text-dark bg-bg border border-muted/30 shadow-md " +
    "transition-all duration-300 transform hover:bg-dark hover:text-bg hover:shadow-lg hover:scale-105 " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  const smallButtonClasses =
    "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer";

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-bg via-bg to-muted flex items-center justify-center px-4">
      <button
        type="button"
        className={`${smallButtonClasses} absolute top-6 left-6 z-50`}
        onClick={onHomeClick}
      >
        ← Back to Home
      </button>

      <form className="space-y-5 max-w-md w-full text-center" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold text-dark mb-6">
          {showSignUp
            ? 'Sign up'
            : showResetPassword
            ? 'Reset Password'
            : 'Login'}
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
          <button type="submit" disabled={loading} className={buttonClasses}>
            {loading ? 'Please wait...' : showSignUp ? 'Sign Up' : 'Log in'}
          </button>
        )}

        {showResetPassword && (
          <button type="button" disabled={loading} onClick={handlePasswordReset} className={buttonClasses}>
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        )}

        <div className="mt-4 text-sm text-muted flex flex-col gap-2 items-center">
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
            <div className="mt-2">
              {showSignUp ? (
                <span>
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
                <span>
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
    </div>
  );
};

export default LoginPage;
