import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './components/ThemeToggle';

function App(): React.ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const handleLogin = (): void => {
    setIsAuthenticated(true);
  };

  const handleLogout = (): void => {
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <ConditionalThemeToggle />
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<Register onLogin={handleLogin} />}
            />
            <Route
              path="/dashboard/*"
              element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />}
            />
            {/* Route for undefined paths */}
            <Route
              path="*"
              element={<NotFound />} 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

function ConditionalThemeToggle(): React.ReactElement | null {
  const location = useLocation();

  // Check if the current path is not the 404 page
  if (location.pathname !== '*') {
    return <ThemeToggle />;
  }
  return null;
}

export default App;
