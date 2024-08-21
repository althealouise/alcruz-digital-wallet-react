import React, { useState, useEffect } from 'react';
import { ArrowBigLeft, ArrowBigDown, ArrowBigUp, QrCode } from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../../ThemeContext';
import { useNavigate } from 'react-router-dom';

interface UserData {
  name: string;
  balance: number;
}

function HomeView(): React.ReactElement {
  const [userData, setUserData] = useState<UserData>({ name: '', balance: 0 });
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData((prevUserData) => ({
        ...prevUserData,
        name: (user.firstName + ' ' + user.lastName).toUpperCase(), // Convert name to uppercase
      }));
    }

    // Fetch balance from the wallet API
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/wallet/balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData((prevUserData) => ({
          ...prevUserData,
          balance: response.data.balance, // Assuming the response has a 'balance' field
        }));
      } catch (error) {
        console.error('Error fetching balance:', error);
        alert('Failed to fetch balance. Please create a wallet');
      }
    };

    fetchBalance();
  }, []);

  const handleWithdraw = () => {
    const amount = parseFloat(prompt("Enter amount to withdraw:") || '');
    if (!isNaN(amount) && amount > 0 && amount <= userData.balance) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        balance: prevUserData.balance - amount,
      }));
      localStorage.setItem('userData', JSON.stringify({ ...userData, balance: userData.balance - amount }));
      alert(`$${amount.toFixed(2)} withdrawn successfully!`);
    } else {
      alert("Invalid amount or insufficient funds.");
    }
  };

  const handleDeposit = () => {
    const amount = parseFloat(prompt("Enter amount to deposit:") || '');
    if (!isNaN(amount) && amount > 0) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        balance: prevUserData.balance + amount,
      }));
      localStorage.setItem('userData', JSON.stringify({ ...userData, balance: userData.balance + amount }));
      alert(`$${amount.toFixed(2)} deposited successfully!`);
    } else {
      alert("Invalid amount.");
    }
  };

  const handleTransfer = () => {
    const amount = parseFloat(prompt("Enter amount to transfer:") || '');
    if (!isNaN(amount) && amount > 0 && amount <= userData.balance) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        balance: prevUserData.balance - amount,
      }));
      localStorage.setItem('userData', JSON.stringify({ ...userData, balance: userData.balance - amount }));
      alert(`$${amount.toFixed(2)} transferred successfully!`);
    } else {
      alert("Invalid amount or insufficient funds.");
    }
  };

  const handlePayUsingQR = () => {
    navigate('/dashboard/store-purchase'); 
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 space-y-6 lg:space-y-0 lg:space-x-12">
      {/* Card Container */}
      <div className={`w-full max-w-xs lg:max-w-md lg:h-64 p-6 rounded-lg shadow-lg relative transition-transform duration-300 transform hover:scale-105 bg-gradient-to-tr from-blue-900 via-blue-600 text-white ${theme === 'dark' ? 'to-black' : 'to-white'}`}>
        <img src='/stratpay.png' alt="StratPay Logo" className="absolute top-4 right-4 h-12" />
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col mb-4">
            <h3 className="text-m font-medium mb-1 text-blue-300">NAME</h3>
            <p className="text-m font-bold mb-4">{userData.name}</p>
          </div>
          <div className="flex flex-col mb-4">
            <h3 className="text-m font-medium mb-1 text-blue-300">BALANCE</h3>
            {userData.balance !== undefined && (
              <p className="text-2xl font-bold">${userData.balance.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons Container */}
      <div className="w-full max-w-xs lg:max-w-md lg:h-64 grid grid-cols-2 gap-4">
        <button
          onClick={handleWithdraw}
          className={`w-full h-full p-4 rounded-lg shadow-sm bg-blue-500 font-bold text-white flex items-center justify-center hover:bg-blue-600 transition duration-200`}
        >
          <ArrowBigLeft className="text-white mr-2" size={24} />
          <span>Withdraw</span>
        </button>
        <button
          onClick={handleDeposit}
          className={`w-full h-full p-4 rounded-lg shadow-sm bg-blue-500 font-bold text-white flex items-center justify-center hover:bg-blue-600 transition duration-200`}
        >
          <ArrowBigDown className="text-white mr-2" size={24} />
          <span>Deposit</span>
        </button>
        <button
          onClick={handleTransfer}
          className={`w-full h-full p-4 rounded-lg shadow-sm bg-blue-500 font-bold text-white flex items-center justify-center hover:bg-blue-600 transition duration-200`}
        >
          <ArrowBigUp className="text-white mr-2" size={24} />
          <span>Transfer</span>
        </button>
        <button
          onClick={handlePayUsingQR}
          className={`w-full h-full p-4 rounded-lg shadow-sm bg-blue-500 font-bold text-white flex items-center justify-center hover:bg-blue-600 transition duration-200`}
        >
          <QrCode className="text-white mr-2" size={24} />
          <span>Pay Using QR</span>
        </button>
      </div>
    </div>
  );
}

export default HomeView;
