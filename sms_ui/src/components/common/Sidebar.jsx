import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ role }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const adminMenuItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Resellers', path: '/admin/resellers' },
    { label: 'Reports', path: '/admin/reports' },
    { label: 'Settings', path: '/admin/settings' },
  ];

  const resellerMenuItems = [
    { label: 'Dashboard', path: '/reseller/dashboard' },
    { label: 'Clients', path: '/reseller/clients' },
      { label: 'Send SMS', path: '/reseller/send' },
    { label: 'SMS Logs', path: '/reseller/logs' },
    { label: 'Billing', path: '/reseller/billing' },
    { label: 'Settings', path: '/reseller/settings' },
  ];

  const clientMenuItems = [
    { label: 'Dashboard', path: '/client/dashboard' },
    { label: 'Send SMS', path: '/client/send' },
    { label: 'SMS Logs', path: '/client/logs' },
    { label: 'Contacts', path: '/client/contacts' },
    { label: 'Templates', path: '/client/templates' },
    { label: 'Sender ID', path: '/client/senderid' },
    { label: 'API Management', path: '/client/api' },
    { label: 'Wallet', path: '/client/wallet' },
    { label: 'Settings', path: '/client/settings' },
  ];

  const menuItems = role === 'admin' ? adminMenuItems : role === 'reseller' ? resellerMenuItems : clientMenuItems;

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">WeCall</h1>
        <p className="text-sm text-gray-400 mt-1 capitalize">{role} Portal</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="block px-4 py-2 rounded hover:bg-gray-800 transition text-gray-300 hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-700 p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
