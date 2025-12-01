import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

export default function AdminWallet() {
  const { allUsers } = useAuth();
  const users = allUsers() || [];
  const resellers = users.filter(u => u.role === 'reseller');
  const clients = users.filter(u => u.role === 'client');

  const totalBalance = [...resellers, ...clients].reduce((sum, u) => sum + (u.data?.walletBalance || 0), 0);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Wallet Management</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 mb-1">Total System Balance</div>
            <div className="text-3xl font-bold text-green-600">${totalBalance.toFixed(2)}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 mb-1">Reseller Wallets</div>
            <div className="text-3xl font-bold text-blue-600">${resellers.reduce((s,r)=>s+(r.data?.walletBalance||0),0).toFixed(2)}</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-gray-600 mb-1">Client Wallets</div>
            <div className="text-3xl font-bold text-purple-600">${clients.reduce((s,c)=>s+(c.data?.walletBalance||0),0).toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">All Wallets</h2>
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Balance</th>
                  <th className="px-4 py-2 text-left">SMS Sent</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...resellers, ...clients].map(u => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2 capitalize">
                      <span className={`px-2 py-1 rounded text-sm ${u.role==='reseller'?'bg-blue-100 text-blue-700':'bg-purple-100 text-purple-700'}`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-2 font-semibold">${(u.data?.walletBalance || 0).toFixed(2)}</td>
                    <td className="px-4 py-2">{u.data?.totalSMSSent || u.data?.smsSentThisMonth || 0}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button className="text-green-600 hover:text-green-700">Add Credit</button>
                      <button className="text-red-600 hover:text-red-700">Deduct</button>
                    </td>
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
