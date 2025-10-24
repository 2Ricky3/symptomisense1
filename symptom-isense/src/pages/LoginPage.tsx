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

type ErrorLike = { code?: unknown; message?: unknown } & Record<string, unknown>;

const LoginPage: React.FC<{ onClose?: () => void; onSuccess?: () => void }> = ({ onClose, onSuccess }) => {
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

      if (onSuccess) onSuccess();
      else if (onClose) onClose();
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
        setMessage('Account created successfully!');
      } else {
        setMessage('Logged in successfully!');
      }

      if (onSuccess) onSuccess();
      else if (onClose) onClose();
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
    <div className="fixed inset-0 bg-gradient-to-br from-bg via-bg to-muted flex items-center justify-center px-4">
      <BackButton
        onClick={onClose || (() => {})}
        className="absolute top-6 left-6 z-50"
      />

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

        <div>
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
          <div>
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

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-500 text-sm">{message}</p>}

        {!showResetPassword && (
          <div className="mt-6">
            <Button
              type="button"
              variant="social"
              onClick={handleSocialLogin}
            >
              <FaGoogle className="h-5 w-5" />
              Continue with Google
            </Button>
          </div>
        )}

        {showResetPassword && (
          <Button 
            type="button" 
            disabled={loading} 
            onClick={handlePasswordReset}
            loading={loading}
          >
            Send Reset Email
          </Button>
        )}

        {!showResetPassword && (
          <Button 
            type="submit" 
            disabled={loading}
            loading={loading}
            className="mt-6"
          >
            {showSignUp ? 'Sign Up' : 'Log in'}
          </Button>
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
