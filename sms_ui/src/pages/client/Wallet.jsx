import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function ClientWallet() {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="client" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Wallet</h1>
            <p className="text-gray-600 mt-1">Manage your SMS wallet and top up your balance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wallet Balance */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Balance</h2>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-12 text-white mb-6">
                <p className="text-lg opacity-90 mb-2">Your Balance</p>
                <p className="text-5xl font-bold">${user.data.walletBalance.toFixed(2)}</p>
              </div>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition font-semibold text-lg">
                + Add Credit
              </button>
            </div>

            {/* Usage Stats */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Usage Statistics</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">SMS Sent Today</span>
                  <span className="text-2xl font-bold text-blue-500">{user.data.smsSentToday}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-gray-600">SMS This Month</span>
                  <span className="text-2xl font-bold text-green-500">{user.data.smsSentThisMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Delivery Rate</span>
                  <span className="text-2xl font-bold text-purple-500">{user.data.deliveryRate}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Top Up Options */}
          <div className="bg-white rounded-lg shadow p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Up Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg transition">
                <p className="text-xl font-bold text-gray-800 mb-2">$10</p>
                <p className="text-sm text-gray-600 mb-4">100 SMS Credits</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Buy Now</button>
              </div>
              <div className="border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:shadow-lg transition">
                <p className="text-xl font-bold text-gray-800 mb-2">$25</p>
                <p className="text-sm text-gray-600 mb-4">300 SMS Credits</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Buy Now</button>
              </div>
              <div className="border-2 border-blue-500 rounded-lg p-6 cursor-pointer hover:shadow-lg transition bg-blue-50">
                <p className="text-xl font-bold text-blue-600 mb-2">$50</p>
                <p className="text-sm text-gray-600 mb-4">700 SMS Credits</p>
                <p className="text-xs text-blue-600 font-semibold mb-4">POPULAR</p>
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Buy Now</button>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-lg shadow p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">2025-12-01</td>
                    <td className="px-4 py-3">SMS Used</td>
                    <td className="px-4 py-3 text-red-500">-$1.00</td>
                    <td className="px-4 py-3">${user.data.walletBalance.toFixed(2)}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">2025-11-30</td>
                    <td className="px-4 py-3">Credit Added</td>
                    <td className="px-4 py-3 text-green-500">+$50.00</td>
                    <td className="px-4 py-3">${(user.data.walletBalance + 1).toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
