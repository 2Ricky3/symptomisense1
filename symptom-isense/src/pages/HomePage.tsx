import React from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import type { User } from 'firebase/auth';
import Logo from '../assets/Logo.png';

interface HomePageProps {
  user: User | null;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  onCheckSymptomsClick?: () => void;
}

const navigation = [
  { name: 'Features', href: '#' },
  { name: 'Company', href: '#' },
];

const HomePage: React.FC<HomePageProps> = ({ user, onLoginClick, onLogoutClick, onCheckSymptomsClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleCheckSymptomsClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (onCheckSymptomsClick) {
      onCheckSymptomsClick();
    } else {
      window.location.href = '/testOpenAI';
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-bg via-bg to-muted overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img src={Logo} alt="Symptom-iSense Logo" className="h-8 w-auto" />
              <span className="text-primary font-bold text-xl">Symptom-iSense</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-primary hover:text-accent transition"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-dark hover:text-accent transition"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <button
                onClick={onLogoutClick}
                className="text-sm font-semibold text-dark hover:text-accent transition bg-transparent border-none cursor-pointer"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="text-sm font-semibold text-dark hover:text-accent transition bg-transparent border-none cursor-pointer"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            )}
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-bg p-6 sm:max-w-sm sm:ring-1 sm:ring-muted/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                <img src={Logo} alt="Symptom-iSense Logo" className="h-8 w-auto" />
                <span className="text-primary font-bold text-xl">Symptom-iSense</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-primary hover:text-accent transition"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-muted/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-dark hover:bg-muted hover:text-primary transition"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {user ? (
                    <button
                      onClick={onLogoutClick}
                      className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-base font-semibold text-dark hover:bg-muted hover:text-primary transition text-left"
                    >
                      Log out
                    </button>
                  ) : (
                    <button
                      onClick={onLoginClick}
                      className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-base font-semibold text-dark hover:bg-muted hover:text-primary transition text-left"
                    >
                      Log in
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen px-6 pt-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <img
            src={Logo}
            alt="Health illustration"
            className="mx-auto mb-6 w-32 h-20"
          />
          <h1 className="text-5xl font-extrabold text-dark mb-4 drop-shadow">Symptom-iSense</h1>
          <p className="text-lg text-muted mb-8">Your intelligent symptom checker</p>
        </div>

        <ul className="mb-8 text-muted space-y-2 text-base text-left max-w-sm mx-auto">
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span> Fast & accurate symptom analysis
          </li>
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span> Private & secure
          </li>
          <li className="flex items-center gap-2">
            <span className="text-secondary">✓</span> Free to use
          </li>
        </ul>

        <div className="flex justify-center">
          <button
            onClick={handleCheckSymptomsClick}
            className="rounded-md px-5 py-3 text-base font-semibold text-dark shadow-lg transition
            bg-bg/60 backdrop-blur-lg border border-muted/30 hover:bg-accent/30 hover:text-primary"
            style={{ boxShadow: '0 8px 32px 0 rgba(21, 32, 38, 0.15)' }}
          >
            Check Symptoms
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <a href="#" className="text-base font-semibold text-dark hover:text-accent hover:underline transition">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="mt-6 text-xs text-muted text-center">
          Tip: Describe your symptoms in detail for best results.
        </div>
      </main>

      <footer className="w-full text-muted text-xs text-center py-2 absolute bottom-0 left-0 bg-transparent">
        &copy; 2025 Symptom-iSense. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
