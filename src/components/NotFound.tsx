import React from 'react';

const NotFound = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold text-red-800">404</h1>
      <p className="text-xl text-gray-700">Page Not Found</p>
    </div>
  );
};

export default NotFound;
