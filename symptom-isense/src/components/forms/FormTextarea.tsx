import React from 'react';
import { cn } from '../../utils/classNames';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({ 
  error,
  className,
  ...props 
}) => {
  return (
    <div className="w-full">
      <textarea
        className={cn(
          "w-full p-4 border rounded-md text-dark bg-bg/70 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none",
          error ? "border-red-500" : "border-muted/30",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormTextarea;