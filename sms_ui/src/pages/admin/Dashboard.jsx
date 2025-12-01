import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { adminStats, resellerList, smsSentData, revenueData } from '../../mock/data';
import Sidebar from '../../components/common/Sidebar';
import StatCard from '../../components/common/StatCard';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Resellers" value={adminStats.totalResellers} color="blue" />
            <StatCard title="Total Clients" value={adminStats.totalClients} color="green" />
            <StatCard title="SMS Sent" value={`${(adminStats.totalSMSSent / 1000).toFixed(0)}K`} color="purple" />
            <StatCard title="Total Revenue" value={`$${adminStats.totalRevenue.toFixed(2)}`} color="yellow" />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* SMS Sent Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">SMS Sent This Week</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={smsSentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sent" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue This Year</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reseller List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Resellers</h2>
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Clients</th>
                  <th className="px-4 py-2 text-left">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {resellerList.map((reseller) => (
                  <tr key={reseller.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{reseller.name}</td>
                    <td className="px-4 py-3">
                      <span className={`px-3 py-1 rounded-full text-sm ${reseller.status === 'active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                        {reseller.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{reseller.clients}</td>
                    <td className="px-4 py-3">${reseller.revenue}</td>
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
