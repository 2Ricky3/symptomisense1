import React, { useState } from 'react';
import { FaTrash, FaChevronDown, FaChevronUp, FaClock, FaFileAlt, FaFilePdf } from 'react-icons/fa';
import Button from './Button';
import { generateMedicalReportPDF } from '../../services/pdfService';

interface PromptCardProps {
  prompt: {
    id: string;
    promptText: string;
    responseText: string;
    soapNote?: string;
    createdAt?: { toDate: () => Date };
  };
  onDelete: (id: string) => void;
  index: number;
}

const PromptCard: React.FC<PromptCardProps> = ({ prompt, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      let soapContent: string;
      
      if (prompt.soapNote && prompt.soapNote.trim()) {
        soapContent = prompt.soapNote;
      } else {
        soapContent = `
Subjective: ${prompt.promptText}

Assessment: 
${prompt.responseText}
        `.trim();
      }
      
      await generateMedicalReportPDF(soapContent);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 overflow-hidden w-full"
    >
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 px-6 py-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="mt-1 p-2 bg-primary/10 rounded-lg">
              <FaFileAlt className="text-primary text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-dark text-lg mb-1 leading-tight">
                {prompt.promptText}
              </h4>
              {prompt.createdAt && (
                <div className="flex items-center gap-2 text-xs text-muted">
                  <FaClock className="text-xs" />
                  <span>{prompt.createdAt.toDate().toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-white rounded-lg transition-all duration-300 flex-shrink-0"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <FaChevronUp className="text-muted" />
            ) : (
              <FaChevronDown className="text-muted" />
            )}
          </button>
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="mb-4">
          <h5 className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
            AI Response
          </h5>
          <div className={`text-dark text-sm leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {isExpanded ? prompt.responseText : truncateText(prompt.responseText, 200)}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-all duration-300"
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="px-4 py-2 text-sm flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              title="Download as PDF"
            >
              <FaFilePdf className="text-sm" /> 
              <span className="hidden sm:inline">{isDownloading ? 'Generating...' : 'PDF'}</span>
            </button>
            
            <Button
              variant="danger"
              onClick={() => onDelete(prompt.id)}
              className="px-4 py-2 text-sm flex items-center gap-2"
            >
              <FaTrash className="text-xs" /> 
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;
