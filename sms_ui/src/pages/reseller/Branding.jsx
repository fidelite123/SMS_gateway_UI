import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/common/Sidebar';
import { useAuth } from '../../context/AuthContext';

const LS_KEY = 'reseller_branding_';

export default function ResellerBranding() {
  const { user } = useAuth();
  const [branding, setBranding] = useState({
    companyName: user?.profile?.company || 'My SMS Business',
    logo: '',
    primaryColor: '#2563eb',
    accentColor: '#c026d3',
    supportEmail: user?.email || '',
    supportPhone: user?.profile?.phone || '',
    customDomain: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.id) {
      const saved = localStorage.getItem(LS_KEY + user.id);
      if (saved) {
        try { setBranding(JSON.parse(saved)); } catch {}
      }
    }
  }, [user]);

  const save = (e) => {
    e.preventDefault();
    if (user?.id) {
      localStorage.setItem(LS_KEY + user.id, JSON.stringify(branding));
      setMessage('Branding saved successfully');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="reseller" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Branding & White-Label</h1>

        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}

        <form onSubmit={save} className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Company Details</h2>
            <div className="space-y-3">
              <input className="w-full border rounded px-3 py-2" placeholder="Company Name" value={branding.companyName} onChange={(e)=>setBranding({...branding,companyName:e.target.value})} />
              <input className="w-full border rounded px-3 py-2" placeholder="Logo URL" value={branding.logo} onChange={(e)=>setBranding({...branding,logo:e.target.value})} />
              <input className="w-full border rounded px-3 py-2" placeholder="Custom Domain" value={branding.customDomain} onChange={(e)=>setBranding({...branding,customDomain:e.target.value})} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Colors</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="w-32 text-sm text-gray-600">Primary Color</label>
                <input type="color" value={branding.primaryColor} onChange={(e)=>setBranding({...branding,primaryColor:e.target.value})} />
                <span className="text-sm text-gray-600">{branding.primaryColor}</span>
              </div>
              <div className="flex items-center gap-3">
                <label className="w-32 text-sm text-gray-600">Accent Color</label>
                <input type="color" value={branding.accentColor} onChange={(e)=>setBranding({...branding,accentColor:e.target.value})} />
                <span className="text-sm text-gray-600">{branding.accentColor}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Support Contact</h2>
            <div className="grid md:grid-cols-2 gap-3">
              <input className="border rounded px-3 py-2" placeholder="Support Email" value={branding.supportEmail} onChange={(e)=>setBranding({...branding,supportEmail:e.target.value})} />
              <input className="border rounded px-3 py-2" placeholder="Support Phone" value={branding.supportPhone} onChange={(e)=>setBranding({...branding,supportPhone:e.target.value})} />
            </div>
          </div>

          <div className="md:col-span-2">
            <button className="px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">Save Branding</button>
          </div>
        </form>

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Preview</h2>
          <div className="border rounded p-4" style={{backgroundColor: branding.primaryColor + '10'}}>
            <h3 className="text-xl font-bold" style={{color: branding.primaryColor}}>{branding.companyName}</h3>
            <p className="text-sm text-gray-600 mt-2">This is how your white-label portal will appear to your clients.</p>
            <button className="mt-4 px-4 py-2 text-white rounded" style={{backgroundColor: branding.accentColor}}>Sample Button</button>
          </div>
        </div>
      </div>
    </div>
  );
}
