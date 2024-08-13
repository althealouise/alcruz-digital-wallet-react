import React, { useState } from 'react';
import { Home, CreditCard, DollarSign, Bell, ShoppingBag, Menu, X, User, Settings, LogOut } from 'lucide-react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomeView from './views/HomeView';
import TransactionsView from './views/TransactionsView';
import NotificationsView from './views/NotificationsView';
import ProfileView from './views/ProfileView';
import SettingsView from './views/SettingsView';
import AccountManagement from './AccountManagement';
import StorePurchase from './StorePurchase';

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const navLinks = [
    { icon: <Home />, label: 'Home', key: 'home' },
    { icon: <CreditCard />, label: 'Accounts', key: 'accounts' },
    { icon: <DollarSign />, label: 'Transactions', key: 'transactions' },
    { icon: <ShoppingBag />, label: 'Store Purchase', key: 'store-purchase' },
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
    setIsMenuOpen(false); // Close menu on tab change
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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-md flex items-center justify-between p-4 relative">
        <h1 className="text-2xl font-bold text-blue-600">DigiWallet</h1>
        
        {/* Centered Navigation Menu */}
        <div className="hidden md:flex flex-grow justify-center">
          {navLinks.map((link) => (
            <button
              key={link.key}
              className={`flex items-center py-2 px-4 rounded-lg mx-2 ${
                activeTab === link.key ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => handleTabChange(link.key)}
            >
              {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
              {link.label}
            </button>
          ))}
        </div>

        {/* Profile Icon for Larger Screens */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative">
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} 
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <img src="https://via.placeholder.com/40" alt="Profile" className="w-10 h-10 rounded-full" />
              <span>John Doe</span>
            </button>
            <nav className={`absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg z-10 ${isProfileMenuOpen ? 'block' : 'hidden'}`}>
              {profileMenuLinks.map((link) => (
                <button
                  key={link.key}
                  className="flex items-center py-2 px-4 w-full text-gray-600 hover:bg-gray-100 rounded-lg"
                  onClick={() => handleProfileMenuClick(link.key)}
                >
                  {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Hamburger Menu for Smaller Screens */}
        <div className="relative md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-gray-600"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className={`absolute top-full left-0 bg-white shadow-md rounded-lg z-10 ${isMenuOpen ? 'block' : 'hidden'} max-h-[calc(100vh-4rem)] overflow-y-auto w-48 -translate-x-full`}>
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  className={`flex items-center py-2 px-4 rounded-lg ${
                    activeTab === link.key ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => handleTabChange(link.key)}
                >
                  {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
                  {link.label}
                </button>
              ))}
              {/* Profile Menu Items in Hamburger Menu */}
              {profileMenuLinks.map((link) => (
                <button 
                  key={link.key}
                  className="flex items-center py-2 px-4 w-full text-gray-600 hover:bg-gray-100 rounded-lg"
                  onClick={() => handleProfileMenuClick(link.key)}
                >
                  {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
                  {link.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-900">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
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
    </div>
  );
}

export default Dashboard;
