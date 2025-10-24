import React from 'react';
import { FaHeartbeat, FaShieldAlt, FaRobot, FaUserCheck } from 'react-icons/fa';

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
  };
  index: number;
}

const iconMap = [
  <FaHeartbeat className="text-current text-3xl mb-2" />,
  <FaShieldAlt className="text-current text-3xl mb-2" />,
  <FaRobot className="text-current text-3xl mb-2" />,
  <FaUserCheck className="text-current text-3xl mb-2" />
];

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  return (
    <div className="group bg-white/90 rounded-xl p-6 flex flex-col items-center text-center transform transition-transform duration-500 ease-out will-change-transform motion-safe:transform-gpu hover:-translate-y-2 hover:shadow-2xl cursor-pointer border border-muted/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/30">
      <div className="bg-accent/10 group-hover:bg-accent/20 text-accent group-hover:text-bg rounded-full p-4 mb-4 flex items-center justify-center shadow-sm transition-colors duration-500 ease-in-out transform group-hover:scale-105 group-hover:shadow-md">
        {iconMap[index % iconMap.length]}
      </div>
      <h3 className="font-semibold text-lg mb-2 transition-colors duration-500 ease-in-out group-hover:text-accent">
        {feature.title}
      </h3>
      <p className="text-muted text-sm">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;