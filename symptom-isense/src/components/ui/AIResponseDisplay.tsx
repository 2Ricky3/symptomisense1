import React from 'react';
import { parseResponseIntoSections, highlightImportantTerms } from '../../utils/responseFormatter';

interface AIResponseDisplayProps {
  response: string;
}

const AIResponseDisplay: React.FC<AIResponseDisplayProps> = ({ response }) => {
  if (!response) {
    return <div className="text-muted">— Your analysis will appear here —</div>;
  }

  const sections = parseResponseIntoSections(response);

  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => (
        <div 
          key={sectionIndex} 
          className="bg-white/50 rounded-lg p-4 border border-gray-200 transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:bg-accent/10"
        >
          <h3 className="font-semibold text-dark mb-2 text-sm">{section.title}</h3>
          <div className="space-y-1">
            {section.content.map((line, lineIndex) => {
              if (!line.trim()) {
                return <br key={lineIndex} />;
              }
              
              const highlightedLine = highlightImportantTerms(line);
              
              return (
                <p 
                  key={lineIndex} 
                  className="text-muted text-sm leading-relaxed" 
                  dangerouslySetInnerHTML={{ __html: highlightedLine }} 
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIResponseDisplay;
