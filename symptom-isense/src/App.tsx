import { lazy, Suspense, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from './services/firebase';
import './App.css';
import Loader from './pages/Loader';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AiTestPage = lazy(() => import('./pages/testOpenAI'));
const LearnMorePage = lazy(() => import('./pages/LearnMorePage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

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
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-gradient-to-br from-bg via-bg to-muted flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-12 sm:p-16 flex flex-col items-center max-w-2xl w-full">
            <Loader />
            <p className="mt-6 text-muted text-lg text-center">Loading, please wait...</p>
          </div>
        </div>
      }
    >
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
            if (user) {
              setPage('profile');
            } else {
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
    </Suspense>
  );
}

export default App;
