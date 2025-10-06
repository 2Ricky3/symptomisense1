import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-bg bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-[999]">
      <span className="loading loading-ring loading-lg text-accent"></span>
    </div>
  );
};

export default Loader;