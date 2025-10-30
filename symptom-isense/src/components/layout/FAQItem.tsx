import React from 'react';

interface FAQItemProps {
  faq: {
    question: string;
    answer: string;
  };
}

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
  return (
    <div className="bg-white/70 rounded-lg p-4 shadow transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 motion-safe:transform-gpu">
      <h4 className="font-semibold text-md mb-1">{faq.question}</h4>
      <p className="text-muted text-sm">{faq.answer}</p>
    </div>
  );
};

export default FAQItem;