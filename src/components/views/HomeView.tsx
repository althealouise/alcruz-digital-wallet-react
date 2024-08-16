import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet } from 'lucide-react';
import { useTheme } from '../../ThemeContext';

function HomeView(): React.ReactElement {
  const [balance, setBalance] = useState<number>(5000);
  const { theme } = useTheme(); // Use the context to get the current theme

  const handleSendMoney = () => {
    const amount = parseFloat(prompt("Enter amount to send:") || '');
    if (!isNaN(amount) && amount > 0 && amount <= balance) {
      setBalance(prevBalance => prevBalance - amount);
      alert(`$${amount.toFixed(2)} sent successfully!`);
    } else {
      alert("Invalid amount or insufficient funds.");
    }
  };

  const handleRequestMoney = () => {
    const amount = parseFloat(prompt("Enter amount to request:") || '');
    if (!isNaN(amount) && amount > 0) {
      alert(`Request for $${amount.toFixed(2)} sent successfully!`);
    } else {
      alert("Invalid amount.");
    }
  };

  const handleAddFunds = () => {
    const amount = parseFloat(prompt("Enter amount to add:") || '');
    if (!isNaN(amount) && amount > 0) {
      setBalance(prevBalance => prevBalance + amount);
      alert(`$${amount.toFixed(2)} added successfully!`);
    } else {
      alert("Invalid amount.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <div className={`bg-white ${theme === 'dark' ? 'dark:bg-gray-800' : ''} overflow-hidden shadow rounded-lg`}>
        <div className="px-4 py-5 sm:p-6">
          <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-4`}>Total Balance</h3>
          <p className="text-3xl font-bold text-blue-600">${balance.toFixed(2)}</p>
        </div>
      </div>
      <div className={`bg-white ${theme === 'dark' ? 'dark:bg-gray-800' : ''} overflow-hidden shadow rounded-lg`}>
        <div className="px-4 py-5 sm:p-6">
          <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} mb-4`}>Quick Actions</h3>
          <div className="space-y-2">
            <button
              onClick={handleSendMoney}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              <ArrowUpRight className="mr-2" size={18} />
              Send Money
            </button>
            <button
              onClick={handleRequestMoney}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              <ArrowDownLeft className="mr-2" size={18} />
              Request Money
            </button>
            <button
              onClick={handleAddFunds}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
            >
              <Wallet className="mr-2" size={18} />
              Add Funds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeView;
