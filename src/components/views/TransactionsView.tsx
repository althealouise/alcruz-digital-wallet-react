import React, { useState, ChangeEvent } from 'react';
import { Search } from 'lucide-react';

// Define the type for a transaction
interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
}

const TransactionsView = () => {
  const [transactions] = useState<Transaction[]>([
    { id: 1, date: '2023-07-01', description: 'Grocery Store', amount: -75.50 },
    { id: 2, date: '2023-07-02', description: 'Salary Deposit', amount: 3000 },
    { id: 3, date: '2023-07-03', description: 'Electric Bill', amount: -120 },
    { id: 4, date: '2023-07-04', description: 'Online Purchase', amount: -50.25 },
    { id: 5, date: '2023-07-05', description: 'Restaurant', amount: -45 },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [theme] = useState<'light' | 'dark'>('light');

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className={`flex items-center mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} shadow rounded-lg p-2`}>
        <Search className={`text-gray-400 ${theme === 'dark' ? 'dark:text-gray-500' : ''}`} size={20} />
        <input
          type="text"
          placeholder="Search transactions..."
          className={`flex-grow outline-none bg-transparent ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className={`shadow overflow-hidden sm:rounded-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <table className={`min-w-full divide-y ${theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'}`}>
          <thead className={`bg-${theme === 'dark' ? 'gray-700' : 'gray-50'}`}>
            <tr>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                Date
              </th>
              <th className={`px-6 py-3 text-left text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                Description
              </th>
              <th className={`px-6 py-3 text-right text-xs font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider`}>
                Amount
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === 'dark' ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'}`}>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {transaction.date}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
                  {transaction.description}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${transaction.amount >= 0 ? (theme === 'dark' ? 'text-green-400' : 'text-green-600') : (theme === 'dark' ? 'text-red-400' : 'text-red-600')}`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsView;
