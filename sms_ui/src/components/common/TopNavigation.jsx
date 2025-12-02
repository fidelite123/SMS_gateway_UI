import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function TopNavigation({ left = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Flat modules list (no section headings)
  const modules = [
    { label: 'Dashboard', path: '/reseller/dashboard' },
    { label: 'Send SMS', path: '/reseller/send' },
    { label: 'Contacts & Groups', path: '/reseller/contacts' },
    { label: 'Reports & Logs', path: '/reseller/logs' },
    { label: 'Clients', path: '/reseller/clients' },
    { label: 'Wallet & Billing', path: '/reseller/billing' },
    { label: 'Pricing', path: '/reseller/pricing' },
  ];

  const isActive = (path) => location.pathname === path;

  // Left vertical navigation for desktop (keeps mobile top bar)
  return (
    <>
      {/* Desktop left sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-black border-r border-gray-800 h-screen p-4 sticky top-0 z-40">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">WeCall</h1>
          <p className="text-sm text-gray-400 mt-1">Reseller Portal</p>
        </div>
        <div className="text-sm text-gray-400 mb-3">Modules</div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {modules.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800 transition ${
                    isActive(item.path) ? 'bg-indigo-600 text-white' : 'text-gray-300'
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4">
          <Link to="/reseller/settings" className="text-xs text-gray-500 hover:text-gray-300">Settings</Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden bg-black border-b border-gray-800 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="text-white font-bold">Modules</h2>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="bg-gray-900 border-t border-gray-800 max-h-96 overflow-y-auto">
            <div className="px-4 py-2 text-sm font-semibold text-gray-400">Modules</div>
            {modules.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-6 py-2 text-sm transition ${
                  isActive(item.path)
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
