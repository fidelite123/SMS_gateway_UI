import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

const buildStorageKey = (userId) => `reseller_contact_groups_${userId}`;

export default function ResellerContacts() {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);
  const [groupForm, setGroupForm] = useState({ id: null, name: '', description: '' });
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showMembers, setShowMembers] = useState(false);
  const [message, setMessage] = useState('');
  const [showClientForm, setShowClientForm] = useState(false);
  const [clientForm, setClientForm] = useState({ id: null, name: '', email: '', phone: '', group: '' });

  if (!user) return <div>Loading...</div>;
  const contacts = user?.data?.clients || [];
  const storageKey = buildStorageKey(user.id);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try { setGroups(JSON.parse(saved)); } catch { /* ignore */ }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  const saveGroups = (newGroups) => {
    setGroups(newGroups);
    localStorage.setItem(storageKey, JSON.stringify(newGroups));
  };

  const createOrUpdateGroup = (e) => {
    e.preventDefault();
    if (!groupForm.name.trim()) return;
    if (groupForm.id) {
      const updated = groups.map(g => g.id === groupForm.id ? { ...g, name: groupForm.name, description: groupForm.description } : g);
      saveGroups(updated);
      setMessage('Group updated');
    } else {
      const newGroup = { id: Date.now(), name: groupForm.name, description: groupForm.description, members: [] };
      saveGroups([...groups, newGroup]);
      setMessage('Group created');
    }
    setGroupForm({ id: null, name: '', description: '' });
    setTimeout(()=>setMessage(''),2000);
  };

  const editGroup = (g) => {
    setGroupForm({ id: g.id, name: g.name, description: g.description || '' });
  };

  const deleteGroup = (id) => {
    if (!confirm('Delete this group?')) return;
    saveGroups(groups.filter(g => g.id !== id));
    if (selectedGroup && selectedGroup.id === id) {
      setSelectedGroup(null);
      setShowMembers(false);
    }
    setMessage('Group deleted');
    setTimeout(()=>setMessage(''),2000);
  };

  const viewMembers = (g) => {
    setSelectedGroup(g);
    setShowMembers(true);
  };

  const addMember = (contactId) => {
    if (!selectedGroup) return;
    const updated = groups.map(g => {
      if (g.id === selectedGroup.id) {
        const members = g.members || [];
        if (!members.includes(contactId)) {
          return { ...g, members: [...members, contactId] };
        }
      }
      return g;
    });
    saveGroups(updated);
    setSelectedGroup(updated.find(g => g.id === selectedGroup.id));
  };

  const removeMember = (contactId) => {
    if (!selectedGroup) return;
    const updated = groups.map(g => g.id === selectedGroup.id ? { ...g, members: (g.members||[]).filter(m => m !== contactId) } : g);
    saveGroups(updated);
    setSelectedGroup(updated.find(g => g.id === selectedGroup.id));
  };

  const groupMembers = selectedGroup ? contacts.filter(c => (selectedGroup.members || []).includes(c.id)) : [];
  const availableContacts = selectedGroup ? contacts.filter(c => !(selectedGroup.members || []).includes(c.id)) : [];
  // Single-group membership enforcement helper
  const moveClientToGroup = (clientId, targetGroupId) => {
    const updatedGroups = groups.map(g => {
      const members = (g.members || []).filter(m => m !== clientId);
      if (g.id === targetGroupId) {
        return { ...g, members: [...members, clientId] };
      }
      return { ...g, members };
    });
    saveGroups(updatedGroups);
    setMessage('Client moved');
    setTimeout(()=>setMessage(''),1500);
  };

  const startCreateClient = () => {
    setClientForm({ id: null, name: '', email: '', phone: '', group: groups[0]?.id || '' });
    setShowClientForm(true);
  };

  const submitClient = (e) => {
    e.preventDefault();
    if (!clientForm.name.trim() || !clientForm.email.trim()) return;
    const newId = 'client-' + Date.now();
    const newClient = { id: newId, name: clientForm.name, email: clientForm.email, phone: clientForm.phone, walletBalance: 0 };
    const updatedClients = [...contacts, newClient];
    // Persist to reseller's user data
    const resellerUser = { ...user, data: { ...user.data, clients: updatedClients } };
    // Update localStorage users list
    const usersRaw = localStorage.getItem('sms_gateway_users');
    if (usersRaw) {
      try {
        const parsed = JSON.parse(usersRaw);
        const replaced = parsed.map(u => u.id === user.id ? resellerUser : u);
        localStorage.setItem('sms_gateway_users', JSON.stringify(replaced));
      } catch {}
    }
    if (clientForm.group) moveClientToGroup(newId, clientForm.group);
    setShowClientForm(false);
    setClientForm({ id: null, name: '', email: '', phone: '', group: '' });
    setMessage('Client created');
    setTimeout(()=>setMessage(''),2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="reseller" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Contacts & Groups</h1>
        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}

        {!showMembers ? (
          <>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">{groupForm.id ? 'Edit Group' : 'Create Group'}</h2>
                <form onSubmit={createOrUpdateGroup} className="space-y-3">
                  <input className="w-full border rounded px-3 py-2" placeholder="Group Name" value={groupForm.name} onChange={(e)=>setGroupForm({...groupForm,name:e.target.value})} required />
                  <input className="w-full border rounded px-3 py-2" placeholder="Description" value={groupForm.description} onChange={(e)=>setGroupForm({...groupForm,description:e.target.value})} />
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">{groupForm.id ? 'Update' : 'Create'}</button>
                    {groupForm.id && <button type="button" onClick={()=>setGroupForm({id:null,name:'',description:''})} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded">Cancel</button>}
                  </div>
                </form>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Groups ({groups.length})</h2>
                <div className="space-y-2 max-h-96 overflow-auto">
                  {groups.map(g => (
                    <div key={g.id} className="p-3 border rounded hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-semibold">{g.name}</div>
                          <div className="text-sm text-gray-600">{(g.members || []).length} members • {g.description || 'No description'}</div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={()=>viewMembers(g)} className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                          <button onClick={()=>editGroup(g)} className="text-green-600 hover:text-green-700 text-sm">Edit</button>
                          <button onClick={()=>deleteGroup(g.id)} className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {groups.length === 0 && <p className="text-gray-500 text-center py-4">No groups yet. Create one above.</p>}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
                <div className="space-y-2 text-gray-700">
                  <div>Total Clients: <span className="font-semibold">{contacts.length}</span></div>
                  <div>Active Groups: <span className="font-semibold">{groups.length}</span></div>
                  <div>Total Group Members: <span className="font-semibold">{groups.reduce((a,g)=>a+(g.members||[]).length,0)}</span></div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Client Contacts ({contacts.length})</h2>
                  <button onClick={startCreateClient} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">+ Add Client</button>
                </div>
                <div className="overflow-auto max-h-96">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Phone</th>
                        <th className="px-4 py-2 text-left">Group</th>
                        <th className="px-4 py-2 text-left">Wallet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map(c => {
                        const currentGroupId = groups.find(g => (g.members||[]).includes(c.id))?.id || '';
                        return (
                          <tr key={c.id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-2">{c.name}</td>
                            <td className="px-4 py-2">{c.email}</td>
                            <td className="px-4 py-2">{c.phone || '-'}</td>
                            <td className="px-4 py-2">
                              <select value={currentGroupId} onChange={(e)=>moveClientToGroup(c.id, e.target.value)} className="border rounded px-2 py-1 text-xs">
                                <option value="">None</option>
                                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                              </select>
                            </td>
                            <td className="px-4 py-2">${c.walletBalance?.toFixed(2) || '0.00'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {showClientForm && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Add Client</h3>
                  <form onSubmit={submitClient} className="space-y-3">
                    <input className="w-full border rounded px-3 py-2" placeholder="Name" value={clientForm.name} onChange={(e)=>setClientForm({...clientForm,name:e.target.value})} required />
                    <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email" value={clientForm.email} onChange={(e)=>setClientForm({...clientForm,email:e.target.value})} required />
                    <input className="w-full border rounded px-3 py-2" placeholder="Phone" value={clientForm.phone} onChange={(e)=>setClientForm({...clientForm,phone:e.target.value})} />
                    <select className="w-full border rounded px-3 py-2" value={clientForm.group} onChange={(e)=>setClientForm({...clientForm,group:e.target.value})}>
                      <option value="">No Group</option>
                      {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                    <div className="flex gap-2 pt-2">
                      <button type="submit" className="px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">Create</button>
                      <button type="button" onClick={()=>{setShowClientForm(false); setClientForm({id:null,name:'',email:'',phone:'',group:''});}} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        ) : (
          <div>
            <button onClick={()=>setShowMembers(false)} className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded">← Back to Groups</button>
            <div className="bg-white p-6 rounded-lg shadow mb-6">
              <h2 className="text-xl font-bold mb-2">{selectedGroup.name}</h2>
              <p className="text-gray-600 mb-4">{selectedGroup.description}</p>
              <div className="text-sm text-gray-700">Members: {(selectedGroup.members || []).length}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Current Members</h3>
                <div className="space-y-2 max-h-96 overflow-auto">
                  {groupMembers.map(c => (
                    <div key={c.id} className="p-3 border rounded flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-sm text-gray-600">{c.email}</div>
                      </div>
                      <button onClick={()=>removeMember(c.id)} className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                    </div>
                  ))}
                  {groupMembers.length === 0 && <p className="text-gray-500 text-center py-4">No members yet</p>}
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Add Members</h3>
                <div className="space-y-2 max-h-96 overflow-auto">
                  {availableContacts.map(c => (
                    <div key={c.id} className="p-3 border rounded flex justify-between items-center hover:bg-gray-50">
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-sm text-gray-600">{c.email}</div>
                      </div>
                      <button onClick={()=>addMember(c.id)} className="text-green-600 hover:text-green-700 text-sm">Add</button>
                    </div>
                  ))}
                  {availableContacts.length === 0 && <p className="text-gray-500 text-center py-4">All contacts already members</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
