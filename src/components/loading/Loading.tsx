import React from 'react';
import './Loading.css';

const Loading: React.FC = () => {
  return (
    <div className="loading" data-testid="loading-indicator">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
