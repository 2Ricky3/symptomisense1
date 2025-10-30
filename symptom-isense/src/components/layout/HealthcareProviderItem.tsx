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
    <div className="group bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 transform transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 motion-safe:transform-gpu relative">
      
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-bold text-lg text-dark group-hover:text-primary transition-colors duration-300">{provider.name}</h4>
        <a 
          href={provider.website} 
          target="_blank" 
          rel="noopener noreferrer"
          title={`Visit ${provider.name} website`}
          className="text-accent hover:text-primary transition-all duration-200 transform hover:scale-110 p-2 rounded-full hover:bg-accent/10"
          onClick={(e) => e.stopPropagation()}
        >
          <FaExternalLinkAlt className="text-base" />
        </a>
      </div>
      <p className="text-muted text-sm mb-4 leading-relaxed">{provider.description}</p>
      <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50/80 rounded-lg border border-gray-100">
        <div className="bg-primary/10 p-2 rounded-full">
          <FaPhone className="text-primary text-sm" />
        </div>
        <span className="font-semibold text-primary text-base">{provider.contact}</span>
      </div>
      <button
        onClick={handleCopyNumber}
        disabled={copied}
        className={`w-full rounded-lg px-4 py-3 text-sm font-bold border-0 shadow-md transition-all duration-300 transform hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
          copied 
            ? 'bg-black text-white animate-pulse' 
            : 'text-black bg-gradient-to-r from-primary to-accent group-hover:from-accent group-hover:to-primary'
        }`}
      >
        {copied ? (
          <>
            <FaCheck className="text-sm animate-pulse" />
            <span className="font-bold">Number Copied!</span>
          </>
        ) : (
          <>
            <FaCopy className="text-sm" />
            <span className="font-bold">Copy Number</span>
          </>
        )}
      </button>
    </div>
  );
};

export default HealthcareProviderItem;