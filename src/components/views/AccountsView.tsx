import React, { useState, useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import { useTheme } from '../../ThemeContext'; // Adjust the path as needed

interface Account {
  id: number;
  name: string;
  balance: number;
  number: string;
}

function AccountsView(): React.ReactElement {
  const { theme } = useTheme(); // Get current theme from context
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: 'Checking Account', balance: 2500, number: '****1234' },
    { id: 2, name: 'Savings Account', balance: 10000, number: '****5678' },
  ]);

  const handleAddAccount = useCallback(() => {
    const name = prompt("Enter account name:");
    if (name?.trim()) {
      setAccounts((prevAccounts) => [
        ...prevAccounts,
        {
          id: prevAccounts.length ? prevAccounts[prevAccounts.length - 1].id + 1 : 1,
          name: name.trim(),
          balance: 0,
          number: `****${Math.floor(1000 + Math.random() * 9000)}`,
        },
      ]);
    } else {
      alert("Invalid account name. Please try again.");
    }
  }, []);

  return (
    <div className={`space-y-6 p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'text-gray-900'}`}>
      {accounts.map((account) => (
        <div key={account.id} className={` ${theme === 'dark' ? 'dark:bg-gray-800' : ''} overflow-hidden shadow rounded-lg`}>
          <div className={`px-4 py-5 sm:p-6  ${theme === 'dark' ? 'dark:bg-gray-800' : ''} overflow-hidden shadow rounded-lg`}>
            <h3 className="text-lg font-medium">{account.name}</h3>
            <p className="mt-1 text-3xl font-semibold">
              ${account.balance.toFixed(2)}
            </p>
            <p className="mt-1 text-sm">{`Account number: ${account.number}`}</p>
          </div>
        </div>
      ))}
      <button
        onClick={handleAddAccount}
        className={`w-full py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'}`}
      >
        <PlusCircle className="mr-2" size={18} />
        Add New Account
      </button>
    </div>
  );
}

export default AccountsView;
