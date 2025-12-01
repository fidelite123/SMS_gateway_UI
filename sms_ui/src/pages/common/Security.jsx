import React, { useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

export default function Security() {
  const { user, logout } = useAuth();
  const role = user?.role || 'client';
  const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
  const [twoFA, setTwoFA] = useState(false);
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API', key: 'sk_live_*********************', created: '2025-11-01', lastUsed: '2025-12-01' },
    { id: 2, name: 'Test API', key: 'sk_test_*********************', created: '2025-10-15', lastUsed: '2025-11-30' },
  ]);
  const [message, setMessage] = useState('');

  const changePassword = (e) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      setMessage('Passwords do not match');
      return;
    }
    setMessage('Password changed successfully');
    setPassword({ current: '', new: '', confirm: '' });
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Security Settings</h1>

        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>
            <form onSubmit={changePassword} className="space-y-3">
              <input type="password" className="w-full border rounded px-3 py-2" placeholder="Current Password" value={password.current} onChange={(e)=>setPassword({...password,current:e.target.value})} required />
              <input type="password" className="w-full border rounded px-3 py-2" placeholder="New Password" value={password.new} onChange={(e)=>setPassword({...password,new:e.target.value})} required />
              <input type="password" className="w-full border rounded px-3 py-2" placeholder="Confirm New Password" value={password.confirm} onChange={(e)=>setPassword({...password,confirm:e.target.value})} required />
              <button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">Update Password</button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
            <p className="text-gray-600 text-sm mb-4">Add an extra layer of security to your account</p>
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={twoFA} onChange={(e)=>setTwoFA(e.target.checked)} className="w-4 h-4" />
              <label className="text-gray-700">Enable 2FA via Email</label>
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">Configure 2FA</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">API Keys</h2>
          <div className="mb-4">
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded">Generate New Key</button>
          </div>
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Key</th>
                  <th className="px-4 py-2 text-left">Created</th>
                  <th className="px-4 py-2 text-left">Last Used</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map(k => (
                  <tr key={k.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">{k.name}</td>
                    <td className="px-4 py-2 font-mono text-sm">{k.key}</td>
                    <td className="px-4 py-2">{k.created}</td>
                    <td className="px-4 py-2">{k.lastUsed}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">View</button>
                      <button className="text-red-600 hover:text-red-700">Revoke</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Session Management</h2>
          <p className="text-gray-600 text-sm mb-4">Manage your active sessions and security preferences</p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">Current Session</div>
                <div className="text-sm text-gray-600">Last activity: Just now</div>
              </div>
              <button onClick={logout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
