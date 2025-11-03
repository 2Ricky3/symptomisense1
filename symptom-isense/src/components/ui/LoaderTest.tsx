import React from 'react';
import Loader from './Loader';

const LoaderTest: React.FC = () => {
  return (
    <div style={{ padding: '40px', background: '#f5f5f5' }}>
      <h1 style={{ marginBottom: '30px', color: '#152026' }}>Loader Animation Test</h1>
      
      <div style={{ marginBottom: '40px', background: 'white', padding: '30px', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px', color: '#293540' }}>Size Test (All should be spinning)</h2>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <p style={{ marginBottom: '10px', fontSize: '14px' }}>Small</p>
            <Loader size="sm" color="primary" />
          </div>
          <div>
            <p style={{ marginBottom: '10px', fontSize: '14px' }}>Medium</p>
            <Loader size="md" color="primary" />
          </div>
          <div>
            <p style={{ marginBottom: '10px', fontSize: '14px' }}>Large</p>
            <Loader size="lg" color="primary" />
          </div>
          <div>
            <p style={{ marginBottom: '10px', fontSize: '14px' }}>Extra Large</p>
            <Loader size="xl" color="primary" />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px', background: 'white', padding: '30px', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px', color: '#293540' }}>Color Test (All should be spinning)</h2>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <p style={{ marginBottom: '10px', fontSize: '14px' }}>Primary</p>
            <Loader size="lg" color="primary" />
          </div>
          <div>
            <p style={{ marginBottom: '10px', fontSize: '14px' }}>Accent</p>
            <Loader size="lg" color="accent" />
          </div>
          <div style={{ background: '#152026', padding: '20px', borderRadius: '8px' }}>
            <p style={{ marginBottom: '10px', fontSize: '14px', color: 'white' }}>White</p>
            <Loader size="lg" color="white" />
          </div>
          <div>
            <p style={{ marginBottom: '10px', fontSize: '14px' }}>Muted</p>
            <Loader size="lg" color="muted" />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px', background: 'white', padding: '30px', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px', color: '#293540' }}>Context Test</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#152026', color: 'white', padding: '15px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Loader size="sm" color="white" />
            <span>Processing...</span>
          </div>
          <div style={{ background: '#f0f0f0', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
            <Loader size="lg" color="primary" />
            <p style={{ marginTop: '15px', color: '#293540' }}>Loading your data...</p>
          </div>
        </div>
      </div>

      <div style={{ background: '#fef3c7', padding: '20px', borderRadius: '8px', border: '2px solid #fbbf24' }}>
        <p style={{ color: '#92400e', margin: 0 }}>
          ✅ If you see all loaders spinning smoothly, the component is working correctly!<br/>
          ❌ If loaders are static, check browser console for errors.
        </p>
      </div>
    </div>
  );
};

export default LoaderTest;
