import React from 'react';

const Background = ({ children }) => {
  return (
    <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen transition-all">
      {children}
    </main>
  );
};

export default Background;
