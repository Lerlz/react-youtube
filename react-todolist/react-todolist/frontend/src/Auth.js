import React, { useState } from 'react';
import axios from 'axios';

function Auth({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (type) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${type}`, { username, password });
      if (res.data.token) setToken(res.data.token);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login / Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-between">
          <button
            className="w-1/2 bg-green-500 text-white p-2 rounded mr-2 hover:bg-green-600"
            onClick={() => handleAuth('login')}
          >
            Login
          </button>
          <button
            className="w-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={() => handleAuth('register')}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
