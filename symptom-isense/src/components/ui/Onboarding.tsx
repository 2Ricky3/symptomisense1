import React, { useState } from 'react';
import { FaCheckCircle, FaUserMd, FaHistory, FaRocket, FaTimes } from 'react-icons/fa';
import Button from './Button';

interface OnboardingProps {
  onComplete: () => void;
  userName?: string;
}

const onboardingSteps = [
  {
    icon: FaRocket,
    title: 'Welcome to Symptom-iSense',
    description: 'Your intelligent health companion powered by AI. We\'re here to help you understand your symptoms and connect with healthcare professionals.',
    color: 'from-white to-gray-50',
    iconBg: 'bg-gradient-to-br from-[#293540] to-[#455059]',
    accentColor: 'from-[#293540] to-[#455059]',
  },
  {
    icon: FaCheckCircle,
    title: 'AI-Powered Symptom Analysis',
    description: 'Describe your symptoms in detail and receive instant, accurate insights powered by advanced AI technology.',
    color: 'from-white to-teal-50/30',
    iconBg: 'bg-gradient-to-br from-teal-600 to-teal-700',
    accentColor: 'from-teal-500 to-teal-600',
  },
  {
    icon: FaHistory,
    title: 'Secure Health Records',
    description: 'All your symptom checks are saved securely and privately. View, filter, and manage your health history anytime.',
    color: 'from-white to-blue-50/30',
    iconBg: 'bg-gradient-to-br from-blue-600 to-blue-700',
    accentColor: 'from-blue-500 to-blue-600',
  },
  {
    icon: FaUserMd,
    title: 'Personalized Experience',
    description: 'Customize your profile, choose your avatar, and connect with trusted healthcare providers. Your data is always private and secure.',
    color: 'from-white to-purple-50/30',
    iconBg: 'bg-gradient-to-br from-purple-600 to-purple-700',
    accentColor: 'from-purple-500 to-purple-600',
  },
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, userName }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = onboardingSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        <button
          onClick={handleSkip}
          className="absolute -top-4 right-0 z-20 text-gray-700 hover:text-gray-900 transition-all duration-200 bg-white hover:bg-gray-50 backdrop-blur-sm rounded-full p-3 shadow-lg group border border-gray-200"
          aria-label="Skip onboarding"
        >
          <FaTimes className="text-xl group-hover:rotate-90 transition-transform duration-300" />
        </button>

        <div className="bg-white backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200" data-aos="zoom-in">
          <div className={`bg-gradient-to-br ${step.color} p-12 sm:p-16 text-center relative overflow-hidden border-b border-gray-100`}>
            <div className="absolute inset-0 opacity-[0.03]">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="onboarding-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1.5" fill="currentColor" className="text-gray-900" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#onboarding-pattern)" />
              </svg>
            </div>

            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-8 left-8 w-24 h-24 bg-gray-200/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-8 right-8 w-32 h-32 bg-gray-200/20 rounded-full blur-2xl"></div>
            </div>

            <div className="relative z-10">
              <div className={`inline-flex items-center justify-center w-28 h-28 ${step.iconBg} rounded-full shadow-2xl mb-8 border-4 border-white transform transition-transform duration-500 hover:scale-110`}>
                <Icon className="text-5xl text-white drop-shadow-lg" />
              </div>

              {currentStep === 0 && userName && (
                <div className="mb-6 animate-fade-in">
                  <p className="text-gray-800 text-2xl font-semibold">Welcome, {userName}! 👋</p>
                </div>
              )}

              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {step.title}
              </h2>

              <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>

          <div className="p-8 sm:p-12 bg-gradient-to-b from-white to-gray-50">
            <div className="flex items-center justify-center gap-3 mb-10">
              {onboardingSteps.map((stepItem, index) => (
                <div
                  key={index}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === currentStep
                      ? `w-12 bg-gradient-to-r ${stepItem.accentColor} shadow-lg`
                      : index < currentStep
                      ? 'w-2.5 bg-gradient-to-r from-teal-500 to-teal-600'
                      : 'w-2.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 mb-6">
              <button
                onClick={handleSkip}
                className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Skip Tour
              </button>

              <div className="flex gap-3">
                {currentStep > 0 && (
                  <Button
                    variant="secondary"
                    onClick={handlePrevious}
                    className="px-6 py-3 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  variant="checkSymptoms"
                  onClick={handleNext}
                  className="px-8 py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  {currentStep < onboardingSteps.length - 1 ? 'Next' : 'Get Started'}
                </Button>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 font-medium">
                Step {currentStep + 1} of {onboardingSteps.length}
              </p>
            </div>

            {currentStep === 0 && (
              <div className="mt-8 flex items-center justify-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                  </svg>
                  <span>Private & Secure</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
