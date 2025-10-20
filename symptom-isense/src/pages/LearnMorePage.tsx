import React from 'react';
import { FaSearch, FaDatabase, FaListAlt, FaRegLightbulb, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';

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
      <header className="w-full z-50 sticky top-0">
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

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8">
        <div className="prose prose-invert max-w-none text-dark" data-aos="fade-up">
          <h1 className="text-4xl font-extrabold text-primary mb-8 text-center drop-shadow-lg">
            How Symptom-iSense Works
          </h1>
          <div className="flex justify-center mb-8">
            <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-60" />
          </div>

          <h2 className="text-2xl font-semibold text-dark mt-8 mb-4">Our Process</h2>
          <ul className="space-y-6">
            {processSteps.map((step, idx) => (
              <li
                key={idx}
                className="flex flex-col items-center bg-bg/40 rounded-lg p-4 shadow-sm transition-all duration-200 hover:bg-primary/10 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center mb-2">
                  {step.icon}
                  <span className="font-bold text-lg text-center">{step.title}</span>
                </div>
                <p className="text-muted text-base text-center">{step.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-12 p-6 rounded-xl bg-red-500/10 border border-red-500/20 shadow-lg flex flex-col items-start" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-2">
              <FaExclamationTriangle className="text-red-600 text-2xl mr-2" />
              <h2 className="text-2xl font-bold text-red-800 !mt-0">Legal Disclaimer</h2>
            </div>
            <p className="text-red-700">
              Symptom-iSense is an informational tool and is not a substitute for professional medical advice, diagnosis, or treatment. The information provided by this application is for general informational purposes only.
            </p>
            <p className="text-red-700 font-semibold mt-2">
              We are not responsible for any damages, direct or indirect, that may arise from the use of this application. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this application.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearnMorePage;
