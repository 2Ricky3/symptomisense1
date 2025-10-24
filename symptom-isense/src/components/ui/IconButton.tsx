import React from 'react';
import { cn } from '../../utils/classNames';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'default' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  variant = 'default', 
  size = 'md',
  children, 
  className,
  ...props 
}) => {
  const baseStyles = "rounded-md shadow transition-all duration-200 flex items-center justify-center";
  
  const variantStyles = {
    default: "text-white bg-red-600 hover:bg-red-700",
    danger: "text-white bg-red-600 hover:bg-red-700"
  };
  
  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };
  
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      aria-label={children ? undefined : "Icon button"}
      {...props}
    >
      <span className={cn("h-4 w-4", children ? "mr-2" : "")} aria-hidden>
        {icon}
      </span>
      {children}
    </button>
  );
};

export default IconButton;