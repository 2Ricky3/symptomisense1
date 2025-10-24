import React from 'react';
import { cn } from '../../utils/classNames';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
}

const FormLabel: React.FC<FormLabelProps> = ({ 
  children, 
  required = false, 
  className,
  ...props 
}) => {
  return (
    <label 
      className={cn("block text-sm font-medium text-dark mb-1", className)}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default FormLabel;