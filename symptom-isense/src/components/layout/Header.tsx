import React from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import type { User } from 'firebase/auth';
import Logo from '../../assets/Logo.png';
import { FaUserCheck } from 'react-icons/fa';
import { cn } from '../../utils/classNames';

interface HeaderProps {
  user: User | null;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  onProfileClick?: () => void;
  scrollToSection: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  onLoginClick,
  onLogoutClick,
  onProfileClick,
  scrollToSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const textButtonClass =
    "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer";

  return (
    <header className="w-full z-50 sticky top-0">
      <nav className="flex items-center justify-between p-4 lg:px-6" aria-label="Global">
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
        <div className="hidden lg:flex lg:gap-x-10">
          <button
            className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent"
            onClick={() => scrollToSection('features')}
          >
            Features
          </button>
          <button
            className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent"
            onClick={() => scrollToSection('faq')}
          >
            FAQ
          </button>
          <button
            className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent"
            onClick={onProfileClick} 
          >
            Profile
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <button
              onClick={onLogoutClick}
              className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent px-2 py-1 flex items-center gap-2"
            >
              <FaUserCheck className="text-current text-xl" />
              <span>Log out</span>
            </button>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent px-2 py-1"
            >
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
                <button
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-dark hover:bg-muted/20 hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 w-full text-left"
                  onClick={() => {
                    scrollToSection('features');
                    setMobileMenuOpen(false);
                  }}
                >
                  Features
                </button>
                <button
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-dark hover:bg-muted/20 hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 w-full text-left"
                  onClick={() => {
                    scrollToSection('faq');
                    setMobileMenuOpen(false);
                  }}
                >
                  FAQ
                </button>
              </div>
              <div className="py-6">
                {user ? (
                  <button onClick={onLogoutClick} className={cn(textButtonClass, "w-full text-left")}>
                    Log out
                  </button>
                ) : (
                  <button onClick={onLoginClick} className={cn(textButtonClass, "w-full text-left")}>
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;