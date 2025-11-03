import React, { useState } from 'react';
import { FaPhone, FaExternalLinkAlt, FaCopy, FaCheck } from 'react-icons/fa';

interface HealthcareProviderItemProps {
  provider: {
    name: string;
    contact: string;
    website: string;
    description: string;
  };
}

const HealthcareProviderItem: React.FC<HealthcareProviderItemProps> = ({ provider }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(provider.contact);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy number:', err);
      const textArea = document.createElement('textarea');
      textArea.value = provider.contact;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-500 ease-in-out transform hover:-translate-y-1 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h4 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-primary transition-colors duration-300">{provider.name}</h4>
            <div className="h-0.5 w-12 bg-gradient-to-r from-primary to-accent rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
          <a 
            href={provider.website} 
            target="_blank" 
            rel="noopener noreferrer"
            title={`Visit ${provider.name} website`}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 hover:bg-blue-500 text-gray-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <FaExternalLinkAlt className="text-sm" />
          </a>
        </div>

        <p className="text-gray-600 text-sm mb-5 leading-relaxed min-h-[2.5rem]">{provider.description}</p>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl p-4 mb-4 border border-gray-100 group-hover:border-primary/20 transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center transition-all duration-300">
              <FaPhone className="text-primary text-sm transition-colors duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-0.5">Contact Number</p>
              <p className="font-bold text-gray-900 text-base truncate">{provider.contact}</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleCopyNumber}
          disabled={copied}
          className={`w-full rounded-xl px-5 py-3.5 text-sm font-semibold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md ${
            copied 
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
              : 'bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-gray-900'
          }`}
        >
          {copied ? (
            <>
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                <FaCheck className="text-xs" />
              </div>
              <span>Number Copied Successfully!</span>
            </>
          ) : (
            <>
              <FaCopy className="text-sm" />
              <span>Copy Number</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default HealthcareProviderItem;