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
  const baseStyles = "rounded-md shadow transition-all duration-200 flex items-center justify-center cursor-pointer active:scale-95 touch-manipulation min-h-[44px]";
  
  const variantStyles = {
    default: "text-white bg-red-600 hover:bg-red-700",
    danger: "text-white bg-red-600 hover:bg-red-700"
  };
  
  const sizeStyles = {
    sm: "px-2 py-1 text-xs sm:text-sm min-w-[44px]",
    md: "px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base min-w-[48px]",
    lg: "px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg min-w-[52px]"
  };
  
  return (
    <button
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      aria-label={children ? undefined : "Icon button"}
      {...props}
    >
      <span className={cn("h-3 w-3 sm:h-4 sm:w-4", children ? "mr-1 sm:mr-2" : "")} aria-hidden>
        {icon}
      </span>
      {children}
    </button>
  );
};

export default IconButton;