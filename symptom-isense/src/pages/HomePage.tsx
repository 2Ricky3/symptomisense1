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
  onLearnMoreClick?: () => void;
}

const navigation = [
  { name: 'Features', href: '#' },
  { name: 'Company', href: '#' },
];

const HomePage: React.FC<HomePageProps> = ({
  user,
  onLoginClick,
  onLogoutClick,
  onCheckSymptomsClick,
  onLearnMoreClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleCheckSymptomsClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (onCheckSymptomsClick) {
      onCheckSymptomsClick();
    } else {
      window.location.href = '/testOpenAI';
    }
  };
  const textButtonClass =
    "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer";

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-bg via-bg to-muted overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2 hover:opacity-90 transition">
              <img src={Logo} alt="Symptom-iSense Logo" className="h-8 w-auto" />
              <span className="text-primary font-bold text-xl">Symptom-iSense</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 text-primary hover:text-accent transition-colors duration-200"
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
                className="text-sm font-semibold text-dark hover:text-accent transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {user ? (
              <button onClick={onLogoutClick} className={textButtonClass}>
                Log out
              </button>
            ) : (
              <button onClick={onLoginClick} className={textButtonClass}>
                Log in <span aria-hidden="true">&rarr;</span>
              </button>
            )}
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-bg p-6 sm:max-w-sm sm:ring-1 sm:ring-muted/10 shadow-xl">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2 hover:opacity-80 transition">
                <img src={Logo} alt="Symptom-iSense Logo" className="h-8 w-auto" />
                <span className="text-primary font-bold text-xl">Symptom-iSense</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 text-primary hover:text-accent transition-colors duration-200"
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
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-dark hover:bg-muted/20 hover:text-accent transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {user ? (
                    <button onClick={onLogoutClick} className={`w-full text-left ${textButtonClass}`}>
                      Log out
                    </button>
                  ) : (
                    <button onClick={onLoginClick} className={`w-full text-left ${textButtonClass}`}>
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
            data-aos="zoom-in"
          />
          <h1 className="text-5xl font-extrabold text-dark mb-4 drop-shadow-sm" data-aos="fade-up">
            Symptom-iSense
          </h1>
          <p className="text-lg text-muted mb-8" data-aos="fade-up" data-aos-delay="100">
            Your intelligent symptom checker
          </p>
        </div>

        <ul
          className="mb-8 text-muted space-y-2 text-base text-left max-w-sm mx-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
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

        <div className="flex justify-center" data-aos="fade-up" data-aos-delay="300">
          <button
            onClick={handleCheckSymptomsClick}
            className="rounded-md px-6 py-3 text-base font-semibold
                       text-dark bg-bg border border-muted/30 shadow-md
                       transition-all duration-300 transform
                       hover:bg-dark hover:text-bg hover:shadow-lg hover:scale-105"
          >
            Check Symptoms
          </button>
        </div>
        <div className="mt-4 flex justify-center" data-aos="fade-up" data-aos-delay="400">
          <button
            onClick={onLearnMoreClick}
            className="text-base font-semibold text-dark hover:text-accent hover:underline transition-colors duration-200"
          >
            Learn more <span aria-hidden="true">→</span>
          </button>
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
