import React from 'react';
import Loader from './Loader';

const LoaderTest: React.FC = () => {
  return (
    <div className="p-10 bg-gray-100">
      <h1 className="mb-8 text-[#152026]">Loader Animation Test</h1>
      
      <div className="mb-10 bg-white p-8 rounded-lg">
        <h2 className="mb-5 text-[#293540]">Size Test (All should be spinning)</h2>
        <div className="flex gap-10 items-center flex-wrap">
          <div>
            <p className="mb-2.5 text-sm">Small</p>
            <Loader size="sm" color="primary" />
          </div>
          <div>
            <p className="mb-2.5 text-sm">Medium</p>
            <Loader size="md" color="primary" />
          </div>
          <div>
            <p className="mb-2.5 text-sm">Large</p>
            <Loader size="lg" color="primary" />
          </div>
          <div>
            <p className="mb-2.5 text-sm">Extra Large</p>
            <Loader size="xl" color="primary" />
          </div>
        </div>
      </div>

      <div className="mb-10 bg-white p-8 rounded-lg">
        <h2 className="mb-5 text-[#293540]">Color Test (All should be spinning)</h2>
        <div className="flex gap-10 items-center flex-wrap">
          <div>
            <p className="mb-2.5 text-sm">Primary</p>
            <Loader size="lg" color="primary" />
          </div>
          <div>
            <p className="mb-2.5 text-sm">Accent</p>
            <Loader size="lg" color="accent" />
          </div>
          <div className="bg-[#152026] p-5 rounded-lg">
            <p className="mb-2.5 text-sm text-white">White</p>
            <Loader size="lg" color="white" />
          </div>
          <div>
            <p className="mb-2.5 text-sm">Muted</p>
            <Loader size="lg" color="muted" />
          </div>
        </div>
      </div>

      <div className="mb-10 bg-white p-8 rounded-lg">
        <h2 className="mb-5 text-[#293540]">Context Test</h2>
        <div className="flex flex-col gap-5">
          <div className="bg-[#152026] text-white p-4 rounded-lg flex items-center gap-2.5">
            <Loader size="sm" color="white" />
            <span>Processing...</span>
          </div>
          <div className="bg-gray-100 p-10 rounded-lg text-center">
            <Loader size="lg" color="primary" />
            <p className="mt-4 text-[#293540]">Loading your data...</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-100 p-5 rounded-lg border-2 border-yellow-400">
        <p className="text-yellow-900 m-0">
          ✅ If you see all loaders spinning smoothly, the component is working correctly!<br/>
          ❌ If loaders are static, check browser console for errors.
        </p>
      </div>
    </div>
  );
};

export default LoaderTest;
