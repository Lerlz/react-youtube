import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ token }) => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editable, setEditable] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await axios.get('http://localhost:5000/api/user/profile', {
        headers: { Authorization: token },
      });
      setUser(res.data);
      setUpdatedName(res.data.name);
      setUpdatedEmail(res.data.email);
    };

    fetchUserProfile();
  }, [token]);

  const handleSave = async () => {
    const res = await axios.put(
      'http://localhost:5000/api/user/profile',
      { name: updatedName, email: updatedEmail },
      { headers: { Authorization: token } }
    );
    setUser(res.data);
    setEditable(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        {editable ? (
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        ) : (
          <p>{user.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        {editable ? (
          <input
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
          />
        ) : (
          <p>{user.email}</p>
        )}
      </div>
      {editable ? (
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setEditable(true)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Edit
        </button>
      )}
    </div>
  );
};

export default Profile;
