import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/register" className="mr-4">Register</Link>
        <Link to="/login" className="mr-4">Login</Link>
        <Link to="/profile" className="mr-4">Profile</Link>
        <Link to="/profile-update">Update Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;