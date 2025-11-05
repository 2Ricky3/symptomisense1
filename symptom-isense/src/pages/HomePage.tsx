import React from 'react';
import type { User } from 'firebase/auth';
import { features as featuresData, faqs as faqsData, healthcareProviders } from '../utils/constants';
import { FaHeartbeat, FaHospital } from 'react-icons/fa';
import Header from '../components/layout/Header';
import HeroSection from '../components/layout/HeroSection';
import StatsSection from '../components/layout/StatsSection';
import FeatureCard from '../components/layout/FeatureCard';
import FAQItem from '../components/layout/FAQItem';
import HealthcareProviderItem from '../components/layout/HealthcareProviderItem';

interface HomePageProps {
  user: User | null;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  onCheckSymptomsClick?: () => void;
  onLearnMoreClick?: () => void;
  onProfileClick?: () => void; 
}

const HomePage: React.FC<HomePageProps> = ({
  user,
  onLoginClick,
  onLogoutClick,
  onCheckSymptomsClick,
  onLearnMoreClick,
  onProfileClick, 
}) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-bg via-bg to-muted overflow-auto">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      <Header
        user={user}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        onProfileClick={onProfileClick}
        onCheckSymptomsClick={onCheckSymptomsClick}
        scrollToSection={scrollToSection}
      />

      <main id="main-content" className="flex-1 flex flex-col items-center px-4 pt-20 lg:px-6" role="main">
        <HeroSection 
          onCheckSymptomsClick={handleCheckSymptomsClick}
          onLearnMoreClick={onLearnMoreClick}
        />

        <div className="w-full my-16 relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t-2 border-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="bg-gradient-to-r from-primary via-accent to-primary p-[2px] rounded-full">
              <div className="bg-white px-6 py-2 rounded-full">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">Trusted by Users</span>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <StatsSection />

        <section 
          id="features" 
          aria-labelledby="features-heading" 
          className="w-full max-w-5xl mx-auto mb-16 scroll-mt-24 px-4 sm:px-6 py-8"
        >
          <div className="text-center mb-12">
            <h2 id="features-heading" className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
              Powerful Features
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Everything you need for informed health decisions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresData.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} index={idx} />
            ))}
          </div>
        </section>

        <div className="w-full my-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="flex items-center gap-3 px-8 bg-white">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent opacity-60"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent opacity-30"></div>
                  </div>
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary opacity-30"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary opacity-60"></div>
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section 
          id="healthcare-providers" 
          aria-labelledby="providers-heading" 
          className="w-full max-w-7xl mx-auto mb-20 scroll-mt-24 px-4 sm:px-6 py-8"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-full px-4 py-2 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Healthcare Network</span>
            </div>
            <h2 id="providers-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Trusted Healthcare Providers
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Connect with verified healthcare professionals and mental health support services across South Africa
            </p>
            <div className="flex items-center justify-center gap-2 mt-6">
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-accent rounded-full"></div>
            </div>
          </div>
          
          <div className="mb-12">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-teal-400 rounded-3xl opacity-20 group-hover:opacity-30 blur transition duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-400 rounded-2xl blur-lg opacity-40"></div>
                      <div className="relative bg-gradient-to-br from-green-500 to-teal-600 p-4 rounded-2xl shadow-lg">
                        <FaHeartbeat className="text-white text-3xl" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Mental Health Support</h3>
                      <p className="text-sm text-gray-500">Professional counseling and crisis intervention</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-green-700">{healthcareProviders.mentalHealth.length} Services Available</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {healthcareProviders.mentalHealth.map((provider, idx) => (
                    <HealthcareProviderItem key={idx} provider={provider} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-3xl opacity-20 group-hover:opacity-30 blur transition duration-500"></div>
              <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-lg border border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-400 rounded-2xl blur-lg opacity-40"></div>
                      <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
                        <FaHospital className="text-white text-3xl" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Medical Services</h3>
                      <p className="text-sm text-gray-500">Emergency and general healthcare providers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-blue-700">{healthcareProviders.medical.length} Services Available</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {healthcareProviders.medical.map((provider, idx) => (
                    <HealthcareProviderItem key={idx} provider={provider} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full my-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
              <div className="relative flex-shrink-0">
                <div className="flex items-center gap-1 sm:gap-3">
                  <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                    <div className="absolute w-4 h-1 sm:w-6 sm:h-1.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                    <div className="absolute w-1 h-4 sm:w-1.5 sm:h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold text-muted uppercase tracking-widest px-1 sm:px-2 whitespace-nowrap">Questions?</span>
                  <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                    <div className="absolute w-4 h-1 sm:w-6 sm:h-1.5 bg-gradient-to-r from-accent to-primary rounded-full"></div>
                    <div className="absolute w-1 h-4 sm:w-1.5 sm:h-6 bg-gradient-to-b from-accent to-primary rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gray-300 to-gray-300"></div>
            </div>
          </div>
        </div>

        <section 
          id="faq" 
          aria-labelledby="faq-heading" 
          className="w-full max-w-4xl mx-auto mb-16 scroll-mt-24 px-4 sm:px-6 py-8"
        >
          <div className="text-center mb-12">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted">
              Find answers to common questions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="space-y-4">
            {faqsData.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} />
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full text-muted text-sm text-center py-6 bg-gradient-to-t from-gray-50 to-transparent mt-auto border-t border-gray-200" role="contentinfo">
        <p className="mb-2">&copy; 2025 Symptom-iSense. All rights reserved.</p>
        <p className="text-xs">Your health information is private and secure.</p>
      </footer>
    </div>
  );
};

export default HomePage;
