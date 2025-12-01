import React, { useMemo, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

export default function AdminClients() {
  const { user, allUsers, setUserStatus, resetUserPassword, deleteUser } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const clients = useMemo(() => (allUsers() || []).filter(u => u.role === 'client'), [allUsers]);

  const toggleStatus = (c) => setUserStatus(c.id, c.status === 'active' ? 'inactive' : 'active');

  const doResetPass = (c) => {
    const np = prompt('Enter new password for ' + c.email);
    if (!np) return;
    resetUserPassword(c.id, np);
    setMessage('Password updated');
  };

  const doDelete = (c) => {
    if (!confirm('Delete client ' + c.email + '? This cannot be undone.')) return;
    deleteUser(c.id);
    setMessage('Client deleted');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Clients</h1>

        {(error || message) && (
          <div className={`mb-4 p-3 rounded ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{error || message}</div>
        )}

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Client List</h2>
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Company</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Wallet Balance</th>
                  <th className="px-4 py-2 text-left">SMS Sent</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map(c => (
                  <tr key={c.id} className="border-b">
                    <td className="px-4 py-2">{c.email}</td>
                    <td className="px-4 py-2">{c.profile?.name || '-'}</td>
                    <td className="px-4 py-2">{c.profile?.company || '-'}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{c.status || 'active'}</span>
                    </td>
                    <td className="px-4 py-2">${(c.data?.walletBalance || 0).toFixed(2)}</td>
                    <td className="px-4 py-2">{c.data?.totalSMSSent || 0}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={()=>toggleStatus(c)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">{c.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                      <button onClick={()=>doResetPass(c)} className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded">Reset Password</button>
                      <button onClick={()=>doDelete(c)} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded">Delete</button>
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
