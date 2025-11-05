import React from 'react';
import Logo from '../../assets/Logo.png';
import Button from '../ui/Button';

interface HeroSectionProps {
  onCheckSymptomsClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onLearnMoreClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onCheckSymptomsClick,
  onLearnMoreClick,
}) => {
  return (
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

        <div className="flex flex-col gap-4 justify-center items-center mb-8 w-full max-w-md mx-auto px-4" data-aos="fade-up" data-aos-delay="300">
          <Button
            variant="checkSymptoms"
            onClick={onCheckSymptomsClick}
            className="w-full text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            aria-label="Start checking your symptoms"
          >
            Check Symptoms Now
          </Button>
          <button
            onClick={onLearnMoreClick}
            className="text-sm sm:text-base font-semibold text-dark hover:text-accent hover:underline transition-all duration-200 cursor-pointer group flex items-center gap-2"
            aria-label="Learn more about Symptom-iSense"
          >
            Learn more 
            <span aria-hidden="true" className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-xs sm:text-sm text-blue-800 shadow-sm max-w-full mx-auto">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <span className="text-center break-words">💡 Tip: Describe your symptoms in detail for best results</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
