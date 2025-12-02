import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/common/Sidebar';

const LS_KEY = 'sms_gateway_settings';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    brandName: 'WeCall',
    primaryColor: '#2563eb',
    accentColor: '#c026d3',
    pricePerSms: 0.03,
    currency: 'USD',
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPass: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try { setSettings(JSON.parse(saved)); } catch {}
    }
  }, []);

  const save = (e) => {
    e.preventDefault();
    localStorage.setItem(LS_KEY, JSON.stringify(settings));
    setMessage('Settings saved');
    setTimeout(()=>setMessage(''), 2000);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Settings</h1>

        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}

        <form onSubmit={save} className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow">
          <div>
            <h2 className="font-semibold mb-3">Branding</h2>
            <div className="space-y-3">
              <input className="w-full border rounded px-3 py-2" value={settings.brandName} onChange={(e)=>setSettings({...settings, brandName:e.target.value})} placeholder="Brand Name" />
              <div className="flex items-center gap-3">
                <label className="w-32 text-sm text-gray-600">Primary Color</label>
                <input type="color" value={settings.primaryColor} onChange={(e)=>setSettings({...settings, primaryColor:e.target.value})} />
              </div>
              <div className="flex items-center gap-3">
                <label className="w-32 text-sm text-gray-600">Accent Color</label>
                <input type="color" value={settings.accentColor} onChange={(e)=>setSettings({...settings, accentColor:e.target.value})} />
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-3">Billing</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="w-32 text-sm text-gray-600">Price per SMS</label>
                <input type="number" step="0.0001" className="flex-1 border rounded px-3 py-2" value={settings.pricePerSms} onChange={(e)=>setSettings({...settings, pricePerSms:parseFloat(e.target.value)})} />
              </div>
              <div className="flex items-center gap-3">
                <label className="w-32 text-sm text-gray-600">Currency</label>
                <input className="flex-1 border rounded px-3 py-2" value={settings.currency} onChange={(e)=>setSettings({...settings, currency:e.target.value})} />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-semibold mb-3">SMTP</h2>
            <div className="grid md:grid-cols-4 gap-3">
              <input className="border rounded px-3 py-2" placeholder="Host" value={settings.smtpHost} onChange={(e)=>setSettings({...settings, smtpHost:e.target.value})} />
              <input type="number" className="border rounded px-3 py-2" placeholder="Port" value={settings.smtpPort} onChange={(e)=>setSettings({...settings, smtpPort:parseInt(e.target.value,10)||0})} />
              <input className="border rounded px-3 py-2" placeholder="Username" value={settings.smtpUser} onChange={(e)=>setSettings({...settings, smtpUser:e.target.value})} />
              <input type="password" className="border rounded px-3 py-2" placeholder="Password" value={settings.smtpPass} onChange={(e)=>setSettings({...settings, smtpPass:e.target.value})} />
            </div>
          </div>

          <div className="md:col-span-2">
            <button className="px-5 py-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded">Save Settings</button>
          </div>
        </form>
      </div>
    </div>
  );
}
