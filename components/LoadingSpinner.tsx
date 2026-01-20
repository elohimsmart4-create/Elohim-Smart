
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="relative w-20 h-20">
    <div className="absolute inset-0 border-[3px] border-slate-100 rounded-full"></div>
    <div className="absolute inset-0 border-[3px] border-indigo-600 rounded-full border-t-transparent animate-spin" style={{ animationDuration: '0.8s' }}></div>
    <div className="absolute inset-4 bg-indigo-600/5 rounded-full animate-pulse"></div>
    <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
    </div>
  </div>
);

export default LoadingSpinner;
