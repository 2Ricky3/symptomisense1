import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from './services/firebase'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AiTestPage from './pages/testOpenAI';
import LearnMorePage from './pages/LearnMorePage';
import './App.css';

type PageRoute = 'home' | 'login' | 'ai' | 'learnMore';

function App() {
  const [page, setPage] = useState<PageRoute>('home');
  const [loginReturnTo, setLoginReturnTo] = useState<PageRoute | null>(null);
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
          onLoginClick={() => {
            setLoginReturnTo('home');
            setPage('login');
          }}
          onLogoutClick={handleLogout}
          onCheckSymptomsClick={() => {
            if (user) setPage('ai');
            else {
              setLoginReturnTo('ai');
              setPage('login');
            }
          }}
          onLearnMoreClick={() => setPage('learnMore')}
        />
      )}
      {page === 'login' && (
        <LoginPage
          onClose={() => setPage('home')}
          onSuccess={() => {
            if (loginReturnTo === 'ai') setPage('ai');
            else setPage('home');
            setLoginReturnTo(null);
          }}
        />
      )}
      {page === 'ai' && user && <AiTestPage onHomeClick={() => setPage('home')} />}
      {page === 'learnMore' && <LearnMorePage onHomeClick={() => setPage('home')} />}
    </>
  );
}

export default App;
