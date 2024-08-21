import React, { useState } from 'react';
import { Home, Wallet, DollarSign, Bell, QrCode, User, Settings, LogOut, CircleUserRoundIcon } from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomeView from './views/HomeView';
import TransactionsView from './views/TransactionsView';
import NotificationsView from './views/NotificationsView';
import ProfileView from './views/ProfileView';
import SettingsView from './views/SettingsView';
import AccountManagement from './AccountManagement';
import StorePurchase from './StorePurchase';
import { useTheme } from '../ThemeContext'; 

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const { theme } = useTheme(); // Get current theme from context

  const navLinks = [
    { icon: <Home />, label: 'Home', key: 'home' },
    { icon: <Wallet />, label: 'Account', key: 'accounts' },
    { icon: <DollarSign />, label: 'Transactions', key: 'transactions' },
    { icon: <QrCode />, label: 'QR Payment', key: 'store-purchase' },
    { icon: <Bell />, label: 'Notifications', key: 'notifications' },
  ];

  const profileMenuLinks = [
    { icon: <User />, label: 'Profile', key: 'profile' },
    { icon: <Settings />, label: 'Settings', key: 'settings' },
    { icon: <LogOut />, label: 'Logout', key: 'logout' },
  ];

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    navigate(key);
  };

  const handleProfileMenuClick = (key: string) => {
    if (key === 'logout') {
      onLogout();
    } else {
      navigate(key);
      setIsProfileMenuOpen(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      {/* Top Navigation Bar */}
      <header className={`shadow-md rounded-full m-4 flex items-center justify-between p-4 relative ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <img src="/stratpay.png" alt="Logo" className="w-10 h-10" /> 
          <h1 className="text-2xl font-bold text-blue-600">StratPay</h1>
        </div>

        {/* Centered Navigation Menu for Larger Screens */}
        <div className="hidden md:flex flex-grow justify-center">
          {navLinks.map((link) => (
            <button
              key={link.key}
              className={`flex items-center py-2 px-4 rounded-lg mx-2 ${
                activeTab === link.key
                  ? `${theme === 'dark' ? 'bg-blue-700 text-blue-200' : 'bg-blue-100 text-blue-600'}`
                  : `${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
              }`}
              onClick={() => handleTabChange(link.key)}
            >
              {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
              {link.label}
            </button>
          ))}
        </div>

        {/* Profile Icon for All Screens */}
        <div className="relative flex items-center">
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} 
            className={`flex items-center space-x-2 ${
              theme === 'dark' ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <CircleUserRoundIcon />
          </button>
          <nav className={`absolute right-0 top-full mt-2 w-48 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg z-10 ${isProfileMenuOpen ? 'block' : 'hidden'}`}>
            {profileMenuLinks.map((link) => (
              <button
                key={link.key}
                className={`flex items-center py-2 px-4 w-full ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                } rounded-lg`}
                onClick={() => handleProfileMenuClick(link.key)}
              >
                {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-20"> {/* Added padding-bottom to accommodate the bottom navbar */}
        <div className="max-w-7xl mx-auto">
          {/*
          <h1 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h1>
          */}
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="home" element={<HomeView />} />
            <Route path="accounts" element={<AccountManagement />} />
            <Route path="transactions" element={<TransactionsView />} />
            <Route path="store-purchase" element={<StorePurchase />} />
            <Route path="notifications" element={<NotificationsView />} />
            <Route path="profile" element={<ProfileView />} />
            <Route path="settings" element={<SettingsView />} />
          </Routes>
        </div>
      </main>

      {/* Bottom Navigation for Smaller Screens */}
      <nav className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 ${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-600'} rounded-xl flex justify-around items-center p-2 md:hidden shadow-lg w-11/12 max-w-xs`}>
       {navLinks.map((link) => (
          <button
            key={link.key}
            className={`flex flex-col items-center text-white ${
              activeTab === link.key ? 'bg-blue-800 rounded-full p-2' : ''
            } hover:bg-blue-700 p-2 rounded-full transition-colors duration-300`}
            onClick={() => handleTabChange(link.key)}
          >
            {React.cloneElement(link.icon, { size: 24 })}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Dashboard;
