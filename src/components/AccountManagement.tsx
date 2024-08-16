import React, { useState, FormEvent } from 'react';
import { PlusCircle, Building, Trash2 } from 'lucide-react';

type Account = {
  id: number;
  type: string;
  name: string;
  balance: number;
};

type Bank = {
  id: number;
  name: string;
  accountNumber: string;
};

type PaymentMethod = {
  id: number;
  type: string;
  last4: string;
  expiryDate: string;
};

const AccountManagement: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, type: 'Checking', name: 'Main Checking', balance: 5000 },
    { id: 2, type: 'Savings', name: 'Emergency Fund', balance: 10000 },
  ]);

  const [linkedBanks, setLinkedBanks] = useState<Bank[]>([
    { id: 1, name: 'Bank of America', accountNumber: '****1234' },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 1, type: 'Credit Card', last4: '5678', expiryDate: '12/24' },
  ]);

  const [newAccountName, setNewAccountName] = useState<string>('');
  const [newAccountType, setNewAccountType] = useState<string>('Checking');
  const [newBankName, setNewBankName] = useState<string>('');
  const [newBankAccountNumber, setNewBankAccountNumber] = useState<string>('');
  const [newCardNumber, setNewCardNumber] = useState<string>('');
  const [newCardExpiry, setNewCardExpiry] = useState<string>('');
  const [newCardCVV, setNewCardCVV] = useState<string>('');

  const handleAddAccount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newAccountName) {
      setAccounts([...accounts, {
        id: accounts.length + 1,
        type: newAccountType,
        name: newAccountName,
        balance: 0
      }]);
      setNewAccountName('');
      setNewAccountType('Checking');
    }
  };

  const handleLinkBank = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newBankName && newBankAccountNumber) {
      setLinkedBanks([...linkedBanks, {
        id: linkedBanks.length + 1,
        name: newBankName,
        accountNumber: `****${newBankAccountNumber.slice(-4)}`
      }]);
      setNewBankName('');
      setNewBankAccountNumber('');
    }
  };

  const handleAddPaymentMethod = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCardNumber && newCardExpiry && newCardCVV) {
      setPaymentMethods([...paymentMethods, {
        id: paymentMethods.length + 1,
        type: 'Credit Card',
        last4: newCardNumber.slice(-4),
        expiryDate: newCardExpiry
      }]);
      setNewCardNumber('');
      setNewCardExpiry('');
      setNewCardCVV('');
    }
  };

  const handleRemoveAccount = (id: number) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const handleRemoveBank = (id: number) => {
    setLinkedBanks(linkedBanks.filter(bank => bank.id !== id));
  };

  const handleRemovePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900">
      {/* Accounts Section */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Your Accounts</h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {accounts.map(account => (
              <li key={account.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between flex-wrap">
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-blue-600 truncate dark:text-blue-400">{account.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{account.type}</p>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      ${account.balance.toFixed(2)}
                    </p>
                    <button onClick={() => handleRemoveAccount(account.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-4 sm:px-6">
          <form onSubmit={handleAddAccount} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              placeholder="Account Name"
              className="flex-grow shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-100"
            />
            <select
              value={newAccountType}
              onChange={(e) => setNewAccountType(e.target.value)}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-100"
            >
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
            </select>
            <button type="submit" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">
              <PlusCircle size={18} className="mr-2" />
              Add Account
            </button>
          </form>
        </div>
      </div>

      {/* Linked Banks Section */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Linked Bank Accounts</h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {linkedBanks.map(bank => (
              <li key={bank.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between flex-wrap">
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-blue-600 truncate dark:text-blue-400">{bank.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Account: {bank.accountNumber}</p>
                  </div>
                  <button onClick={() => handleRemoveBank(bank.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-4 sm:px-6">
          <form onSubmit={handleLinkBank} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
              placeholder="Bank Name"
              className="flex-grow shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-100"
            />
            <input
              type="text"
              value={newBankAccountNumber}
              onChange={(e) => setNewBankAccountNumber(e.target.value)}
              placeholder="Account Number"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-100"
            />
            <button type="submit" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">
              <Building size={18} className="mr-2" />
              Link Bank
            </button>
          </form>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100">Payment Methods</h3>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {paymentMethods.map(method => (
              <li key={method.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between flex-wrap">
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-blue-600 truncate dark:text-blue-400">{method.type}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ending in {method.last4}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Expires: {method.expiryDate}</p>
                  </div>
                  <button onClick={() => handleRemovePaymentMethod(method.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-4 sm:px-6">
          <form onSubmit={handleAddPaymentMethod} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input
              type="text"
              value={newCardNumber}
              onChange={(e) => setNewCardNumber(e.target.value)}
              placeholder="Card Number"
              className="flex-grow shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-100"
            />
            <input
              type="text"
              value={newCardExpiry}
              onChange={(e) => setNewCardExpiry(e.target.value)}
              placeholder="Expiry Date (MM/YY)"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-100"
            />
            <input
              type="text"
              value={newCardCVV}
              onChange={(e) => setNewCardCVV(e.target.value)}
              placeholder="CVV"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-100"
            />
            <button type="submit" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600">
              <PlusCircle size={18} className="mr-2" />
              Add Payment Method
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement;
