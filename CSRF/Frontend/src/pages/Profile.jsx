import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
  });

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/profile', {
        method: 'GET',
        credentials: 'include', // Include cookies
      });

      const data = await response.json();
      if (data.success) {
        setUserData(data.payload);
      } else {
        alert('Failed to fetch profile!');
      }
    } catch (error) {
      alert('An error occurred while fetching the profile.');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
    </div>
  );
};

export default Profile;