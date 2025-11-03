import React from 'react';
import Loader from './Loader';

interface LoadingScreenProps {
  message?: string;
  submessage?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Loading, please wait...',
  submessage,
  size = 'xl'
}) => (
  <div className="min-h-screen w-full bg-gradient-to-br from-bg via-bg to-muted flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-12 sm:p-16 flex flex-col items-center max-w-md w-full">
      <Loader size={size} color="primary" />
      <p className="mt-8 text-dark text-lg text-center font-medium">{message}</p>
      {submessage && (
        <p className="mt-2 text-muted text-sm text-center">{submessage}</p>
      )}
    </div>
  </div>
);

export default LoadingScreen;
