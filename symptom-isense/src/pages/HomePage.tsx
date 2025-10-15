import React from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import type { User } from 'firebase/auth';
import Logo from '../assets/Logo.png';
import { FaHeartbeat, FaShieldAlt, FaRobot, FaUserCheck } from 'react-icons/fa';

interface HomePageProps {
  user: User | null;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
  onCheckSymptomsClick?: () => void;
  onLearnMoreClick?: () => void;
}

const features = [
  {
    icon: <FaHeartbeat className="text-primary text-3xl mb-2" />,
    title: "AI Symptom Checker",
    description: "Get instant insights on your symptoms using advanced AI."
  },
  {
    icon: <FaShieldAlt className="text-primary text-3xl mb-2" />,
    title: "Privacy First",
    description: "Your health data is never stored or shared."
  },
  {
    icon: <FaRobot className="text-primary text-3xl mb-2" />,
    title: "Easy to Use",
    description: "Simple, conversational interface for everyone."
  },
  {
    icon: <FaUserCheck className="text-primary text-3xl mb-2" />,
    title: "Personalized Results",
    description: "Tailored suggestions based on your unique symptoms."
  }
];

const faqs = [
  {
    question: "Is my data private?",
    answer: "Yes. We do not store or share any personal health information."
  },
  {
    question: "How accurate are the results?",
    answer: "Our AI uses up-to-date medical information, but always consult a healthcare professional for serious concerns."
  },
  {
    question: "Do I need to create an account?",
    answer: "A account is required to use the symptom checker, but we prioritize your privacy."
  },
  {
    question: "Can I use this for emergencies?",
    answer: "No. For emergencies, contact your local medical services immediately."
  }
];

const HomePage: React.FC<HomePageProps> = ({
  user,
  onLoginClick,
  onLogoutClick,
  onCheckSymptomsClick,
  onLearnMoreClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
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
  const textButtonClass =
    "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-bg via-bg to-muted overflow-auto">
      <header className="w-full z-50 sticky top-0">
        <nav className="flex items-center justify-between p-6 lg:px-8 bg-bg"
          aria-label="Global"
        >
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
            <button
              className="text-sm font-semibold text-dark hover:text-accent transition-colors duration-200 bg-transparent"
              onClick={() => scrollToSection('features')}
            >
              Features
            </button>
            <button
              className="text-sm font-semibold text-dark hover:text-accent transition-colors duration-200 bg-transparent"
              onClick={() => scrollToSection('faq')}
            >
              FAQ
            </button>
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
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-dark hover:bg-muted/20 hover:text-accent transition-colors duration-200 w-full text-left"
                    onClick={() => scrollToSection('features')}
                  >
                    Features
                  </button>
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-dark hover:bg-muted/20 hover:text-accent transition-colors duration-200 w-full text-left"
                    onClick={() => scrollToSection('faq')}
                  >
                    FAQ
                  </button>
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

      <main className="flex-1 flex flex-col items-center px-6 pt-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center py-8">
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

        <div className="flex justify-center mb-2" data-aos="fade-up" data-aos-delay="300">
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

        <section id="features" className="max-w-4xl w-full mx-auto mt-8 mb-12 scroll-mt-24 px-4 py-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white/80 rounded-lg shadow p-6 flex flex-col items-center text-center transition-all duration-200 hover:bg-primary/10 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
              >
                {feature.icon}
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="faq" className="max-w-3xl w-full mx-auto mb-16 scroll-mt-24 px-4 py-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/70 rounded-lg p-4 shadow transition-all duration-200 hover:bg-accent/10 hover:scale-[1.02] hover:shadow-lg cursor-pointer"
              >
                <h4 className="font-semibold text-md mb-1">{faq.question}</h4>
                <p className="text-muted text-sm">{faq.answer}</p>
              </div>
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
