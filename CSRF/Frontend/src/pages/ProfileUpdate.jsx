import React, { useState } from 'react';

const ProfileUpdate = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include', // Include cookies
      });

      const data = await response.json();
      if (data.success) {
        alert('Profile updated successfully!');
      } else {
        alert(`Failed to update profile: ${data.message}`);
      }
    } catch (error) {
      alert('An error occurred while updating your profile.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="New Username"
          value={formData.username}
          onChange={handleInputChange}
          className="block w-full border p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="New Email"
          value={formData.email}
          onChange={handleInputChange}
          className="block w-full border p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={formData.password}
          onChange={handleInputChange}
          className="block w-full border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">
          Update
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;