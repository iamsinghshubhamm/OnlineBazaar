import { ShoppingCartIcon } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <ShoppingCartIcon width={60} height={60} className='mb-3 animate-bounce'/>
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you are looking for does not exist.
      </p>
      <button onClick={() => navigate(-1)}
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
