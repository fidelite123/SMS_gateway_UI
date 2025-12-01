import React, { useMemo, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

export default function AdminApprovals() {
  const { allUsers, approveUser, deleteUser } = useAuth();
  const [message, setMessage] = useState('');

  const pendingUsers = useMemo(() => (allUsers() || []).filter(u => u.status === 'pending'), [allUsers]);

  const approve = (u) => {
    approveUser(u.id);
    setMessage(`Approved ${u.email}`);
    setTimeout(() => setMessage(''), 2000);
  };

  const reject = (u) => {
    if (!confirm(`Reject and delete ${u.email}?`)) return;
    deleteUser(u.id);
    setMessage(`Rejected ${u.email}`);
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Pending Approvals</h1>

        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}

        {pendingUsers.length === 0 && (
          <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
            No pending users at the moment.
          </div>
        )}

        {pendingUsers.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Users Awaiting Approval</h2>
            <div className="overflow-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Company</th>
                    <th className="px-4 py-2 text-left">Registered</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingUsers.map(u => (
                    <tr key={u.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-3">{u.email}</td>
                      <td className="px-4 py-3 capitalize">
                        <span className={`px-2 py-1 rounded text-sm ${u.role === 'reseller' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{u.role}</span>
                      </td>
                      <td className="px-4 py-3">{u.profile?.name || '-'}</td>
                      <td className="px-4 py-3">{u.profile?.company || '-'}</td>
                      <td className="px-4 py-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3 space-x-2">
                        <button onClick={() => approve(u)} className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded">Approve</button>
                        <button onClick={() => reject(u)} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded">Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
