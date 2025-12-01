import React, { useMemo, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

export default function AdminResellers() {
  const { user, allUsers, createReseller, setUserStatus, resetUserPassword, deleteUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', name: '', company: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const resellers = useMemo(() => (allUsers() || []).filter(u => u.role === 'reseller'), [allUsers]);

  const submit = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      createReseller(form);
      setForm({ email: '', password: '', name: '', company: '' });
      setMessage('Reseller created');
    } catch (err) {
      setError(err.message || 'Failed to create reseller');
    }
  };

  const toggleStatus = (r) => setUserStatus(r.id, r.status === 'active' ? 'inactive' : 'active');

  const doResetPass = (r) => {
    const np = prompt('Enter new password for ' + r.email);
    if (!np) return;
    resetUserPassword(r.id, np);
    setMessage('Password updated');
  };

  const doDelete = (r) => {
    if (!confirm('Delete reseller ' + r.email + '? This cannot be undone.')) return;
    deleteUser(r.id);
    setMessage('Reseller deleted');
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Resellers</h1>

        {(error || message) && (
          <div className={`mb-4 p-3 rounded ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{error || message}</div>
        )}

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Add Reseller</h2>
          <form onSubmit={submit} className="grid md:grid-cols-4 gap-4">
            <input className="border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
            <input className="border rounded px-3 py-2" placeholder="Password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} required />
            <input className="border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} />
            <input className="border rounded px-3 py-2" placeholder="Company" value={form.company} onChange={(e)=>setForm({...form,company:e.target.value})} />
            <div className="md:col-span-4">
              <button className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">Create Reseller</button>
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Reseller List</h2>
          <div className="overflow-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Company</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Clients</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {resellers.map(r => (
                  <tr key={r.id} className="border-b">
                    <td className="px-4 py-2">{r.email}</td>
                    <td className="px-4 py-2">{r.profile?.name || '-'}</td>
                    <td className="px-4 py-2">{r.profile?.company || '-'}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-sm ${r.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{r.status || 'active'}</span>
                    </td>
                    <td className="px-4 py-2">{Array.isArray(r.data?.clients) ? r.data.clients.length : 0}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={()=>toggleStatus(r)} className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">{r.status === 'active' ? 'Deactivate' : 'Activate'}</button>
                      <button onClick={()=>doResetPass(r)} className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded">Reset Password</button>
                      <button onClick={()=>doDelete(r)} className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded">Delete</button>
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
