import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import smsIcon from '../../assets/sms-icon.png';

export default function Sidebar({ role }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminMenuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Approvals', path: '/admin/approvals' },
    { label: 'Resellers', path: '/admin/resellers' },
    { label: 'Clients', path: '/admin/clients' },
    { label: 'Contacts & Groups', path: '/admin/contacts' },
    { label: 'Wallet', path: '/admin/wallet' },
    { label: 'Reports', path: '/admin/reports' },
    { label: 'Routing', path: '/admin/routing' },
    { label: 'SMPP', path: '/admin/smpp' },
    { label: 'Settings', path: '/admin/settings' },
    { label: 'Security', path: '/admin/security' },
  ];

  const resellerMenuItems = [
    { label: 'Dashboard', path: '/reseller/dashboard' },
    { label: 'Send SMS', path: '/reseller/send' },
    { label: 'Clients', path: '/reseller/clients' },
    { label: 'Contacts & Groups', path: '/reseller/contacts' },
    { label: 'SMS Logs', path: '/reseller/logs' },
    { label: 'Wallet', path: '/reseller/wallet' },
    { label: 'Billing', path: '/reseller/billing' },
    { label: 'Branding', path: '/reseller/branding' },
    { label: 'Settings', path: '/reseller/settings' },
    { label: 'Security', path: '/reseller/security' },
  ];

  const clientMenuItems = [
    { label: 'Dashboard', path: '/client/dashboard' },
    { label: 'Send SMS', path: '/client/send' },
    { label: 'SMS Logs', path: '/client/logs' },
    { label: 'Contacts & Groups', path: '/client/contacts' },
    { label: 'Templates', path: '/client/templates' },
    { label: 'Sender ID', path: '/client/senderid' },
    { label: 'API Management', path: '/client/api' },
    { label: 'Wallet', path: '/client/wallet' },
    { label: 'Settings', path: '/client/settings' },
    { label: 'Security', path: '/client/security' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : role === 'reseller' ? resellerMenuItems : clientMenuItems;

  return (
    <div className="w-64 bg-gradient-to-b from-[#1a1a3e] to-[#0f0f1e] text-white flex flex-col h-screen shadow-lg">
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3 mb-2">
          <img src={smsIcon} alt="SMS Icon" className="w-10 h-10" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-fuchsia-400 to-blue-400 bg-clip-text text-transparent">WeCall SMS</h1>
        </div>
        <p className="text-sm text-gray-400 mt-1 capitalize">{role} Portal</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="block px-4 py-2 rounded hover:bg-white/10 transition text-gray-300 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded transition shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
