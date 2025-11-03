import { lazy, Suspense, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from './services/firebase';
import { getUserProfile, updateUserProfile } from './services/userProfileService';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import LoadingScreen from './components/ui/LoadingScreen';
import Onboarding from './components/ui/Onboarding';

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
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [pendingOnboarding, setPendingOnboarding] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser && pendingOnboarding) {
        const profile = await getUserProfile(currentUser.uid);
        
        if (!profile || profile.onboardingCompleted === false) {
          setShowOnboarding(true);
          setPendingOnboarding(false);
        }
      }
      
      setLoading(false);
    });
    return () => unsubscribe();
  }, [pendingOnboarding]);
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setPage('home');
  };

  const handleOnboardingComplete = async () => {
    if (user) {
      await updateUserProfile(user.uid, { onboardingCompleted: true });
      setShowOnboarding(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {showOnboarding && user && (
        <Onboarding
          onComplete={handleOnboardingComplete}
          userName={user.displayName || user.email?.split('@')[0]}
        />
      )}
      <Suspense
      fallback={<LoadingScreen message="Loading, please wait..." />}
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
          onSuccess={(newSignUp = false) => {
            if (newSignUp) {
              setPendingOnboarding(true);
            }
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
    </>
  );
}

export default App;
