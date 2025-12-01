import React from 'react';
import Sidebar from '../../components/common/Sidebar';
import { smsSentData, revenueData, smsLogData } from '../../mock/data';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminReports() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Reports</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">SMS Sent (Weekly)</h2>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={smsSentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sent" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Revenue (Monthly)</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#f472b6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Message Logs</h2>
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Recipient</th>
                  <th className="px-4 py-2 text-left">Message</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Cost</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {smsLogData.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{log.id}</td>
                    <td className="px-4 py-2">{log.recipient}</td>
                    <td className="px-4 py-2 truncate max-w-xs" title={log.message}>{log.message}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${log.status === 'delivered' ? 'bg-green-100 text-green-700' : log.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{log.status}</span>
                    </td>
                    <td className="px-4 py-2">${log.cost.toFixed(2)}</td>
                    <td className="px-4 py-2">{log.date}</td>
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
