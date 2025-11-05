import React from 'react';

interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ icon, title, description, index }) => {
  return (
    <li
      className="flex flex-col items-center bg-bg/40 rounded-lg p-4 shadow-sm transition-all duration-500 ease-out hover:bg-primary/10 hover:scale-[1.02] hover:shadow-xl"
      data-aos="fade-up"
      data-aos-delay={200 + index * 100}
    >
      <div className="flex items-center mb-2">
        {icon}
        <span className="font-bold text-lg text-center">{title}</span>
      </div>
      <p className="text-muted text-base text-center">{description}</p>
    </li>
  );
};

export default ProcessStep;
