import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import type { User } from 'firebase/auth';
import Logo from '../../assets/Logo.png';
import Avatar from '../ui/Avatar';
import { getUserProfile, type UserProfile } from '../../services/userProfileService';
import { FaSignOutAlt } from 'react-icons/fa';

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
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    };

    fetchUserProfile();
  }, [user]);

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
            className="p-2.5 text-primary hover:text-accent transition-colors duration-200 cursor-pointer"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-10">
          <button
            className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent cursor-pointer"
            onClick={() => scrollToSection('features')}
          >
            Features
          </button>
          <button
            className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent cursor-pointer"
            onClick={() => scrollToSection('healthcare-providers')}
          >
            Healthcare Providers
          </button>
          <button
            className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent cursor-pointer"
            onClick={() => scrollToSection('faq')}
          >
            FAQ
          </button>
          <button
            className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent cursor-pointer"
            onClick={onProfileClick} 
          >
            Profile
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-3">
          {user ? (
            <>
              <Avatar
                avatar={userProfile?.avatar || 'default'}
                size="sm"
                className="ring-2 ring-[#152026]/20"
              />
              <button
                onClick={onLogoutClick}
                className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent px-2 py-1 flex items-center gap-2 cursor-pointer"
              >
                <span>Log out</span>
                <FaSignOutAlt className="text-current" />
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent px-2 py-1 cursor-pointer"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm shadow-2xl border-l border-gray-200">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2 hover:opacity-80 transition">
              <img src={Logo} alt="Symptom-iSense Logo" className="h-8 w-auto" />
              <span className="text-primary font-bold text-xl">Symptom-iSense</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-primary transition-all duration-200 cursor-pointer"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root">
            <div className="space-y-1 mb-6">
              <button
                className="flex items-center w-full rounded-xl px-4 py-3.5 text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary transition-all duration-200 cursor-pointer group"
                onClick={() => {
                  scrollToSection('features');
                  setMobileMenuOpen(false);
                }}
              >
                <span className="flex-1 text-left">Features</span>
                <span className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">→</span>
              </button>
              <button
                className="flex items-center w-full rounded-xl px-4 py-3.5 text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary transition-all duration-200 cursor-pointer group"
                onClick={() => {
                  scrollToSection('healthcare-providers');
                  setMobileMenuOpen(false);
                }}
              >
                <span className="flex-1 text-left">Healthcare Providers</span>
                <span className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">→</span>
              </button>
              <button
                className="flex items-center w-full rounded-xl px-4 py-3.5 text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary transition-all duration-200 cursor-pointer group"
                onClick={() => {
                  scrollToSection('faq');
                  setMobileMenuOpen(false);
                }}
              >
                <span className="flex-1 text-left">FAQ</span>
                <span className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">→</span>
              </button>
              <button
                className="flex items-center w-full rounded-xl px-4 py-3.5 text-base font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 hover:text-primary transition-all duration-200 cursor-pointer group"
                onClick={() => {
                  if (onProfileClick) onProfileClick();
                  setMobileMenuOpen(false);
                }}
              >
                <span className="flex-1 text-left">Profile</span>
                <span className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">→</span>
              </button>
            </div>
            <div className="pt-6 border-t border-gray-200">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5">
                    <Avatar
                      avatar={userProfile?.avatar || 'default'}
                      size="md"
                      className="ring-2 ring-primary/20"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                      <p className="text-xs text-gray-500">Signed in</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (onLogoutClick) onLogoutClick();
                      setMobileMenuOpen(false);
                    }} 
                    className="flex items-center justify-center gap-2 w-full rounded-xl px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <FaSignOutAlt className="text-current" />
                    <span>Log out</span>
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    if (onLoginClick) onLoginClick();
                    setMobileMenuOpen(false);
                  }} 
                  className="flex items-center justify-center w-full rounded-xl px-4 py-3 bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-semibold transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
                >
                  Log in <span aria-hidden="true" className="ml-2">→</span>
                </button>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;