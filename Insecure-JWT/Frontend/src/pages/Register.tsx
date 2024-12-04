import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const user = {
    email,
    password,
    name,
    birthdate,
    gender,
    address,
    phone,
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setGender(gender.toLowerCase());
    console.log(user);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || "https://personal-insecure-jwt-be.dzlfwq.easypanel.host"}/auth/register`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      toast.success('Registration successful!');
      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate('/login');
    } catch (error) {
      toast.error(`Registration failed. ${(error as any).response.data.message}`);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Register
          </h1>
        </header>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Birthdate */}
          <input
            type="date"
            placeholder="Birthdate"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
            min="1900-01-01"
            max={new Date().toISOString().split('T')[0]} // Maksimum tanggal hari ini
          />
          {/* Gender */}
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {/* Address */}
          <input
            type="text"
            placeholder="Address"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {/* Phone */}
          <input
            type="tel"
            placeholder="Phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="^\d{10,15}$" // Hanya angka dengan panjang 10-15 digit
            title="Phone number must be 10-15 digits."
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            Register
          </button>
        </form>
        <footer className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-green-500 hover:underline">
            Login here
          </a>
        </footer>
      </div>
    </div>
  );
}
