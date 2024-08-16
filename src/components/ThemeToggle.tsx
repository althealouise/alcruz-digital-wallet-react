import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const ThemeToggle = (): React.ReactElement => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-4 right-4 p-2 rounded-full transition-colors duration-300 ease-in-out ${theme === 'light' ? 'bg-gray-800 text-blue-600' : 'bg-gray-200 text-blue-600'}`}
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon
          size={20}
          className={`transition-transform duration-500 ${theme === 'light' ? 'rotate-clockwise' : 'rotate-counterclockwise'}`}
        />
      ) : (
        <Sun
          size={20}
          className={`transition-transform duration-500 ${theme === 'dark' ? 'rotate-counterclockwise' : 'rotate-clockwise'}`}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
