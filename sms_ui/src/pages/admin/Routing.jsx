import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';

const mockRoutes = [
  { id: 1, name: 'Primary Gateway', priority: 1, status: 'active', successRate: 98.5, provider: 'Twilio' },
  { id: 2, name: 'Backup Gateway', priority: 2, status: 'active', successRate: 97.2, provider: 'Plivo' },
  { id: 3, name: 'Failover Gateway', priority: 3, status: 'inactive', successRate: 95.8, provider: 'MessageBird' },
];

export default function AdminRouting() {
  const [routes, setRoutes] = useState(mockRoutes);
  const [form, setForm] = useState({ name: '', provider: '', priority: 1 });

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Routing & Failover</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Add Route</h2>
          <div className="grid md:grid-cols-4 gap-3">
            <input className="border rounded px-3 py-2" placeholder="Route Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
            <input className="border rounded px-3 py-2" placeholder="Provider" value={form.provider} onChange={(e)=>setForm({...form,provider:e.target.value})} />
            <input type="number" className="border rounded px-3 py-2" placeholder="Priority" value={form.priority} onChange={(e)=>setForm({...form,priority:parseInt(e.target.value)})} />
            <button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">Add Route</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Active Routes</h2>
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Provider</th>
                  <th className="px-4 py-2 text-left">Priority</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Success Rate</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {routes.map(r => (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">{r.name}</td>
                    <td className="px-4 py-2">{r.provider}</td>
                    <td className="px-4 py-2">{r.priority}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${r.status==='active'?'bg-green-100 text-green-700':'bg-gray-100 text-gray-700'}`}>{r.status}</span>
                    </td>
                    <td className="px-4 py-2">{r.successRate}%</td>
                    <td className="px-4 py-2 space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">Edit</button>
                      <button className="text-red-600 hover:text-red-700">Remove</button>
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
