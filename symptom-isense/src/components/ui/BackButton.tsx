import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { cn } from '../../utils/classNames';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
  text?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  className,
  text = "Back to Home"
}) => {
  const smallButtonClasses = "text-accent hover:text-bg hover:bg-accent/20 hover:scale-105 transition-all duration-200 rounded px-2 py-1 cursor-pointer text-sm hover:underline hover:decoration-accent hover:decoration-2 underline-offset-4";

  return (
    <button
      type="button"
      className={cn(smallButtonClasses, className)}
      onClick={onClick}
    >
      <FaArrowLeft className="inline-block mr-2" /> {text}
    </button>
  );
};

export default BackButton;