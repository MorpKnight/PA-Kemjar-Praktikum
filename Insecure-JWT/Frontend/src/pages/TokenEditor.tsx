
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function TokenEditor() {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('token', token);
    toast.success('Token saved successfully!');
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Edit Token
          </h1>
        </header>
        <div className="flex flex-col gap-4">
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            rows={10}
          />
          <button
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onClick={handleSave}
          >
            Save Token
          </button>
          <button
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}