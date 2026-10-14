import React from 'react';

const LoadingScreen = () => {
  return (
    <div id="loader" className="fixed inset-0 bg-[#171717] z-50 flex items-center justify-center transition-opacity duration-500">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-[#EAD9B8] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#C8B99F] font-mono text-sm tracking-wider uppercase">Loading Experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;