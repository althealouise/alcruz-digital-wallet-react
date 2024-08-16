import React, { useState, ChangeEvent } from 'react';
import { Bell, Globe, Shield } from 'lucide-react';
import { useTheme } from '../../ThemeContext'; // Import the ThemeContext

// Define the type for the settings state
interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  twoFactor: boolean;
}

const SettingsView: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    language: 'en',
    twoFactor: false,
  });

  const { theme } = useTheme(); // Use the context to get the current theme

  const handleNotificationChange = (type: keyof Settings['notifications']) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      notifications: {
        ...prevSettings.notifications,
        [type]: !prevSettings.notifications[type],
      },
    }));
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      language: e.target.value,
    }));
  };

  const handleTwoFactorChange = () => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      twoFactor: !prevSettings.twoFactor,
    }));
  };

  return (
    <div className={`space-y-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`shadow overflow-hidden sm:rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium flex items-center">
            <Bell className="mr-2" size={20} /> Notification Settings
          </h3>
        </div>
        <div className="border-t border-gray-600 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} capitalize`}>{key} Notifications</dt>
                <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                  <button
                    onClick={() => handleNotificationChange(key as keyof Settings['notifications'])}
                    className={`${
                      value ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    <span
                      className={`${
                        value ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                  </button>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className={`shadow overflow-hidden sm:rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium flex items-center">
            <Globe className="mr-2" size={20} /> Language Settings
          </h3>
        </div>
        <div className="border-t border-gray-600 px-4 py-5 sm:p-0">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Language</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <select
                value={settings.language}
                onChange={handleLanguageChange}
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md ${theme === 'dark' ? 'bg-gray-700 text-gray-200' : ''}`}
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </dd>
          </div>
        </div>
      </div>
      <div className={`shadow overflow-hidden sm:rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium flex items-center">
            <Shield className="mr-2" size={20} /> Security Settings
          </h3>
        </div>
        <div className="border-t border-gray-600 px-4 py-5 sm:p-0">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Two-Factor Authentication</dt>
            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
              <button
                onClick={handleTwoFactorChange}
                className={`${
                  settings.twoFactor ? 'bg-blue-600' : 'bg-gray-200'
                } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                <span
                  className={`${
                    settings.twoFactor ? 'translate-x-5' : 'translate-x-0'
                  } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                />
              </button>
            </dd>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => alert('Settings saved!')}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${theme === 'dark' ? 'text-gray-100 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'}`}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
