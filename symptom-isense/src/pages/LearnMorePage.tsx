import React from 'react';
import { FaSearch, FaDatabase, FaListAlt, FaRegLightbulb, FaArrowLeft } from 'react-icons/fa';
import ProcessStep from '../components/layout/ProcessStep';
import Disclaimer from '../components/layout/Disclaimer';

interface LearnMorePageProps {
  onHomeClick?: () => void;
}

const processSteps = [
  {
    icon: <FaSearch className="text-primary text-2xl mr-3" />,
    title: "Input Analysis",
    description: "Our AI carefully analyzes your symptom description, identifying key terms, severity, duration, and context."
  },
  {
    icon: <FaDatabase className="text-primary text-2xl mr-3" />,
    title: "Knowledge Base Correlation",
    description: "Your input is cross-referenced against a vast medical knowledge base to find matching patterns and conditions."
  },
  {
    icon: <FaListAlt className="text-primary text-2xl mr-3" />,
    title: "Differential Analysis",
    description: "Possible conditions are generated and ranked by likelihood based on your unique combination of symptoms."
  },
  {
    icon: <FaRegLightbulb className="text-primary text-2xl mr-3" />,
    title: "Result Generation",
    description: "You receive clear, easy-to-understand insights to help guide your next steps with a healthcare professional."
  }
];

const LearnMorePage: React.FC<LearnMorePageProps> = ({ onHomeClick }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-bg via-bg to-muted flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
      <header className="w-full z-50 sticky top-0" data-aos="fade-down">
        <nav className="flex items-center justify-between p-4 lg:px-6" aria-label="Global">
          <button
            type="button"
            className="text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer text-sm hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 -ml-2"
            onClick={() => {
              if (onHomeClick) onHomeClick();
              else window.location.href = "/";
            }}
          >
            <FaArrowLeft className="inline-block mr-2" /> Back to Home
          </button>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8" data-aos="zoom-in">
        <div className="prose prose-invert max-w-none text-dark">
          <h1 className="text-4xl font-extrabold text-primary mb-8 text-center drop-shadow-lg" data-aos="fade-up">
            How Symptom-iSense Works
          </h1>
          <div className="flex justify-center mb-8" data-aos="fade-up" data-aos-delay="100">
            <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-60" />
          </div>

          <h2 className="text-2xl font-semibold text-dark mt-8 mb-4" data-aos="fade-right">Our Process</h2>
          <ul className="space-y-6">
            {processSteps.map((step, idx) => (
              <ProcessStep
                key={idx}
                icon={step.icon}
                title={step.title}
                description={step.description}
                index={idx}
              />
            ))}
          </ul>
          <Disclaimer />
        </div>
      </main>
    </div>
  );
};

export default LearnMorePage;
