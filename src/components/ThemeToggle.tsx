import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4"
    >
      {theme === 'light' ? (
        <Moon size={40} className='fixed bottom-4 right-4 rounded-full shadow-lg bg-gray-800 text-blue-600 p-2 focus:outline-none'/>
      ) : (
        <Sun size={40} className='fixed bottom-4 right-4 rounded-full shadow-lg bg-white text-blue-600 p-2 focus:outline-none'/>
      )}
    </button>
  );
};

export default ThemeToggle;
