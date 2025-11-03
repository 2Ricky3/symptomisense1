import React from 'react';
import type { IconType } from 'react-icons';

interface StatCardProps {
  icon: IconType;
  label: string;
  value: string | number;
  color?: string;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  color = 'text-primary',
  delay = 0 
}) => {
  return (
    <div 
      className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-700 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] border border-gray-200 hover:border-primary/30 cursor-pointer overflow-hidden relative"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 transition-all duration-700 ease-in-out"></div>
      
      <div className="relative flex items-center gap-4">
        <div className={`${color} bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 p-4 rounded-xl transition-all duration-700 ease-in-out transform group-hover:scale-105 shadow-sm group-hover:shadow-md`}>
          <Icon className="text-2xl transition-transform duration-700 ease-in-out group-hover:scale-110" />
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-dark transition-all duration-500 ease-in-out group-hover:text-primary">
            {value}
          </div>
          <div className="text-sm text-muted font-medium mt-1 transition-all duration-500 ease-in-out group-hover:text-gray-700">
            {label}
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left"></div>
    </div>
  );
};

export default StatCard;
