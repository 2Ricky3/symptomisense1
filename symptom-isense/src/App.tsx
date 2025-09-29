import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  const [page, setPage] = useState<'home' | 'login'>('home');

  return (
    <>
      {page === 'home' && <HomePage onLoginClick={() => setPage('login')} />}
      {page === 'login' && <LoginPage />}
    </>
  );
}

export default App;

