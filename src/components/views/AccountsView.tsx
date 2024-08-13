import React, { useState, useCallback } from 'react';
import { PlusCircle } from 'lucide-react';

// Define the type for the account object
interface Account {
  id: number;
  name: string;
  balance: number;
  number: string;
}

function AccountsView() {
  // Initialize state with functional update to ensure correctness
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, name: 'Checking Account', balance: 2500, number: '****1234' },
    { id: 2, name: 'Savings Account', balance: 10000, number: '****5678' },
  ]);

  // Memoized callback to avoid re-creating function on every render
  const handleAddAccount = useCallback(() => {
    const name = prompt("Enter account name:");
    if (name?.trim()) { // Handle empty or whitespace-only input
      setAccounts((prevAccounts) => [
        ...prevAccounts,
        {
          id: prevAccounts.length ? prevAccounts[prevAccounts.length - 1].id + 1 : 1,
          name: name.trim(),
          balance: 0,
          number: `****${Math.floor(1000 + Math.random() * 9000)}`,
        },
      ]);
    }
  }, []);

  return (
    <div className="space-y-6">
      {accounts.map((account) => (
        <div key={account.id} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">{account.name}</h3>
            <p className="mt-1 text-3xl font-semibold text-gray-900">
              ${account.balance.toFixed(2)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Account number: {account.number}</p>
          </div>
        </div>
      ))}
      <button
        onClick={handleAddAccount}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 flex items-center justify-center"
      >
        <PlusCircle className="mr-2" size={18} />
        Add New Account
      </button>
    </div>
  );
}

export default AccountsView;