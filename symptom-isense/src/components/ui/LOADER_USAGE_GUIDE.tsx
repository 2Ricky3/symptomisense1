

import React from 'react';
import Loader from './Loader';
import LoadingScreen from './LoadingScreen';

const FullPageLoadingExample = () => {
  return (
    <LoadingScreen 
      message="Loading, please wait..." 
      submessage="This may take a few moments"
      size="xl"
    />
  );
};

const AIAnalysisLoading = () => {
  return (
    <LoadingScreen 
      message="AI is analyzing your symptoms..." 
      submessage="This may take a few moments"
    />
  );
};

const SmallLoaderExample = () => {
  return (
    <button className="flex items-center gap-2 px-4 py-2">
      <Loader size="sm" color="white" />
      <span>Processing...</span>
    </button>
  );
};

const MediumLoaderExample = () => {
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col items-center">
      <Loader size="md" color="primary" />
      <p className="mt-4 text-muted">Loading data...</p>
    </div>
  );
};

const LargeLoaderExample = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <Loader size="lg" color="primary" />
      <p className="mt-6 text-dark font-medium">Loading content...</p>
    </div>
  );
};


const SuspenseExample = () => {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
    </React.Suspense>
  );
};

const ConditionalLoadingExample = () => {
  const [loading] = React.useState(false);

  if (loading) {
    return (
      <LoadingScreen 
        message="Processing your request..." 
        submessage="Please wait"
      />
    );
  }

  return <div>Your content here</div>;
};

const CustomStyledLoader = () => {
  return (
    <div className="relative">
      <Loader size="lg" color="primary" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

const DarkBackgroundLoader = () => {
  return (
    <div className="bg-dark p-8 rounded-lg">
      <Loader size="lg" color="white" />
      <p className="mt-4 text-white text-center">Loading...</p>
    </div>
  );
};


export {
  FullPageLoadingExample,
  AIAnalysisLoading,
  SmallLoaderExample,
  MediumLoaderExample,
  LargeLoaderExample,
  SuspenseExample,
  ConditionalLoadingExample,
  CustomStyledLoader,
  DarkBackgroundLoader,
};
