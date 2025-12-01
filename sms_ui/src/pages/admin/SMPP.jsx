import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';

const mockConnections = [
  { id: 1, name: 'SMPP-1', host: '192.168.1.100', port: 2775, systemId: 'admin', status: 'connected', throughput: '50 msg/s' },
  { id: 2, name: 'SMPP-2', host: '192.168.1.101', port: 2775, systemId: 'backup', status: 'disconnected', throughput: '0 msg/s' },
];

export default function AdminSMPP() {
  const [connections, setConnections] = useState(mockConnections);
  const [form, setForm] = useState({ name: '', host: '', port: 2775, systemId: '', password: '' });

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">SMPP Management</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-4">Add SMPP Connection</h2>
          <div className="grid md:grid-cols-5 gap-3">
            <input className="border rounded px-3 py-2" placeholder="Connection Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
            <input className="border rounded px-3 py-2" placeholder="Host" value={form.host} onChange={(e)=>setForm({...form,host:e.target.value})} />
            <input type="number" className="border rounded px-3 py-2" placeholder="Port" value={form.port} onChange={(e)=>setForm({...form,port:parseInt(e.target.value)})} />
            <input className="border rounded px-3 py-2" placeholder="System ID" value={form.systemId} onChange={(e)=>setForm({...form,systemId:e.target.value})} />
            <input type="password" className="border rounded px-3 py-2" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
          </div>
          <button className="mt-3 px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">Add Connection</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">SMPP Connections</h2>
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Host:Port</th>
                  <th className="px-4 py-2 text-left">System ID</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Throughput</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {connections.map(c => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">{c.name}</td>
                    <td className="px-4 py-2">{c.host}:{c.port}</td>
                    <td className="px-4 py-2">{c.systemId}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${c.status==='connected'?'bg-green-100 text-green-700':'bg-red-100 text-red-700'}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-2">{c.throughput}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">Test</button>
                      <button className="text-green-600 hover:text-green-700">Connect</button>
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
