import React from 'react';
import { cn } from '../../utils/classNames';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gray-200';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: '',
  };

  // Build width and height classes dynamically
  const widthClass = width ? `[width:${typeof width === 'number' ? `${width}px` : width}]` : '';
  const heightClass = height ? `[height:${typeof height === 'number' ? `${height}px` : height}]` : '';

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        animationClasses[animation],
        widthClass,
        heightClass,
        className
      )}
      aria-hidden="true"
    />
  );
};

// Specialized skeleton components
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 1,
  className,
}) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        height={16}
        className={i === lines - 1 ? 'w-3/4' : 'w-full'}
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('bg-white rounded-lg p-4 shadow', className)}>
    <div className="space-y-3">
      <Skeleton variant="text" height={20} className="w-3/4" />
      <SkeletonText lines={3} />
      <div className="flex gap-2 mt-4">
        <Skeleton variant="rounded" height={32} width={80} />
        <Skeleton variant="rounded" height={32} width={80} />
      </div>
    </div>
  </div>
);

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className,
}) => (
  <Skeleton
    variant="circular"
    width={size}
    height={size}
    className={className}
  />
);

export const SkeletonButton: React.FC<{ className?: string }> = ({ className }) => (
  <Skeleton variant="rounded" height={40} className={cn('w-32', className)} />
);

export const SkeletonProfileCard: React.FC = () => (
  <div className="bg-white rounded-lg p-6 shadow-md">
    <div className="flex items-center gap-4 mb-6">
      <SkeletonAvatar size={64} />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" height={24} className="w-48" />
        <Skeleton variant="text" height={16} className="w-64" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-4 mb-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="text-center">
          <Skeleton variant="text" height={32} className="w-16 mx-auto mb-2" />
          <Skeleton variant="text" height={16} className="w-24 mx-auto" />
        </div>
      ))}
    </div>
  </div>
);

export const SkeletonHistoryCard: React.FC = () => (
  <div className="bg-white/70 rounded-lg p-4 shadow">
    <Skeleton variant="text" height={20} className="w-3/4 mb-3" />
    <SkeletonText lines={2} className="mb-2" />
    <Skeleton variant="text" height={14} className="w-32 mb-3" />
    <SkeletonButton />
  </div>
);

export const SkeletonFeatureCard: React.FC = () => (
  <div className="bg-white rounded-xl p-6 shadow-md">
    <div className="flex justify-center mb-4">
      <Skeleton variant="circular" width={48} height={48} />
    </div>
    <Skeleton variant="text" height={20} className="w-3/4 mx-auto mb-3" />
    <SkeletonText lines={2} />
  </div>
);

export const SkeletonTable: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 p-4 bg-white rounded-lg">
        <Skeleton variant="rectangular" width={40} height={40} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height={16} className="w-full" />
          <Skeleton variant="text" height={14} className="w-2/3" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
