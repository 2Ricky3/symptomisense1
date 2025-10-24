import React from 'react';
import { cn } from '../../utils/classNames';
import { buttonStyles } from '../../utils/constants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'small' | 'edit' | 'social' | 'danger' | 'checkSymptoms';
  loading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  loading = false, 
  disabled, 
  children, 
  className,
  ...props 
}) => {
  const baseStyle = buttonStyles[variant];
  
  return (
    <button
      className={cn(baseStyle, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default Button;