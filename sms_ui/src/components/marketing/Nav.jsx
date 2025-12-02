import React from 'react';
import { Link } from 'react-router-dom';
import smsIcon from '../../assets/sms-icon.png';

export default function Nav() {
  return (
    <nav className="w-full bg-white/5 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={smsIcon} alt="WeCall SMS" className="w-12 h-12" />
          <div className="flex flex-col leading-tight">
            <span className="font-heading text-white text-xl font-bold group-hover:text-fuchsia-300 transition-colors">WeCall SMS</span>
            <span className="text-xs tracking-wide text-fuchsia-200">Gateway Integration</span>
          </div>
        </Link>

        <div className="hidden md:flex gap-6 items-center text-white">
          <Link to="/features" className="hover:underline">Features</Link>
          <Link to="/pricing" className="hover:underline">Pricing</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/login" className="px-4 py-2 hover:opacity-90 text-white rounded-lg font-medium shadow" style={{background: '#FF00FF'}}>Get Started</Link>
        </div>

        <div className="md:hidden text-white">
          <details>
            <summary className="cursor-pointer">Menu</summary>
            <div className="mt-2 flex flex-col gap-2 bg-white/5 p-2 rounded">
              <Link to="/features" className="px-3 py-2">Features</Link>
              <Link to="/pricing" className="px-3 py-2">Pricing</Link>
              <Link to="/contact" className="px-3 py-2">Contact</Link>
              <Link to="/login" className="px-3 py-2 hover:opacity-90 text-white rounded" style={{background: '#FF00FF'}}>Get Started</Link>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}
