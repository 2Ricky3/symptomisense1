import React from 'react';
import { cn } from '../../utils/classNames';

interface RecommendationChipProps {
  recommendation: string;
  isSelected: boolean;
  onClick: () => void;
}

const RecommendationChip: React.FC<RecommendationChipProps> = ({
  recommendation,
  isSelected,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 sm:px-4 py-2 rounded-full shadow transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg text-xs sm:text-sm",
        isSelected
          ? "bg-[var(--color-primary)] text-white"
          : "bg-white text-black border border-muted/30"
      )}
    >
      {recommendation}
    </button>
  );
};

export default RecommendationChip;