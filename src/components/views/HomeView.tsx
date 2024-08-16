import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet, Send } from 'lucide-react'; // Import icons
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

  const handleTransfer = () => {
    alert("Transfer action clicked!");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 space-y-6 lg:space-y-0 lg:space-x-12">
      {/* Card Container */}
      <div className={`w-full max-w-xs lg:max-w-md lg:h-64 p-6 rounded-lg shadow-lg relative transition-transform duration-300 transform hover:scale-105 bg-gradient-to-tr from-blue-900 via-blue-600 text-white ${theme === 'dark' ? 'to-black' : 'to-white'}`}>
        <img src='/stratpay.png' alt="StratPay Logo" className="absolute top-4 right-4 h-12" />
        <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col mb-4">
              <h3 className="text-m font-medium mb-1 text-blue-300">NAME</h3>
              <p className="text-m font-bold mb-4">ALTHEA LOUISE C CRUZ</p>
            </div>
            <div className="flex flex-col mb-4">
              <h3 className="text-m font-medium mb-1 text-blue-300">BALANCE</h3>
              <p className="text-2xl font-bold">${balance.toFixed(2)}</p>
            </div>
        </div>
      </div>

      {/* Buttons Container */}
      <div className="w-full max-w-xs lg:max-w-md lg:h-64 grid grid-cols-2 gap-4">
        <button
          onClick={handleSendMoney}
          className={`w-full h-full p-4 rounded-lg shadow-sm bg-blue-500 font-bold text-white flex items-center justify-center hover:bg-blue-600 transition duration-200`}
        >
          <ArrowUpRight className="text-white mr-2" size={24} />
          <span>Send Money</span>
        </button>
        <button
          onClick={handleRequestMoney}
          className={`w-full h-full p-4 rounded-lg shadow-sm bg-blue-500 font-bold text-white flex items-center justify-center hover:bg-blue-600 transition duration-200`}
        >
          <ArrowDownLeft className="text-white mr-2" size={24} />
          <span>Request Money</span>
        </button>
        <button
          onClick={handleAddFunds}
          className={`w-full h-full p-4 rounded-lg shadow-sm bg-blue-500 font-bold text-white flex items-center justify-center hover:bg-blue-600 transition duration-200`}
        >
          <Wallet className="text-white mr-2" size={24} />
          <span>Add Funds</span>
        </button>
        <button
          onClick={handleTransfer}
          className={`w-full h-full p-4 rounded-lg shadow-sm bg-blue-500 font-bold text-white flex items-center justify-center hover:bg-blue-600 transition duration-200`}
        >
          <Send className="text-white mr-2" size={24} />
          <span>Transfer</span>
        </button>
      </div>
    </div>
  );
}

export default HomeView;
