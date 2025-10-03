import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from './services/firebase'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AiTestPage from './pages/testOpenAI';
import './App.css';

type PageRoute = 'home' | 'login' | 'ai';

function App() {
  const [page, setPage] = useState<PageRoute>('home');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setPage('home');
  };

  if (loading) {
    return <div>Loading...</div>; 
  
  }

  return (
    <>
      {page === 'home' && (
        <HomePage
          user={user}
          onLoginClick={() => setPage('login')}
          onLogoutClick={handleLogout}
          onCheckSymptomsClick={() => (user ? setPage('ai') : setPage('login'))}
        />
      )}
      {page === 'login' && (
        <LoginPage
          onHomeClick={() => setPage('home')}
        />
      )}
      {page === 'ai' && user && <AiTestPage onHomeClick={() => setPage('home')} />}
    </>
  );
}

export default App;
