import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from '../../components/common/Sidebar';

export default function ResellerBilling() {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="reseller" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Billing & Payments</h1>
            <p className="text-gray-600 mt-1">Manage your account billing and payment methods</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Wallet Balance */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Wallet Balance</h2>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-white mb-6">
                <p className="text-lg opacity-90 mb-2">Available Balance</p>
                <p className="text-4xl font-bold">${user.data.walletBalance.toFixed(2)}</p>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold">
                + Add Credit
              </button>
            </div>

            {/* Monthly Revenue */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-8 text-white mb-6">
                <p className="text-lg opacity-90 mb-2">This Month</p>
                <p className="text-4xl font-bold">${user.data.monthlyRevenue.toFixed(2)}</p>
              </div>
              <p className="text-gray-600">Revenue from your active clients and campaigns</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">💳 Visa ending in 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/2026</p>
                </div>
                <button className="text-red-500 hover:text-red-700 font-semibold">Remove</button>
              </div>
              <button className="w-full border-2 border-dashed border-gray-300 rounded-lg py-4 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition font-semibold">
                + Add Payment Method
              </button>
            </div>
          </div>

          {/* Billing History */}
          <div className="bg-white rounded-lg shadow p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Billing History</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">2025-12-01</td>
                    <td className="px-4 py-3">SMS Credits Purchase</td>
                    <td className="px-4 py-3">$100.00</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">Paid</span></td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">2025-11-15</td>
                    <td className="px-4 py-3">SMS Credits Purchase</td>
                    <td className="px-4 py-3">$50.00</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">Paid</span></td>
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
