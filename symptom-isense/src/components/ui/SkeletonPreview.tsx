import React from 'react';
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonProfileCard,
  SkeletonHistoryCard,
  SkeletonFeatureCard,
  SkeletonTable,
} from './Skeleton';
const SkeletonPreview: React.FC = () => {
  return (
    <div className="p-8 space-y-12 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-2xl font-bold mb-4">Basic Skeleton</h2>
        <div className="space-y-2">
          <Skeleton variant="text" height={20} className="w-full" />
          <Skeleton variant="text" height={20} className="w-3/4" />
          <Skeleton variant="text" height={20} className="w-1/2" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Skeleton Text</h2>
        <SkeletonText lines={3} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Skeleton Avatar</h2>
        <div className="flex gap-4">
          <SkeletonAvatar size={40} />
          <SkeletonAvatar size={64} />
          <SkeletonAvatar size={80} />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Skeleton Button</h2>
        <SkeletonButton />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Skeleton Card</h2>
        <SkeletonCard />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Skeleton Profile Card</h2>
        <SkeletonProfileCard />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Skeleton History Cards</h2>
        <div className="space-y-4">
          <SkeletonHistoryCard />
          <SkeletonHistoryCard />
          <SkeletonHistoryCard />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Skeleton Feature Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SkeletonFeatureCard />
          <SkeletonFeatureCard />
          <SkeletonFeatureCard />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Skeleton Table</h2>
        <SkeletonTable rows={5} />
      </div>
    </div>
  );
};

export default SkeletonPreview;
