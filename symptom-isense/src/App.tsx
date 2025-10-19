import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from './services/firebase'; 
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AiTestPage from './pages/testOpenAI';
import LearnMorePage from './pages/LearnMorePage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

type PageRoute = 'home' | 'login' | 'ai' | 'learnMore' | 'profile';

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
          onProfileClick={() => {
            console.log('Profile button clicked'); 
            if (user) {
              console.log('User is logged in:', user);
              setPage('profile');
            } else {
              console.log('User is not logged in'); 
              setLoginReturnTo('profile');
              setPage('login');
            }
          }}
        />
      )}
      {page === 'login' && (
        <LoginPage
          onClose={() => setPage('home')}
          onSuccess={() => {
            if (loginReturnTo) setPage(loginReturnTo);
            else setPage('home');
            setLoginReturnTo(null);
          }}
        />
      )}
      {page === 'ai' && user && <AiTestPage onHomeClick={() => setPage('home')} />}
      {page === 'learnMore' && <LearnMorePage onHomeClick={() => setPage('home')} />}
      {page === 'profile' && user && <ProfilePage user={user} onHomeClick={() => setPage('home')} />}
    </>
  );
}

export default App;
