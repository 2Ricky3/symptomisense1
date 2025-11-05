import React from 'react';
import { FaBrain, FaCheckCircle, FaShieldAlt } from 'react-icons/fa';

const StatsSection: React.FC = () => {
  return (
    <section aria-labelledby="stats-heading" className="w-full max-w-5xl mx-auto mb-16 px-4 sm:px-6">
      <div className="text-center mb-8">
        <h2 id="stats-heading" className="text-2xl sm:text-3xl font-bold text-dark mb-3">Why Choose Symptom-iSense?</h2>
        <p className="text-muted text-sm sm:text-base">Advanced AI technology you can trust</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        <div 
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 sm:p-6 border border-blue-200 shadow-md hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-blue-500 text-white p-3 sm:p-4 rounded-xl shadow-sm">
              <FaBrain className="text-xl sm:text-2xl" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-blue-900">AI-Powered</div>
              <div className="text-xs sm:text-sm text-blue-700 mt-1">Smart Analysis</div>
            </div>
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 sm:p-6 border border-green-200 shadow-md hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-green-500 text-white p-3 sm:p-4 rounded-xl shadow-sm">
              <FaCheckCircle className="text-xl sm:text-2xl" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-green-900">99.8%</div>
              <div className="text-xs sm:text-sm text-green-700 mt-1">Accuracy Rate</div>
            </div>
          </div>
        </div>

        <div 
          className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 sm:p-6 border border-purple-200 shadow-md hover:shadow-xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-purple-500 text-white p-3 sm:p-4 rounded-xl shadow-sm">
              <FaShieldAlt className="text-xl sm:text-2xl" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-purple-900">100%</div>
              <div className="text-xs sm:text-sm text-purple-700 mt-1">Private & Secure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
