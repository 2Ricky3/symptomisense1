import React from 'react';

const Loader: React.FC = () => (
  <div
    style={{
      animation: 'var(--animate-spin)',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      border: '4px solid #455059',
      borderTop: '4px solid #ffffff', 
      margin: '120px auto',
      display: 'block',
      boxSizing: 'border-box',
      background: 'transparent',
    }}
    aria-label="Loading"
  />
);

export default Loader;