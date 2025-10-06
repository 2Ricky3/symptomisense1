import React from 'react';

interface LearnMorePageProps {
  onHomeClick?: () => void;
}

const LearnMorePage: React.FC<LearnMorePageProps> = ({ onHomeClick }) => {
  const textButtonClass =
    "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer";

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-bg via-bg to-muted overflow-y-auto p-6 lg:p-8">
      <div className="relative max-w-3xl mx-auto my-12 bg-bg/80 backdrop-blur-lg p-8 rounded-lg shadow-xl border border-muted/20">
        
        <button
          type="button"
          className={`${textButtonClass} absolute top-6 left-6 z-10`}
          onClick={onHomeClick}
        >
          ← Back to Home
        </button>

        <div className="prose prose-invert max-w-none text-dark" data-aos="fade-up">
          <h1 className="text-3xl font-bold text-dark mb-6 text-center">How Symptom-iSense Works</h1>

          <h2 className="text-2xl font-semibold text-dark mt-8">Our Process</h2>
          <p className="text-muted">
            Symptom-iSense utilizes a sophisticated Large Language Model (LLM) to help you understand potential causes for your symptoms. Here’s a simplified breakdown of how it works:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted">
            <li>
              <strong>Input Analysis:</strong> When you describe your symptoms, our AI carefully analyzes the language, identifying key terms, symptom severity, duration, and context.
            </li>
            <li>
              <strong>Knowledge Base Correlation:</strong> The AI cross-references your input against a vast, generalized knowledge base of medical information. It looks for patterns, correlations, and potential conditions that match the symptoms described.
            </li>
            <li>
              <strong>Differential Analysis:</strong> The system generates a list of possible conditions. It then performs a differential analysis, considering the likelihood of each based on the combination of symptoms you provided.
            </li>
            <li>
              <strong>Result Generation:</strong> Finally, Symptom-iSense presents the information in a clear, easy-to-understand format, offering potential insights. It is designed to be a starting point for a conversation with a healthcare professional.
            </li>
          </ol>

          <div className="mt-12 p-6 rounded-lg bg-red-500/10 border border-red-500/20" data-aos="fade-up" data-aos-delay="100">
            <h2 className="text-2xl font-bold text-red-800 !mt-0">Legal Disclaimer</h2>
            <p className="text-red-700">
              Symptom-iSense is an informational tool and is not a substitute for professional medical advice, diagnosis, or treatment. The information provided by this application is for general informational purposes only.
            </p>
            <p className="text-red-700 font-semibold">
              We are not responsible for any damages, direct or indirect, that may arise from the use of this application. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMorePage;
