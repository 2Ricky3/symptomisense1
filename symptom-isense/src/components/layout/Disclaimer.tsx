import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const Disclaimer: React.FC = () => {
  return (
    <div className="mt-12 p-6 rounded-xl bg-red-500/10 border border-red-500/20 shadow-lg flex flex-col items-start" data-aos="fade-up" data-aos-delay="600">
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
  );
};

export default Disclaimer;
