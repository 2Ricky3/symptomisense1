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
      className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="flex items-center gap-3">
        <div className={`${color} bg-gradient-to-br from-primary/10 to-accent/10 p-3 rounded-lg`}>
          <Icon className="text-xl" />
        </div>
        <div>
          <div className="text-2xl font-bold text-dark">{value}</div>
          <div className="text-xs text-muted">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
