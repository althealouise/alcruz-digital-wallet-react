import React, { useState } from 'react';
import { Bell, DollarSign, CreditCard } from 'lucide-react';
import { useTheme } from '../../ThemeContext'; // Adjust the path as needed

// Define the type for a notification
interface Notification {
  id: number;
  type: 'alert' | 'transaction' | 'card';
  message: string;
  time: string;
}

const NotificationsView = (): React.ReactElement => {
  const { theme } = useTheme(); // Use the context to get the current theme
  const [notifications] = useState<Notification[]>([
    { id: 1, type: 'alert', message: 'Low balance in your checking account', time: '2 hours ago' },
    { id: 2, type: 'transaction', message: 'You received $500 from John Doe', time: '1 day ago' },
    { id: 3, type: 'card', message: 'Your new credit card has been shipped', time: '3 days ago' },
  ]);

  const getIcon = (type: 'alert' | 'transaction' | 'card') => {
    switch (type) {
      case 'alert':
        return <Bell className="text-yellow-500" />;
      case 'transaction':
        return <DollarSign className="text-green-500" />;
      case 'card':
        return <CreditCard className="text-blue-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  return (
    <div className={`space-y-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
      {notifications.map((notification) => (
        <div key={notification.id} className={`shadow overflow-hidden sm:rounded-lg p-4 flex items-start ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex-shrink-0 mr-4">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{notification.message}</p>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{notification.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsView;
