import React from 'react';
import { FaSearch, FaDatabase, FaListAlt, FaRegLightbulb, FaExclamationTriangle } from 'react-icons/fa';

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
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 animate-gradient bg-gradient-to-br from-primary/30 via-accent/20 to-muted/40" />
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-60 -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse" />

      <div className="relative max-w-3xl sm:max-w-4xl mx-auto my-10 sm:my-16 bg-white/70 backdrop-blur-xl p-6 sm:p-10 rounded-2xl shadow-2xl border border-muted/20">
        <button
          type="button"
          className="text-sm font-semibold text-dark hover:text-accent hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4 transition-all duration-200 bg-transparent px-2 py-1"
          onClick={onHomeClick}
        >
          
          ← Back to Home
        </button>
        <div className="h-6 sm:h-10" />

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
                className="flex items-start bg-bg/40 rounded-lg p-4 shadow-sm transition-all duration-200 hover:bg-primary/10 hover:scale-[1.03] hover:shadow-lg cursor-pointer"
              >
                {step.icon}
                <div>
                  <span className="font-bold text-lg">{step.title}</span>
                  <p className="text-muted text-base">{step.description}</p>
                </div>
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
      </div>
    </div>
  );
};

export default LearnMorePage;
