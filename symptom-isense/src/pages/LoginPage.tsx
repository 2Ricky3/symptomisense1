import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-bg via-bg to-muted flex items-center justify-center">
      <form className="space-y-5 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-dark mb-6">Log in to Symptom-iSense</h2>
        <div>
          <label className="block text-sm font-medium text-dark mb-1" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full rounded-md border border-muted px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-accent bg-bg/80 backdrop-blur"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-dark mb-1" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full rounded-md border border-muted px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-accent bg-bg/80 backdrop-blur"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md px-5 py-3 text-base font-semibold text-dark shadow-lg transition
            bg-bg/60 backdrop-blur-lg border border-muted/30 hover:bg-accent/30 hover:text-primary"
          style={{
            boxShadow: '0 8px 32px 0 rgba(21, 32, 38, 0.15)',
          }}
        >
          Log in
        </button>
        <div className="mt-4">
          <a href="#" className="text-sm text-muted hover:text-accent transition">Forgot password?</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;