import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold">My Website</h1>
                <ul className="flex space-x-4">
                <li>
                    <Link to="/register" className="hover:underline">Register</Link>
                </li>
                <li>
                    <Link to="/login" className="hover:underline">Login</Link>
                </li>
                <li>
                    <Link to="/profile" className="hover:underline">Profile</Link>
                </li>
                </ul>
            </div>
        </nav>
    );
};  

export default Navbar;
