import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext'; // Adjust the path as needed

interface RegisterProps {
  onLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { theme } = useTheme(); // Use the context to get the current theme

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const { message } = await response.json();
      console.log(message);
      onLogin(); // Automatically log in the user after successful registration
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      alert(error)
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-tl from-blue-900 via-blue-600 ${theme === 'dark' ? 'to-black' : 'to-white'}`}>
      <div className={`p-8 rounded-lg shadow-lg w-96 bg-opacity-80 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 flex items-center justify-center">
            <img src="/stratpay.png" alt="Logo" />
          </div>
        </div>
        <h2 className={`text-2xl font-bold mb-4 text-center ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
          Register for <span className="text-blue-600">StratPay</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={`mt-1 block w-full border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm p-2`}
            />
          </div>
          <div>
            <label htmlFor="lastName" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={`mt-1 block w-full border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm p-2`}
            />
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`mt-1 block w-full border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm p-2`}
            />
          </div>
          <div>
            <label htmlFor="password" className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-700'}`}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`mt-1 block w-full border ${theme === 'dark' ? 'border-gray-600 bg-gray-700 text-gray-100' : 'border-gray-300 bg-white text-gray-900'} rounded-md shadow-sm p-2`}
            />
          </div>
          <button type="submit" className={`w-full py-2 px-4 rounded ${theme === 'dark' ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'} transition duration-200`}>
            Register
          </button>
        </form>
        <p className={`mt-4 text-center ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Already have an account? <Link to="/login" className={`text-blue-600 hover:underline ${theme === 'dark' ? 'hover:text-blue-500' : ''}`}>Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;