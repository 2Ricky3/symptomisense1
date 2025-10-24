import React from 'react';
import type { User } from 'firebase/auth';
import Logo from '../assets/Logo.png';
import { features as featuresData, faqs as faqsData } from '../utils/constants';
import Button from '../components/ui/Button';
import Header from '../components/layout/Header';
import FeatureCard from '../components/layout/FeatureCard';
import FAQItem from '../components/layout/FAQItem';

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
      <Header
        user={user}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
        onProfileClick={onProfileClick}
        scrollToSection={scrollToSection}
      />

      <main className="flex-1 flex flex-col items-center px-4 pt-20 lg:px-6">
        <div className="w-full max-w-3xl md:max-w-4xl text-center py-6 mx-auto px-4">
          <img
            src={Logo}
            alt="Health illustration"
            className="mx-auto mb-6 w-32 h-20"
            data-aos="zoom-in"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark mb-4 drop-shadow-sm" data-aos="fade-up">
            Symptom-iSense
          </h1>
          <p className="text-lg text-muted mb-8" data-aos="fade-up" data-aos-delay="100">
            Your intelligent symptom checker
          </p>
        </div>

        <div className="flex justify-center mb-2" data-aos="fade-up" data-aos-delay="300">
          <Button
            variant="checkSymptoms"
            onClick={handleCheckSymptomsClick}
          >
            Check Symptoms
          </Button>
        </div>
        <div className="mt-4 flex justify-center mb-8" data-aos="fade-up" data-aos-delay="400">
          <button
            onClick={onLearnMoreClick}
            className="text-base font-semibold text-dark hover:text-accent hover:underline transition-colors duration-200"
          >
            Learn more <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="mt-6 text-xs text-muted text-center mb-8">
          Tip: Describe your symptoms in detail for best results.
        </div>

        <section id="features" className="w-full max-w-5xl mx-auto mt-6 mb-12 scroll-mt-24 px-4 sm:px-6 py-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresData.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} index={idx} />
            ))}
          </div>
        </section>
        <section id="faq" className="w-full max-w-6xl mx-auto mb-16 scroll-mt-24 px-6 py-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqsData.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} />
            ))}
          </div>
        </section>

        <div className="mt-6 text-xs text-muted text-center">
          Tip: Describe your symptoms in detail for best results.
        </div>
      </main>

      <footer className="w-full text-muted text-xs text-center py-2 bg-transparent mt-auto">
        &copy; 2025 Symptom-iSense. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
