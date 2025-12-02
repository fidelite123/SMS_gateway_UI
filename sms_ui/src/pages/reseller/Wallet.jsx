import React from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

export default function ResellerWallet() {
  const { user } = useAuth();
  const balance = user?.data?.walletBalance || 0;
  const transactions = [
    { id: 1, date: '2025-12-01', type: 'credit', amount: 500, description: 'Manual top-up' },
    { id: 2, date: '2025-11-30', type: 'debit', amount: -45.50, description: 'SMS charges - November' },
    { id: 3, date: '2025-11-25', type: 'credit', amount: 300, description: 'Payment received' },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="reseller" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Wallet</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 mb-1">Current Balance</div>
            <div className="text-3xl font-bold text-green-600">${balance.toFixed(2)}</div>
            <button className="mt-4 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">Top Up</button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 mb-1">Total Clients</div>
            <div className="text-3xl font-bold text-blue-600">{user?.data?.totalClients || 0}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 mb-1">Monthly Revenue</div>
            <div className="text-3xl font-bold text-purple-600">${(user?.data?.monthlyRevenue || 0).toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{t.date}</td>
                    <td className="px-4 py-2 capitalize">
                      <span className={`px-2 py-1 rounded text-sm ${t.type==='credit'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{t.type}</span>
                    </td>
                    <td className={`px-4 py-2 font-semibold ${t.amount>0?'text-green-600':'text-red-600'}`}>${Math.abs(t.amount).toFixed(2)}</td>
                    <td className="px-4 py-2">{t.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
