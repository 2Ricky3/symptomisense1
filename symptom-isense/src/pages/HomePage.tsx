import React from 'react';
import type { User } from 'firebase/auth';
import Logo from '../assets/Logo.png';
import { features as featuresData, faqs as faqsData, healthcareProviders } from '../utils/constants';
import { FaHeartbeat, FaHospital, FaCheckCircle, FaBrain, FaShieldAlt } from 'react-icons/fa';
import Button from '../components/ui/Button';
import Header from '../components/layout/Header';
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

  const stats = [
    { icon: FaBrain, value: 'AI-Powered', label: 'Smart Analysis', color: 'text-blue-600' },
    { icon: FaCheckCircle, value: '99.8%', label: 'Accuracy Rate', color: 'text-green-600' },
    { icon: FaShieldAlt, value: '100%', label: 'Private & Secure', color: 'text-purple-600' },
  ];

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
        scrollToSection={scrollToSection}
      />

      <main id="main-content" className="flex-1 flex flex-col items-center px-4 pt-20 lg:px-6" role="main">
        <section 
          aria-labelledby="hero-heading" 
          className="w-full max-w-4xl text-center py-8 sm:py-12 md:py-16 mx-auto px-4 relative"
        >
          <div className="fixed inset-0 pointer-events-none opacity-30 z-0">
            <div className="absolute top-20 left-0 w-16 h-16 bg-blue-400 rounded-full blur-xl animate-[moveRight_15s_linear_infinite]"></div>
            <div className="absolute top-32 left-0 w-24 h-24 bg-purple-400 rounded-lg blur-2xl animate-[moveRight_20s_linear_infinite] animate-delay-2"></div>
            <div className="absolute top-44 left-0 w-20 h-20 bg-teal-400 rounded-full blur-xl animate-[moveRight_18s_linear_infinite] animate-delay-4"></div>
            <div className="absolute top-56 left-0 w-28 h-28 bg-pink-400 rounded-lg blur-2xl animate-[moveRight_22s_linear_infinite] animate-delay-1"></div>
            <div className="absolute top-72 left-0 w-16 h-16 bg-indigo-400 rounded-full blur-xl animate-[moveRight_16s_linear_infinite] animate-delay-3"></div>
            <div className="absolute top-16 left-0 w-12 h-12 bg-cyan-400 rounded-full blur-lg animate-[moveRight_19s_linear_infinite] animate-delay-5"></div>
            
            <div className="border-explosion-right border-explosion-right-blue"></div>
            <div className="border-explosion-right border-explosion-right-purple"></div>
            <div className="border-explosion-right border-explosion-right-teal"></div>
            <div className="border-explosion-right border-explosion-right-pink"></div>
            <div className="border-explosion-right border-explosion-right-indigo"></div>
            <div className="border-explosion-right border-explosion-right-cyan"></div>
          </div>

          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <img
              src={Logo}
              alt="Symptom-iSense health monitoring logo"
              className="mx-auto mb-6 w-32 h-20 sm:w-40 sm:h-24 transition-transform hover:scale-110 duration-300"
              data-aos="zoom-in"
            />
            <h1 
              id="hero-heading" 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-dark mb-6 drop-shadow-sm leading-tight" 
              data-aos="fade-up"
            >
              Symptom-iSense
            </h1>
            <p className="text-xl sm:text-2xl text-muted mb-6 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
              Your intelligent symptom checker powered by AI
            </p>
            <p className="text-sm sm:text-base text-muted mb-10 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="150">
              Get instant, accurate health insights and connect with trusted healthcare professionals
            </p>

            <div className="flex flex-col gap-4 justify-center items-center mb-8" data-aos="fade-up" data-aos-delay="300">
              <Button
                variant="checkSymptoms"
                onClick={handleCheckSymptomsClick}
                className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                aria-label="Start checking your symptoms"
              >
                Check Symptoms Now
              </Button>
              <button
                onClick={onLearnMoreClick}
                className="text-base font-semibold text-dark hover:text-accent hover:underline transition-all duration-200 cursor-pointer group flex items-center gap-2"
                aria-label="Learn more about Symptom-iSense"
              >
                Learn more 
                <span aria-hidden="true" className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-800 shadow-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>💡 Tip: Describe your symptoms in detail for best results</span>
            </div>
          </div>
        </section>

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

        <section aria-labelledby="stats-heading" className="w-full max-w-5xl mx-auto mb-16 px-4 sm:px-6">
          <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                data-aos="fade-up" 
                data-aos-delay={idx * 100}
              >
                <stat.icon className={`text-4xl ${stat.color} mb-4 mx-auto`} aria-hidden="true" />
                <div className="text-3xl font-bold text-dark mb-2">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

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
          className="w-full max-w-6xl mx-auto mb-16 scroll-mt-24 px-4 sm:px-6 py-8"
        >
          <div className="text-center mb-12">
            <h2 id="providers-heading" className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
              Healthcare Providers
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Connect with trusted healthcare professionals and mental health support services in South Africa
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="mb-12">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-6 sm:p-8 border border-green-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="bg-green-100 p-3 rounded-full">
                  <FaHeartbeat className="text-green-600 text-2xl" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-green-800">Mental Health Support</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthcareProviders.mentalHealth.map((provider, idx) => (
                  <HealthcareProviderItem key={idx} provider={provider} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaHospital className="text-blue-600 text-2xl" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-blue-800">Medical Services</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {healthcareProviders.medical.map((provider, idx) => (
                  <HealthcareProviderItem key={idx} provider={provider} />
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="w-full my-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-gray-300"></div>
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute w-6 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full"></div>
                    <div className="absolute w-1.5 h-6 bg-gradient-to-b from-primary to-accent rounded-full"></div>
                  </div>
                  <span className="text-xs font-semibold text-muted uppercase tracking-widest px-2">Questions?</span>
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <div className="absolute w-6 h-1.5 bg-gradient-to-r from-accent to-primary rounded-full"></div>
                    <div className="absolute w-1.5 h-6 bg-gradient-to-b from-accent to-primary rounded-full"></div>
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
