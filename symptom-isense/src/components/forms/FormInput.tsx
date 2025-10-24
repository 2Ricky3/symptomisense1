import React from 'react';
import { cn } from '../../utils/classNames';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({ 
  error,
  className,
  ...props 
}) => {
  return (
    <div className="w-full">
      <input
        className={cn(
          "w-full rounded-md border px-4 py-2 text-dark focus:outline-none focus:ring-2 focus:ring-accent bg-bg/80 backdrop-blur",
          error ? "border-red-500" : "border-muted",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FormInput;