import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitType, setSubmitType] = useState('login');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const endpoint = submitType === 'login' ? '/auth/login-not-secure' : '/auth/login-secure';
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      toast.success('Login successful!');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Login
          </h1>
        </header>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onClick={() => setSubmitType('login')}
          >
            Login with Insecure JWT
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
            onClick={() => setSubmitType('login2')}
          >
            Login with Secure JWT
          </button>
        </form>
        <footer className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </footer>
      </div>
    </div>
  );
}
