import React from 'react';
import Loader from './Loader';

const LoaderPreview: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg to-muted p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-dark mb-2">Loader Component Preview</h1>
        <p className="text-muted mb-12">Professional, consistent loading indicators throughout the application</p>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-dark mb-6">Size Variations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center">
              <Loader size="sm" color="primary" />
              <p className="mt-4 font-semibold text-dark">Small (sm)</p>
              <p className="text-sm text-muted">24px × 24px</p>
              <p className="text-xs text-muted mt-2 text-center">Buttons, inline indicators</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center">
              <Loader size="md" color="primary" />
              <p className="mt-4 font-semibold text-dark">Medium (md)</p>
              <p className="text-sm text-muted">40px × 40px</p>
              <p className="text-xs text-muted mt-2 text-center">Cards, small sections</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center">
              <Loader size="lg" color="primary" />
              <p className="mt-4 font-semibold text-dark">Large (lg)</p>
              <p className="text-sm text-muted">64px × 64px</p>
              <p className="text-xs text-muted mt-2 text-center">Content areas</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center">
              <Loader size="xl" color="primary" />
              <p className="mt-4 font-semibold text-dark">Extra Large (xl)</p>
              <p className="text-sm text-muted">96px × 96px</p>
              <p className="text-xs text-muted mt-2 text-center">Full-page loading</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-dark mb-6">Color Variations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center">
              <Loader size="lg" color="primary" />
              <p className="mt-4 font-semibold text-dark">Primary</p>
              <p className="text-xs text-muted mt-2 text-center">Brand color - most common</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center">
              <Loader size="lg" color="accent" />
              <p className="mt-4 font-semibold text-dark">Accent</p>
              <p className="text-xs text-muted mt-2 text-center">Special emphasis</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 shadow-lg flex flex-col items-center">
              <Loader size="lg" color="white" />
              <p className="mt-4 font-semibold text-white">White</p>
              <p className="text-xs text-gray-300 mt-2 text-center">Dark backgrounds</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center">
              <Loader size="lg" color="muted" />
              <p className="mt-4 font-semibold text-dark">Muted</p>
              <p className="text-xs text-muted mt-2 text-center">Subtle, non-intrusive</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-dark mb-6">In-Context Examples</h2>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-dark mb-3">Button Loading State</h3>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <button className="bg-[#152026] text-white px-6 py-3 rounded-lg flex items-center gap-3 hover:bg-[#293540] transition-colors">
                <Loader size="sm" color="white" />
                <span>Processing...</span>
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-dark mb-3">Card Loading State</h3>
            <div className="bg-white rounded-xl p-12 shadow-lg flex flex-col items-center">
              <Loader size="lg" color="primary" />
              <p className="mt-6 text-dark font-medium">Loading your data...</p>
              <p className="text-sm text-muted mt-2">Please wait a moment</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-medium text-dark mb-3">Inline Loading</h3>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4">
                <Loader size="sm" color="primary" />
                <p className="text-dark">Fetching latest updates...</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-dark mb-6">Full-Page Loading Screen</h2>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="relative h-96 bg-gradient-to-br from-bg via-bg to-muted rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-12 max-w-md w-full mx-4">
                  <Loader size="xl" color="primary" />
                  <p className="mt-8 text-dark text-lg text-center font-medium">
                    AI is analyzing your symptoms...
                  </p>
                  <p className="mt-2 text-muted text-sm text-center">
                    This may take a few moments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-dark mb-6">Code Examples</h2>
          <div className="bg-gray-900 rounded-xl p-6 shadow-lg overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{`// Import the components
import Loader from './components/ui/Loader';
import LoadingScreen from './components/ui/LoadingScreen';

// Basic Loader
<Loader size="md" color="primary" />

// Full-page loading
<LoadingScreen 
  message="Loading, please wait..." 
  submessage="This may take a few moments"
/>

// In a button
<button className="flex items-center gap-2">
  <Loader size="sm" color="white" />
  <span>Processing...</span>
</button>

// Conditional rendering
if (loading) {
  return <LoadingScreen message="AI is analyzing..." />;
}`}</code>
            </pre>
          </div>
        </section>

        <section className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Accessibility Built-In
          </h3>
          <ul className="text-blue-800 text-sm space-y-2 ml-7">
            <li>• Includes <code className="bg-blue-100 px-2 py-1 rounded">role="status"</code> for screen readers</li>
            <li>• Has <code className="bg-blue-100 px-2 py-1 rounded">aria-label="Loading"</code> for context</li>
            <li>• Hidden text for screen readers: "Loading..."</li>
            <li>• Visible spinner for all users</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default LoaderPreview;
